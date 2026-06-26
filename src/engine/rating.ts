import type { UserTeam, Player, Position } from '@/types'

// 打法克制表
const STYLE_COUNTER: Record<string, string[]> = {
  '高位压迫': ['传控渗透', '两翼齐飞'],
  '传控渗透': ['防守反击', '铁桶大巴'],
  '防守反击': ['高位压迫', '两翼齐飞'],
  '两翼齐飞': ['铁桶大巴', '防守反击'],
  '铁桶大巴': ['高位压迫', '两翼齐飞'],
}

// 阵型克制表
const FORMATION_COUNTER: Record<string, string[]> = {
  '4-3-3': ['4-4-2'],
  '4-2-3-1': ['4-3-3', '4-4-2'],
  '4-4-2': ['3-5-2', '5-3-2'],
  '3-5-2': ['4-2-3-1', '4-4-2'],
  '5-3-2': ['4-3-3', '3-4-3'],
  '4-1-4-1': ['4-2-3-1', '3-5-2'],
  '3-4-3': ['3-5-2', '4-1-4-1'],
  '4-3-2-1': ['4-2-3-1'],
}

// 位置对应的能力权重
const POSITION_WEIGHTS: Record<Position, Partial<Record<keyof Player['stats'], number>>> = {
  GK: { defending: 1, physical: 0.5, speed: 0.3 },
  CB: { defending: 1, physical: 0.8, speed: 0.4 },
  LB: { speed: 0.8, defending: 0.7, passing: 0.5, physical: 0.5 },
  RB: { speed: 0.8, defending: 0.7, passing: 0.5, physical: 0.5 },
  LWB: { speed: 0.9, passing: 0.6, defending: 0.5, physical: 0.6 },
  RWB: { speed: 0.9, passing: 0.6, defending: 0.5, physical: 0.6 },
  CDM: { defending: 0.8, passing: 0.6, physical: 0.7 },
  CM: { passing: 0.8, shooting: 0.4, defending: 0.4, physical: 0.5 },
  CAM: { passing: 0.8, shooting: 0.7, speed: 0.5 },
  LM: { speed: 0.8, passing: 0.6, shooting: 0.4 },
  RM: { speed: 0.8, passing: 0.6, shooting: 0.4 },
  LW: { speed: 0.9, shooting: 0.7, passing: 0.5 },
  RW: { speed: 0.9, shooting: 0.7, passing: 0.5 },
  ST: { shooting: 1, speed: 0.5, physical: 0.6 },
}

// 相近位置映射表
const NEAR_POSITIONS: Record<Position, Position[]> = {
  GK: [], CB: ['LB', 'RB', 'LWB', 'RWB'],
  LB: ['LWB', 'RB', 'CB'], RB: ['RWB', 'LB', 'CB'],
  LWB: ['LB', 'LM'], RWB: ['RB', 'RM'],
  CDM: ['CM', 'CAM'], CM: ['CDM', 'CAM', 'LM', 'RM'],
  CAM: ['CM', 'CDM', 'LW', 'RW'],
  LM: ['LW', 'LWB', 'CM'], RM: ['RW', 'RWB', 'CM'],
  LW: ['LM', 'RW', 'ST'], RW: ['RM', 'LW', 'ST'],
  ST: ['LW', 'RW', 'CAM'],
}

/** 球员在特定位置的位置匹配度 (0-1) */
export function getPositionMatch(player: Player, target: Position): number {
  if (player.positions.includes(target)) return 1.0
  if (player.positions.some(p => (NEAR_POSITIONS[target] || []).includes(p))) return 0.8
  return 0.5
}

/** 球员在特定位置的有效评分 (综合能力加权×位置匹配度) */
export function getEffectiveRating(player: Player, position: Position): number {
  const w = POSITION_WEIGHTS[position] || {}
  let ws = 0, tw = 0
  for (const k of ['speed', 'shooting', 'passing', 'defending', 'physical'] as const) {
    ws += player.stats[k] * (w[k] || 0)
    tw += w[k] || 0
  }
  const baseRating = tw > 0 ? ws / tw : player.rating
  return baseRating * getPositionMatch(player, position)
}

/** 计算球队进攻/防守/中场/综合评分 */
export function calculateTeamRatings(team: UserTeam): {
  attack: number; defense: number; midfield: number; overall: number
} {
  const { startingXI, formation, coach } = team
  if (!formation || !coach) return { attack: 0, defense: 0, midfield: 0, overall: 0 }

  const pos = formation.positions
  let fSum = 0, fCnt = 0, dSum = 0, dCnt = 0, mSum = 0, mCnt = 0

  for (let i = 0; i < pos.length; i++) {
    if (!startingXI[i]) continue
    const er = getEffectiveRating(startingXI[i]!, pos[i])
    if (['ST', 'LW', 'RW'].includes(pos[i])) { fSum += er; fCnt++ }
    else if (['CM', 'CDM', 'CAM', 'LM', 'RM'].includes(pos[i])) { mSum += er; mCnt++ }
    else { dSum += er; dCnt++ }
  }

  // 边卫进攻贡献
  let fbBonus = 0
  for (let i = 0; i < pos.length; i++) {
    if (['LB', 'RB', 'LWB', 'RWB'].includes(pos[i]) && startingXI[i]) {
      fbBonus += (startingXI[i]!.stats.speed + startingXI[i]!.stats.passing) / 2
    }
  }

  // 后腰 & 门将
  let cdmBonus = 0, gkBonus = 0
  for (let i = 0; i < pos.length; i++) {
    if (pos[i] === 'CDM' && startingXI[i]) cdmBonus = getEffectiveRating(startingXI[i]!, 'CDM') * 0.25
    if (pos[i] === 'GK' && startingXI[i]) gkBonus = getEffectiveRating(startingXI[i]!, 'GK') * 0.25
  }

  const avgF = fCnt > 0 ? fSum / fCnt : 50
  const avgM = mCnt > 0 ? mSum / mCnt : 50
  const avgD = dCnt > 0 ? dSum / dCnt : 50

  const attack = Math.round(avgF * 0.5 + avgM * 0.3 + fbBonus * 0.2 + coach.att)
  const defense = Math.round(avgD * 0.5 + cdmBonus + gkBonus + coach.def)
  const midfield = Math.round(avgM * 0.6 + (cdmBonus / 0.25) * 0.4)
  const overall = Math.round(attack * 0.35 + defense * 0.35 + midfield * 0.30)
  return { attack, defense, midfield, overall }
}

/** 教练打法克制加成 */
export function getStyleCounterBonus(myStyle: string, oppStyle: string): number {
  if (STYLE_COUNTER[myStyle]?.includes(oppStyle)) return 8
  if (STYLE_COUNTER[oppStyle]?.includes(myStyle)) return -8
  return 0
}

/** 阵型克制加成 */
export function getFormationCounterBonus(myFormId: string, oppFormId: string): number {
  if (FORMATION_COUNTER[myFormId]?.includes(oppFormId)) return 5
  if (FORMATION_COUNTER[oppFormId]?.includes(myFormId)) return -5
  return 0
}

/** 变阵惩罚/奖励(ADP高的教练惩罚小) */
export function getFormationChangePenalty(coachAdp: number, isFamiliar: boolean, countersOpp: boolean): number {
  if (isFamiliar) return countersOpp ? 5 : 0
  const base = coachAdp >= 15 ? -2 : -5
  return countersOpp ? base + 5 : base
}
