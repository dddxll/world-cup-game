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
}

export type GamePhase = 'home'|'pk-mode'|'create-team'|'coach'|'formation'|'squad'|'bench'|'team-review'|'match'|'group-standings'|'knockout'|'final-result'|'pk-compare'|'promo'

export interface PkData {
  playerA: { team: UserTeam; result: TournamentState|null }|null
  playerB: { team: UserTeam; result: TournamentState|null }|null
  currentPlayer: 'A'|'B'
}
