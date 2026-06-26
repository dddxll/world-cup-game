import type { NationalTeam } from '@/types'

/** AI vs AI: 加权概率模拟比赛结果 */
export function simulateAIMatch(teamA: NationalTeam, teamB: NationalTeam): {
  homeScore: number; awayScore: number
} {
  const diff = teamA.tier - teamB.tier // A比B高几档 (正=强)
  let wp: number, dp: number

  if (diff >= 3) { wp = 0.85; dp = 0.12 }
  else if (diff === 2) { wp = 0.75; dp = 0.18 }
  else if (diff === 1) { wp = 0.62; dp = 0.25 }
  else if (diff === 0) { wp = 0.40; dp = 0.30 }
  else if (diff === -1) { wp = 0.25; dp = 0.30 }
  else if (diff === -2) { wp = 0.15; dp = 0.22 }
  else { wp = 0.07; dp = 0.15 }

  const roll = Math.random()
  if (roll < wp) {
    return { homeScore: 1 + Math.floor(Math.random() * 3), awayScore: Math.floor(Math.random() * 2) }
  } else if (roll < wp + dp) {
    const g = Math.floor(Math.random() * 3)
    return { homeScore: g, awayScore: g }
  } else {
    return { homeScore: Math.floor(Math.random() * 2), awayScore: 1 + Math.floor(Math.random() * 3) }
  }
}
