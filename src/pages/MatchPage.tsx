import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ScoreBoard } from '@/components/match/ScoreBoard'
import { LiveText } from '@/components/match/LiveText'
import { EventModal } from '@/components/match/EventModal'
import { useGameStore } from '@/store/gameStore'
import { simulateMatch } from '@/engine/match'
import { generateMatchEvents, setEventsData } from '@/engine/events'
import { eventsData } from '@/data/events'
import { allTeams } from '@/data/teams'
import type { GameEvent, NationalTeam, TournamentState } from '@/types'

// framer-motion v10 类型问题
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const M = motion.div as any

type Phase = 'intro' | 'playing' | 'event_pause' | 'finished'

interface LiveMessage { id: number; text: string; type: 'normal' | 'highlight' | 'goal' | 'event' }

/** 根据赛轮次和队伍所在组找到本场对手 */
function findOpponent(round: string, userTeamName: string, tournament: TournamentState | null): NationalTeam | undefined {
  if (!tournament || !tournament.groups) {
    // 回退: 取同组同轮次的对手
    const userGroup = allTeams.find(t => t.name === userTeamName)?.group
    if (!userGroup) return undefined
    const groupTeams = allTeams.filter(t => t.group === userGroup && t.name !== userTeamName)
    return groupTeams[0]
  }

  // 从小组赛记录中找本场对手
  const records = Object.values(tournament.groups).flat()
  const userRecord = records.find(r => r.teamName === userTeamName)
  if (!userRecord) return undefined

  // 找到用户队伍的组
  for (const [groupId, groupRecords] of Object.entries(tournament.groups)) {
    if (groupRecords.find(r => r.teamName === userTeamName)) {
      const opponentRecord = groupRecords.find(r => r.teamName !== userTeamName)
      if (opponentRecord) {
        return allTeams.find(t => t.id === opponentRecord.teamId)
      }
    }
  }
  return undefined
}

export default function MatchPage() {
  const navigate = useNavigate()
  const { round = '1' } = useParams()
  const { userTeam, tournament } = useGameStore()
  const [phase, setPhase] = useState<Phase>('intro')
  const [minute, setMinute] = useState(0)
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [messages, setMessages] = useState<LiveMessage[]>([])
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null)
  const [chosenEvents, setChosenEvents] = useState<{ event: GameEvent; optionId: string }[]>([])
  const [result, setResult] = useState<Awaited<ReturnType<typeof simulateMatch>> | null>(null)

  const eventQueueRef = useRef<GameEvent[]>([])
  const msgIdRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const minorQueueRef = useRef<GameEvent[]>([])

  // 获取当前对手
  const opponent = findOpponent(round, userTeam.name, tournament) || allTeams.find(t => t.group === 'A' && t.name !== userTeam.name) || allTeams[0]

  function addMsg(text: string, type: LiveMessage['type'] = 'normal') {
    setMessages(prev => [...prev.slice(-50), { id: msgIdRef.current++, text, type }])
  }

  // 初始化: 加载事件数据并生成事件序列
  useEffect(() => {
    setEventsData(eventsData)
    const allEvents = generateMatchEvents()
    const critical = allEvents.filter(e => e.level === 'critical')
    const major = allEvents.filter(e => e.level === 'major')
    const minor = allEvents.filter(e => e.level === 'minor')

    eventQueueRef.current = [...critical, ...major]
    minorQueueRef.current = minor

    addMsg(`比赛开始！${userTeam.name} vs ${opponent.name}`, 'highlight')
    if (userTeam.coach) {
      addMsg(`主教练 ${userTeam.coach.name} 排出 ${userTeam.formation?.displayName || userTeam.formation?.name || '未知'} 阵型`, 'normal')
    }
    setPhase('playing')
  }, [])

  // 文字直播定时器
  useEffect(() => {
    if (phase !== 'playing') return

    function tick() {
      setMinute(m => {
        const next = m + Math.floor(Math.random() * 3) + 1
        if (next >= 90) {
          clearInterval(timerRef.current!)
          timerRef.current = null
          addMsg('下半场补时 3 分钟', 'highlight')
          return 90
        }
        return next
      })

      // 推送普通事件或通用文案
      if (minorQueueRef.current.length > 0 && Math.random() > 0.5) {
        const evt = minorQueueRef.current.shift()!
        addMsg(`[${evt.category}] ${evt.title}`, 'event')
      } else {
        const texts = [
          `${opponent.name}在中场组织进攻...`,
          `${userTeam.name}控制着球权`,
          `双方在中场激烈拼抢`,
          `边路传中！被防守球员解围`,
          `门将稳稳将球没收`,
          `角球机会！`,
          `后场耐心倒脚寻找机会`,
          `一脚远射！高出横梁`,
        ]
        addMsg(texts[Math.floor(Math.random() * texts.length)], 'normal')
      }
    }

    timerRef.current = setInterval(tick, 1500 + Math.random() * 2000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase])

  // 检查是否有重要/重大事件需要弹出
  useEffect(() => {
    if (phase !== 'playing') return
    if (eventQueueRef.current.length === 0) return
    // 比赛中期随机触发, 且确保有足够时间
    if (minute > 8 && minute < 85 && Math.random() < 0.25) {
      const evt = eventQueueRef.current.shift()!
      setCurrentEvent(evt)
      setPhase('event_pause')
      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = null
      addMsg(`${evt.title}`, 'event')
    }
  }, [minute, phase])

  function handleEventChoice(optionId: string) {
    if (!currentEvent) return
    setChosenEvents(prev => [...prev, { event: currentEvent, optionId }])
    const opt = currentEvent.options.find(o => o.id === optionId)
    addMsg(`你选择了: ${opt?.text || optionId}`, 'highlight')
    setCurrentEvent(null)
    setPhase('playing')
  }

  function handleEventTimeout() {
    if (!currentEvent) return
    handleEventChoice(currentEvent.options[0].id)
  }

  const finishMatch = useCallback(() => {
    setPhase('finished')
    const simResult = simulateMatch(userTeam, opponent, chosenEvents)
    setResult(simResult)
    setHomeScore(simResult.homeScore)
    setAwayScore(simResult.awayScore)

    addMsg('', 'normal')
    addMsg('═══ 全场比赛结束 ═══', 'highlight')
    addMsg(`最终比分: ${userTeam.name} ${simResult.homeScore} - ${simResult.awayScore} ${opponent.name}`, 'goal')
    addMsg(`控球率: ${simResult.stats.possession}% | 射门: ${simResult.stats.shots} | 射正: ${simResult.stats.shotsOnTarget}`, 'normal')
  }, [userTeam, opponent, chosenEvents])

  // 比赛结束时触发 finishMatch
  useEffect(() => {
    if (phase === 'playing' && minute >= 90) {
      finishMatch()
    }
  }, [minute, phase, finishMatch])

  if (phase === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <M
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-6xl"
        >
          ⚽
          </M>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-6">
      <h1 className="text-center text-white/40 text-sm mb-3">
        {userTeam.formation?.displayName || userTeam.formation?.name || ''}
        {userTeam.formation ? ' · ' : ''}小组赛第 {round} 轮
      </h1>

      <ScoreBoard
        homeName={userTeam.name}
        awayName={opponent.name}
        homeScore={homeScore}
        awayScore={awayScore}
        homeColor={userTeam.color}
        minute={minute}
      />

      <div className="mt-4">
        <LiveText messages={messages} />
      </div>

      {/* 事件弹窗 */}
      {currentEvent && phase === 'event_pause' && (
        <EventModal event={currentEvent} onChoose={handleEventChoice} onTimeout={handleEventTimeout} />
      )}

      {/* 比赛结束 */}
      {phase === 'finished' && (
        <M
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 space-y-3"
        >
          <Button size="lg" className="w-full" onClick={() => navigate('/group-standings')}>
            查看积分榜
          </Button>
        </M>
      )}
    </div>
  )
}
