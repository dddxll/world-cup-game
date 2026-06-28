/**
 * 比赛事件引擎 v2
 * 核心职责：根据两队实力差生成关键事件序列，驱动整场比赛。
 * 不再逐分钟模拟，只生成关键事件。交互事件由玩家选择驱动。
 */
import type {
  UserTeam, NationalTeam, Player, Position,
  MatchEventV2, MatchEventOptionV2, MatchStateV2, MatchEventSide,
  PlayerDiscipline
} from '@/types'
import { calculateTeamRatings } from './rating'
import { getPlayers } from '@/data/players'

// ============================================================
// 事件生成: 根据实力差距产生比赛事件序列
// ============================================================

/** 从对方国家队随机选一个真实球员名（用于进球/吃牌等描述） */
export function pickAwayPlayerName(away: NationalTeam, preferPositions: Position[], usedNames: Set<string>): string {
  for (const pos of preferPositions) {
    const players = getPlayers(away.id, pos)
    const available = players.filter(p => !usedNames.has(p.name))
    if (available.length > 0) {
      const p = available[Math.floor(Math.random() * available.length)]
      usedNames.add(p.name)
      return p.name
    }
  }
  // fallback: 所有位置随机选
  const allPositions: Position[] = ['ST','LW','RW','CAM','CM','CDM','CB','LB','RB']
  for (const pos of allPositions) {
    const players = getPlayers(away.id, pos)
    const available = players.filter(p => !usedNames.has(p.name))
    if (available.length > 0) {
      const p = available[Math.floor(Math.random() * available.length)]
      usedNames.add(p.name)
      return p.name
    }
  }
  // 最终 fallback
  const fallback = `${away.name}球员`
  usedNames.add(fallback)
  return fallback
}

/** 从己方首发中选球员，排除已在本场事件中出现过的球员 */
function pickHomePlayer(
  team: UserTeam,
  usedPlayerIds: Set<string>,
  preferPosition?: Position[]
): { name: string; id: string; rating: number; position: string } | null {
  const allPlayers = team.startingXI.filter(Boolean) as Player[]
  const fresh = allPlayers.filter(p => !usedPlayerIds.has(p.id))
  // 优先从"未用过"的球员中选，如果都用过了才允许重复
  const pool = fresh.length > 0 ? fresh : allPlayers
  if (pool.length === 0) return null

  let candidates = pool
  if (preferPosition?.length) {
    const match = pool.filter(p => p.positions.some(pos => preferPosition!.includes(pos)))
    if (match.length > 0) candidates = match
  }
  const p = candidates[Math.floor(Math.random() * candidates.length)]
  usedPlayerIds.add(p.id)
  return { name: p.name, id: p.id, rating: p.rating, position: p.positions[0] || 'CM' }
}

/** 选进球/助攻球员：总是从全部首发中随机选（同一球员可多次进球/助攻） */
function pickForGoalAssist(
  team: UserTeam,
  excludeId?: string,
  preferPosition?: Position[]
): { name: string; id: string; position: string } | null {
  const allPlayers = team.startingXI.filter(Boolean) as Player[]
  let candidates = allPlayers.filter(p => p.id !== excludeId)
  if (candidates.length === 0) candidates = allPlayers
  if (candidates.length === 0) return null

  if (preferPosition?.length) {
    const matched = candidates.filter(p => p.positions.some(pos => preferPosition!.includes(pos)))
    if (matched.length > 0) candidates = matched
  }
  const p = candidates[Math.floor(Math.random() * candidates.length)]
  return { name: p.name, id: p.id, position: p.positions[0] || 'CM' }
}

let _eventId = 0
function nextId(): string {
  return `evt-${++_eventId}-${Math.random().toString(36).slice(2, 6)}`
}

/** 计算初始进球概率（0~1，己方进球概率） */
export function getBaseGoalProbability(home: UserTeam, away: NationalTeam): number {
  const hr = calculateTeamRatings(home)
  const awayOverall = Math.round((away.ratings.attack + away.ratings.defense + away.ratings.midfield) / 3)
  const diff = hr.overall - awayOverall
  // diff=0→50%, diff=10→60%, diff=20→70%, capped at [0.10, 0.90]
  return Math.min(0.90, Math.max(0.10, 0.50 + diff * 0.01))
}

/** ★ 计算进球发生率（射门转化为进球的概率）
 *  受双方攻击力 + 教练风格影响：
 *  - 防守型教练（铁桶大巴/防守反击）压低进球率
 *  - 进攻型教练（高位压迫/两翼齐飞）抬高进球率
 *  - 防守型教练时上限不超 30%，进攻型教练时上限不超 50%
 */
export function getGoalOccurrenceRate(
  homeAttack: number,
  awayAttack: number,
  coachStyle?: string
): number {
  const totalAttack = homeAttack + awayAttack
  // 基础进球率：进攻力决定（机会减少到3-5次，提高转化率补偿）
  let rate = 0.33 + (totalAttack - 120) * 0.002

  // 教练风格修正
  const styleModifiers: Record<string, number> = {
    '铁桶大巴': -0.08,   // 极度保守，比赛沉闷
    '防守反击': -0.04,   // 偏防守
    '传控渗透':  0.00,   // 均衡
    '两翼齐飞': +0.03,   // 偏进攻
    '高位压迫': +0.06,   // 疯狂逼抢，比赛开放
  }
  const mod = coachStyle ? (styleModifiers[coachStyle] ?? 0) : 0
  rate += mod

  // 根据教练类型动态调整上限
  const isDefensive = coachStyle === '铁桶大巴' || coachStyle === '防守反击'
  const isAttacking = coachStyle === '高位压迫' || coachStyle === '两翼齐飞'
  const lowerBound = isDefensive ? 0.15 : 0.25
  const upperBound = isDefensive ? 0.30 : (isAttacking ? 0.50 : 0.48)

  return Math.min(upperBound, Math.max(lowerBound, rate))
}

/** 生成一场比赛的关键事件序列 */
export function generateMatchEvents(
  home: UserTeam,
  away: NationalTeam
): MatchEventV2[] {
  const hr = calculateTeamRatings(home)
  const awayOverall = Math.round((away.ratings.attack + away.ratings.defense + away.ratings.midfield) / 3)
  const diff = hr.overall - awayOverall
  const events: MatchEventV2[] = []
  const usedPlayerIds = new Set<string>()      // 己方已在本场事件中出现的球员ID
  const usedAwayNames = new Set<string>()       // 对方已在本场事件中出现的球员名

  // -------- 1. 动态进球机会事件（替代固定球数）--------
  // ★ 核心设计：预生成 N 次射门机会，每次机会按「当前进球概率」动态判定进球方
  //    概率初始 = 0.5 + (实力差 × 1%)，一档 ≈ 10%，上限 90%
  //    比赛中通过战术/换人事件修正 probModifier，影响后续机会
  const baseProb = Math.min(0.90, Math.max(0.10, 0.50 + diff * 0.01))
  const totalAttack = hr.attack + (away.ratings.attack || 50)
  // 总射门机会：综合攻击力决定（5~8次）
  const opportunities = Math.round(3 + (totalAttack - 100) / 50)
  const goalOppCount = Math.min(5, Math.max(3, opportunities))

  for (let i = 0; i < goalOppCount; i++) {
    events.push({
      id: nextId(), minute: 0, type: 'goal_opportunity', side: 'home',
      title: '⚡ 进攻机会',
      description: '球队推进至前场，正在组织进攻…',
      interactive: false,
    })
  }

  // 对方每进一球后 50% 概率追加战术调整交互事件
  // （因为 goal_opportunity 的进球方是动态判定的，这里改为追加固定数量的战术事件）
  const tacticalCount = Math.random() < 0.55 ? 1 : 0 // 55%概率1次（场均<1次，且只在45分钟后出现）
  const tacticalContexts = [
    { title: '⚡ 对方加快比赛节奏', desc: '对方突然提速，从后场到前场一脚出球快速推进，高强度连续冲击我方防线。是否也提速对攻，还是控球降速稳住局面？' },
    { title: '🐌 对方开始拖慢节奏', desc: '对方开始在后场频繁倒脚，明显在拖时间消耗比赛。需要加强前场压迫抢回球权，加快进攻转换速度。' },
    { title: '↗️ 对方集中打边路', desc: '对方将进攻重心完全转移到边路，边锋频繁下底传中，边后卫被压得无法前插。需要收缩边路防守还是让中场回撤协防？' },
    { title: '🎯 对方改打中路渗透', desc: '对方放弃边路，改由中路短传渗透，前腰频繁回撤接球组织，中后卫身前区域频繁被打穿。是否收紧中路防线？' },
    { title: '🔄 对方切换阵型', desc: '对方教练在场边打出明确手势，阵型从原来的站位发生了明显变化，攻防两端的人员配置都调整了。我方需要相应调整应对。' },
    { title: '📏 对方防线压上造越位', desc: '对方后卫线整体前压到中线附近，采用高位防守+造越位战术，我方前锋频频落入越位陷阱。是否需要改打身后球或让边锋回撤接应？' },
    { title: '⏱️ 比赛进入收官阶段', desc: '时间所剩无几，比分差距让对手必须孤注一掷。对方门将都可能冲上来争角球，后场防守空虚。是死守保比分还是抓住反击机会？' },
    { title: '🧱 对方全员退守禁区', desc: '对方10人全部缩在禁区前沿摆大巴，中路完全封死，短传渗透打不进去。需要尝试远射、定位球还是边路传中高空轰炸？' },
  ]
  for (let i = 0; i < tacticalCount; i++) {
    const ctx = tacticalContexts[Math.floor(Math.random() * tacticalContexts.length)]
    events.push({
      id: nextId(), minute: 0, type: 'tactical', side: 'home',
      title: ctx.title,
      description: ctx.desc,
      interactive: true,
      options: [
        {
          id: 'attack', text: '加快节奏，高位压迫', description: '整体阵线前移，中场积极逼抢，加快攻防转换速度',
          requiresSubstitution: false,
          hiddenEffect: { homeScoreMod: 0, awayScoreMod: 0, fatigueMod: -4, injuryRiskMod: 0, cardRiskMod: 0 },
        },
        {
          id: 'defensive', text: '收缩阵型，稳守反击', description: '防线回收保护禁区，放弃前场逼抢，抓对方失误打反击',
          requiresSubstitution: false,
          hiddenEffect: { homeScoreMod: 0, awayScoreMod: -2, fatigueMod: 1, injuryRiskMod: 0, cardRiskMod: 0 },
        },
        {
          id: 'sub', text: '换人调整', description: '从替补席换上新球员，用新鲜体能改变场上局面',
          requiresSubstitution: true,
          hiddenEffect: { homeScoreMod: 1, awayScoreMod: 0, fatigueMod: 2, injuryRiskMod: 0, cardRiskMod: 0 },
        },
        {
          id: 'keep', text: '按兵不动，保持现状', description: '不做战术变化，让球员自行调整适应场上节奏',
          requiresSubstitution: false,
          hiddenEffect: { homeScoreMod: 0, awayScoreMod: 0, fatigueMod: 0, injuryRiskMod: 0, cardRiskMod: 0 },
        },
      ],
    })
  }

  // -------- 2. 红黄牌事件 (弱队吃牌概率更高) --------
  const homeYellowPlayers = new Map<string, { name: string; id: string }>() // 追踪己方已吃黄的球员
  const totalCards = 1 + Math.floor(Math.random() * 4) // 1-4张
  for (let i = 0; i < totalCards; i++) {
    // ★ 弱方 60% / 强方 40%（固定比例，不分档）
    const side: MatchEventSide = Math.random() < 0.60
      ? (diff > 0 ? 'away' : 'home')
      : (diff > 0 ? 'home' : 'away')

    // ★ 双黄变红：如果己方球员已有一黄，30%概率再吃一黄→变红
    let isRed = Math.random() < 0.15 // 15%概率直红
    let isSecondYellow = false
    let p = side === 'home' ? pickHomePlayer(home, usedPlayerIds, ['CB', 'CDM', 'CM', 'LB', 'RB']) : null
    if (side === 'home' && p && homeYellowPlayers.has(p.id) && Math.random() < 0.30) {
      isSecondYellow = true
      isRed = true
    }
    const type = isSecondYellow ? 'card_second_yellow' : (isRed ? 'card_red' : 'card_yellow')

    const playerDesc = side === 'home'
      ? (p ? p.name : home.name + '球员')
      : pickAwayPlayerName(away, ['CB', 'CDM', 'CM', 'LB', 'RB'], usedAwayNames)

    // 记录己方黄牌
    if (side === 'home' && p && !isRed) {
      homeYellowPlayers.set(p.id, { name: p.name, id: p.id })
    }

    const reasons = ['凶狠铲球犯规', '战术犯规拉人', '肘击动作', '抗议裁判', '踩踏犯规']
    const reason = reasons[Math.floor(Math.random() * reasons.length)]
    const secondYellowDesc = isSecondYellow ? '（第二张黄牌！两黄变一红罚下！）' : ''

    events.push({
      id: nextId(), minute: 0, type, side,
      title: isSecondYellow ? `🟥 两黄变红！${playerDesc}被罚下！`
        : isRed ? `🟥 红牌！${side === 'home' ? home.name : away.name}`
        : `🟨 黄牌 - ${playerDesc}`,
      description: `${playerDesc} ${reason}，裁判出示${isSecondYellow ? '第二张黄牌，两黄变红！' : (isRed ? '红牌' : '黄牌')}${secondYellowDesc}`,
      playerName: playerDesc, playerId: p?.id, playerPosition: p?.position,
      interactive: side === 'home',
      options: side === 'home' ? [
        ...(isRed ? [{
          id: 'rc_sub', text: '换人调整（之后再选战术）', description: '红牌球员已离场，先换上一名替补，再决定战术方向',
          requiresSubstitution: true,
          hiddenEffect: { homeScoreMod: 0, awayScoreMod: 0, fatigueMod: 0, injuryRiskMod: 0, cardRiskMod: 0 },
        }, {
          id: 'rc_direct', text: '不换人，直接选战术', description: '保持现有10人，直接进入战术抉择',
          requiresSubstitution: false,
          hiddenEffect: { homeScoreMod: 0, awayScoreMod: 0, fatigueMod: 0, injuryRiskMod: 0, cardRiskMod: 0 },
        }] : [{
          id: 'sub', text: '换下该球员，避免第二黄', description: '保护已有一黄的球员，避免两黄变红',
          requiresSubstitution: true,
          hiddenEffect: { homeScoreMod: 1, awayScoreMod: 0, fatigueMod: 1, injuryRiskMod: 0, cardRiskMod: -10 },
        }, {
          id: 'keep', text: '警告他继续踢', description: '希望他不会吃到第二张黄牌（⚠️ 有风险）',
          requiresSubstitution: false,
          hiddenEffect: { homeScoreMod: 0, awayScoreMod: 0, fatigueMod: 0, injuryRiskMod: 0, cardRiskMod: 5 },
        }]),
      ] : undefined,
    })
  }

  // -------- 3. 受伤事件 (小伤停1场 / 大伤报销) --------
  const injuryCount = 1 + Math.floor(Math.random() * 2) // 1-2次，确保每场都有伤病
  for (let i = 0; i < injuryCount; i++) {
    // ★ 双方均等概率 50/50（不再偏向弱方）
    const side: MatchEventSide = Math.random() < 0.50 ? 'home' : 'away'
    const p = side === 'home' ? pickHomePlayer(home, usedPlayerIds) : null
    const playerDesc = side === 'home'
      ? (p ? p.name : home.name + '球员')
      : pickAwayPlayerName(away, ['CM', 'CDM', 'CB', 'LB', 'RB'], usedAwayNames)

    // 70%小伤(停1场), 30%大伤(报销)
    const isMajor = Math.random() < 0.30
    const reasons = isMajor
      ? ['十字韧带撕裂！赛季报销！', '骨折重伤！无法继续参赛！', '严重肌肉撕裂！长期缺阵！']
      : ['肌肉拉伤倒地', '拼抢中膝盖受伤', '冲撞后脚踝扭伤', '旧伤复发无法坚持']
    const reason = reasons[Math.floor(Math.random() * reasons.length)]

    events.push({
      id: nextId(), minute: 0, type: isMajor ? 'injury_major' : 'injury_minor', side,
      title: (isMajor ? '🚑 重伤！' : '🤕 受伤 - ') + playerDesc,
      description: `${playerDesc} ${reason}${isMajor ? '，本届世界杯之旅到此结束…' : '，预计缺席下一场比赛'}`,
      playerName: playerDesc, playerId: p?.id, playerPosition: p?.position,
      interactive: side === 'home',
      options: side === 'home' ? [
        {
          id: 'sub', text: '换人（从替补席选择）', description: '伤员无法坚持，必须换下',
          requiresSubstitution: true,
          hiddenEffect: { homeScoreMod: 1, awayScoreMod: 0, fatigueMod: 2, injuryRiskMod: -10, cardRiskMod: 0 },
        },
        {
          id: 'sub_urgent', text: '紧急换人（快速调整）', description: '快速换人减少混乱，但组织度受损',
          requiresSubstitution: true,
          hiddenEffect: { homeScoreMod: -1, awayScoreMod: 2, fatigueMod: 1, injuryRiskMod: -10, cardRiskMod: 0 },
        },
      ] : undefined,
    })
  }

  // -------- 4. 疲劳事件 (55分钟后出现，高位压迫打法更易疲劳) --------
  const isHighPress = home.coach?.style === '高位压迫'
  const fatigueBase = isHighPress ? 1 : 0
  const fatigueCount = fatigueBase + (Math.random() < 0.5 ? 1 : 0) // 高压1-2次，普通0-1次
  for (let i = 0; i < fatigueCount; i++) {
    const p = pickHomePlayer(home, usedPlayerIds, ['CM', 'CDM', 'CAM', 'LW', 'RW', 'LWB', 'RWB'])
    if (!p) continue
    events.push({
      id: nextId(), minute: 0, type: 'fatigue', side: 'home',
      title: `😰 球员疲劳 - ${p.name}`,
      description: `${p.name} 出现体能下降迹象，跑动距离明显减少`,
      playerName: p.name, playerId: p.id, playerPosition: p.position,
      interactive: true,
      options: [
        {
          id: 'sub', text: '换人（从替补席选择）', description: '用生力军替换疲劳球员',
          requiresSubstitution: true,
          hiddenEffect: { homeScoreMod: 2, awayScoreMod: 0, fatigueMod: 4, injuryRiskMod: -3, cardRiskMod: 0 },
        },
        {
          id: 'conserve', text: '调整战术节省体力', description: '降低逼抢强度，控制节奏',
          requiresSubstitution: false,
          hiddenEffect: { homeScoreMod: -1, awayScoreMod: 1, fatigueMod: 2, injuryRiskMod: 0, cardRiskMod: 0 },
        },
        {
          id: 'keep', text: '保持不变', description: '相信他的体能储备（⚠️ 有受伤风险）',
          requiresSubstitution: false,
          hiddenEffect: { homeScoreMod: -2, awayScoreMod: 0, fatigueMod: -2, injuryRiskMod: 35, cardRiskMod: 0 },
        },
      ],
    })
  }

  // -------- 5. VAR / 点球事件 (两队等概率) --------
  if (Math.random() < 0.35) {
    const side: MatchEventSide = Math.random() < 0.5 ? 'home' : 'away'
    const isPenalty = Math.random() < 0.5
    const sideName = side === 'home' ? home.name : away.name
    events.push({
      id: nextId(), minute: 0, type: isPenalty ? 'var_penalty' : 'var_goal',
      side,
      title: isPenalty ? `📺 VAR 判罚点球！(${sideName})` : `📺 VAR 回看进球...`,
      description: isPenalty
        ? `裁判经VAR回看后判给${sideName}一粒点球！`
        : `VAR正在回看${sideName}的进球是否存在争议...`,
      interactive: side === 'away' && isPenalty, // 对手获点球时给玩家交互
      options: (side === 'away' && isPenalty) ? [
        {
          id: 'accept', text: '接受判罚', description: '不做调整',
          requiresSubstitution: false,
          hiddenEffect: { homeScoreMod: 0, awayScoreMod: 4, fatigueMod: 0, injuryRiskMod: 0, cardRiskMod: 0 },
        },
        {
          id: 'sub_gk', text: '换上替补门将（如有）', description: '替补门将也许能扑出点球',
          requiresSubstitution: true,
          hiddenEffect: { homeScoreMod: 0, awayScoreMod: 2, fatigueMod: 0, injuryRiskMod: 0, cardRiskMod: 0 },
        },
      ] : undefined,
    })

    // VAR 点球后必须追加罚球结果：78%命中率
    if (isPenalty) {
      const penaltyScored = Math.random() < 0.78
      if (penaltyScored) {
        const scorer = side === 'home'
          ? (pickHomePlayer(home, usedPlayerIds, ['ST', 'CAM', 'CM'])?.name || home.name + '球员')
          : pickAwayPlayerName(away, ['ST', 'CAM', 'CM'], usedAwayNames)
        events.push({
          id: nextId(), minute: 0, type: 'goal', side,
          title: `⚽ 点球命中！${sideName}`,
          description: `${scorer} 稳稳将点球罚进！`,
          playerName: scorer, interactive: false,
        })
      } else {
        // 罚失情况：门将扑出（概率更高）或打飞
        const isSaved = Math.random() < 0.7
        events.push({
          id: nextId(), minute: 0, type: 'big_miss', side,
          title: `😩 点球罚失！`,
          description: isSaved
            ? `${sideName} 的点球被门将神勇扑出！`
            : `${sideName} 的点球打飞了！`,
          interactive: false,
        })
      }
    }
  }

  // -------- 6. 乌龙球 (等概率) --------
  if (Math.random() < 0.12) {
    const side: MatchEventSide = Math.random() < 0.5 ? 'home' : 'away'
    const p = side === 'home' ? pickHomePlayer(home, usedPlayerIds, ['CB', 'LB', 'RB']) : null
    const playerDesc = side === 'home'
      ? (p ? p.name : home.name + '后卫')
      : pickAwayPlayerName(away, ['CB', 'LB', 'RB'], usedAwayNames)
    events.push({
      id: nextId(), minute: 0, type: 'own_goal', side,
      title: `😱 乌龙球！(${side === 'home' ? home.name : away.name})`,
      description: `${playerDesc} 不慎将球撞入自家大门！`,
      playerName: playerDesc, playerPosition: p?.position,
      interactive: false,
    })
  }

  // -------- 8. 重大机会错失 (等概率) --------
  const missCount = Math.floor(Math.random() * 2)
  for (let i = 0; i < missCount; i++) {
    const side: MatchEventSide = Math.random() < 0.5 ? 'home' : 'away'
    const p = side === 'home' ? pickHomePlayer(home, usedPlayerIds, ['ST', 'LW', 'RW', 'CAM']) : null
    const playerDesc = side === 'home'
      ? (p ? p.name : home.name + '前锋')
      : pickAwayPlayerName(away, ['ST', 'LW', 'RW', 'CAM'], usedAwayNames)
    const descs = ['面对空门打飞！', '单刀球被门将扑出！', '击中横梁弹出！', '点球罚失！']
    const desc = descs[Math.floor(Math.random() * descs.length)]
    events.push({
      id: nextId(), minute: 0, type: 'big_miss', side,
      title: `😩 错失良机 - ${playerDesc}`,
      description: `${playerDesc} ${desc}`,
      playerName: playerDesc, playerPosition: p?.position,
      interactive: false,
    })
  }

  // -------- 9. 神扑 (等概率) --------
  if (Math.random() < 0.4) {
    const side: MatchEventSide = Math.random() < 0.5 ? 'home' : 'away'
    const descs = ['飞身扑出必进球！', '近距离挡出射门！', '指尖将球托出横梁！']
    const desc = descs[Math.floor(Math.random() * descs.length)]
    const gk = side === 'home' ? pickHomePlayer(home, usedPlayerIds, ['GK']) : null
    const gkName = side === 'home'
      ? (gk?.name || home.name + '门将')
      : pickAwayPlayerName(away, ['GK'], usedAwayNames)
    events.push({
      id: nextId(), minute: 0, type: 'great_save', side,
      title: `🧤 神扑！${gkName}`,
      description: `${gkName} ${desc}`,
      playerPosition: gk?.position,
      interactive: false,
    })
  }

  // -------- 分配时间 --------
  assignMinutes(events)

  // 按分钟排序
  events.sort((a, b) => a.minute - b.minute)

  return events
}

/** 为事件分配比赛时间，按类型约束时段，事件间至少间隔2分钟。
 *  进球时间服从真实足球分布：开场15分钟概率低，30-45分钟和75-90分钟是进球高峰。
 *  战术调整事件保证排在触发它的对方进球之后。 */
function assignMinutes(events: MatchEventV2[]) {
  const n = events.length
  if (n === 0) return

  // 先分类：有时段约束的、进球的、其他普通的
  const constrained: { idx: number; minMinute: number; maxMinute: number }[] = []
  const goalIndices: number[] = []
  const normal: number[] = []

  for (let i = 0; i < n; i++) {
    const evt = events[i]
    if (evt.type === 'fatigue') {
      constrained.push({ idx: i, minMinute: 58, maxMinute: 85 })
    } else if (evt.type === 'tactical') {
      // ★ 收官/死守类战术只出现在80分钟后才符合现实
      if (evt.title.includes('收官阶段') || evt.title.includes('退守禁区')) {
        constrained.push({ idx: i, minMinute: 80, maxMinute: 90 })
      } else {
        constrained.push({ idx: i, minMinute: 46, maxMinute: 88 }) // 战术调整只在下半场出现
      }
    } else if (evt.type === 'injury_minor' || evt.type === 'injury_major') {
      constrained.push({ idx: i, minMinute: 25, maxMinute: 80 })
    } else if (evt.type === 'card_red' || evt.type === 'card_second_yellow') {
      // ★ 红牌至少10分钟后才出现；抗议裁判类红牌至少45分钟后（情绪积累）
      if (evt.description.includes('抗议裁判')) {
        constrained.push({ idx: i, minMinute: 45, maxMinute: 90 })
      } else {
        constrained.push({ idx: i, minMinute: 10, maxMinute: 90 })
      }
    } else if (evt.type === 'goal' || evt.type === 'own_goal' || evt.type === 'var_goal' || evt.type === 'goal_opportunity') {
      goalIndices.push(i)
    } else {
      normal.push(i)
    }
  }

  // 辅助：检查是否与已分配时间冲突（<2分钟间隔）
  function hasConflict(minute: number): boolean {
    for (const e of events) {
      if (e.minute > 0 && Math.abs(e.minute - minute) < 2) return true
    }
    return false
  }

  /** 按权重分布随机选一个分钟数 */
  function weightedRandomMinute(minWeights: [number, number][]): number {
    const total = minWeights.reduce((s, [, w]) => s + w, 0)
    let r = Math.random() * total
    for (const [min, w] of minWeights) {
      r -= w
      if (r <= 0) return min
    }
    return minWeights[minWeights.length - 1][0]
  }

  // 进球时间权重分布：模拟真实足球
  // 1'-15': 极低概率 (约8%)
  // 16'-30': 中等 (约18%)
  // 31'-45': 较高 (约25%)
  // 46'-60': 中等 (约18%)
  // 61'-75': 较高 (约20%)
  // 76'-90+': 高 (约11%，但单位时间密度高)
  function buildGoalMinuteWeights(): [number, number][] {
    const weights: [number, number][] = []
    for (let m = 2; m <= 90; m++) {
      let w = 1
      if (m <= 5) w = 1        // 前5分钟极低
      else if (m <= 15) w = 3   // 5-15分钟低
      else if (m <= 30) w = 5   // 15-30分钟正常
      else if (m <= 45) w = 7   // 30-45分钟高（上半场补时是进球高峰）
      else if (m <= 55) w = 3   // 45-55分钟略低（中场休息后重新进入状态）
      else if (m <= 75) w = 5   // 55-75分钟正常
      else w = 6                 // 75-90分钟高（比赛末段紧张）
      weights.push([m, w])
    }
    return weights
  }

  // 分配进球时间
  const goalWeights = buildGoalMinuteWeights()
  for (const gi of goalIndices) {
    let assigned = 0
    let tries = 0
    do {
      assigned = weightedRandomMinute(goalWeights)
      tries++
    } while (hasConflict(assigned) && tries < 50)
    events[gi].minute = assigned
  }

  // 分配其他普通事件（非进球）：均匀分布，开场前几分钟概率也降低
  const otherIndices = [...normal]
  // 按原顺序（即生成顺序）分配，但开头段和进球密集段自动避让
  if (otherIndices.length > 0) {
    const segmentSize = 90 / otherIndices.length
    for (let j = 0; j < otherIndices.length; j++) {
      const i = otherIndices[j]
      const segStart = j * segmentSize
      const segEnd = Math.min(90, (j + 1) * segmentSize)
      let min = Math.floor(segStart + Math.random() * Math.max(3, segEnd - segStart))
      if (min < 5) min = 5 + Math.floor(Math.random() * 6) // 前5分钟尽量避开
      // 避让已有事件
      let tries = 0
      while (hasConflict(min) && tries < 30) {
        min = Math.floor(segStart + Math.random() * Math.max(3, segEnd - segStart))
        tries++
      }
      events[i].minute = Math.max(5, Math.min(90, min))
    }
  }

  // 给约束事件在其允许范围内分配时间（不与已分配事件冲突）
  for (const c of constrained) {
    const range = c.maxMinute - c.minMinute
    let assigned = c.minMinute + Math.floor(Math.random() * Math.max(1, range))
    let tries = 0
    while (hasConflict(assigned) && tries < 30) {
      assigned = c.minMinute + Math.floor(Math.random() * Math.max(1, range))
      tries++
    }
    events[c.idx].minute = Math.max(c.minMinute, Math.min(c.maxMinute, assigned))
  }

  // 伤停补时关键事件：最后一个进球或红牌事件拉到85-90+区间
  const lateEvents = events.filter(e => (e.type === 'goal' || e.type === 'card_red') && e.minute < 85)
  if (lateEvents.length > 0 && Math.random() < 0.35) {
    const last = lateEvents[lateEvents.length - 1]
    last.minute = 85 + Math.floor(Math.random() * 8)
    // 确保不超过90+7
    if (last.minute > 97) last.minute = 90 + Math.floor(Math.random() * 5)
  }

  // 后处理1：确保 VAR/offside 事件和触发它的进球同步
  // offside_goal 在数组中紧跟在 goal 之后
  for (let i = 1; i < n; i++) {
    if (events[i - 1].type === 'var_penalty') {
      // 罚球结果与判罚同一分钟
      events[i].minute = events[i - 1].minute
    }
    // ★ offside_goal 必须与触发它的进球同一分钟（VAR 实时回看）
    if (events[i].type === 'offside_goal') {
      events[i].minute = events[i - 1].minute
    }
  }

  // 后处理2：确保战术调整事件排在触发它的对方进球之后
  // tactical 事件在 events 数组中紧跟在对应的 away goal 后面（生成顺序保证）
  for (let i = 0; i < n; i++) {
    if (events[i].type === 'tactical') {
      // 向前查找最近的对方进球（away goal）
      for (let j = i - 1; j >= 0; j--) {
        if (events[j].type === 'goal' && events[j].side === 'away') {
          if (events[i].minute <= events[j].minute) {
            // 战术调整至少排在进球后 1-3 分钟
            events[i].minute = Math.min(90, events[j].minute + 1 + Math.floor(Math.random() * 3))
          }
          break // 只找最近的 away goal
        }
      }
    }
  }
}

// ============================================================
// 隐式分数 & 比分计算
// ============================================================

/** 根据累计隐式分数计算最终比分 */
export function calculateFinalScore(matchState: MatchStateV2): { homeScore: number; awayScore: number } {
  const totalHome = matchState.homeScoreMod + matchState.homeScore * 10
  const totalAway = matchState.awayScoreMod + matchState.awayScore * 10
  const scoreDiff = (totalHome - totalAway) / 10

  let hg = matchState.homeScore
  let ag = matchState.awayScore

  // 如果隐式分差指向更多进球
  if (scoreDiff > 0.3 && (hg - ag) <= 0) {
    hg = Math.max(hg, ag + 1)
  } else if (scoreDiff > 0.1 && hg === ag) {
    hg = ag + 1
  } else if (scoreDiff < -0.3 && (ag - hg) <= 0) {
    ag = Math.max(ag, hg + 1)
  } else if (scoreDiff < -0.1 && ag === hg) {
    ag = hg + 1
  }

  return { homeScore: Math.max(0, hg), awayScore: Math.max(0, ag) }
}

/** 应用事件选项的隐式效果到比赛状态（含伤病风险累加） */
export function applyEventEffect(
  state: MatchStateV2,
  option: MatchEventOptionV2,
  playerId?: string
): MatchStateV2 {
  const next: MatchStateV2 = {
    ...state,
    homeScoreMod: state.homeScoreMod + option.hiddenEffect.homeScoreMod,
    awayScoreMod: state.awayScoreMod + option.hiddenEffect.awayScoreMod,
  }
  // 累积伤病风险：疲劳/受伤事件选择「坚持」时累加风险
  if (playerId && option.hiddenEffect.injuryRiskMod > 0) {
    next.playerInjuryRisk = {
      ...state.playerInjuryRisk,
      [playerId]: (state.playerInjuryRisk[playerId] || 0) + option.hiddenEffect.injuryRiskMod,
    }
  }
  return next
}

/** 创建初始比赛状态 */
export function createMatchState(events: MatchEventV2[], goalProbability: number): MatchStateV2 {
  return {
    homeScore: 0,
    awayScore: 0,
    homeScoreMod: 0,
    awayScoreMod: 0,
    events,
    currentEventIndex: -1,
    finished: false,
    goalScorers: [],
    assists: [],
    cards: [],
    substitutions: [],
    playerInjuryRisk: {},
    injuriesThisMatch: [],
    sendOffsThisMatch: [],
    goalProbability,
    probModifier: 0,
    occRateModifier: 1.0,
  }
}

// ============================================================
// 红黄牌停赛系统
// ============================================================

/** 创建球员纪律初始状态 */
export function createDiscipline(playerId: string): PlayerDiscipline {
  return {
    yellowCards: 0,
    redCards: 0,
    suspended: false,
    suspendedUntilMatch: -1,
  }
}

/** 处理比赛结束后的纪律更新 */
export function updateDisciplineAfterMatch(
  discipline: Record<string, PlayerDiscipline>,
  matchState: MatchStateV2,
  currentMatchIndex: number,
  isKnockout: boolean
): { discipline: Record<string, PlayerDiscipline>; suspended: string[] } {
  const next = { ...discipline }
  const suspended: string[] = []

  // 处理本场比赛的红黄牌
  for (const card of matchState.cards) {
    if (!card.playerId) continue
    if (!next[card.playerId]) next[card.playerId] = createDiscipline(card.playerId)
    const d = next[card.playerId]

    if (card.type === 'red') {
      d.redCards++
      d.suspended = true
      d.suspendedUntilMatch = currentMatchIndex + 1
      suspended.push(card.playerId)
    } else {
      d.yellowCards++
      // 检查是否累计2黄（小组赛阶段）
      if (!isKnockout && d.yellowCards >= 2) {
        d.suspended = true
        d.suspendedUntilMatch = currentMatchIndex + 1
        suspended.push(card.playerId)
      }
    }
  }

  // 淘汰赛阶段黄牌清零
  if (isKnockout) {
    for (const pid of Object.keys(next)) {
      next[pid].yellowCards = 0
    }
  }

  // 清除已完成停赛的球员
  for (const pid of Object.keys(next)) {
    const d = next[pid]
    const until = typeof d.suspendedUntilMatch === 'number' ? d.suspendedUntilMatch : -1
    if (d.suspended && until >= 0 && until <= currentMatchIndex) {
      d.suspended = false
      d.suspendedUntilMatch = -1
    }
  }

  return { discipline: next, suspended }
}

/** 检查球员是否可出场 */
export function isPlayerAvailable(
  playerId: string,
  discipline: Record<string, PlayerDiscipline>,
  suspendedList: string[]
): boolean {
  if (suspendedList.includes(playerId)) return false
  const d = discipline[playerId]
  if (!d) return true
  return !d.suspended
}

// ============================================================
// 快速自动模拟 (跳过比赛用)
// ============================================================

/** 自动模拟一场比赛，不产生交互 */
export function autoSimulateMatch(home: UserTeam, away: NationalTeam): {
  homeScore: number; awayScore: number; events: MatchEventV2[]
} {
  const events = generateMatchEvents(home, away)
  const baseProb = getBaseGoalProbability(home, away)
  let state = createMatchState(events, baseProb)

  for (const evt of events) {
    // ★ 动态进球机会：两阶段概率判定
    //   阶段1：进球是否发生；阶段2：哪方进球
    if (evt.type === 'goal_opportunity') {
      const homeAttack = home.attackRating || 70
      const awayAttack = away.ratings?.attack || 50
      const baseRate = getGoalOccurrenceRate(homeAttack, awayAttack, home.coach?.style)
      const goalOccurrenceRate = Math.min(0.65, baseRate * (state.occRateModifier ?? 1.0))
      // 先判断是否发生进球
      if (Math.random() < goalOccurrenceRate) {
        // 进球发生：判定哪方
        const effectiveProb = Math.min(0.95, Math.max(0.05,
          state.goalProbability + state.probModifier
        ))
        if (Math.random() < effectiveProb) {
          state.homeScore++
        } else {
          state.awayScore++
        }
      }
      // 没进球：不产生比分变化（机会被浪费）
    }
    // 乌龙球相当于对方进球
    if (evt.type === 'own_goal') {
      if (evt.side === 'home') state.awayScore++
      else state.homeScore++
    }
    // VAR确认进球有效
    if (evt.type === 'var_goal') {
      if (evt.side === 'home') state.homeScore++
      else state.awayScore++
    }
    // 交互事件自动选第一个选项
    if (evt.interactive && evt.options?.length) {
      state = applyEventEffect(state, evt.options[0], evt.playerId)
    }
  }

  return { homeScore: state.homeScore, awayScore: state.awayScore, events }
}
