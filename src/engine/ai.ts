import type { NationalTeam } from '@/types'

/** AI vs AI: 按 FIFA 分档加权概率模拟比赛结果
 *  一档队对四档队几乎必胜，爆冷概率极低 */
export function simulateAIMatch(teamA: NationalTeam, teamB: NationalTeam): {
  homeScore: number; awayScore: number
} {
  // tierDiff = B的档位 - A的档位，正数=A更强（档位数字小=强）
  const tierDiff = teamB.tier - teamA.tier
  let wp: number, dp: number

  if (tierDiff >= 3)       { wp = 0.92; dp = 0.07 }  // A=1档 B=4档 → A胜92%
  else if (tierDiff === 2)  { wp = 0.82; dp = 0.14 }  // A=1档 B=3档 或 A=2档 B=4档
  else if (tierDiff === 1)  { wp = 0.68; dp = 0.24 }  // A=1档 B=2档 或 A=2档 B=3档
  else if (tierDiff === 0)  { wp = 0.42; dp = 0.30 }  // 同档
  else if (tierDiff === -1) { wp = 0.22; dp = 0.26 }
  else if (tierDiff === -2) { wp = 0.10; dp = 0.16 }
  else                      { wp = 0.05; dp = 0.08 }  // A=4档 B=1档

  const roll = Math.random()
  if (roll < wp) {
    // 强队胜：比分体现优势
    const hg = 1 + Math.floor(Math.random() * 3)
    return { homeScore: hg, awayScore: Math.floor(Math.random() * Math.min(hg, 2)) }
  } else if (roll < wp + dp) {
    const g = Math.floor(Math.random() * 3)
    return { homeScore: g, awayScore: g }
  } else {
    const ag = 1 + Math.floor(Math.random() * 3)
    return { homeScore: Math.floor(Math.random() * Math.min(ag, 2)), awayScore: ag }
  }
}
