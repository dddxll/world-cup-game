import type { UserTeam, NationalTeam, TournamentState, GroupRecord, MatchResult } from '@/types'
import { simulateAIMatch } from './ai'

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

/** 初始化并预模拟全部 AI 组比赛 */
export function generateTournament(
  playerTeam: UserTeam,
  allTeams: NationalTeam[],
  playerGroup: string
): TournamentState {
  const groups: Record<string, GroupRecord[]> = {}
  const groupMatches: MatchResult[] = []
  const playerTeamId = 'PLAYER'

  for (const g of GROUPS) {
    const gts = allTeams.filter(t => t.group === g)
    groups[g] = gts.map(t => ({
      teamId: t.id, teamName: t.name, flag: t.flag,
      played: 0, won: 0, drawn: 0, lost: 0,
      goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0,
    }))
    if (g === playerGroup) {
      groups[g].push({
        teamId: playerTeamId, teamName: playerTeam.name, flag: '🎮',
        played: 0, won: 0, drawn: 0, lost: 0,
        goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0,
      })
    }
  }

  // AI 组预模拟
  for (const g of GROUPS) {
    if (g === playerGroup) continue
    const gts = allTeams.filter(t => t.group === g)
    for (let i = 0; i < gts.length; i++) {
      for (let j = i + 1; j < gts.length; j++) {
        const r = simulateAIMatch(gts[i], gts[j])
        groupMatches.push({
          id: `AI-${g}-${i}-${j}`,
          homeTeam: gts[i].name,
          awayTeam: gts[j].name,
          homeScore: r.homeScore,
          awayScore: r.awayScore,
          events: [],
          stats: { possession: 50, shots: 10, shotsOnTarget: 4 },
        })
        updateGroupRecord(groups[g], gts[i].id, gts[j].id, r.homeScore, r.awayScore)
      }
    }
    groups[g].sort(sortRecords)
  }

  return {
    groups, groupMatches, bestThirds: [], knockoutRounds: [],
    playerTeamId, currentRound: 'group', isPlayerEliminated: false,
  }
}

/** 更新小组积分 */
export function updateGroupRecord(
  records: GroupRecord[],
  aid: string, bid: string,
  sa: number, sb: number
) {
  const a = records.find(r => r.teamId === aid)
  const b = records.find(r => r.teamId === bid)
  if (!a || !b) return
  a.played++; b.played++
  a.goalsFor += sa; a.goalsAgainst += sb
  b.goalsFor += sb; b.goalsAgainst += sa
  a.goalDiff = a.goalsFor - a.goalsAgainst
  b.goalDiff = b.goalsFor - b.goalsAgainst
  if (sa > sb) { a.won++; a.points += 3; b.lost++ }
  else if (sa < sb) { b.won++; b.points += 3; a.lost++ }
  else { a.drawn++; b.drawn++; a.points++; b.points++ }
}

/** 小组排名: 积分→净胜球→进球 */
export function sortRecords(a: GroupRecord, b: GroupRecord): number {
  if (a.points !== b.points) return b.points - a.points
  if (a.goalDiff !== b.goalDiff) return b.goalDiff - a.goalDiff
  return b.goalsFor - a.goalsFor
}

/** 获取最佳 8 个小组第三 */
export function getBestThirds(groups: Record<string, GroupRecord[]>): GroupRecord[] {
  const thirds: GroupRecord[] = []
  for (const g of GROUPS) {
    const sorted = [...groups[g]].sort(sortRecords)
    if (sorted.length >= 3) thirds.push(sorted[2])
  }
  return thirds.sort(sortRecords).slice(0, 8)
}
