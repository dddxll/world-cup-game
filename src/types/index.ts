export type PlayStyle = '高位压迫' | '传控渗透' | '防守反击' | '两翼齐飞' | '铁桶大巴'

export type Position = 'GK' | 'CB' | 'LB' | 'RB' | 'LWB' | 'RWB' | 'CDM' | 'CM' | 'CAM' | 'LM' | 'RM' | 'LW' | 'RW' | 'ST'

export interface FormationDef {
  id: string; name: string; displayName: string
  positions: Position[]
  counters: string[]; counteredBy: string[]
}

export interface Coach {
  id: string; name: string; nameEn: string; nationality: string
  avatar: string; style: PlayStyle
  att: number; def: number; adp: number
  preferredFormations: string[]; description: string
}

export interface Player {
  id: string; name: string; nameEn: string; nationality: string
  avatar: string; rating: number; positions: Position[]
  stats: { speed: number; shooting: number; passing: number; defending: number; physical: number }
}

export interface NationalTeam {
  id: string; name: string; nameEn: string; flag: string
  tier: 1|2|3|4; group: string
  ratings: { attack: number; defense: number; midfield: number }
  coachId: string; coachStyle: PlayStyle
}

export interface UserTeam {
  name: string; color: string
  coach: Coach | null; formation: FormationDef | null
  startingXI: (Player | null)[]
  bench: Player[]
  attackRating: number; defenseRating: number; midfieldRating: number; overallRating: number
}

export type EventLevel = 'minor' | 'major' | 'critical'

export interface GameEvent {
  id: string; level: EventLevel; title: string; description: string
  category: 'injury' | 'card' | 'weather' | 'tactical' | 'var'
  options: { id: string; text: string; scoreEffect: number; description: string }[]
}

export interface MatchResult {
  id: string; homeTeam: string; awayTeam: string
  homeScore: number; awayScore: number
  events: { event: GameEvent; chosenOptionId: string }[]
  stats: { possession: number; shots: number; shotsOnTarget: number }
}

export interface GroupRecord {
  teamId: string; teamName: string; flag: string
  played: number; won: number; drawn: number; lost: number
  goalsFor: number; goalsAgainst: number; goalDiff: number; points: number
}

export interface KnockoutMatch {
  id: string; round: '32强'|'16强'|'8强'|'4强'|'季军赛'|'决赛'
  homeTeam: string|null; awayTeam: string|null
  homeScore?: number; awayScore?: number; winner?: string
}

export interface TournamentState {
  groups: Record<string, GroupRecord[]>; groupMatches: MatchResult[]
  bestThirds: GroupRecord[]; knockoutRounds: KnockoutMatch[]
  playerTeamId: string; currentRound: string; isPlayerEliminated: boolean
  // 新增：完整赛事追踪
  playerGroup: string
  playerGroupMatches: MatchResult[]
  currentMatchIndex: number          // 0-2 小组赛, 3=32强, 4=16强...
  currentKnockoutRound: string
  matchSchedule: {
    group: { opponent: string; played: boolean }[]
    knockout: string[]
  }
  playerDiscipline: Record<string, PlayerDiscipline>
  suspendedPlayers: string[]         // 下场停赛的球员ID列表（向后兼容）
  /** 伤停追踪：每次比赛后更新 */
  playerSuspensions: PlayerSuspension[]
}

export type GamePhase = 'home'|'create-team'|'coach'|'formation'|'squad'|'bench'|'team-review'|'match'|'group-standings'|'knockout'|'final-result'|'promo'

// ========== 新比赛事件系统类型 ==========

export type MatchEventTypeV2 =
  | 'goal' | 'goal_opportunity'
  | 'card_yellow' | 'card_red' | 'card_second_yellow'
  | 'injury' | 'injury_minor' | 'injury_major' | 'fatigue'
  | 'var_goal' | 'var_penalty' | 'offside_goal' | 'own_goal'
  | 'big_miss' | 'great_save' | 'tactical'

export type MatchEventSide = 'home' | 'away'

export interface MatchEventOptionV2 {
  id: string
  text: string           // 显示给玩家的文字 (纯足球逻辑，不展示分数变化)
  description: string    // 简短说明
  requiresSubstitution: boolean  // 是否需要弹出替补选择器
  hiddenEffect: {
    homeScoreMod: number
    awayScoreMod: number
    fatigueMod: number
    injuryRiskMod: number
    cardRiskMod: number
  }
}

export interface MatchEventV2 {
  id: string
  minute: number
  type: MatchEventTypeV2
  side: MatchEventSide
  title: string
  description: string
  playerName?: string
  playerId?: string       // 用于红黄牌停赛追踪
  playerPosition?: string // 涉及球员的位置（换人时显示，方便玩家选择同位置替补）
  assistPlayerName?: string // 助攻球员名（仅进球事件）
  interactive: boolean
  options?: MatchEventOptionV2[]
}

export interface PlayerDiscipline {
  yellowCards: number     // 本届赛事累计黄牌
  redCards: number        // 本届赛事累计红牌
  suspended: boolean
  suspendedUntilMatch: number | string  // 停赛到第几场比赛
}

export interface MatchStateV2 {
  homeScore: number
  awayScore: number
  homeScoreMod: number    // 隐式累计
  awayScoreMod: number
  events: MatchEventV2[]
  currentEventIndex: number
  finished: boolean
  goalScorers: { playerName: string; minute: number; side: MatchEventSide }[]
  assists: { playerName: string; minute: number; goalScorer: string }[]
  cards: { playerName: string; playerId: string; type: 'yellow' | 'red'; minute: number }[]
  substitutions: { playerOutName: string; playerInName: string; minute: number }[]
  /** 追蹤球员疲劳累积伤病风险：playerId → 风险值(0-100) */
  playerInjuryRisk: Record<string, number>
  /** 本场受伤球员（仅己方）：赛后需处理 */
  injuriesThisMatch: { playerName: string; playerId: string; type: 'minor' | 'major'; minute: number; originalXiIndex: number }[]
  /** 本场被罚下球员（仅己方）：赛后需处理 */
  sendOffsThisMatch: { playerName: string; playerId: string; minute: number; originalXiIndex: number }[]
  /** ★ 动态进球概率(0-1)：下一次射门由己方得分的概率 */
  goalProbability: number
  /** ★ 概率修正累计值（比赛事件调整，正值为己方有利） */
  probModifier: number
  /** ★ 进球发生率修正系数（默认1.0，全力死守=0.8即总进球降20%） */
  occRateModifier: number
}

/** 球员停赛记录 */
export interface PlayerSuspension {
  playerId: string
  playerName: string
  reason: 'red_card' | 'injury_minor' | 'injury_major'
  /** 停赛到哪场比赛索引（不含） */
  suspendedUntilMatch: number
  /** 原先的首发位置索引 */
  originalXiIndex: number
}
