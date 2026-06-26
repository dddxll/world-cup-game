import type { UserTeam, NationalTeam, GameEvent, MatchResult } from '@/types'
import { calculateTeamRatings, getStyleCounterBonus, getFormationCounterBonus } from './rating'

/** 获取对方综合分 (可能是 UserTeam 或 NationalTeam) */
function getAwayInfo(away: UserTeam | NationalTeam): {
  overall: number; style?: string; formId?: string
} {
  if ('coach' in away && away.coach) {
    const r = calculateTeamRatings(away)
    return { overall: r.overall, style: away.coach.style, formId: away.formation?.id }
  }
  const nt = away as NationalTeam
  return {
    overall: Math.round((nt.ratings.attack + nt.ratings.defense + nt.ratings.midfield) / 3),
    style: nt.coachStyle,
  }
}

/** 模拟单场比赛 */
export function simulateMatch(
  home: UserTeam,
  away: UserTeam | NationalTeam,
  chosenEvents: { event: GameEvent; optionId: string }[]
): MatchResult {
  const hr = calculateTeamRatings(home)
  const awayInfo = getAwayInfo(away)

  let P = hr.overall
  const awayP = awayInfo.overall

  // 教练打法克制
  let T = 0
  if (home.coach && awayInfo.style) {
    T += getStyleCounterBonus(home.coach.style, awayInfo.style)
  }

  // 阵型克制
  if (home.formation && awayInfo.formId) {
    T += getFormationCounterBonus(home.formation.id, awayInfo.formId)
  }

  // 事件决策分
  let E = 0
  const evtRecords: { event: GameEvent; chosenOptionId: string }[] = []
  for (const { event, optionId } of chosenEvents) {
    const opt = event.options.find(o => o.id === optionId)
    if (!opt) continue
    let se = opt.scoreEffect
    if (se > 0) se += Math.floor((home.coach?.adp || 0) / 5)  // 高ADP放大正收益
    else if (se < 0 && (home.coach?.adp || 0) >= 15) se = Math.ceil(se / 2) // 高ADP减小负收益
    E += se
    evtRecords.push({ event, chosenOptionId: optionId })
  }

  // 随机波动 ±5%
  const randomFactor = (Math.random() - 0.5) * 0.10

  // 体能消耗
  const fatigueMap: Record<string, number> = {
    '高位压迫': -4, '传控渗透': -2, '两翼齐飞': -3,
    '防守反击': -1, '铁桶大巴': -1,
  }
  const fatigue = home.coach ? (fatigueMap[home.coach.style] || -2) : -2

  const hs = P * 0.55 + T * 0.25 + E * 0.15 + P * randomFactor + fatigue
  const as = awayP * 0.55 + (-T) * 0.25 + awayP * (Math.random() - 0.5) * 0.10
  const diff = hs - as

  // 比分映射
  let hg: number, ag: number
  if (diff > 8) { hg = 3 + Math.floor(Math.random() * 2); ag = Math.floor(Math.random() * 2) }
  else if (diff > 2) { hg = 1 + Math.floor(Math.random() * 2); ag = Math.floor(Math.random() * 2) }
  else if (diff > -2) { hg = Math.floor(Math.random() * 2); ag = Math.floor(Math.random() * 2) }
  else if (diff > -8) { hg = Math.floor(Math.random() * 2); ag = 1 + Math.floor(Math.random() * 2) }
  else { hg = Math.floor(Math.random() * 2); ag = 3 + Math.floor(Math.random() * 2) }

  // 确保分差合理
  if (diff > 2 && hg <= ag) hg = ag + 1 + Math.floor(Math.random() * 2)
  if (diff < -2 && ag <= hg) ag = hg + 1 + Math.floor(Math.random() * 2)

  return {
    id: `match-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    homeTeam: home.name,
    awayTeam: 'name' in away ? (away as NationalTeam).name : (away as UserTeam).name,
    homeScore: hg,
    awayScore: ag,
    events: evtRecords,
    stats: {
      possession: Math.round(Math.min(70, Math.max(30, 50 + diff * 0.8 + (Math.random() - 0.5) * 10))),
      shots: Math.round(10 + hg * 3 + Math.random() * 5),
      shotsOnTarget: Math.round(4 + hg * 2 + Math.random() * 3),
    },
  }
}

/** 淘汰赛模拟 (含加时) */
export function simulateKnockoutMatch(
  home: UserTeam,
  away: UserTeam | NationalTeam,
  events: { event: GameEvent; optionId: string }[]
): MatchResult {
  const result = simulateMatch(home, away, events)
  if (result.homeScore === result.awayScore) {
    // 加时
    const etHome = result.homeScore + (Math.random() > 0.6 ? 1 : 0)
    const etAway = result.awayScore + (Math.random() > 0.6 ? 1 : 0)
    return { ...result, homeScore: etHome, awayScore: etAway }
  }
  return result
}
