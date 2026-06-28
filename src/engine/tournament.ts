import type { UserTeam, NationalTeam, TournamentState, GroupRecord, MatchResult, KnockoutMatch } from '@/types'
import { simulateAIMatch } from './ai'
import { allTeams } from '@/data/teams'

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

/** 初始化并预模拟全部 AI 组比赛 */
export function generateTournament(
  playerTeam: UserTeam,
  teams: NationalTeam[],
  playerGroup: string
): TournamentState {
  const groups: Record<string, GroupRecord[]> = {}
  const groupMatches: MatchResult[] = []
  const playerTeamId = 'PLAYER'

  // 找出玩家所在组中最弱的球队，玩家将替换它（保持每组4队）
  const playerGroupAllTeams = teams.filter(t => t.group === playerGroup)
  // 按「弱→强」排序：tier 大的在前（4=最弱），同 tier 按综合评分低的在前
  const sortedByWeak = [...playerGroupAllTeams].sort((a, b) => {
    if (a.tier !== b.tier) return b.tier - a.tier
    const aAvg = (a.ratings.attack + a.ratings.defense + a.ratings.midfield) / 3
    const bAvg = (b.ratings.attack + b.ratings.defense + b.ratings.midfield) / 3
    return aAvg - bAvg
  })
  const replacedTeam = sortedByWeak[0] // 最弱的被替换
  const remainingAI = playerGroupAllTeams.filter(t => t.id !== replacedTeam.id) // 保留的3支AI队

  for (const g of GROUPS) {
    const gts = teams.filter(t => t.group === g)
    if (g === playerGroup) {
      // 玩家所在组：只保留 3 支较强 AI + 玩家，刚好 4 队
      groups[g] = remainingAI.map(t => ({
        teamId: t.id, teamName: t.name, flag: t.flag,
        played: 0, won: 0, drawn: 0, lost: 0,
        goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0,
      }))
      groups[g].push({
        teamId: playerTeamId, teamName: playerTeam.name, flag: '🎮',
        played: 0, won: 0, drawn: 0, lost: 0,
        goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0,
      })
    } else {
      groups[g] = gts.map(t => ({
        teamId: t.id, teamName: t.name, flag: t.flag,
        played: 0, won: 0, drawn: 0, lost: 0,
        goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0,
      }))
    }
  }

  // AI 组预模拟
  for (const g of GROUPS) {
    if (g === playerGroup) {
      // ★ 玩家所在组：AI 互赛不预模拟，改为每轮后逐场模拟
      //    只初始化积分表，实际比赛在 recordGroupMatchResult 中按轮次跑
    } else {
      const gts = teams.filter(t => t.group === g)
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
    }
    groups[g].sort(sortRecords)
  }

  // 建立玩家小组赛程：对手是保留的 3 支 AI 队
  const groupSchedule = remainingAI.map(t => ({ opponent: t.id, played: false }))

  console.log(
    `[generateTournament] 玩家分入 ${playerGroup} 组，替换 ${replacedTeam.name}(tier${replacedTeam.tier})，` +
    `对手: ${remainingAI.map(t => t.name).join('、')}`
  )

  return {
    groups, groupMatches, bestThirds: [], knockoutRounds: [],
    playerTeamId, currentRound: 'group', isPlayerEliminated: false,
    playerGroup, playerGroupMatches: [], currentMatchIndex: 0,
    currentKnockoutRound: '',
    matchSchedule: { group: groupSchedule, knockout: [] },
    playerDiscipline: {},
    suspendedPlayers: [],
    playerSuspensions: [],
  }
}

// ============================================================
// 小组赛
// ============================================================

/** 获取玩家当前小组赛对手 */
export function getCurrentGroupOpponent(tournament: TournamentState, teams?: NationalTeam[]): NationalTeam | null {
  const idx = tournament.currentMatchIndex
  if (idx >= tournament.matchSchedule.group.length) return null
  const oppId = tournament.matchSchedule.group[idx].opponent
  const pool = teams || allTeams
  return pool.find(t => t.id === oppId) || null
}

/** 记录玩家小组赛结果并更新积分 */
export function recordGroupMatchResult(
  tournament: TournamentState,
  result: MatchResult,
  opponentId: string
): TournamentState {
  const next = { ...tournament }
  const idx = next.currentMatchIndex

  // 标记已赛
  if (idx < next.matchSchedule.group.length) {
    next.matchSchedule = {
      ...next.matchSchedule,
      group: next.matchSchedule.group.map((s, i) =>
        i === idx ? { ...s, played: true } : s
      ),
    }
  }

  // 记录结果
  next.playerGroupMatches = [...next.playerGroupMatches, result]

  // 更新小组积分
  // ★ 深拷贝小组记录后再修改（避免 mutation 导致 React 不重渲染）
  next.groups = { ...next.groups }
  next.groups[next.playerGroup] = next.groups[next.playerGroup].map(r => ({ ...r }))
  updateGroupRecord(
    next.groups[next.playerGroup],
    next.playerTeamId,
    opponentId,
    result.homeScore,
    result.awayScore
  )

  // ★ 同轮 AI 互赛模拟（玩家所在组的另一场比赛）
  const groupTeams = next.groups[next.playerGroup]
  const otherTeams = groupTeams.filter(r => r.teamId !== next.playerTeamId && r.teamId !== opponentId)
  if (otherTeams.length >= 2) {
    const teamA = allTeams.find(t => t.id === otherTeams[0].teamId)
    const teamB = allTeams.find(t => t.id === otherTeams[1].teamId)
    if (teamA && teamB) {
      const r = simulateAIMatch(teamA, teamB)
      updateGroupRecord(next.groups[next.playerGroup], teamA.id, teamB.id, r.homeScore, r.awayScore)
    }
  }

  // 排序
  next.groups[next.playerGroup].sort(sortRecords)

  // 推进比赛索引
  next.currentMatchIndex = idx + 1

  // 检查小组赛是否结束
  if (next.currentMatchIndex >= 3) {
    next.bestThirds = getBestThirds(next.groups)
    const playerRecord = next.groups[next.playerGroup].find(r => r.teamId === next.playerTeamId)
    if (playerRecord) {
      const playerRank = next.groups[next.playerGroup].indexOf(playerRecord) + 1
      if (playerRank <= 2) {
        // 前两名直接晋级
        next.currentRound = 'knockout'
        next.currentKnockoutRound = '32强'
        next.knockoutRounds = generateKnockoutBracket(next.playerTeamId, next.playerGroup, playerRank, next.groups)
      } else if (playerRank === 3 && next.bestThirds.some(t => t.teamId === next.playerTeamId)) {
        // 最佳第三晋级
        next.currentRound = 'knockout'
        next.currentKnockoutRound = '32强'
        next.knockoutRounds = generateKnockoutBracket(next.playerTeamId, next.playerGroup, 3, next.groups)
      } else {
        next.isPlayerEliminated = true
      }
    }
  }

  return next
}

/** 判断小组赛是否全部完成 */
export function isGroupStageComplete(tournament: TournamentState): boolean {
  return tournament.currentMatchIndex >= 3 || tournament.isPlayerEliminated
}

// ============================================================
// 淘汰赛
// ============================================================

/** 生成淘汰赛签表 (32强) — 基于真实小组赛结果 */
export function generateKnockoutBracket(
  playerTeamId: string,
  playerGroup: string,
  playerGroupRank: number,
  groups: Record<string, GroupRecord[]>
): KnockoutMatch[] {
  // ★ 从小组赛结果选出 32 支晋级队伍
  const allQualified: { id: string; name: string; flag: string; pts: number; gd: number; gf: number; rank: number; group: string }[] = []

  for (const g of GROUPS) {
    const sorted = [...groups[g]].sort(sortRecords)
    // 前两名直接晋级
    for (let i = 0; i < 2; i++) {
      if (sorted[i]) {
        allQualified.push({
          id: sorted[i].teamId, name: sorted[i].teamName, flag: sorted[i].flag,
          rank: i + 1,
          group: g,
          pts: sorted[i].points,
          gd: sorted[i].goalDiff,
          gf: sorted[i].goalsFor,
        })
      }
    }
  }

  // 最佳8个小组第三
  const allThirds: { id: string; name: string; flag: string; pts: number; gd: number; gf: number; rank: number; group: string }[] = []
  for (const g of GROUPS) {
    const sorted = [...groups[g]].sort(sortRecords)
    if (sorted.length >= 3 && sorted[2]) {
      allThirds.push({
        id: sorted[2].teamId, name: sorted[2].teamName, flag: sorted[2].flag,
        rank: 3,
        group: g,
        pts: sorted[2].points,
        gd: sorted[2].goalDiff,
        gf: sorted[2].goalsFor,
      })
    }
  }
  // 按积分→净胜球→进球排序，取前8
  allThirds.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf)
  const bestThirds = allThirds.slice(0, 8)
  allQualified.push(...bestThirds)

  // ★ 按小组赛表现排序（积分→净胜球→进球），用于种子排位
  //    玩家固定放在首位（主场优势）
  allQualified.sort((a, b) => {
    if (a.id === playerTeamId) return -1
    if (b.id === playerTeamId) return 1
    return b.pts - a.pts || b.gd - a.gd || b.gf - a.gf
  })

  // ★ 蛇形排位：1v32, 16v17, 8v25, 9v24, 4v29, 13v20, 5v28, 12v21,
  //             2v31, 15v18, 7v26, 10v23, 3v30, 14v19, 6v27, 11v22
  // 确保高种子分散在不同分区
  const n = allQualified.length
  const matchups: { home: typeof allQualified[0]; away: typeof allQualified[0] }[] = []
  const used = new Set<number>()
  for (let i = 0; i < n / 2; i++) {
    // 蛇形排位：上半区种子 vs 下半区低种子
    const home = allQualified[i]
    const away = allQualified[n - 1 - i]
    matchups.push({ home, away })
  }

  // 构建淘汰赛轮次
  const rounds: KnockoutMatch[] = []
  const roundNames = ['32强', '16强', '8强', '4强', '季军赛', '决赛']

  for (let i = 0; i < matchups.length; i++) {
    const m = matchups[i]
    // ★ 玩家在 bracket 中统一用 '玩家球队'
    const hName = m.home.id === playerTeamId ? '玩家球队' : m.home.name
    const aName = m.away.id === playerTeamId ? '玩家球队' : m.away.name
    rounds.push({
      id: `KO-32强-${i}`,
      round: '32强',
      homeTeam: hName,
      awayTeam: aName,
    })
  }

  // 后续轮次用占位符
  let teams = Array.from({ length: 16 }, () => ({ id: '', name: '?', flag: '' }))
  for (let r = 1; r < 4; r++) {
    const roundName = roundNames[r]
    for (let i = 0; i < teams.length; i += 2) {
      rounds.push({
        id: `KO-${roundName}-${i / 2}`,
        round: roundName as KnockoutMatch['round'],
        homeTeam: null,
        awayTeam: null,
      })
    }
    teams = Array.from({ length: teams.length / 2 }, () => ({ id: '', name: '?', flag: '' }))
  }

  // 季军赛 + 决赛
  rounds.push({ id: 'KO-季军赛-0', round: '季军赛', homeTeam: null, awayTeam: null })
  rounds.push({ id: 'KO-决赛-0', round: '决赛', homeTeam: null, awayTeam: null })

  return rounds
}

/** 获取当前淘汰赛比赛信息 */
export function getCurrentKnockoutMatch(tournament: TournamentState): KnockoutMatch | null {
  const currentRound = tournament.currentKnockoutRound || '32强'
  const matches = tournament.knockoutRounds.filter(m => m.round === currentRound)
  // 找到玩家参与的未赛比赛
  for (const m of matches) {
    if (
      (m.homeTeam === '玩家球队' || m.awayTeam === '玩家球队') &&
      m.homeScore === undefined
    ) {
      return m
    }
  }
  return null
}

/** 获取淘汰赛对手 (NationalTeam) */
export function getKnockoutOpponent(match: KnockoutMatch): NationalTeam | null {
  const oppName = match.homeTeam === '玩家球队' ? match.awayTeam : match.homeTeam
  if (!oppName || oppName === '?') {
    // ★ 对手未确定：随机选一支球队（排除已淘汰的）
    const pool = allTeams.filter(t => t.name !== '玩家球队')
    return pool[Math.floor(Math.random() * pool.length)] || allTeams[0]
  }
  return allTeams.find(t => t.name === oppName) || null
}

/** 记录淘汰赛结果 */
export function recordKnockoutResult(
  tournament: TournamentState,
  matchId: string,
  homeScore: number,
  awayScore: number,
  playerWon: boolean
): TournamentState {
  const next = { ...tournament }
  const winnerName = (homeScore > awayScore
    ? next.knockoutRounds.find(m => m.id === matchId)?.homeTeam
    : next.knockoutRounds.find(m => m.id === matchId)?.awayTeam) || undefined

  next.knockoutRounds = next.knockoutRounds.map(m => {
    if (m.id === matchId) {
      return {
        ...m,
        homeScore,
        awayScore,
        winner: winnerName,
      }
    }
    return m
  })

  // ★ 淘汰赛也推进 currentMatchIndex（用于伤停计时）
  next.currentMatchIndex = (next.currentMatchIndex || 3) + 1

  if (!playerWon) {
    // ★ 半决赛输 → 去季军赛
    if (next.currentKnockoutRound === '4强') {
      next.currentKnockoutRound = '季军赛'
      next.currentRound = 'knockout'
      const thirdPlaceMatch = next.knockoutRounds.find(m => m.round === '季军赛')
      if (thirdPlaceMatch) {
        next.knockoutRounds = next.knockoutRounds.map(m => {
          if (m.id === thirdPlaceMatch.id) {
            return { ...m, homeTeam: '玩家球队' }
          }
          return m
        })
      }
      return next
    }
    // ★ 季军赛输 → 正常结束，不淘汰
    if (next.currentKnockoutRound === '季军赛') {
      next.currentRound = 'finished'
      return next
    }
    next.isPlayerEliminated = true
    return next
  }

  // 推进到下一轮（季军赛后直接结束）
  // ★ 正确顺序：半决赛胜者→决赛，败者→季军赛
  const roundOrder = ['32强', '16强', '8强', '4强', '决赛', '季军赛']
  const currentIdx = roundOrder.indexOf(next.currentKnockoutRound)
  if (next.currentKnockoutRound === '季军赛' || next.currentKnockoutRound === '决赛') {
    next.currentRound = 'finished'
  } else if (currentIdx >= 0 && currentIdx < roundOrder.length - 1) {
    next.currentKnockoutRound = roundOrder[currentIdx + 1]
    next.currentRound = 'knockout'

    // ---- 关键修复：将胜者传播到下一轮 ----
    const nextRoundName = roundOrder[currentIdx + 1]
    // 计算胜者在下一轮的位置（match ID 序号）
    const currentMatchNum = parseInt(matchId.split('-').pop() || '0', 10)
    const nextMatchIdx = Math.floor(currentMatchNum / 2)
    const nextMatchId = `KO-${nextRoundName}-${nextMatchIdx}`

    next.knockoutRounds = next.knockoutRounds.map(m => {
      if (m.id === nextMatchId) {
        // 上半区（偶数序号）→ homeTeam，下半区（奇数序号）→ awayTeam
        const isHome = currentMatchNum % 2 === 0
        return {
          ...m,
          [isHome ? 'homeTeam' : 'awayTeam']: winnerName,
        }
      }
      return m
    })
  } else {
    next.currentRound = 'finished'
  }

  // ★ 自动模拟同轮其他未赛比赛，填充下一轮对手
  const winnerNextRound: Record<string, string> = { '32强':'16强', '16强':'8强', '8强':'4强', '4强':'决赛' }
  const justFinishedRound = roundOrder[roundOrder.indexOf(next.currentKnockoutRound) - 1]
  if (justFinishedRound && winnerNextRound[justFinishedRound]) {
    const unplayed = next.knockoutRounds.filter(m =>
      m.round === justFinishedRound && m.homeScore === undefined &&
      m.homeTeam && m.awayTeam && m.homeTeam !== '?' && m.awayTeam !== '?'
    )
    for (const m of unplayed) {
      // ★ 基于球队实力计算比分（而非纯随机）
      const teamH = allTeams.find(t => t.name === m.homeTeam)
      const teamA = allTeams.find(t => t.name === m.awayTeam)
      const ratingH = teamH ? Math.round((teamH.ratings.attack + teamH.ratings.defense + teamH.ratings.midfield) / 3) : 50
      const ratingA = teamA ? Math.round((teamA.ratings.attack + teamA.ratings.defense + teamA.ratings.midfield) / 3) : 50
      // 强队胜率基于实力差：diff越大胜率越高
      const ratingDiff = ratingH - ratingA
      const hWinProb = Math.min(0.85, Math.max(0.15, 0.50 + ratingDiff * 0.015))
      const roll = Math.random()
      let h: number, a: number
      if (roll < hWinProb) {
        h = 1 + Math.floor(Math.random() * 3)
        a = Math.floor(Math.random() * 2)
      } else {
        h = Math.floor(Math.random() * 2)
        a = 1 + Math.floor(Math.random() * 3)
      }
      // 平局概率（实力接近时更高）
      if (Math.abs(ratingDiff) < 5 && Math.random() < 0.25) {
        const g = Math.floor(Math.random() * 3)
        h = g; a = g
      }
      const winner = h > a ? m.homeTeam! : a > h ? m.awayTeam! : (Math.random() < 0.5 ? m.homeTeam! : m.awayTeam!)
      next.knockoutRounds = next.knockoutRounds.map(x =>
        x.id === m.id ? { ...x, homeScore: h, awayScore: a, winner } : x
      )
      // 传播胜者到下一轮
      const mNum = parseInt(m.id.split('-').pop() || '0', 10)
      const nextMIdx = Math.floor(mNum / 2)
      const nextRName = winnerNextRound[justFinishedRound]
      const nextMId = `KO-${nextRName}-${nextMIdx}`
      const isHome = mNum % 2 === 0
      next.knockoutRounds = next.knockoutRounds.map(x =>
        x.id === nextMId ? { ...x, [isHome ? 'homeTeam' : 'awayTeam']: winner } : x
      )
    }
  }

  return next
}

// ============================================================
// 小组积分和排名
// ============================================================

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

/** 获取玩家小组排名 */
export function getPlayerGroupRank(tournament: TournamentState): number {
  const records = tournament.groups[tournament.playerGroup] || []
  const idx = records.findIndex(r => r.teamId === tournament.playerTeamId)
  return idx >= 0 ? idx + 1 : 4
}

/** 判断玩家是否小组出线 */
export function isPlayerAdvanced(tournament: TournamentState): boolean {
  if (tournament.isPlayerEliminated) return false
  if (tournament.currentRound === 'knockout' || tournament.currentRound === 'finished') return true
  // 检查小组排名
  const rank = getPlayerGroupRank(tournament)
  if (rank <= 2) return true
  if (rank === 3 && tournament.bestThirds.some(t => t.teamId === tournament.playerTeamId)) return true
  return false
}

/** 获取玩家淘汰轮次对应的名次描述 */
export function getFinalRankText(tournament: TournamentState): string {
  if (!tournament.isPlayerEliminated && tournament.currentRound === 'finished') {
    // 检查决赛结果
    const finalMatch = tournament.knockoutRounds.find(m => m.round === '决赛')
    if (finalMatch?.winner === '玩家球队') return '🏆 世界杯冠军！'
    if (finalMatch && (finalMatch.homeTeam === '玩家球队' || finalMatch.awayTeam === '玩家球队')) {
      return '🥈 亚军'
    }
    // 检查季军赛结果
    const thirdMatch = tournament.knockoutRounds.find(m => m.round === '季军赛')
    if (thirdMatch?.winner === '玩家球队') return '🥉 季军'
    if (thirdMatch && (thirdMatch.homeTeam === '玩家球队' || thirdMatch.awayTeam === '玩家球队')) {
      return '🏅 殿军（第四名）'
    }
    return '赛事结束'
  }

  if (!tournament.isPlayerEliminated) return '赛事进行中...'

  if (tournament.currentRound === 'group') {
    const rank = getPlayerGroupRank(tournament)
    return `小组赛第 ${rank} 名`
  }

  const round = tournament.currentKnockoutRound || '32强'
  const labels: Record<string, string> = {
    '32强': '32强 (第17-32名)',
    '16强': '16强',
    '8强': '8强',
    '4强': '4强',
    '季军赛': '殿军',
    '决赛': '🥈 亚军',
  }
  return labels[round] || round
}
