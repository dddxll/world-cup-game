import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useGameStore } from '@/store/gameStore'
import { generateMatchEvents, createMatchState, applyEventEffect, autoSimulateMatch, updateDisciplineAfterMatch, getBaseGoalProbability, getGoalOccurrenceRate, pickAwayPlayerName } from '@/engine/match-events'
import { getCurrentGroupOpponent, getKnockoutOpponent, getCurrentKnockoutMatch, recordGroupMatchResult } from '@/engine/tournament'
import { recordKnockoutResult as engineRecordKnockoutResult } from '@/engine/tournament'
import { allTeams } from '@/data/teams'
import { getPlayers } from '@/data/players'
import { MiniFormationBoard } from '@/components/match/MiniFormationBoard'
import type { MatchEventV2, MatchEventOptionV2, MatchStateV2, MatchEventSide, NationalTeam, Player, TournamentState, Position } from '@/types'
import { ArrowRight, SkipForward } from 'lucide-react'

type Phase = 'intro' | 'pre_return' | 'event_active' | 'event_result' | 'var_check' | 'var_result' | 'substitution' | 'finished' | 'skipping' | 'post_match'
  | 'extra_time_intro' | 'extra_time_active' | 'extra_time_result'
  | 'red_card_choice' | 'red_card_tactical'  // ★ 红牌两步交互
  | 'penalties_intro' | 'penalties_shootout' | 'penalties_result'

export default function MatchPage() {
  const navigate = useNavigate()
  const { round = 'group-1' } = useParams()
  const { userTeam, tournament, setTournament, recordGroupResult, recordKnockoutResult } = useGameStore()

  const [phase, setPhase] = useState<Phase>('intro')
  const [matchState, setMatchState] = useState<MatchStateV2 | null>(null)
  const [currentEventIndex, setCurrentEventIndex] = useState(-1)
  const [showTimeline, setShowTimeline] = useState(false)
  const [subPlayer, setSubPlayer] = useState<Player | null>(null)
  // 战术换人时玩家自己选定的被换下球员（无 playerName 的事件走两步选择流程）
  const [selectedSubOut, setSelectedSubOut] = useState<Player | null>(null)
  const [skipConfirm, setSkipConfirm] = useState(false)
  const [skipAllConfirm, setSkipAllConfirm] = useState(false)

  // 赛后阵容调整：需要替换的球员列表
  const [postMatchReplacements, setPostMatchReplacements] = useState<Map<string, Player | null>>(new Map())
  const [postMatchPlayers, setPostMatchPlayers] = useState<{ playerName: string; playerId: string; reason: string; type: string; originalXiIndex: number }[]>([])

  // 赛前复出选择：待复出球员
  const [returnPlayers, setReturnPlayers] = useState<{ playerId: string; playerName: string; originalXiIndex: number }[]>([])
  const [returnChoices, setReturnChoices] = useState<Map<string, 'start' | 'bench'>>(new Map())

  // ====== 加时赛 & 点球大战 ======
  const [extraTimeEvents, setExtraTimeEvents] = useState<MatchEventV2[]>([])
  const [extraTimeEventIdx, setExtraTimeEventIdx] = useState(-1)
  const [extraTimeScore, setExtraTimeScore] = useState({ home: 0, away: 0 })
  // 点球
  const [penaltyState, setPenaltyState] = useState<{
    round: number              // 当前第几轮 (1-5 常规, 6+ 突然死亡)
    homeKicks: boolean[]       // true=进, false=丢
    awayKicks: boolean[]
    currentTaker: 'home' | 'away'
    homeScore: number
    awayScore: number
    finished: boolean
    winner: 'home' | 'away' | null
  } | null>(null)
  const [penaltyChoice, setPenaltyChoice] = useState<'left' | 'center' | 'right' | null>(null)
  const [penaltyResult, setPenaltyResult] = useState<{ scored: boolean; gkDove: string } | null>(null)

  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingSubEventRef = useRef<MatchEventV2 | null>(null)
  // ★ VAR 越位检查：进球后紧跟着 offside_goal 事件时，先展示 VAR 再出结果
  const [varCheckState, setVarCheckState] = useState<{
    goalEvent: MatchEventV2; offsideEvent: MatchEventV2; isOffside: boolean
  } | null>(null)
  // ★ 红牌两步交互：记录红牌事件，sub完成后进入战术选择
  const redCardTacticalRef = useRef(false)
  // 固定比赛对手信息（防止 setTournament 推进 currentMatchIndex 后 opponent 变化）
  const lockedOpponentRef = useRef<{ id: string; name: string; flag: string } | null>(null)
  // 防止 skip 模拟重复执行
  const skipSimRunningRef = useRef(false)
  // ★ 跳过锁：防止 skip 期间其他定时器修改 phase
  const skippingRef = useRef(false)
  // 防止 AI 点球重复执行
  const aiPenaltyLockRef = useRef(false)
  /** 根据教练 ADP 计算本场概率修正上限（15%~20%） */
  function getProbCap(): number {
    const adp = userTeam.coach?.adp || 12
    return Math.min(0.20, Math.max(0.15, 0.15 + (adp - 10) * 0.01))
  }

  /** 安全应用进球概率修正 */
  function applyProbMod(state: MatchStateV2, delta: number): MatchStateV2 {
    const cap = getProbCap()
    return {
      ...state,
      probModifier: Math.min(cap, Math.max(-cap, state.probModifier + delta)),
    }
  }

  /** 位置加权随机选进球者（前锋>中场>后卫>门将，模拟真实分布） */
  const scorerPosWeight: Record<string, number> = {
    ST: 10, LW: 8, RW: 8, CAM: 7,  // 前场 ~50%
    CM: 6, CDM: 4, LM: 5, RM: 5,   // 中场 ~30%
    CB: 2, LB: 2, RB: 2, LWB: 2, RWB: 2, // 后卫 ~15%
    GK: 1,                           // 门将 ~5%
  }
  function randomHomeScorer(): { name: string; id: string; position: string } | null {
    const xi = userTeam.startingXI.filter(Boolean) as Player[]
    if (xi.length === 0) return null
    // 计算每个球员权重（取所有位置中的最大权重）
    const totalWeight = xi.reduce((sum, p) => {
      return sum + Math.max(...p.positions.map(pos => scorerPosWeight[pos] || 1), 1)
    }, 0)
    let r = Math.random() * totalWeight
    for (const p of xi) {
      const w = Math.max(...p.positions.map(pos => scorerPosWeight[pos] || 1), 1)
      r -= w
      if (r <= 0) return { name: p.name, id: p.id, position: p.positions[0] || 'CM' }
    }
    const fb = xi[Math.floor(Math.random() * xi.length)]
    return { name: fb.name, id: fb.id, position: fb.positions[0] || 'CM' }
  }

  /** 从对方国家队选真实进球球员名，优先前场位置 */
  function pickAwayScorer(): string {
    const opp = opponentRef.current
    if (!opp) return '对方球员'
    const prefPos = ['ST','LW','RW','CAM','CM','CDM','LM','RM','CB','LB','RB'] as const
    for (const pos of prefPos) {
      const players = getPlayers(opp.id, pos as any)
      if (players.length > 0) {
        return players[Math.floor(Math.random() * players.length)].name
      }
    }
    return opp.name + '球员'
  }

  // 确定当前比赛类型和对手
  const matchInfo = useMemo(() => {
    if (!tournament) return null
    const isKnockout = tournament.currentRound === 'knockout'

    if (isKnockout) {
      const km = getCurrentKnockoutMatch(tournament)
      const opp = km ? getKnockoutOpponent(km) : null
      return { isKnockout: true, opponent: opp, knockoutMatch: km, roundLabel: tournament.currentKnockoutRound }
    } else {
      const opp = getCurrentGroupOpponent(tournament)
      const idx = tournament.currentMatchIndex
      return { isKnockout: false, opponent: opp, matchIndex: idx, roundLabel: `小组赛第${idx + 1}轮` }
    }
  }, [tournament])

  const opponent = matchInfo?.opponent || allTeams[0]
  // 对手引用（避免闭包过期，必须放在 opponent 声明之后）
  const opponentRef = useRef(opponent)
  opponentRef.current = opponent

  // ★ 关键修复：route round 变化时重置所有状态，确保新比赛可以初始化
  useEffect(() => {
    setPhase('intro')
    setMatchState(null)
    setCurrentEventIndex(-1)
    setSubPlayer(null)
    setSelectedSubOut(null)
    setShowTimeline(false)
    setSkipConfirm(false)
    setSkipAllConfirm(false)
    lockedOpponentRef.current = null
    skipSimRunningRef.current = false
    aiPenaltyLockRef.current = false
    setExtraTimeEvents([])
    setExtraTimeEventIdx(-1)
    setExtraTimeScore({ home: 0, away: 0 })
    setPenaltyState(null)
    setPenaltyChoice(null)
    setPenaltyResult(null)
    if (autoTimerRef.current) { clearTimeout(autoTimerRef.current); autoTimerRef.current = null }
    if (advanceTimerRef.current) { clearTimeout(advanceTimerRef.current); advanceTimerRef.current = null }
  }, [round])

  // 生成事件（仅在 intro 阶段执行一次）
  useEffect(() => {
    if (skippingRef.current) return
    if (phase !== 'intro' || !tournament) return

    // ★ 赛前复出检查
    const currentMatchIdx = tournament.currentMatchIndex
    const returning: { playerId: string; playerName: string; originalXiIndex: number }[] = []
    for (const s of (tournament.playerSuspensions || [])) {
      if (s.suspendedUntilMatch <= currentMatchIdx) {
        returning.push({
          playerId: s.playerId, playerName: s.playerName, originalXiIndex: s.originalXiIndex,
        })
      }
    }
    if (returning.length > 0) {
      setReturnPlayers(returning)
      setReturnChoices(new Map())
      setPhase('pre_return')
      return
    }

    // 正常开始比赛
    try {
      if (!lockedOpponentRef.current && opponent) {
        lockedOpponentRef.current = { id: opponent.id, name: opponent.name, flag: opponent.flag }
      }
      console.log('[MatchPage] 开始生成比赛事件, userTeam:', userTeam.name, 'opponent:', opponent?.name)
      const events = generateMatchEvents(userTeam, opponent)
      console.log('[MatchPage] 事件生成完成, 共', events.length, '个事件')
      const baseProb = getBaseGoalProbability(userTeam, opponent)
      console.log('[MatchPage] 基础进球概率:', baseProb)
      const state = createMatchState(events, baseProb)
      console.log('[MatchPage] 比赛状态创建完成, goalProbability:', state.goalProbability)
      setMatchState(state)
      setCurrentEventIndex(-1)

      const timer = setTimeout(() => {
        setPhase('event_active')
        setCurrentEventIndex(0)
      }, 2500)
      return () => clearTimeout(timer)
    } catch (e) {
      console.error('[MatchPage] 初始化比赛失败:', e)
      setPhase('finished')
    }
  }, [phase, tournament])

  // 处理自动事件推进
  useEffect(() => {
    if (skippingRef.current) return
    if (phase !== 'event_active' || !matchState) return
    const evt = matchState.events[currentEventIndex]
    if (!evt || evt.interactive) return

    // 清除上一个推进定时器（如果有的话）
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current)
      advanceTimerRef.current = null
    }

    // 自动事件2.5秒后推进
    autoTimerRef.current = setTimeout(() => {
      handleEventAuto(evt)
    }, 2500)
    return () => { if (autoTimerRef.current) clearTimeout(autoTimerRef.current) }
  }, [phase, currentEventIndex, matchState])

  // ★ VAR 越位检查 → 展示检查动画 → 2s后出结果
  useEffect(() => {
    if (skippingRef.current) return
    if (phase !== 'var_check' || !varCheckState) return
    const timer = setTimeout(() => {
      setPhase('var_result')
    }, 2000)
    return () => clearTimeout(timer)
  }, [phase, varCheckState])

  // ★ VAR 结果 → 展示结果 → 2s后更新比分并推进
  useEffect(() => {
    if (skippingRef.current) return
    if (phase !== 'var_result' || !varCheckState || !matchState) return
    const timer = setTimeout(() => {
      const next = { ...matchState }
      const { goalEvent, offsideEvent, isOffside } = varCheckState

      if (isOffside) {
        // 越位：比分不变，进球无效
      } else {
        // 进球有效：比分+1，记录进球者
        if (goalEvent.side === 'home') next.homeScore++
        else next.awayScore++
        next.goalScorers = [...next.goalScorers, {
          playerName: goalEvent.playerName || '未知', minute: goalEvent.minute, side: goalEvent.side,
        }]
        if (goalEvent.assistPlayerName) {
          next.assists = [...(next.assists || []), {
            playerName: goalEvent.assistPlayerName, minute: goalEvent.minute, goalScorer: goalEvent.playerName || '未知',
          }]
        }
      }

      const idx = currentEventIndex
      setMatchState(next)
      setVarCheckState(null)
      setPhase('event_result')
      // 跳过两个事件（goal + offside_goal）
      advanceTimerRef.current = setTimeout(() => advanceToNextEvent(idx + 2, next), 1500)
    }, 2000)
    return () => clearTimeout(timer)
  }, [phase, varCheckState, matchState, currentEventIndex])

  // ★ 加时赛自动事件推进
  useEffect(() => {
    if (skippingRef.current) return
    if (phase !== 'extra_time_active' || extraTimeEvents.length === 0) return
    if (extraTimeEventIdx >= extraTimeEvents.length) return

    const evt = extraTimeEvents[extraTimeEventIdx]
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current)
      advanceTimerRef.current = null
    }

    autoTimerRef.current = setTimeout(() => {
      handleExtraTimeEvent(evt)
    }, 2000)
    return () => { if (autoTimerRef.current) clearTimeout(autoTimerRef.current) }
  }, [phase, extraTimeEventIdx, extraTimeEvents])

  // ★ AI 自动罚点球（加锁防止竞态重复触发）
  useEffect(() => {
    if (skippingRef.current) return
    if (phase !== 'penalties_shootout' || !penaltyState || penaltyState.finished) return
    if (penaltyState.currentTaker !== 'away') return
    if (penaltyResult || penaltyChoice) return
    if (aiPenaltyLockRef.current) return

    aiPenaltyLockRef.current = true

    const dirs: ('left' | 'center' | 'right')[] = ['left', 'center', 'right']
    const aiDir = dirs[Math.floor(Math.random() * 3)]
    const gkDirs = ['left', 'center', 'right']
    const gkDove = gkDirs[Math.floor(Math.random() * 3)]
    const scored = aiDir !== gkDove

    const timer = setTimeout(() => {
      setPenaltyChoice(aiDir)
      setPenaltyResult({ scored, gkDove })
      setTimeout(() => {
        setPenaltyChoice(null)
        setPenaltyResult(null)
        applyPenaltyResult(scored)
        aiPenaltyLockRef.current = false
      }, 1500)
    }, 1500)

    return () => { clearTimeout(timer); aiPenaltyLockRef.current = false }
  }, [phase, penaltyState?.currentTaker, penaltyState?.finished])

  /** 自动事件处理 */
  function handleEventAuto(evt: MatchEventV2) {
    if (skippingRef.current) return
    try {
      if (!matchState) return
      let next = { ...matchState }
      const idx = currentEventIndex

      console.log('[handleEventAuto] 处理事件 idx:', idx, 'type:', evt.type, 'goalProb:', next.goalProbability, 'probMod:', next.probModifier)

      // ★ 动态进球机会：两阶段概率判定
      //   阶段1：进球是否发生（goalOccurrenceRate，约28-43%）
      //   阶段2：若发生，哪方进球（effectiveProb = 基础概率 + 修正值）
      if (evt.type === 'goal_opportunity') {
        const homeAttack = userTeam.attackRating || 70
        const awayAttack = opponentRef.current?.ratings?.attack || 50
        const baseRate = getGoalOccurrenceRate(homeAttack, awayAttack, userTeam.coach?.style)
        const goalOccurrenceRate = Math.min(0.65, baseRate * (next.occRateModifier ?? 1.0))
        const goalOccurs = Math.random() < goalOccurrenceRate

        const effectiveProb = Math.min(0.95, Math.max(0.05,
          next.goalProbability + next.probModifier
        ))
        const isHomeGoal = Math.random() < effectiveProb
        const side: MatchEventSide = isHomeGoal ? 'home' : 'away'

        // ★ 没进球：无声跳过，不展示（减少非重要事件播报）
        if (!goalOccurs) {
          next.events = next.events.map((e, i) => i === idx
            ? { ...e, type: 'big_miss' as any, side, title: '', description: '' }
            : e)
          advanceToNextEvent(idx + 1, next)
          return
        }

        // ★ 进球发生：先准备进球数据（不放比分，VAR 路径由 var_result 统一加分）
        let goalTitle, goalDesc, scorerName, scorerId, scorerPos, assistName

        if (isHomeGoal) {
          const scorer = randomHomeScorer()
          const descs = [
            '禁区外一脚远射直挂死角！世界波！',
            '弧顶处起脚远射，皮球如出膛炮弹窜入网窝！',
            '势大力沉的远射！门将鞭长莫及！',
            '一记漂亮的倒钩破门！技惊四座！',
            '凌空抽射！皮球应声入网！',
            '侧身凌空扫射！完美的技术展示！',
            '高高跃起头槌破门！力压防守球员！',
            '抢点头球攻门！角度刁钻！',
            '禁区内冷静推射远角得手！',
            '面对门将轻巧挑射！皮球越过门将头顶！',
            '穿裆射门！戏耍门将！',
            '单刀赴会！冷静施射破门！',
            '反击中单骑闯关！面对门将稳稳命中！',
            '门前混战中机警补射得手！',
            '门将扑救脱手！跟进补射破门！',
            '连过两人后爆射上角！个人能力的极致体现！',
            '禁区内晃开角度抽射！皮球击中横梁下沿弹入！',
            '小角度抽射！从几乎不可能的位置破门！',
            '禁区边缘一脚兜射！皮球划出美妙弧线入网！',
            '后插上迎球怒射！皮球直入网窝！',
            '精妙二过一配合后推射空门！',
          ]
          goalTitle = '⚽ 进球！' + userTeam.name
          goalDesc = scorer ? scorer.name + ' ' + descs[Math.floor(Math.random() * descs.length)] : userTeam.name + ' 进球！'
          scorerName = scorer?.name || '未知'
          scorerId = scorer?.id; scorerPos = scorer?.position
          // 30%概率有助攻
          if (Math.random() < 0.30) {
            const assist = randomHomeScorer()
            if (assist && assist.id !== scorer?.id) assistName = assist.name
          }
        } else {
          const opp = opponentRef.current
          const pn = pickAwayScorer()
          const descs = [
            '禁区外突施冷箭！一脚石破天惊的远射！',
            '弧顶处迎球怒射！皮球直挂死角！',
            '一记势大力沉的世界波！直挂球门上角！',
            '精彩的倒钩射门！技惊四座！',
            '凌空抽射破门！防守球员来不及反应！',
            '高高跃起头球攻门！角度极其刁钻！',
            '禁区内灵巧转身抽射！一击致命！',
            '面对门将冷静推射远角得手！',
            '反越位成功！单刀面对门将稳稳命中！',
            '反击中长驱直入！禁区边缘一脚低射破门！',
            '门前混战中补射得手！',
            '连过两人后在禁区内一脚爆射破门！',
            '禁区边缘兜射远角！皮球划出美妙弧线！',
            '小角度抽射上角！近乎零角度的破门！',
            '快速反击中以多打少！轻松推射空门得手！',
            '禁区内被放倒前捅射破门！',
            '一脚精准的低射！穿过人群窜入球门下角！',
            '后插上迎球爆射上角！门将毫无反应！',
            '连续一脚传递后突入禁区低射破门！',
          ]
          goalTitle = '⚽ 丢球！' + (opp?.name || '对手')
          goalDesc = pn + ' ' + descs[Math.floor(Math.random() * descs.length)]
          scorerName = pn; scorerId = undefined; scorerPos = undefined
        }

        const resolvedGoalEvt: MatchEventV2 = {
          ...evt,
          type: 'goal' as const, side,
          title: goalTitle, description: goalDesc,
          playerName: scorerName, playerId: scorerId, playerPosition: scorerPos,
          assistPlayerName: assistName,
        } as MatchEventV2

        // ★ 12% 概率触发 VAR 越位复查（比分先不加，var_result 统一处理）
        if (Math.random() < 0.12) {
          const nextEvt = next.events[idx + 1]
          if (!nextEvt || nextEvt.type !== 'offside_goal') {
            const offsideEvt: MatchEventV2 = {
              id: 'var-' + Date.now(), minute: evt.minute, type: 'offside_goal' as const, side,
              title: '📺 VAR 正在检查进球…',
              description: '裁判通过 VAR 核查 ' + scorerName + ' 进球时是否越位',
              playerName: scorerName, playerId: scorerId, playerPosition: scorerPos,
              interactive: false,
            } as MatchEventV2
            // 插入 offside_goal 事件到数组中
            next.events = [...next.events.slice(0, idx + 1), offsideEvt, ...next.events.slice(idx + 1)]
            // ★ 更新当前进球事件为 resolved goal（比分未加，等 var_result）
            next.events = next.events.map((e, i) => i === idx ? resolvedGoalEvt : e)
            const isOffside = Math.random() < 0.60
            setMatchState(next)
            setVarCheckState({ goalEvent: resolvedGoalEvt, offsideEvent: offsideEvt, isOffside })
            setPhase('var_check')
            return
          }
        }

        // ★ 非VAR路径：直接加分 + 记录进球者
        if (isHomeGoal) {
          next.homeScore++
        } else {
          next.awayScore++
        }
        next.goalScorers = [...next.goalScorers, { playerName: scorerName, minute: evt.minute, side }]
        if (assistName) {
          next.assists = [...(next.assists || []), { playerName: assistName, minute: evt.minute, goalScorer: scorerName }]
        }
        next.events = next.events.map((e, i) => i === idx ? resolvedGoalEvt : e)
        setMatchState(next)
        setPhase('event_result')
        advanceTimerRef.current = setTimeout(() => advanceToNextEvent(idx + 1, next), 1500)
        return
      }
      // ★ VAR 越位检查：进球 + 紧跟着 offside_goal 时的 VAR 流程
      if (evt.type === 'goal' && evt.side === 'home' && !evt.interactive) {
        const nextEvt = next.events[idx + 1]
        if (nextEvt && nextEvt.type === 'offside_goal' && nextEvt.side === 'home') {
          const isOffside = Math.random() < 0.60
          setVarCheckState({ goalEvent: evt, offsideEvent: nextEvt, isOffside })
          setPhase('var_check')
          return
        }
      }

      // 更新比分（含助攻记录）
      if (evt.type === 'goal') {
        if (evt.side === 'home') next.homeScore++
        else next.awayScore++
        next.goalScorers = [...next.goalScorers, { playerName: evt.playerName || '未知', minute: evt.minute, side: evt.side }]
        if (evt.assistPlayerName) {
          next.assists = [...(next.assists || []), { playerName: evt.assistPlayerName, minute: evt.minute, goalScorer: evt.playerName || '未知' }]
        }
      }
      if (evt.type === 'own_goal') {
        if (evt.side === 'home') next.awayScore++
        else next.homeScore++
        next.goalScorers = [...next.goalScorers, { playerName: (evt.playerName || '乌龙') + '(乌龙)', minute: evt.minute, side: evt.side === 'home' ? 'away' : 'home' }]
      }
      if (evt.type === 'var_goal') {
        if (evt.side === 'home') next.homeScore++
        else next.awayScore++
        next.goalScorers = [...next.goalScorers, { playerName: evt.playerName || '未知', minute: evt.minute, side: evt.side }]
        if (evt.assistPlayerName) {
          next.assists = [...(next.assists || []), { playerName: evt.assistPlayerName, minute: evt.minute, goalScorer: evt.playerName || '未知' }]
        }
      }
      // 两黄变红检测
      if (evt.type === 'card_yellow' && evt.playerId) {
        const existingYellow = next.cards.filter(
          c => c.playerId === evt.playerId && c.type === 'yellow'
        ).length
        const isSecondYellow = existingYellow >= 1
        next.cards = [...next.cards, {
          playerName: evt.playerName || '', playerId: evt.playerId || '',
          type: isSecondYellow ? 'red' : 'yellow', minute: evt.minute,
        }]
        if (isSecondYellow) {
          next.sendOffsThisMatch = [...next.sendOffsThisMatch, {
            playerName: evt.playerName || '', playerId: evt.playerId || '', minute: evt.minute, originalXiIndex: -1,
          }]
        }
      } else if (evt.type === 'card_red' || evt.type === 'card_second_yellow') {
        next.cards = [...next.cards, {
          playerName: evt.playerName || '', playerId: evt.playerId || '',
          type: 'red', minute: evt.minute,
        }]
        // ★ 仅记录己方罚下
        if (evt.side === 'home') {
          next.sendOffsThisMatch = [...next.sendOffsThisMatch, {
            playerName: evt.playerName || '', playerId: evt.playerId || '', minute: evt.minute, originalXiIndex: -1,
          }]
        }
      }
      // ★ 仅记录己方受伤（对方受伤不需要玩家处理）
      if ((evt.type === 'injury_minor' || evt.type === 'injury_major') && evt.side === 'home') {
        next.injuriesThisMatch = [...next.injuriesThisMatch, {
          playerName: evt.playerName || '', playerId: evt.playerId || '',
          type: evt.type === 'injury_major' ? 'major' : 'minor',
          minute: evt.minute, originalXiIndex: -1,
        }]
      }

      setMatchState(next)
      setPhase('event_result')
      advanceTimerRef.current = setTimeout(() => advanceToNextEvent(idx + 1, next), 1500)
    } catch (e) {
      console.error('handleEventAuto error:', e)
      if (matchState) advanceToNextEvent(currentEventIndex + 1, matchState)
    }
  }

  /** 交互事件 - 玩家选择了选项 */
  function handleInteractiveChoice(evt: MatchEventV2, option: MatchEventOptionV2) {
    if (skippingRef.current) return
    try {
      if (!matchState) return
      let next = { ...matchState }

      // 记录红黄牌 + 两黄变红检测（不论是否需要换人）
      if (evt.type === 'card_yellow' && evt.playerId && evt.side === 'home') {
        const existingYellow = next.cards.filter(
          c => c.playerId === evt.playerId && c.type === 'yellow'
        ).length
        const isSecondYellow = existingYellow >= 1
        next.cards = [...next.cards, {
          playerName: evt.playerName || '', playerId: evt.playerId || '',
          type: isSecondYellow ? 'red' : 'yellow', minute: evt.minute,
        }]
        if (isSecondYellow) {
          next.sendOffsThisMatch = [...next.sendOffsThisMatch, {
            playerName: evt.playerName || '', playerId: evt.playerId || '', minute: evt.minute, originalXiIndex: -1,
          }]
        }
      } else if ((evt.type === 'card_red' || evt.type === 'card_second_yellow') && evt.side === 'home') {
        next.cards = [...next.cards, {
          playerName: evt.playerName || '', playerId: evt.playerId || '',
          type: 'red', minute: evt.minute,
        }]
        next.sendOffsThisMatch = [...next.sendOffsThisMatch, {
          playerName: evt.playerName || '', playerId: evt.playerId || '', minute: evt.minute, originalXiIndex: -1,
        }]
      }
      // 仅记录己方伤病（对方受伤不需要玩家处理）
      if ((evt.type === 'injury_minor' || evt.type === 'injury_major') && evt.side === 'home') {
        next.injuriesThisMatch = [...next.injuriesThisMatch, {
          playerName: evt.playerName || '', playerId: evt.playerId || '',
          type: evt.type === 'injury_major' ? 'major' : 'minor',
          minute: evt.minute, originalXiIndex: -1,
        }]
      }

      // ★ 铁律：对方(away)事件绝不触发己方换人，只做自动展示
      if (evt.side !== 'home') {
        setMatchState(next)
        setPhase('event_result')
        advanceTimerRef.current = setTimeout(() => advanceToNextEvent(currentEventIndex + 1, next), 1500)
        return
      }

      // ★ 红牌：少打一人统一罚 -10%（所有路径，只扣一次）
      const isRedCard = evt.type === 'card_red' || evt.type === 'card_second_yellow' ||
        (evt.type === 'card_yellow' && ((matchState?.cards || []).filter(c => c.playerId === evt.playerId && c.type === 'yellow').length >= 1))
      if (isRedCard && evt.side === 'home') {
        next = applyProbMod(next, -0.10)
      }

      // ★ 红牌两步交互：rc_direct → 跳过换人，直接进战术选择
      if (option.id === 'rc_direct') {
        redCardTacticalRef.current = true
        setMatchState(next)
        setPhase('red_card_tactical')
        return
      }

      // 需要换人的选项：先不应用效果，等确认/取消时再应用
      if (option.requiresSubstitution) {
        // ★ 红牌换人：标记进入两步流程
        if (option.id === 'rc_sub') {
          redCardTacticalRef.current = true
        }
        if (isRedCard && evt.side === 'home') {
          // ★ 红牌球员立即离场：从 startingXI 移除（设为 null）
          //    概率惩罚 -10% 已在上面统一应用，此处不再重复
          const st = useGameStore.getState()
          const newXI = [...st.userTeam.startingXI]
          const rcIdx = newXI.findIndex(p => p?.id === evt.playerId)
          if (rcIdx >= 0) {
            newXI[rcIdx] = null
            useGameStore.setState({ userTeam: { ...st.userTeam, startingXI: newXI } })
          }
        }
        setMatchState(next) // 先保存红黄牌记录（如有）
        pendingSubEventRef.current = evt
        // 战术换人（无 playerName）：玩家自己选换下谁
        // ★ 红牌换人：也是两步选择（红牌球员已离场，换其他首发）
        setSelectedSubOut(null)
        setPhase('substitution')
        return
      }

      // 非换人选项：直接应用效果（含伤病风险累加）+ 战术概率调整
      next = applyEventEffect(next, option, evt.playerId)

      // ★ 战术调整概率效果（加强进攻/保持原战术等非换人选项）
      if (evt.type === 'tactical' && option.id !== 'sub') {
        const roll = Math.random()
        if (roll < 0.70) {
          // 小有成效：回滚对方阵型克制的5%
          next = applyProbMod(next, +0.05)
        } else if (roll < 0.90) {
          // 大有成效：回滚+额外+5%
          next = applyProbMod(next, +0.10)
        } else {
          // 调整失败：对方+2.5%
          next = applyProbMod(next, -0.025)
        }
      }

      if (option.id === 'sub') {
        next.substitutions = [...next.substitutions, {
          playerOutName: evt.playerName || '', playerInName: '替补球员', minute: evt.minute,
        }]
      }

      setMatchState(next)
      setPhase('event_result')
      advanceTimerRef.current = setTimeout(() => advanceToNextEvent(currentEventIndex + 1, next), 1500)
    } catch (e) {
      console.error('handleInteractiveChoice error:', e)
      if (matchState) advanceToNextEvent(currentEventIndex + 1, matchState)
    }
  }

  /** 换人弹窗确认 */
  function handleSubstitutionConfirm(player: Player) {
    try {
      if (!matchState) return
      const evt = matchState.events[currentEventIndex]
      if (!evt) return
      let next = { ...matchState }
      const pendingOption = evt.options?.find(o => o.requiresSubstitution)
      if (pendingOption) {
        next = applyEventEffect(next, pendingOption, evt.playerId)
      }
      const outName = evt.playerName || selectedSubOut?.name || ''
      next.substitutions = [...next.substitutions, {
        playerOutName: outName, playerInName: player.name, minute: evt.minute,
      }]

      // ★ 评估换人质量：比较换下/换上球员在对应位置的有效评分
      //   两黄变红时 evt.type 仍是 'card_yellow'
      const isSecondYellow = evt.type === 'card_yellow' &&
        ((matchState?.cards || []).filter(c => c.playerId === evt.playerId && c.type === 'yellow').length >= 1)
      const isRedCard = evt.type === 'card_red' || evt.type === 'card_second_yellow' || isSecondYellow
      const isInjury = evt.type === 'injury_minor' || evt.type === 'injury_major'
      const isForced = isRedCard || isInjury

      // 查找被换下球员（优先用ID，fallback用名字）
      let outIdx = userTeam.startingXI.findIndex(p => p?.id === evt.playerId && evt.playerId)
      if (outIdx < 0) {
        outIdx = userTeam.startingXI.findIndex(p => p?.name === outName && outName)
      }
      const outPlayer = outIdx >= 0 ? userTeam.startingXI[outIdx] : null
      // 被换下球员的场上位置
      const pos = outIdx >= 0 && userTeam.formation
        ? userTeam.formation.positions[outIdx]
        : ((evt.playerPosition || selectedSubOut?.positions?.[0]) as Position | undefined) || player.positions[0]

      if (isRedCard) {
        // ★ 红牌：球员已离场（在 handleInteractiveChoice 中移除）
        //   基础 -10% 已在 handleInteractiveChoice 统一应用，此处只做微调
        const isDefensive = ['GK', 'CB', 'LB', 'RB', 'LWB', 'RWB', 'CDM'].includes(pos)
        if (isDefensive) {
          next = applyProbMod(next, +0.025)
        } else {
          next = applyProbMod(next, -0.025)
        }
        // 红牌：正常交换 + 记录 originalXiIndex
        if (outIdx >= 0) {
          useGameStore.getState().setStartingPlayer(outIdx, player)
        }
        if (outIdx >= 0) {
          next.sendOffsThisMatch = next.sendOffsThisMatch.map(so =>
            so.playerId === evt.playerId || so.playerName === outName ? { ...so, originalXiIndex: outIdx } : so
          )
        }
      } else {
        // ★ 普通换人 / 受伤换人：执行阵容交换
        if (outIdx >= 0) {
          // 比较换上/换下球员评分
          const outRating = outPlayer?.rating || 50
          const inRating = player.rating
          if (inRating >= outRating) {
            next = applyProbMod(next, +0.05)
          } else {
            next = applyProbMod(next, -0.05)
          }
          // ★ 核心：执行阵容交换
          useGameStore.getState().setStartingPlayer(outIdx, player)

          if (isForced) {
            // ★ 不回填 originalXiIndex（不从替补删除，赛后还需要此人做停赛处理）
            //    比赛中的替补过滤靠 injuriesThisMatch/sendOffsThisMatch 阻止他再被换上
            if (isInjury) {
              next.injuriesThisMatch = next.injuriesThisMatch.map(inj =>
                (inj.playerId === evt.playerId || inj.playerName === outName) ? { ...inj, originalXiIndex: outIdx } : inj
              )
            }
            if (isRedCard) {
              next.sendOffsThisMatch = next.sendOffsThisMatch.map(so =>
                (so.playerId === evt.playerId || so.playerName === outName) ? { ...so, originalXiIndex: outIdx } : so
              )
            }
          }
          // else: 战术/疲劳换人，setStartingPlayer 已自动完成替补↔首发交换
        }
        // outIdx < 0：无法定位被换下球员，跳过阵容更新但记录换人信息
      }

      // ★ 红牌两步：换人完成后进入战术选择，而非直接推进
      const goTactical = redCardTacticalRef.current
      redCardTacticalRef.current = false
      setMatchState(next)
      if (goTactical) {
        setPhase('red_card_tactical')
      } else {
        setPhase('event_result')
        advanceTimerRef.current = setTimeout(() => advanceToNextEvent(currentEventIndex + 1, next), 1500)
      }
      setSubPlayer(null)
      setSelectedSubOut(null)
      pendingSubEventRef.current = null
    } catch (e) {
      console.error('handleSubstitutionConfirm error:', e)
      if (matchState) advanceToNextEvent(currentEventIndex + 1, matchState)
    }
  }

  /** 推进到下一个事件 */
  function advanceToNextEvent(nextIndex: number, state: MatchStateV2) {
    if (skippingRef.current) return
    try {
      setCurrentEventIndex(nextIndex)
      setMatchState(state)
      if (nextIndex >= state.events.length) {
        finishMatch(state)
      } else {
        setPhase('event_active')
      }
    } catch (e) {
      console.error('advanceToNextEvent error:', e)
      setPhase('finished')
    }
  }

  /** ★ 处理加时赛自动事件 */
  function handleExtraTimeEvent(evt: MatchEventV2) {
    try {
      setExtraTimeScore(prev => {
        const next = { ...prev }
        if (evt.type === 'goal') {
          if (evt.side === 'home') next.home++
          else next.away++
        }
        return next
      })
      setPhase('extra_time_result')
      advanceTimerRef.current = setTimeout(() => {
        const nextIdx = extraTimeEventIdx + 1
        setExtraTimeEventIdx(nextIdx)
        if (nextIdx >= extraTimeEvents.length) {
          finishExtraTime()
        } else {
          setPhase('extra_time_active')
        }
      }, 1500)
    } catch (e) {
      console.error('handleExtraTimeEvent error:', e)
      finishExtraTime()
    }
  }

  /** 比赛结束 */
  function finishMatch(state: MatchStateV2) {
    try {
      const final = { homeScore: state.homeScore, awayScore: state.awayScore }

      // ★ 淘汰赛平局 → 加时赛
      if (matchInfo?.isKnockout && final.homeScore === final.awayScore) {
        const finished = { ...state, finished: true }
        setMatchState(finished)
        // 生成加时赛事件（3-5个，105-120分钟）
        const etEvents = generateExtraTimeEvents(userTeam, opponent)
        setExtraTimeEvents(etEvents)
        setExtraTimeEventIdx(0)
        setExtraTimeScore({ home: 0, away: 0 })
        setPhase('extra_time_intro')
        // 2.5秒后自动开始加时赛
        const timer = setTimeout(() => {
          setPhase('extra_time_active')
        }, 2500)
        // 不清理定时器——由 phase 变化自然驱动
        return
      }

      // 直接用场上比分，不再通过 calculateFinalScore 魔法改分
      const finished = { ...state, homeScore: final.homeScore, awayScore: final.awayScore, finished: true }
      setMatchState(finished)
      // 先标记结束，后面可能被 post_match 覆盖
      setPhase('finished')

      if (!tournament) return

      // ---- 结算伤病风险：疲劳坚持的球员有概率受伤 ----
      let discipline = { ...tournament.playerDiscipline }
      const suspended = [...(tournament.suspendedPlayers || [])]
      for (const [playerId, risk] of Object.entries(state.playerInjuryRisk)) {
        if (risk <= 0) continue
        const injuryChance = Math.min(0.25, risk / 100)
        if (Math.random() < injuryChance) {
          if (!discipline[playerId]) {
            discipline[playerId] = { yellowCards: 0, redCards: 0, suspended: true, suspendedUntilMatch: tournament.currentMatchIndex + 1 }
          } else {
            discipline[playerId] = { ...discipline[playerId], suspended: true, suspendedUntilMatch: tournament.currentMatchIndex + 1 }
          }
          if (!suspended.includes(playerId)) suspended.push(playerId)
        }
      }

      if (matchInfo?.isKnockout) {
        const km = matchInfo.knockoutMatch
        if (km) {
          const playerWon = final.homeScore > final.awayScore
          // ★ 淘汰赛红黄牌累计（淘汰赛阶段黄牌清零）
          const { discipline: cardDiscipline, suspended: cardSuspended } = updateDisciplineAfterMatch(
            discipline, state, tournament.currentMatchIndex, true
          )
          const allSuspended = [...new Set([...cardSuspended, ...suspended])]
          // 合并：纪律 + 淘汰赛结果一次写入
          const st = useGameStore.getState()
          const tWithDiscipline = { ...st.tournament!, playerDiscipline: cardDiscipline, suspendedPlayers: allSuspended }
          const updatedT = engineRecordKnockoutResult(tWithDiscipline, km.id, final.homeScore, final.awayScore, playerWon)
          setTournament(updatedT)
        }
      } else {
        const opp = lockedOpponentRef.current || opponent
        const result = {
          id: `match-${Date.now()}`,
          homeTeam: userTeam.name,
          awayTeam: opp.name,
          homeScore: final.homeScore,
          awayScore: final.awayScore,
          events: [],
          stats: { possession: 50, shots: 10 + final.homeScore * 2, shotsOnTarget: 4 + final.homeScore },
        }

        const { discipline: cardDiscipline, suspended: cardSuspended } = updateDisciplineAfterMatch(
          discipline,
          state,
          tournament.currentMatchIndex,
          false
        )
        const allSuspended = [...new Set([...cardSuspended, ...suspended])]
        const tWithDiscipline = { ...tournament, playerDiscipline: cardDiscipline, suspendedPlayers: allSuspended }
        const updatedT = recordGroupMatchResult(tWithDiscipline, result, opp.id)
        setTournament(updatedT)
      }

      // ★ 赛后伤停检查
      const issues: { playerName: string; playerId: string; reason: string; type: string; originalXiIndex: number }[] = []
      for (const inj of state.injuriesThisMatch || []) {
        issues.push({
          playerName: inj.playerName, playerId: inj.playerId,
          reason: inj.type === 'major' ? '🚑 重伤报销' : '🤕 轻伤停1场',
          type: inj.type === 'major' ? 'injury_major' : 'injury_minor',
          originalXiIndex: inj.originalXiIndex,
        })
      }
      for (const so of state.sendOffsThisMatch || []) {
        if (!issues.some(i => i.playerId === so.playerId)) {
          issues.push({
            playerName: so.playerName, playerId: so.playerId,
            reason: '🟥 红牌停赛1场', type: 'red_card',
            originalXiIndex: so.originalXiIndex,
          })
        }
      }
      if (issues.length > 0) {
        setPostMatchPlayers(issues)
        setPostMatchReplacements(new Map())
        setPhase('post_match')
      }
    } catch (e) {
      console.error('finishMatch error:', e)
      setPhase('finished')
    }
  }

  /** 生成加时赛事件（105-120分钟，3-5个事件） */
  function generateExtraTimeEvents(team: typeof userTeam, opp: typeof opponent): MatchEventV2[] {
    const events: MatchEventV2[] = []
    const count = 3 + Math.floor(Math.random() * 3) // 3-5个
    const minutes = [95, 100, 105, 110, 115, 118]
    const shuffled = minutes.sort(() => Math.random() - 0.5).slice(0, count).sort((a, b) => a - b)

    for (let i = 0; i < shuffled.length; i++) {
      const r = Math.random()
      const side: 'home' | 'away' = r > 0.45 ? 'home' : 'away'
      let type: MatchEventV2['type'] = 'fatigue'
      let title = ''
      let description = ''

      if (r < 0.3) {
        type = 'goal'
        title = side === 'home' ? '⚽ 加时破门！' : '😱 加时丢球'
        const scorerPlayer = side === 'home'
          ? team.startingXI.filter(Boolean)[Math.floor(Math.random() * 11)]
          : null
        description = side === 'home'
          ? `${scorerPlayer?.name || '球员'} 在加时赛打入关键进球！`
          : `${opp.name} 在加时赛取得进球`
      } else if (r < 0.5) {
        type = 'big_miss'
        title = side === 'home' ? '😩 错失良机' : '😅 对方错失机会'
        description = side === 'home' ? '加时赛疲劳导致射门偏出' : '对方球员体力透支，射门偏出'
      } else if (r < 0.65) {
        type = 'great_save'
        title = '🧤 关键扑救！'
        description = '门将做出世界级扑救，挽救球队！'
      } else {
        type = 'card_yellow'
        const p = team.startingXI.filter(Boolean)[Math.floor(Math.random() * 11)]
        title = '🟨 加时赛黄牌'
        description = `${p?.name || '球员'} 体能下降后动作变形吃到黄牌`
      }

      events.push({
        id: `et-${i}`,
        minute: shuffled[i],
        type, side, title, description,
        playerName: side === 'home' ? (team.startingXI.filter(Boolean)[Math.floor(Math.random() * 11)]?.name || '') : undefined,
        playerId: side === 'home' ? (team.startingXI.filter(Boolean)[Math.floor(Math.random() * 11)]?.id || '') : undefined,
        interactive: false,
      })
    }
    return events
  }

  /** 加时赛结束后检查比分 → 平局则点球大战 */
  function finishExtraTime() {
    const st = useGameStore.getState()
    const ms = st.userTeam // won't use this actually, need matchState
    // 合并加时赛进球到总比分
    const totalHome = (matchState?.homeScore || 0) + extraTimeScore.home
    const totalAway = (matchState?.awayScore || 0) + extraTimeScore.away

    if (totalHome !== totalAway) {
      // 加时赛分出胜负
      const finalScore = { homeScore: totalHome, awayScore: totalAway }
      const playerWon = totalHome > totalAway
      if (matchInfo?.isKnockout && tournament) {
        const km = matchInfo.knockoutMatch
        if (km) {
          // ★ 淘汰赛红黄牌累计
          let discipline = { ...tournament.playerDiscipline }
          const suspended = [...(tournament.suspendedPlayers || [])]
          const { discipline: cardDiscipline, suspended: cardSuspended } = updateDisciplineAfterMatch(
            discipline, matchState!, tournament.currentMatchIndex, true
          )
          const allSuspended = [...new Set([...cardSuspended, ...suspended])]
          const tWithDiscipline = { ...tournament, playerDiscipline: cardDiscipline, suspendedPlayers: allSuspended }
          const updatedT = engineRecordKnockoutResult(tWithDiscipline, km.id, finalScore.homeScore, finalScore.awayScore, playerWon)
          setTournament(updatedT)
        }
      }
      // ★ 赛后伤停检查（加时赛胜出路径）
      if (matchState) {
        const issues: { playerName: string; playerId: string; reason: string; type: string; originalXiIndex: number }[] = []
        for (const inj of (matchState.injuriesThisMatch || [])) {
          issues.push({ playerName: inj.playerName, playerId: inj.playerId,
            reason: inj.type === 'major' ? '🚑 重伤报销' : '🤕 轻伤停1场',
            type: inj.type === 'major' ? 'injury_major' : 'injury_minor', originalXiIndex: inj.originalXiIndex })
        }
        for (const so of (matchState.sendOffsThisMatch || [])) {
          if (!issues.some(i => i.playerId === so.playerId)) {
            issues.push({ playerName: so.playerName, playerId: so.playerId,
              reason: '🟥 红牌停赛1场', type: 'red_card', originalXiIndex: so.originalXiIndex })
          }
        }
        if (issues.length > 0) {
          setPostMatchPlayers(issues)
          setPostMatchReplacements(new Map())
          setMatchState(prev => prev ? { ...prev, homeScore: totalHome, awayScore: totalAway, finished: true } : prev)
          setPhase('post_match')
          return
        }
      }
      setPhase('finished')
      setMatchState(prev => prev ? { ...prev, homeScore: totalHome, awayScore: totalAway, finished: true } : prev)
      return
    }

    // 仍然平局 → 点球大战
    setMatchState(prev => prev ? { ...prev, homeScore: totalHome, awayScore: totalAway } : prev)
    setPenaltyState({
      round: 1,
      homeKicks: [],
      awayKicks: [],
      currentTaker: 'home',
      homeScore: 0,
      awayScore: 0,
      finished: false,
      winner: null,
    })
    setPhase('penalties_intro')
    const timer = setTimeout(() => setPhase('penalties_shootout'), 2500)
  }

  /** 玩家选择射门方向 */
  function takePenalty(direction: 'left' | 'center' | 'right') {
    if (!penaltyState || penaltyState.finished) return

    const isHome = penaltyState.currentTaker === 'home'
    // 门将随机扑一个方向（33%概率扑对）
    const gkDirections = ['left', 'center', 'right']
    const gkDove = gkDirections[Math.floor(Math.random() * 3)]
    const scored = direction !== gkDove

    setPenaltyChoice(direction)
    setPenaltyResult({ scored, gkDove })

    // 1.5秒后推进
    setTimeout(() => {
      setPenaltyChoice(null)
      setPenaltyResult(null)
      applyPenaltyResult(scored)
    }, 1500)
  }

  /** 应用点球结果并推进 */
  function applyPenaltyResult(scored: boolean) {
    setPenaltyState(prev => {
      if (!prev) return prev
      const next = { ...prev }
      const isHome = prev.currentTaker === 'home'

      if (scored) {
        if (isHome) next.homeScore++
        else next.awayScore++
      }
      if (isHome) {
        next.homeKicks = [...next.homeKicks, scored]
        next.currentTaker = 'away' // 轮到对方踢
      } else {
        next.awayKicks = [...next.awayKicks, scored]
        next.currentTaker = 'home'
        next.round++ // 对方踢完才进入下一轮
      }

      // 检查是否分出胜负
      const totalRounds = next.homeKicks.length // 双方都已踢的轮数
      if (totalRounds >= 5 && next.homeKicks.length === next.awayKicks.length && next.homeScore !== next.awayScore) {
        next.finished = true
        next.winner = next.homeScore > next.awayScore ? 'home' : 'away'
      }
      // 如果5轮后仍然平局，继续突然死亡（但每轮必须双方都踢）
      if (totalRounds > 5 && next.homeKicks.length === next.awayKicks.length && next.homeScore !== next.awayScore) {
        next.finished = true
        next.winner = next.homeScore > next.awayScore ? 'home' : 'away'
      }

      // 点球结束 → 记录比赛结果
      if (next.finished) {
        setTimeout(() => {
          finishPenalties(next.winner === 'home')
        }, 500)
      }

      return next
    })
  }

  /** 点球大战结束 */
  function finishPenalties(playerWon: boolean) {
    setPhase('penalties_result')
    const totalHome = (matchState?.homeScore || 0)
    const totalAway = (matchState?.awayScore || 0)

    // 淘汰赛记录结果（含纪律）
    if (matchInfo?.isKnockout && tournament) {
      const km = matchInfo.knockoutMatch
      if (km) {
        const finalHome = playerWon ? totalHome + 1 : totalHome
        const finalAway = playerWon ? totalAway : totalAway + 1
        // ★ 红黄牌累计
        let discipline = { ...tournament.playerDiscipline }
        const suspended = [...(tournament.suspendedPlayers || [])]
        const { discipline: cardDiscipline, suspended: cardSuspended } = updateDisciplineAfterMatch(
          discipline, matchState!, tournament.currentMatchIndex, true
        )
        const allSuspended = [...new Set([...cardSuspended, ...suspended])]
        const tWithDiscipline = { ...tournament, playerDiscipline: cardDiscipline, suspendedPlayers: allSuspended }
        const updatedT = engineRecordKnockoutResult(tWithDiscipline, km.id, finalHome, finalAway, playerWon)
        setTournament(updatedT)
      }
    }

    // ★ 赛后伤停检查（点球路径）
    if (matchState) {
      const issues: { playerName: string; playerId: string; reason: string; type: string; originalXiIndex: number }[] = []
      for (const inj of (matchState.injuriesThisMatch || [])) {
        issues.push({ playerName: inj.playerName, playerId: inj.playerId,
          reason: inj.type === 'major' ? '🚑 重伤报销' : '🤕 轻伤停1场',
          type: inj.type === 'major' ? 'injury_major' : 'injury_minor', originalXiIndex: inj.originalXiIndex })
      }
      for (const so of (matchState.sendOffsThisMatch || [])) {
        if (!issues.some(i => i.playerId === so.playerId)) {
          issues.push({ playerName: so.playerName, playerId: so.playerId,
            reason: '🟥 红牌停赛1场', type: 'red_card', originalXiIndex: so.originalXiIndex })
        }
      }
      if (issues.length > 0) {
        setPostMatchPlayers(issues)
        setPostMatchReplacements(new Map())
        setPhase('post_match')
      }
    }

    setMatchState(prev => prev ? { ...prev, finished: true, homeScore: totalHome, awayScore: totalAway } : prev)
  }

  /** 跳过本场 */
  function handleSkipMatch() {
    // ★ 加锁：阻止所有定时器在此期间修改 phase
    if (skippingRef.current) return
    skippingRef.current = true
    // 先清除所有待执行的定时器，防止竞态条件：advanceTimer 在 skip 期间触发
    // finishMatch 覆盖 skip 写入的 tournament 状态
    if (autoTimerRef.current) { clearTimeout(autoTimerRef.current); autoTimerRef.current = null }
    if (advanceTimerRef.current) { clearTimeout(advanceTimerRef.current); advanceTimerRef.current = null }
    setPhase('skipping')

    // 用 setTimeout 确保 UI 先渲染 skipping 状态，再执行逻辑
    setTimeout(() => {
      try {
        // 关键：从 store 读取最新状态，避免闭包中的 opponent 退化到错误的球队
        const state = useGameStore.getState()
        const t = state.tournament
        if (!t) { navigate('/'); return }

        // 直接从 tournament 数据获取当前对手，不依赖组件的 opponent 变量
        let actualOpp: NationalTeam | null = null
        let isKnockout = false

        if (t.currentRound === 'knockout') {
          isKnockout = true
          const km = getCurrentKnockoutMatch(t)
          actualOpp = km ? getKnockoutOpponent(km) : null
        } else {
          actualOpp = getCurrentGroupOpponent(t)
        }
        const opp = actualOpp || allTeams[0]

        const { homeScore, awayScore } = autoSimulateMatch(userTeam, opp)
        const result = {
          id: `match-${Date.now()}`,
          homeTeam: userTeam.name,
          awayTeam: opp.name,
          homeScore, awayScore,
          events: [],
          stats: { possession: 50, shots: 10, shotsOnTarget: 4 },
        }

        if (isKnockout) {
          const km = getCurrentKnockoutMatch(t)
          if (km) recordKnockoutResult(km.id, homeScore, awayScore, homeScore > awayScore)
          // 淘汰赛跳到签表页（而非直接出排名），让玩家决定是否继续
          navigate('/knockout-bracket')
        } else {
          // 直接计算新 tournament 并设置，确保 currentMatchIndex 正确推进
          const updatedT = recordGroupMatchResult(t, result, opp.id)
          setTournament(updatedT)
          navigate('/group-standings')
        }
      } catch (e) {
        console.error('handleSkipMatch error:', e)
        // 兜底：出错也尝试导航离开
        navigate('/group-standings')
      }
    }, 300)
  }

  /** 模拟全部剩余比赛 */
  function handleSkipAll() {
    // 防重复执行
    if (skipSimRunningRef.current) return
    skipSimRunningRef.current = true
    // ★ 加锁：阻止所有定时器在此期间修改 phase
    if (skippingRef.current) return
    skippingRef.current = true

    // 先清除所有待执行的定时器
    if (autoTimerRef.current) { clearTimeout(autoTimerRef.current); autoTimerRef.current = null }
    if (advanceTimerRef.current) { clearTimeout(advanceTimerRef.current); advanceTimerRef.current = null }
    setPhase('skipping')

    setTimeout(() => {
      try {
        const state = useGameStore.getState()
        if (!state.tournament) { navigate('/'); return }

        // 浅拷贝做基础隔离，recordGroupMatchResult 内部会创建新对象
        let t: TournamentState = { ...state.tournament }
        const team = state.userTeam

        // --- 阶段1: 模拟剩余小组赛 ---
        while (t.currentMatchIndex < 3) {
          const schedule = t.matchSchedule?.group?.[t.currentMatchIndex]
          if (!schedule?.opponent) break
          const opp = allTeams.find(tt => tt.id === schedule.opponent) || allTeams[0]
          const { homeScore, awayScore } = autoSimulateMatch(team, opp)
          t = recordGroupMatchResult(t, {
            id: `sim-${t.currentMatchIndex}`,
            homeTeam: team.name, awayTeam: opp.name,
            homeScore, awayScore,
            events: [], stats: { possession: 50, shots: 10, shotsOnTarget: 4 },
          }, opp.id)
        }

        if (t.isPlayerEliminated) {
          useGameStore.setState({ tournament: { ...t, currentRound: 'finished' } })
          navigate('/final-result')
          return
        }

        // --- 阶段2: 模拟淘汰赛 ---
        const roundOrder = ['32强', '16强', '8强', '4强', '决赛', '季军赛']
        if (!t.knockoutRounds?.length) {
          // 淘汰赛 bracket 为空：说明 generateKnockoutBracket 未被调用
          // 这不应该发生，但兜底处理
          useGameStore.setState({ tournament: { ...t, currentRound: 'finished', isPlayerEliminated: true } })
          navigate('/final-result')
          return
        }

        for (let ri = 0; ri < roundOrder.length; ri++) {
          const roundName = roundOrder[ri]
          if (t.isPlayerEliminated) break

          const roundMatches = t.knockoutRounds.filter(m => m.round === roundName)
          const matchIdx = roundMatches.findIndex(m =>
            m.homeScore === undefined &&
            (m.homeTeam === '玩家球队' || m.awayTeam === '玩家球队' ||
             m.homeTeam === team.name || m.awayTeam === team.name)
          )
          if (matchIdx === -1) continue

          const match = roundMatches[matchIdx]
          const isPlayerHome = match.homeTeam === '玩家球队' || match.homeTeam === team.name
          let oppName: string = (isPlayerHome ? match.awayTeam : match.homeTeam) || ''
          if (!oppName || oppName === '?' || oppName === team.name || oppName === '玩家球队') {
            const pool = allTeams.filter(tt => tt.name !== team.name)
            oppName = pool[Math.floor(Math.random() * pool.length)]?.name || '未知球队'
          }

          // ★ 基于球队实力计算玩家胜率（而非固定65%）
          const playerRating = team.overallRating || 70
          const oppTeamData = allTeams.find(t => t.name === oppName)
          const oppRating = oppTeamData
            ? Math.round((oppTeamData.ratings.attack + oppTeamData.ratings.defense + oppTeamData.ratings.midfield) / 3)
            : 50
          const ratingDiff2 = playerRating - oppRating
          const playerWinProb = Math.min(0.90, Math.max(0.20, 0.50 + ratingDiff2 * 0.015))
          const playerWin = Math.random() < playerWinProb
          const hs = playerWin ? 1 + Math.floor(Math.random() * 2) : Math.floor(Math.random() * 2)
          const as = playerWin ? Math.floor(Math.random() * 2) : 1 + Math.floor(Math.random() * 2)

          t = engineRecordKnockoutResult(t, match.id, hs, as, playerWin)
          t.knockoutRounds = t.knockoutRounds.map(m =>
            m.id === match.id
              ? { ...m, homeTeam: isPlayerHome ? '玩家球队' : oppName, awayTeam: isPlayerHome ? oppName : '玩家球队', homeScore: hs, awayScore: as, winner: playerWin ? '玩家球队' : oppName }
              : m
          )

          if (playerWin && ri < 4) {
            const nextRoundName = roundOrder[ri + 1]
            const nextMatchIdx = Math.floor(matchIdx / 2)
            const nextMatchId = `KO-${nextRoundName}-${nextMatchIdx}`
            t.knockoutRounds = t.knockoutRounds.map(m => {
              if (m.id === nextMatchId) {
                const isHomeSlot = matchIdx % 2 === 0
                const otherTeam = isHomeSlot ? m.awayTeam : m.homeTeam
                const other = (otherTeam && otherTeam !== '?') ? otherTeam : null
                return {
                  ...m,
                  homeTeam: isHomeSlot ? '玩家球队' : (other || '?'),
                  awayTeam: isHomeSlot ? (other || '?') : '玩家球队',
                }
              }
              return m
            })
          }
        }

        // ★ 用 setState 直接写入，确保最终态落盘
        useGameStore.setState({ tournament: { ...t, currentRound: 'finished' } })
        navigate('/final-result')
      } catch (e) {
        console.error('handleSkipAll error:', e)
        try {
          const st = useGameStore.getState()
          if (st.tournament) {
            useGameStore.setState({ tournament: { ...st.tournament, currentRound: 'finished' } })
          }
        } catch (_) {}
        navigate('/final-result')
      } finally {
        skipSimRunningRef.current = false
      }
    }, 200)
  }

  // 清理所有定时器
  useEffect(() => {
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current)
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current)
    }
  }, [])

  // ====== 渲染 ======

  const currentEvent: MatchEventV2 | undefined = matchState?.events[currentEventIndex]

  if (phase === 'pre_return') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="bg-[#0a1a0f]/90 backdrop-blur-md border border-gold/20 rounded-xl p-5 max-w-sm w-full shadow-2xl text-center">
          <h2 className="text-gold font-bold text-lg mb-2">🔄 球员复出</h2>
          <p className="text-white/40 text-xs mb-4">以下球员已从伤停中恢复，请选择安排方式</p>
          <div className="space-y-3 mb-4">
            {returnPlayers.map(rp => {
              const choice = returnChoices.get(rp.playerId)
              // 当前占据该位置的球员
              const currentPlayer = userTeam.startingXI[rp.originalXiIndex]
              return (
                <div key={rp.playerId} className="border border-white/10 rounded-lg p-3 text-left">
                  <p className="text-gold font-bold text-sm">{rp.playerName}</p>
                  <p className="text-white/30 text-[10px] mb-2">
                    原位置：{userTeam.formation?.positions[rp.originalXiIndex] || '—'}
                    {currentPlayer && ` | 现首发：${currentPlayer.name}(${currentPlayer.rating})`}
                  </p>
                  {choice ? (
                    <p className="text-green-400 text-xs">
                      ✅ {choice === 'start' ? '回到首发（当前球员移至替补）' : '先坐替补席'}
                      <button className="ml-2 text-white/30 underline text-[10px]"
                        onClick={() => {
                          const next = new Map(returnChoices); next.delete(rp.playerId); setReturnChoices(next)
                        }}>重选</button>
                    </p>
                  ) : (
                    <div className="flex gap-2">
                      <button className="flex-1 px-2 py-1.5 rounded text-xs border border-gold/40 bg-gold/10 hover:bg-gold/20 text-gold transition-all"
                        onClick={() => {
                          const next = new Map(returnChoices); next.set(rp.playerId, 'start'); setReturnChoices(next)
                        }}>
                        ⚽ 回首发
                      </button>
                      <button className="flex-1 px-2 py-1.5 rounded text-xs border border-white/15 bg-white/5 hover:bg-white/10 text-white/60 transition-all"
                        onClick={() => {
                          const next = new Map(returnChoices); next.set(rp.playerId, 'bench'); setReturnChoices(next)
                        }}>
                        🪑 先替补
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <Button size="sm" className="w-full"
            disabled={returnPlayers.some(rp => !returnChoices.has(rp.playerId))}
            onClick={() => {
              // ★ 修复：利用 setStartingPlayer 的原子交换能力
              // 每次迭代后从 store 读取最新 bench，避免闭包过期
              for (const rp of returnPlayers) {
                const choice = returnChoices.get(rp.playerId)
                if (choice === 'start') {
                  const latestTeam = useGameStore.getState().userTeam
                  const foundInBench = latestTeam.bench.find(
                    p => p.id === rp.playerId || p.name === rp.playerName
                  )
                  if (foundInBench) {
                    // setStartingPlayer 会自动：1)把 foundInBench 放入首发 2)把当前首发移到替补 3)从替补移除 foundInBench
                    useGameStore.getState().setStartingPlayer(rp.originalXiIndex, foundInBench)
                  }
                }
                // choice === 'bench': 球员已在替补席（post_match 时 setStartingPlayer 已将其移入），无需操作
              }
              // 清除已处理的停赛记录
              const t = useGameStore.getState().tournament
              if (t) {
                const processedIds = new Set(returnChoices.keys())
                const remaining = t.playerSuspensions.filter(s => !processedIds.has(s.playerId))
                useGameStore.setState({ tournament: { ...t, playerSuspensions: remaining } })
              }
              setReturnPlayers([])
              setReturnChoices(new Map())
              setPhase('intro')
            }}>
            确认并开始比赛
          </Button>
        </motion.div>
      </div>
    )
  }

  if (phase === 'intro') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
          className="text-center">
          <div className="text-6xl mb-4">⚽</div>
          <h1 className="text-2xl font-bold text-white mb-2">{matchInfo?.roundLabel}</h1>
          <div className="flex items-center justify-center gap-8 mt-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-gold flex items-center justify-center text-2xl font-bold text-gold"
                style={{ backgroundColor: userTeam.color + '30' }}>
                {userTeam.name[0]}
              </div>
              <p className="text-white font-bold">{userTeam.name}</p>
              <p className="text-white/30 text-xs">{userTeam.coach?.name}</p>
            </div>
            <span className="text-white/30 text-2xl font-bold">VS</span>
            <div className="text-center">
              <img src={opponent.flag} alt={opponent.name} className="w-16 h-10 mx-auto mb-2 object-cover rounded"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <p className="text-white font-bold">{opponent.name}</p>
              <p className="text-white/30 text-xs">FIFA 第{opponent.tier}档</p>
            </div>
          </div>
          <p className="text-white/20 text-sm mt-6 animate-pulse">比赛即将开始...</p>
        </motion.div>
      </div>
    )
  }

  if (phase === 'skipping') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}
          className="text-4xl">⚽</motion.div>
        <p className="text-white/60 ml-4">模拟比赛中...</p>
      </div>
    )
  }

  // ====== 加时赛开场 ======
  if (phase === 'extra_time_intro') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
          className="text-center">
          <div className="text-6xl mb-4">⏱️</div>
          <h1 className="text-2xl font-bold text-gold mb-2">加时赛</h1>
          <p className="text-white/60 text-sm mb-3">常规时间 {matchState?.homeScore ?? 0} - {matchState?.awayScore ?? 0}</p>
          <p className="text-white/20 text-xs mb-6">上下半场各 15 分钟，进球多者获胜</p>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-2 border-2 border-gold flex items-center justify-center text-xl font-bold text-gold"
                style={{ backgroundColor: userTeam.color + '30' }}>{userTeam.name[0]}</div>
              <p className="text-white font-bold text-sm">{userTeam.name}</p>
            </div>
            <span className="text-gold text-2xl font-bold">VS</span>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-2 border-2 border-white/20 flex items-center justify-center text-xl font-bold text-white/60">
                {opponent.name[0]}</div>
              <p className="text-white font-bold text-sm">{opponent.name}</p>
            </div>
          </div>
          <p className="text-white/20 text-sm mt-6 animate-pulse">加时赛即将开始...</p>
        </motion.div>
      </div>
    )
  }

  // ====== 点球大战开场 ======
  if (phase === 'penalties_intro') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
          className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-2xl font-bold text-gold mb-2">点球大战</h1>
          <p className="text-white/60 text-sm mb-1">
            加时赛后比分 {(matchState?.homeScore ?? 0) + extraTimeScore.home} - {(matchState?.awayScore ?? 0) + extraTimeScore.away}
          </p>
          <p className="text-white/20 text-xs mb-6">5 轮点球决胜负，平局则进入突然死亡</p>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-2 border-2 border-gold flex items-center justify-center text-xl font-bold text-gold"
                style={{ backgroundColor: userTeam.color + '30' }}>{userTeam.name[0]}</div>
              <p className="text-white font-bold text-sm">{userTeam.name}</p>
            </div>
            <span className="text-gold text-xl">⚽ VS 🧤</span>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-2 border-2 border-white/20 flex items-center justify-center text-xl font-bold text-white/60">
                {opponent.name[0]}</div>
              <p className="text-white font-bold text-sm">{opponent.name}</p>
            </div>
          </div>
          <p className="text-white/20 text-sm mt-6 animate-pulse">点球大战即将开始...</p>
        </motion.div>
      </div>
    )
  }

  // ====== 点球大战进行中 ======
  if (phase === 'penalties_shootout' && penaltyState) {
    const ps = penaltyState
    const isPlayerTurn = ps.currentTaker === 'home'
    // 找个罚球球员
    const taker = userTeam.startingXI.find(p =>
      p !== null && !ps.homeKicks.some((_, i) => {
        // 简单：随机挑一个还没罚过的
        return false
      })
    ) || userTeam.startingXI.filter(Boolean)[ps.homeKicks.length % userTeam.startingXI.filter(Boolean).length]
    const takerName = taker?.name || '球员'

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center w-full max-w-sm">
          {/* 比分 */}
          <div className="mb-4">
            <p className="text-white/30 text-xs mb-1">点球大战 · 第 {ps.round > 5 ? `${ps.round}(突然死亡)` : `${ps.round}/5 轮`}</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-white font-bold">{userTeam.name}</span>
              <span className="text-3xl font-bold text-gold">{ps.homeScore}</span>
              <span className="text-white/20">-</span>
              <span className="text-3xl font-bold text-white/80">{ps.awayScore}</span>
              <span className="text-white font-bold">{opponent.name}</span>
            </div>
          </div>

          {/* 罚球历史 */}
          <div className="mb-4 flex justify-center gap-6 text-xs">
            <div className="text-left">
              <p className="text-white/30 mb-1">{userTeam.name}</p>
              {ps.homeKicks.map((k, i) => (
                <span key={i} className="mr-1">{k ? '✅' : '❌'}</span>
              ))}
              {ps.currentTaker === 'home' && <span className="text-gold animate-pulse">⬤</span>}
            </div>
            <div className="text-left">
              <p className="text-white/30 mb-1">{opponent.name}</p>
              {ps.awayKicks.map((k, i) => (
                <span key={i} className="mr-1">{k ? '✅' : '❌'}</span>
              ))}
              {ps.currentTaker === 'away' && <span className="text-red-400 animate-pulse">⬤</span>}
            </div>
          </div>

          {/* 当前罚球 */}
          {isPlayerTurn ? (
            penaltyResult ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                className="bg-[#0a1a0f]/90 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-4xl mb-2">{penaltyResult.scored ? '⚽🔥' : '🧤❌'}</p>
                <p className="text-white font-bold">
                  {penaltyResult.scored ? `${takerName} 罚进！` : `${takerName} 被扑出！`}
                </p>
                <p className="text-white/30 text-xs mt-1">
                  射{penaltyChoice === 'left' ? '左' : penaltyChoice === 'center' ? '中' : '右'}路
                  · 门将扑{penaltyResult.gkDove === 'left' ? '左' : penaltyResult.gkDove === 'center' ? '中' : '右'}路
                </p>
              </motion.div>
            ) : (
              <div>
                <p className="text-white/60 text-sm mb-1">👟 {takerName} 主罚</p>
                <p className="text-white/20 text-xs mb-3">选择射门方向</p>
                <div className="flex gap-2 justify-center">
                  {(['left', 'center', 'right'] as const).map(dir => (
                    <button key={dir}
                      onClick={() => takePenalty(dir)}
                      className="w-20 h-16 rounded-xl border border-gold/40 bg-gold/10 hover:bg-gold/20 active:scale-95 transition-all text-gold font-bold text-sm">
                      {dir === 'left' ? '👈 左' : dir === 'center' ? '👇 中' : '👉 右'}
                    </button>
                  ))}
                </div>
              </div>
            )
          ) : (
            <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}
              className="bg-[#0a1a0f]/70 rounded-xl p-4">
              <p className="text-white/40 text-sm">{opponent.name} 球员正在准备罚球...</p>
              {penaltyResult ? (
                <div className="mt-2">
                  <p className="text-3xl">{penaltyResult.scored ? '💔' : '🙌'}</p>
                  <p className="text-white/60 text-sm">{penaltyResult.scored ? '对方罚进' : '扑出来了！'}</p>
                  <p className="text-white/20 text-[10px]">
                    门将扑{penaltyResult.gkDove === 'left' ? '左' : penaltyResult.gkDove === 'center' ? '中' : '右'}路
                    · 对方射{penaltyChoice === 'left' ? '左' : penaltyChoice === 'center' ? '中' : '右'}路
                  </p>
                </div>
              ) : null}
            </motion.div>
          )}
        </div>
      </div>
    )
  }

  // ====== 点球大战结束 ======
  if (phase === 'penalties_result' && penaltyState) {
    const playerWon = penaltyState.winner === 'home'
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
          className="bg-[#0a1a0f]/90 border border-gold/20 rounded-xl p-6 max-w-sm w-full text-center shadow-2xl">
          <div className="text-6xl mb-3">{playerWon ? '🎉' : '😞'}</div>
          <h1 className="text-xl font-bold text-white mb-2">
            {playerWon ? '点球大战获胜！' : '点球大战失利'}
          </h1>
          <p className="text-white/40 text-sm mb-3">
            常规时间 {matchState?.homeScore ?? 0} - {matchState?.awayScore ?? 0} | 加时 {extraTimeScore.home} - {extraTimeScore.away}
          </p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div>
              <p className="text-white/30 text-xs">{userTeam.name}</p>
              <p className="text-3xl font-bold text-gold">{penaltyState.homeScore}</p>
              <div className="flex gap-0.5 justify-center mt-1">
                {penaltyState.homeKicks.map((k, i) => <span key={i} className="text-xs">{k ? '✅' : '❌'}</span>)}
              </div>
            </div>
            <span className="text-white/20 text-2xl">-</span>
            <div>
              <p className="text-white/30 text-xs">{opponent.name}</p>
              <p className="text-3xl font-bold text-white/60">{penaltyState.awayScore}</p>
              <div className="flex gap-0.5 justify-center mt-1">
                {penaltyState.awayKicks.map((k, i) => <span key={i} className="text-xs">{k ? '✅' : '❌'}</span>)}
              </div>
            </div>
          </div>
          <Button className="w-full" onClick={() => {
            if (playerWon) navigate('/knockout-bracket')
            else navigate('/final-result')
          }}>
            {playerWon ? '⚽ 继续征程' : '查看最终成绩'} <ArrowRight className="inline ml-1" size={16} />
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-4 flex flex-col">
      {/* 比分板 */}
      <div className="text-center mb-3">
        <p className="text-white/40 text-xs mb-1">
          {matchInfo?.roundLabel}
          {(phase.startsWith('extra_time') || phase.startsWith('penalties')) && (
            <span className="text-gold ml-1">
              {phase.startsWith('penalties') ? '· 点球大战' : '· 加时赛'}
            </span>
          )}
        </p>
        <div className="flex items-center justify-center gap-4">
          <span className="text-white font-bold text-sm w-20 truncate">{userTeam.name}</span>
          <span className="text-3xl font-bold text-gold tabular-nums">
            {(matchState?.homeScore ?? 0) + (phase.startsWith('extra_time') || phase.startsWith('penalties') ? extraTimeScore.home : 0)}
          </span>
          <span className="text-white/20 text-xl">-</span>
          <span className="text-3xl font-bold text-white/80 tabular-nums">
            {(matchState?.awayScore ?? 0) + (phase.startsWith('extra_time') || phase.startsWith('penalties') ? extraTimeScore.away : 0)}
          </span>
          <span className="text-white/60 font-bold text-sm w-20 truncate">{opponent.name}</span>
        </div>
        {/* 加时赛评分提示 */}
        {(phase.startsWith('extra_time') || phase.startsWith('penalties')) && (extraTimeScore.home > 0 || extraTimeScore.away > 0) && (
          <div className="text-[10px] text-gold/60 mt-1">
            加时 {extraTimeScore.home} - {extraTimeScore.away}
          </div>
        )}
        {/* 进球者 */}
        {matchState && matchState.goalScorers.length > 0 && (
          <div className="flex justify-center gap-3 mt-1 text-[10px] text-white/30">
            {matchState.goalScorers.map((g, i) => (
              <span key={i}>{g.playerName} {g.minute}'</span>
            ))}
          </div>
        )}
      </div>

      {/* 主视觉区：大尺寸阵型图 + 事件半透明覆盖层 */}
      <div className="flex-1 relative min-h-0">
        {/* 阵型图背景 — 始终可见 */}
        {!phase.startsWith('penalties') && phase !== 'var_check' && phase !== 'var_result' && phase !== 'red_card_tactical' && phase !== 'penalties_result' && userTeam.formation && (
          <MiniFormationBoard
            formation={userTeam.formation}
            startingXI={userTeam.startingXI}
            matchState={matchState}
            bench={userTeam.bench}
          />
        )}

        {/* 事件半透明覆盖层 — 浮在阵型图上方 */}
        <AnimatePresence mode="wait">
          {phase === 'event_active' && currentEvent && (
            <motion.div key={currentEvent.id}
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-10 px-4">
              <div className="bg-[#0a1a0f]/85 backdrop-blur-sm border border-white/10 rounded-xl p-4 max-w-sm w-full text-center shadow-2xl">
                <p className="text-white/30 text-xs mb-1">{currentEvent.minute}'</p>
                <p className="text-3xl mb-2">{getEventIcon(currentEvent.type)}</p>
                <h2 className="text-lg font-bold text-white mb-1">{currentEvent.title}</h2>
                <p className="text-white/60 text-sm">{currentEvent.description}</p>

                {/* 选项按钮 (仅交互事件) */}
                {currentEvent.interactive && currentEvent.options && (
                  <div className="mt-4 space-y-2">
                    {currentEvent.options.map(opt => (
                      <button key={opt.id}
                        onClick={() => handleInteractiveChoice(currentEvent, opt)}
                        className="w-full text-left px-3 py-2 rounded-lg border border-white/15 bg-white/10 hover:bg-gold/20 hover:border-gold/40 transition-all text-white text-sm">
                        <span className="font-bold">{opt.text}</span>
                        <span className="block text-white/40 text-xs">{opt.description}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* 自动事件倒计时提示 */}
                {!currentEvent.interactive && (
                  <p className="text-white/15 text-xs mt-3 animate-pulse">⏳ 比赛中...</p>
                )}
              </div>
            </motion.div>
          )}

          {phase === 'event_result' && currentEvent && (
            <motion.div key={`res-${currentEvent.id}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-[#0a1a0f]/70 backdrop-blur-sm rounded-xl px-6 py-4 text-center">
                <p className="text-white/30 text-xs mb-1">{currentEvent.minute}'</p>
                <p className="text-3xl mb-1">{getEventResultIcon(currentEvent)}</p>
                {currentEvent.type === 'goal' && currentEvent.playerName ? (
                  <div>
                    <p className="text-gold text-sm font-bold">{currentEvent.playerName}</p>
                    <p className="text-white/50 text-xs mt-0.5 max-w-[280px] leading-snug">
                      {currentEvent.description}
                    </p>
                  </div>
                ) : currentEvent.type === 'own_goal' ? (
                  <p className="text-white/60 text-xs">{currentEvent.description}</p>
                ) : (
                  <p className="text-white/40 text-sm">...</p>
                )}
              </div>
            </motion.div>
          )}

          {/* ★ 红牌战术选择：死守 vs 殊死一搏 */}
          {phase === 'red_card_tactical' && currentEvent && (
            <motion.div key="rc-tactical"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center z-10 px-4">
              <div className="bg-[#1a0000]/90 backdrop-blur-md border-2 border-red-500/40 rounded-xl p-5 max-w-sm w-full text-center shadow-2xl">
                <p className="text-red-400 font-bold text-lg mb-1">⚔️ 10人应战 · 战术抉择</p>
                <p className="text-white/50 text-xs mb-4">
                  少打一人的情况下，必须明确战术方向
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      if (!matchState) return
                      let next = { ...matchState }
                      // 全力死守：降总进球20% + 大幅降己方进球方向概率
                      next = applyProbMod(next, -0.12)
                      next.occRateModifier = 0.8
                      setMatchState(next)
                      setPhase('event_result')
                      advanceTimerRef.current = setTimeout(() => advanceToNextEvent(currentEventIndex + 1, next), 1500)
                    }}
                    className="w-full px-3 py-3 rounded-xl border-2 border-blue-400/40 bg-blue-900/30 hover:bg-blue-900/50 hover:border-blue-300 transition-all text-left">
                    <p className="text-blue-300 font-bold text-sm">🛡️ 全力死守，保住比分</p>
                    <p className="text-white/30 text-[10px] mt-0.5">全员回收禁区，比赛节奏骤降，全场进球率 -20% + 方向概率 -12%。稳妥但沉闷。</p>
                  </button>
                  <button
                    onClick={() => {
                      if (!matchState) return
                      let next = { ...matchState }
                      // 殊死一搏：比赛更开放，总进球+20%，方向概率 -10%~+10%
                      next.occRateModifier = 1.20
                      const roll = Math.random()
                      if (roll < 0.30) {
                        next = applyProbMod(next, +0.10) // 奇迹翻盘
                      } else if (roll < 0.70) {
                        // 40%概率：不赚不亏
                      } else {
                        next = applyProbMod(next, -0.10) // 被反击打穿
                      }
                      setMatchState(next)
                      setPhase('event_result')
                      advanceTimerRef.current = setTimeout(() => advanceToNextEvent(currentEventIndex + 1, next), 1500)
                    }}
                    className="w-full px-3 py-3 rounded-xl border-2 border-orange-400/40 bg-orange-900/30 hover:bg-orange-900/50 hover:border-orange-300 transition-all text-left">
                    <p className="text-orange-300 font-bold text-sm">🔥 殊死一搏，进攻到底</p>
                    <p className="text-white/30 text-[10px] mt-0.5">少一人也要进攻！比赛大开大合（全场进球率 +20%），30%概率翻盘(+10%) / 40%平局 / 30%被打穿(-10%)。</p>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

      {/* ★ VAR 越位检查中 */}
          {phase === 'var_check' && varCheckState && (
            <motion.div key="var-check"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center z-10 px-4">
              <div className="bg-[#0a0a1a]/90 backdrop-blur-md border border-blue-400/30 rounded-xl p-5 max-w-sm w-full text-center shadow-2xl">
                <p className="text-blue-400/60 text-xs mb-1">{varCheckState.goalEvent.minute}'</p>
                <motion.p animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-5xl mb-3">📺</motion.p>
                <h2 className="text-lg font-bold text-white mb-2">VAR 正在检查进球…</h2>
                <p className="text-white/50 text-sm">{varCheckState.goalEvent.description}</p>
                <div className="mt-4 flex justify-center gap-1">
                  {['⋯', '⋯', '⋯'].map((dot, i) => (
                    <motion.span key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                      className="text-blue-400 text-2xl">{dot}</motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ★ VAR 结果揭晓 */}
          {phase === 'var_result' && varCheckState && (
            <motion.div key="var-result"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center z-10 px-4">
              <div className={`backdrop-blur-md border rounded-xl p-5 max-w-sm w-full text-center shadow-2xl ${
                varCheckState.isOffside
                  ? 'bg-[#1a0000]/90 border-red-400/30'
                  : 'bg-[#001a00]/90 border-green-400/30'
              }`}>
                <p className="text-white/30 text-xs mb-1">{varCheckState.goalEvent.minute}'</p>
                <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
                  className="text-5xl mb-2">{varCheckState.isOffside ? '🙅' : '✅'}</motion.p>
                <h2 className={`text-lg font-bold mb-1 ${varCheckState.isOffside ? 'text-red-400' : 'text-green-400'}`}>
                  {varCheckState.isOffside ? '越位！进球无效！' : '进球有效！'}
                </h2>
                <p className="text-white/50 text-sm">
                  {varCheckState.isOffside
                    ? `${varCheckState.goalEvent.playerName || '球员'} 进球时处于越位位置`
                    : `VAR 确认无越位，${varCheckState.goalEvent.playerName || '球员'} 进球成立！`}
                </p>
                {!varCheckState.isOffside && (
                  <motion.p initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ delay: 0.5 }}
                    className="text-gold text-2xl font-bold mt-3">⚽ 进球！</motion.p>
                )}
              </div>
            </motion.div>
          )}

          {/* ★ 加时赛事件覆盖层 */}
          {phase === 'extra_time_active' && extraTimeEvents[extraTimeEventIdx] && (() => {
            const etEvt = extraTimeEvents[extraTimeEventIdx]
            return (
              <motion.div key={`et-${etEvt.id}`}
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-10 px-4">
                <div className="bg-[#1a0f00]/85 backdrop-blur-sm border border-orange-500/20 rounded-xl p-4 max-w-sm w-full text-center shadow-2xl">
                  <p className="text-orange-400/60 text-xs mb-1">⏱️ 加时赛 {etEvt.minute}'</p>
                  <p className="text-3xl mb-2">{getEventIcon(etEvt.type)}</p>
                  <h2 className="text-lg font-bold text-white mb-1">{etEvt.title}</h2>
                  <p className="text-white/60 text-sm">{etEvt.description}</p>
                  <p className="text-white/15 text-xs mt-3 animate-pulse">⏳ 加时赛中...</p>
                </div>
              </motion.div>
            )
          })()}

          {phase === 'extra_time_result' && extraTimeEvents[extraTimeEventIdx] && (() => {
            const etEvt = extraTimeEvents[extraTimeEventIdx]
            return (
              <motion.div key={`et-res-${etEvt.id}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-[#1a0f00]/70 backdrop-blur-sm rounded-xl px-6 py-4 text-center">
                  <p className="text-orange-400/60 text-xs mb-1">⏱️ 加时赛 {etEvt.minute}'</p>
                  <p className="text-3xl mb-1">{getEventResultIcon(etEvt)}</p>
                  <p className="text-white/40 text-sm">...</p>
                </div>
              </motion.div>
            )
          })()}

          {phase === 'substitution' && (() => {
            // ★ 防御：对方事件绝不可弹出换人界面
            if (currentEvent?.side !== 'home') return null
            // ★ 红牌事件强制两步选择（红牌球员已离场，换其他首发）
            const isRedCardEvent = currentEvent?.type === 'card_red' || currentEvent?.type === 'card_second_yellow' ||
              (currentEvent?.type === 'card_yellow' && ((matchState?.cards || []).filter(c => c.playerId === currentEvent?.playerId && c.type === 'yellow').length >= 1))
            const evtHasPlayer = !!(currentEvent?.playerName) && !isRedCardEvent
            const needsSelectOut = !evtHasPlayer && !selectedSubOut
            // 计算当前场上球员（排除已被换下的）
            const subbedOutNames = new Set((matchState?.substitutions || []).map(s => s.playerOutName))
            const currentOnField = userTeam.startingXI.filter(
              (p): p is Player => p !== null && !subbedOutNames.has(p.name)
            )
            return (
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center z-10 px-4">
              <div className="bg-[#0a1a0f]/90 backdrop-blur-md border border-white/10 rounded-xl p-4 max-w-sm w-full shadow-2xl max-h-[80vh] flex flex-col">
                {needsSelectOut ? (
                  <>
                    {/* 步骤1：选择换下谁 */}
                    {isRedCardEvent && (
                      <div className="text-center mb-2 px-2 py-1.5 rounded-lg border border-red-500/30 bg-red-900/20">
                        <p className="text-red-400 font-bold text-xs">🟥 {currentEvent?.playerName || '球员'} 已被红牌罚下离场</p>
                        <p className="text-white/40 text-[10px]">可选择换下另一名首发球员进行战术调整（10人应战）</p>
                      </div>
                    )}
                    <h3 className="text-gold font-bold mb-1 text-center text-sm">👆 选择要换下的球员</h3>
                    <p className="text-center text-white/40 text-xs mb-2">先选场上球员，再选替补换上</p>
                    <div className="grid grid-cols-2 gap-1.5 overflow-y-auto flex-1 min-h-0">
                      {currentOnField.sort((a, b) => b.rating - a.rating).map(p => (
                        <button key={p.id}
                          onClick={() => setSelectedSubOut(p)}
                          className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-red-400/10 hover:border-red-400/30 transition-all text-center">
                          <p className="text-gold font-bold text-sm">{p.rating}</p>
                          <p className="text-white/60 text-[11px] truncate">{p.name}</p>
                          <p className={`text-[10px] text-white/20`}>{p.positions.join('/')}</p>
                        </button>
                      ))}
                    </div>
                    <Button variant="secondary" size="sm" className="w-full mt-2 shrink-0" onClick={() => {
                      try {
                        if (!matchState || !currentEvent?.options) return
                        const nonSub = currentEvent.options.find(o => !o.requiresSubstitution)
                        if (!nonSub) return
                        let next = { ...matchState }
                        next = applyEventEffect(next, nonSub, currentEvent.playerId)
                        setMatchState(next)
                        setPhase('event_result')
                        setSelectedSubOut(null)
                        pendingSubEventRef.current = null
                        advanceTimerRef.current = setTimeout(() => advanceToNextEvent(currentEventIndex + 1, next), 1500)
                      } catch (e) {
                        console.error('cancelSub error:', e)
                        if (matchState) advanceToNextEvent(currentEventIndex + 1, matchState)
                      }
                    }}>不换人</Button>
                  </>
                ) : (
                  <>
                    {/* 步骤2：选择替补换上 */}
                    <h3 className="text-gold font-bold mb-1 text-center text-sm">选择替补球员换上</h3>
                    <p className="text-center text-white/50 text-xs mb-2">
                      换下：<span className="text-red-400 font-bold">{currentEvent?.playerName || selectedSubOut?.name}</span>
                      {(currentEvent?.playerPosition || selectedSubOut?.positions[0]) && (
                        <span className="text-white/30">（{currentEvent?.playerPosition || selectedSubOut?.positions[0]}）</span>
                      )}
                      {needsSelectOut === false && selectedSubOut && (
                        <button className="ml-1 text-white/30 hover:text-white/60 underline text-[10px]"
                          onClick={() => setSelectedSubOut(null)}>重选</button>
                      )}
                    </p>
                    <div className="grid grid-cols-3 gap-1.5 overflow-y-auto flex-1 min-h-0">
                      {userTeam.bench.map(p => {
                        // 判断每个替补球员的状态
                        const subbedIn = (matchState?.substitutions || []).some(s => s.playerInName === p.name)
                        const subbedOutNames = new Set((matchState?.substitutions || []).map(s => s.playerOutName))
                        const isSubbedOut = subbedOutNames.has(p.name)
                        const injuredIds = new Set((matchState?.injuriesThisMatch || []).map(i => i.playerId))
                        const isInjured = injuredIds.has(p.id)
                        const sentOffIds = new Set((matchState?.sendOffsThisMatch || []).map(s => s.playerId))
                        const isSentOff = sentOffIds.has(p.id)
                        const isBlocked = subbedIn || isSubbedOut || isInjured || isSentOff
                        const isAvailable = !isBlocked

                        const posMatch = isAvailable && (selectedSubOut?.positions[0] || currentEvent?.playerPosition) &&
                          p.positions.includes((selectedSubOut?.positions[0] || currentEvent?.playerPosition || '') as any)

                        // 状态标签
                        let blockLabel = ''
                        let blockStyle = ''
                        if (subbedIn) { blockLabel = '✅ 已换上'; blockStyle = 'border-green-600/50 bg-green-900/20 opacity-70' }
                        else if (isSubbedOut) { blockLabel = '🔄 已换下'; blockStyle = 'border-gray-500/40 bg-gray-800/30 opacity-60' }
                        else if (isInjured) { blockLabel = '🚑 受伤'; blockStyle = 'border-red-500/40 bg-red-900/25 opacity-70' }
                        else if (isSentOff) { blockLabel = '🟥 罚下'; blockStyle = 'border-red-500/40 bg-red-900/25 opacity-70' }

                        return (
                        <button key={p.id}
                          onClick={() => isAvailable && handleSubstitutionConfirm(p)}
                          disabled={isBlocked}
                          className={`p-2 rounded-lg border-2 transition-all text-center ${
                            isBlocked
                              ? blockStyle + ' cursor-not-allowed'
                              : posMatch
                                ? 'border-green-400 bg-green-400/15 shadow-[0_0_10px_rgba(74,222,128,0.25)] hover:bg-green-400/30 hover:border-green-300 hover:shadow-[0_0_16px_rgba(74,222,128,0.4)] scale-105'
                                : 'border-white/10 bg-white/5 hover:bg-gold/10 hover:border-gold/30'
                          }`}>
                          <p className={`font-bold text-sm ${isBlocked ? 'text-white/30' : 'text-gold'}`}>{p.rating}</p>
                          <p className={`text-[11px] truncate ${isBlocked ? 'text-white/25 line-through' : 'text-white/60'}`}>{p.name}</p>
                          {posMatch && (
                            <p className="text-green-300 text-[9px] font-bold mt-0.5">✅ 位置匹配</p>
                          )}
                          {isBlocked && (
                            <p className="text-[9px] font-bold mt-0.5 text-red-400">{blockLabel}</p>
                          )}
                          <p className={`text-[10px] ${posMatch ? 'text-green-300' : isBlocked ? 'text-white/15' : 'text-white/20'}`}>
                            {p.positions.join('/')}
                          </p>
                        </button>
                      )})}
                    </div>
                    <Button variant="secondary" size="sm" className="w-full mt-2 shrink-0" onClick={() => {
                      try {
                        if (!matchState || !currentEvent?.options) return
                        const nonSub = currentEvent.options.find(o => !o.requiresSubstitution)
                        if (!nonSub) return
                        let next = { ...matchState }
                        next = applyEventEffect(next, nonSub, currentEvent.playerId)
                        setMatchState(next)
                        setPhase('event_result')
                        setSelectedSubOut(null)
                        pendingSubEventRef.current = null
                        advanceTimerRef.current = setTimeout(() => advanceToNextEvent(currentEventIndex + 1, next), 1500)
                      } catch (e) {
                        console.error('cancelSub error:', e)
                        if (matchState) advanceToNextEvent(currentEventIndex + 1, matchState)
                      }
                    }}>不换人</Button>
                  </>
                )}
              </div>
            </motion.div>
          )})()}

          {phase === 'finished' && matchState && (
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center z-10 px-4">
              <div className="bg-[#0a1a0f]/85 backdrop-blur-sm border border-gold/20 rounded-xl p-5 max-w-sm w-full text-center shadow-2xl">
                <p className="text-5xl mb-3">{(extraTimeScore.home > 0 || extraTimeScore.away > 0) ? '⏱️' : '⚽'}</p>
                <h1 className="text-xl font-bold text-white mb-2">
                  {(extraTimeScore.home > 0 || extraTimeScore.away > 0) ? '加时赛结束' : '比赛结束'}
                </h1>
                <div className="flex items-center justify-center gap-4 mb-1">
                  <span className="text-3xl font-bold text-gold">{matchState.homeScore}</span>
                  <span className="text-white/20 text-xl">-</span>
                  <span className="text-3xl font-bold text-white/60">{matchState.awayScore}</span>
                </div>
                {(extraTimeScore.home > 0 || extraTimeScore.away > 0) && (
                  <p className="text-orange-400/50 text-xs mb-2">加时赛 {extraTimeScore.home} - {extraTimeScore.away}</p>
                )}
                <p className="text-white/50 text-xs mb-3">{userTeam.name} {matchState.homeScore} - {matchState.awayScore} {(lockedOpponentRef.current || opponent).name}</p>

                {/* 事件摘要 */}
                <div className="text-left mb-4 max-h-[25vh] overflow-y-auto border-t border-white/5 pt-2">
                  {matchState.events.map((e, i) => (
                    <div key={i} className="text-xs py-0.5 border-b border-white/5 flex gap-2">
                      <span className="text-white/20 w-8 text-right shrink-0">{e.minute}'</span>
                      <span>{getEventIcon(e.type)}</span>
                      <span className="text-white/60 truncate">{e.title}</span>
                    </div>
                  ))}
                  {matchState.substitutions.map((s, i) => (
                    <div key={`sub-${i}`} className="text-xs py-0.5 border-b border-white/5 flex gap-2">
                      <span className="text-white/20 w-8 text-right shrink-0">{s.minute}'</span>
                      <span>🔄</span>
                      <span className="text-white/40 truncate">{s.playerOutName} → {s.playerInName}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {matchInfo?.isKnockout ? (
                    <>
                      {/* 赢了且还有下一轮 → 去签表页继续 */}
                      {tournament && matchState.homeScore > matchState.awayScore && !tournament.isPlayerEliminated && tournament.currentRound !== 'finished' && (
                        <Button className="w-full" onClick={() => navigate('/knockout-bracket')}>
                          ⚽ 继续{tournament?.currentKnockoutRound}比赛 <ArrowRight className="inline ml-1" size={16} />
                        </Button>
                      )}
                      <Button className="w-full" variant={matchState.homeScore > matchState.awayScore && tournament && !tournament.isPlayerEliminated ? 'secondary' : 'ghost'} onClick={() => navigate('/knockout-bracket')}>
                        查看淘汰赛签表 <ArrowRight className="inline ml-1" size={16} />
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full" onClick={() => navigate('/group-standings')}>
                      查看积分榜 <ArrowRight className="inline ml-1" size={16} />
                    </Button>
                  )}
                  <Button variant="secondary" className="w-full" onClick={() => navigate('/final-result')}>
                    直接看最终结果
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ★ 赛后阵容调整：伤停球员需要替换 */}
          {phase === 'post_match' && postMatchPlayers.length > 0 && (
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center z-10 px-4">
              <div className="bg-[#0a1a0f]/95 backdrop-blur-md border border-red-400/20 rounded-xl p-4 max-w-sm w-full shadow-2xl max-h-[85vh] flex flex-col">
                <h3 className="text-gold font-bold mb-1 text-center text-sm">⚠️ 阵容调整</h3>
                <p className="text-center text-white/40 text-xs mb-3">
                  以下球员因伤停无法出战下一场，请选择替换球员
                </p>
                <div className="overflow-y-auto flex-1 min-h-0 space-y-3">
                  {postMatchPlayers.map((issue, idx) => {
                    const currentPick = postMatchReplacements.get(issue.playerId)
                    return (
                    <div key={idx} className="border border-white/10 rounded-lg p-2">
                      <p className="text-white/70 text-xs mb-1">
                        <span className="text-red-400 font-bold">{issue.playerName}</span>
                        <span className="text-white/30 ml-1">{issue.reason}</span>
                      </p>
                      {currentPick ? (
                        <div className="flex items-center gap-2">
                          <span className="text-gold text-xs">✅ {currentPick.name} ({currentPick.rating})</span>
                          <button className="text-white/30 text-[10px] underline hover:text-white/60"
                            onClick={() => {
                              const next = new Map(postMatchReplacements)
                              next.delete(issue.playerId)
                              setPostMatchReplacements(next)
                            }}>重选</button>
                        </div>
                      ) : (
                        <div>
                          {/* ★ 获取受伤/停赛球员的原位置 */}
                          {(() => {
                            const injuredPos = issue.originalXiIndex >= 0 && userTeam.formation
                              ? userTeam.formation.positions[issue.originalXiIndex]
                              : null
                            // Store in a variable we'll use below via closure
                            // Actually, let's compute it all here and render
                            const allInjuredIds = new Set(postMatchPlayers.map(i => i.playerId))
                            const usedIds = [...postMatchReplacements.values()].filter(Boolean).map(p => p!.id)
                            // 可用的替补（排除受伤/停赛 + 已被选）
                            const available = userTeam.bench
                              .filter(b => !allInjuredIds.has(b.id) && !usedIds.includes(b.id))
                              .sort((a, b) => {
                                const aM = injuredPos && a.positions.includes(injuredPos) ? 1 : 0
                                const bM = injuredPos && b.positions.includes(injuredPos) ? 1 : 0
                                if (aM !== bM) return bM - aM
                                return b.rating - a.rating
                              })
                              .slice(0, 12)
                            // ★ 受伤/停赛球员（红标不可选，仅展示）
                            const blocked = userTeam.bench
                              .filter(b => allInjuredIds.has(b.id))
                            return (
                              <>
                                {injuredPos && (
                                  <p className="text-white/30 text-[10px] mb-1">
                                    原位置：<span className="text-gold">{injuredPos}</span>，优先选同位置
                                  </p>
                                )}
                                <div className="grid grid-cols-4 gap-1">
                                  {available.map(p => {
                                    const posMatch = injuredPos && p.positions.includes(injuredPos)
                                    return (
                                      <button key={p.id}
                                        onClick={() => {
                                          const next = new Map(postMatchReplacements)
                                          next.set(issue.playerId, p)
                                          setPostMatchReplacements(next)
                                        }}
                                        className={`p-1.5 rounded border-2 transition-all text-center ${
                                          posMatch
                                            ? 'border-green-400 bg-green-400/15 shadow-[0_0_8px_rgba(74,222,128,0.2)] hover:bg-green-400/30 hover:border-green-300 scale-105'
                                            : 'border-white/10 bg-white/5 hover:bg-gold/10 hover:border-gold/30'
                                        }`}>
                                        <p className={`font-bold text-[11px] ${posMatch ? 'text-green-300' : 'text-gold'}`}>{p.rating}</p>
                                        <p className={`text-[9px] truncate ${posMatch ? 'text-green-200' : 'text-white/50'}`}>{p.name}</p>
                                        <p className={`text-[8px] ${posMatch ? 'text-green-400' : 'text-white/20'}`}>
                                          {p.positions.join('/')}
                                        </p>
                                        {posMatch && (
                                          <p className="text-green-300 text-[7px] font-bold">✅ 匹配</p>
                                        )}
                                      </button>
                                    )
                                  })}
                                  {/* ★ 受伤/停赛球员：红色标记，不可选中 */}
                                  {blocked.map(p => {
                                    const isSelf = p.id === issue.playerId
                                    return (
                                      <div key={p.id}
                                        className="p-1.5 rounded border-2 border-red-500/50 bg-red-900/25 opacity-60 cursor-not-allowed text-center">
                                        <p className="text-white/20 font-bold text-[11px]">{p.rating}</p>
                                        <p className="text-red-400/80 text-[9px] truncate line-through">{p.name}</p>
                                        <p className="text-white/10 text-[8px]">{p.positions.join('/')}</p>
                                        <p className="text-red-400 text-[7px] font-bold">
                                          {isSelf ? '🚑 本人' : '🚑 伤停'}
                                        </p>
                                      </div>
                                    )
                                  })}
                                </div>
                              </>
                            )
                          })()}
                        </div>
                      )}
                    </div>
                  )})}
                </div>
                <Button size="sm" className="w-full mt-3 shrink-0"
                  disabled={postMatchPlayers.some(issue => !postMatchReplacements.has(issue.playerId))}
                  onClick={() => {
                    // ★ 修复：使用最新 store 状态，setStartingPlayer 已支持原子交换
                    const st = useGameStore.getState()
                    if (!st.tournament) return
                    const t = { ...st.tournament }
                    const suspensions = [...(t.playerSuspensions || [])]
                    const currentMatchIdx = t.currentMatchIndex
                    const latestTeam = st.userTeam  // 读取最新状态（非闭包）
                    for (const issue of postMatchPlayers) {
                      const replacement = postMatchReplacements.get(issue.playerId)
                      // 记录首发位置索引（在替换前获取）
                      const xiIdx = issue.originalXiIndex >= 0 ? issue.originalXiIndex : latestTeam.startingXI.findIndex(p => p?.id === issue.playerId)
                      suspensions.push({
                        playerId: issue.playerId,
                        playerName: issue.playerName,
                        reason: issue.type as any,
                        suspendedUntilMatch: issue.type === 'injury_major'
                          ? 999  // 大伤：永远不会复出
                          : currentMatchIdx + 1,  // 停1场（赛前检查时 index 已推进，所以+1就是下一场）
                        originalXiIndex: xiIdx >= 0 ? xiIdx : -1,
                      })
                      // ★ setStartingPlayer 自动完成：替补→首发 + 旧首发→替补 + 替补移除重复
                      if (replacement && xiIdx >= 0) {
                        useGameStore.getState().setStartingPlayer(xiIdx, replacement)
                      }
                    }
                    useGameStore.setState({ tournament: { ...t, playerSuspensions: suspensions } })
                    // ★ 重伤球员永久移除：从替补席删除，确保下一场比赛中不再出现
                    const majorInjuredIds = new Set(
                      postMatchPlayers
                        .filter(issue => issue.type === 'injury_major')
                        .map(issue => issue.playerId)
                    )
                    if (majorInjuredIds.size > 0) {
                      const latestSt = useGameStore.getState()
                      useGameStore.setState({
                        userTeam: {
                          ...latestSt.userTeam,
                          bench: latestSt.userTeam.bench.filter(p => !majorInjuredIds.has(p.id))
                        }
                      })
                    }
                    setPhase('finished')
                  }}>
                  确认替换并继续
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 事件时间线切换 */}
      {phase !== 'finished' && (
        <div className="mt-3">
          <button onClick={() => setShowTimeline(!showTimeline)}
            className="text-white/20 text-xs hover:text-white/40">
            {showTimeline ? '隐藏' : '显示'}事件时间线
          </button>
          {showTimeline && matchState && (
            <div className="mt-2 max-h-[20vh] overflow-y-auto border-t border-white/5 pt-2">
              {matchState.events.slice(0, currentEventIndex + 1).map((e, i) => (
                <div key={i} className={`text-xs py-1 flex gap-2 ${i === currentEventIndex ? 'text-gold' : 'text-white/30'}`}>
                  <span className="w-8 text-right">{e.minute}'</span>
                  <span>{getEventIcon(e.type)}</span>
                  <span className="truncate">{e.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 底部跳过按钮 */}
      {phase !== 'finished' && (
        <div className="mt-3 flex gap-2">
          <Button variant="ghost" size="sm" className="flex-1" onClick={() => setSkipConfirm(true)}>
            <SkipForward className="inline mr-1" size={14} />跳过本场
          </Button>
          <Button variant="ghost" size="sm" className="flex-1" onClick={() => setSkipAllConfirm(true)}>
            模拟全部剩余 <SkipForward className="inline ml-1" size={14} />
          </Button>
        </div>
      )}

      {/* 跳过确认对话框 */}
      {skipConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6">
          <div className="bg-[#132a1c] border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center">
            <p className="text-white font-bold mb-2">跳过本场比赛？</p>
            <p className="text-white/50 text-sm mb-4">系统将快速模拟本场比赛结果</p>
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => setSkipConfirm(false)}>取消</Button>
              <Button className="flex-1" onClick={handleSkipMatch}>确认跳过</Button>
            </div>
          </div>
        </div>
      )}

      {skipAllConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6">
          <div className="bg-[#132a1c] border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center">
            <p className="text-white font-bold mb-2">模拟全部剩余比赛？</p>
            <p className="text-white/50 text-sm mb-4">将自动快速模拟到最终结果，跳过所有交互</p>
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => setSkipAllConfirm(false)}>取消</Button>
              <Button className="flex-1" onClick={handleSkipAll}>确认模拟</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/** 事件图标 */
function getEventIcon(type: string): string {
  const map: Record<string, string> = {
    goal: '⚽', goal_opportunity: '⚡', card_yellow: '🟨', card_red: '🟥', card_second_yellow: '🟨🟥',
    injury: '🤕', injury_minor: '🤕', injury_major: '🚑',
    fatigue: '😰', var_goal: '📺', var_penalty: '📺',
    offside_goal: '🙅', own_goal: '😱', big_miss: '😩', great_save: '🧤',
    tactical: '🔧',
  }
  return map[type] || '📋'
}

function getEventResultIcon(evt: MatchEventV2): string {
  if (evt.type === 'goal') return evt.side === 'home' ? '⚽🔥' : '💔'
  if (evt.type === 'goal_opportunity') return '⚡'
  if (evt.type === 'card_red' || evt.type === 'card_second_yellow') return '🟥'
  if (evt.type === 'card_yellow') return '🟨'
  if (evt.type === 'own_goal') return '😱'
  if (evt.type === 'offside_goal') return '🙅📺'
  if (evt.type === 'injury_major') return '🚑'
  return getEventIcon(evt.type)
}
