import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useGameStore } from '@/store/gameStore'
import { ArrowRight } from 'lucide-react'
import type { KnockoutMatch } from '@/types'

const ROUNDS: KnockoutMatch['round'][] = ['32强', '16强', '8强', '4强', '季军赛', '决赛']

export default function KnockoutPage() {
  const navigate = useNavigate()
  const { tournament, userTeam, pkData } = useGameStore()
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0)

  // 生成本地淘汰赛对阵(模拟)
  const bracket = useMemo(() => {
    if (!tournament) return []
    // 从小组赛晋级队生成 32 强对阵
    const qualified: string[] = [userTeam.name]
    // 添加 AI 晋级队
    for (const [, records] of Object.entries(tournament.groups)) {
      const sorted = [...records].sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff)
      for (const r of sorted.slice(0, 2)) {
        if (r.teamName !== userTeam.name && !qualified.includes(r.teamName)) {
          qualified.push(r.teamName)
        }
      }
    }

    // 生成对阵树
    const matches: KnockoutMatch[][] = []
    let teams = qualified.slice(0, 32)

    for (const round of ROUNDS) {
      const roundMatches: KnockoutMatch[] = []
      for (let i = 0; i < teams.length; i += 2) {
        const isPlayerMatch = teams[i] === userTeam.name || teams[i + 1] === userTeam.name
        // 模拟结果
        const playerWins = teams[i] === userTeam.name
          ? (Math.random() > 0.4)
          : (teams[i + 1] === userTeam.name ? (Math.random() > 0.4) : Math.random() > 0.5)
        const winner = playerWins ? teams[i] : teams[i + 1]

        roundMatches.push({
          id: `${round}-${i / 2}`,
          round,
          homeTeam: teams[i],
          awayTeam: teams[i + 1],
          homeScore: Math.floor(Math.random() * 3),
          awayScore: Math.floor(Math.random() * 3),
          winner: isPlayerMatch ? userTeam.name : winner,
        })
      }
      matches.push(roundMatches)
      teams = roundMatches.map(m => m.winner!).filter(Boolean)
    }
    return matches
  }, [tournament, userTeam.name])

  const currentRound = bracket[currentRoundIdx] || []
  const playerMatches = bracket.map(round =>
    round.find(m => m.homeTeam === userTeam.name || m.awayTeam === userTeam.name)
  )
  const playerEliminated = playerMatches.some(m => m && m.winner !== userTeam.name)

  return (
    <div className="min-h-screen px-4 py-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        {pkData.playerA && <p className="text-gold text-center mb-2 font-bold">⚔️ 玩家 {pkData.currentPlayer}</p>}
        <h1 className="text-xl font-bold text-center mb-4">🏆 淘汰赛对阵</h1>

        {/* 晋级路径指示器 */}
        <div className="flex items-center justify-center gap-1 mb-6 flex-wrap">
          {ROUNDS.map((r, i) => {
            const pm = playerMatches[i]
            const passed = pm && pm.winner === userTeam.name
            const failed = pm && pm.winner !== userTeam.name
            return (
              <div key={r} className="flex items-center gap-1">
                <span className={`px-2 py-1 rounded text-xs font-medium
                  ${passed ? 'bg-green-500/20 text-green-400' : failed ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white/30'}`}>
                  {passed ? '✅' : failed ? '❌' : '⬜'} {r}
                </span>
                {i < ROUNDS.length - 1 && <span className="text-white/20">→</span>}
              </div>
            )
          })}
        </div>

        {/* 轮次选择器 */}
        <div className="flex gap-2 overflow-x-auto mb-4 pb-2">
          {ROUNDS.map((r, i) => (
            <button key={r} onClick={() => setCurrentRoundIdx(i)}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all
                ${currentRoundIdx === i ? 'bg-gold text-pitch font-bold' : 'bg-white/10 text-white/50'}`}>
              {r}
            </button>
          ))}
        </div>

        {/* 对阵列表 */}
        <div className="space-y-2 mb-20">
          {currentRound.map(m => {
            const isPlayer = m.homeTeam === userTeam.name || m.awayTeam === userTeam.name
            return (
              <Card key={m.id} className={isPlayer ? 'border-gold/50' : ''}>
                <div className="flex items-center justify-between text-sm">
                  <span className={`flex-1 text-right mr-2 truncate ${m.winner === m.homeTeam ? 'text-gold font-bold' : 'text-white/60'}`}>
                    {m.homeTeam}
                  </span>
                  <span className="text-white/40 text-xs">{m.homeScore ?? '?'} - {m.awayScore ?? '?'}</span>
                  <span className={`flex-1 ml-2 truncate ${m.winner === m.awayTeam ? 'text-gold font-bold' : 'text-white/60'}`}>
                    {m.awayTeam}
                  </span>
                </div>
              </Card>
            )
          })}
        </div>

        {/* 底部操作按钮 */}
        <div className="fixed bottom-0 left-0 right-0 max-w-game mx-auto p-4 bg-gradient-to-t from-pitch via-pitch/95 to-transparent">
          <Button size="lg" className="w-full" onClick={() => navigate(playerEliminated ? '/final-result' : '/match/knockout-1')}>
            {playerEliminated ? '查看最终成绩' : '下一场比赛'} <ArrowRight className="inline ml-1" size={18} />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
