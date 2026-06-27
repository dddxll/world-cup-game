import { useMemo, useState, useEffect } from 'react'
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
  const { tournament, userTeam } = useGameStore()
  // 自动定位到当前进行中的轮次（而非总是显示32强）
  const defaultIdx = tournament?.currentKnockoutRound
    ? ROUNDS.indexOf(tournament.currentKnockoutRound as any)
    : 0
  const [currentRoundIdx, setCurrentRoundIdx] = useState(defaultIdx >= 0 ? defaultIdx : 0)

  // ★ 同步：当 tournament 推进到新轮次时自动切换标签
  useEffect(() => {
    if (tournament?.currentKnockoutRound) {
      const idx = ROUNDS.indexOf(tournament.currentKnockoutRound as any)
      if (idx >= 0) setCurrentRoundIdx(idx)
    }
  }, [tournament?.currentKnockoutRound])

  // 使用 tournament 真实数据
  const allMatches = tournament?.knockoutRounds || []

  // 按轮次分组
  const bracketByRound = useMemo(() => {
    const map: Record<string, KnockoutMatch[]> = {}
    for (const r of ROUNDS) map[r] = allMatches.filter(m => m.round === r)
    return map
  }, [allMatches])

  const currentRoundName = ROUNDS[currentRoundIdx]
  const currentRoundMatches = bracketByRound[currentRoundName] || []

  // 找到玩家在本轮中的比赛
  const playerMatch = currentRoundMatches.find(
    m => m.homeTeam === '玩家球队' || m.awayTeam === '玩家球队'
  )

  // 检查玩家路径
  const playerProgress = ROUNDS.map(round => {
    const matches = bracketByRound[round] || []
    const pm = matches.find(m => m.homeTeam === '玩家球队' || m.awayTeam === '玩家球队')
    if (!pm) return { round, status: 'future' as const }
    if (pm.winner === '玩家球队') return { round, status: 'won' as const }
    if (pm.winner && pm.winner !== '玩家球队') return { round, status: 'lost' as const }
    if (pm.homeScore !== undefined) return { round, status: 'played' as const }
    return { round, status: 'upcoming' as const }
  })

  const eliminated = tournament?.isPlayerEliminated || false
  const isChampion = playerProgress.some(p => p.round === '决赛' && p.status === 'won')

  return (
    <div className="min-h-screen px-4 py-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-xl font-bold text-center mb-1">🏆 淘汰赛对阵</h1>
        <p className="text-white/40 text-sm text-center mb-4">{userTeam.name}</p>

        {/* 晋级路径指示器 */}
        <div className="flex items-center justify-center gap-1 mb-6 flex-wrap">
          {playerProgress.map((p, i) => (
            <div key={p.round} className="flex items-center gap-1">
              <span className={`px-2 py-1 rounded text-xs font-medium
                ${p.status === 'won' ? 'bg-green-500/20 text-green-400' :
                  p.status === 'lost' ? 'bg-red-500/20 text-red-400' :
                  p.status === 'upcoming' ? 'bg-gold/20 text-gold' :
                  'bg-white/5 text-white/30'}`}>
                {p.status === 'won' ? '✅' : p.status === 'lost' ? '❌' :
                 p.status === 'upcoming' ? '⚡' : '⬜'} {p.round}
              </span>
              {i < ROUNDS.length - 1 && <span className="text-white/20">→</span>}
            </div>
          ))}
        </div>

        {/* 轮次选择器 */}
        <div className="flex gap-2 overflow-x-auto mb-4 pb-2">
          {ROUNDS.map((r, i) => {
            const hasMatches = bracketByRound[r]?.length > 0
            return (
              <button key={r} onClick={() => setCurrentRoundIdx(i)}
                disabled={!hasMatches}
                className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all
                  ${currentRoundIdx === i ? 'bg-gold text-pitch font-bold' :
                    hasMatches ? 'bg-white/10 text-white/50' : 'bg-white/5 text-white/15'}`}>
                {r}
              </button>
            )
          })}
        </div>

        {/* 对阵列表 */}
        <div className="space-y-2 mb-20">
          {currentRoundMatches.length === 0 && (
            <p className="text-white/20 text-center py-8">本轮赛事尚未进行</p>
          )}
          {currentRoundMatches.map(m => {
            const isPlayer = m.homeTeam === '玩家球队' || m.awayTeam === '玩家球队'
            const played = m.homeScore !== undefined
            return (
              <Card key={m.id} className={isPlayer ? 'border-gold/50' : ''}>
                <div className="flex items-center justify-between text-sm">
                  <span className={`flex-1 text-right mr-2 truncate ${m.winner === m.homeTeam ? 'text-gold font-bold' : 'text-white/60'}`}>
                    {m.homeTeam || '?'}
                  </span>
                  <span className={`text-xs font-bold tabular-nums min-w-[3rem] text-center
                    ${played ? 'text-white' : 'text-white/20'}`}>
                    {played ? `${m.homeScore} - ${m.awayScore}` : '? - ?'}
                  </span>
                  <span className={`flex-1 ml-2 truncate ${m.winner === m.awayTeam ? 'text-gold font-bold' : 'text-white/60'}`}>
                    {m.awayTeam || '?'}
                  </span>
                </div>
              </Card>
            )
          })}
        </div>

        {/* 底部操作按钮 */}
        <div className="fixed bottom-0 left-0 right-0 max-w-game mx-auto p-4 bg-gradient-to-t from-pitch via-pitch/95 to-transparent">
          {isChampion ? (
            <Button size="lg" className="w-full" onClick={() => navigate('/final-result')}>
              🏆 查看夺冠结果 <ArrowRight className="inline ml-1" size={18} />
            </Button>
          ) : eliminated ? (
            <Button size="lg" className="w-full" onClick={() => navigate('/final-result')}>
              查看最终成绩 <ArrowRight className="inline ml-1" size={18} />
            </Button>
          ) : playerMatch && !playerMatch.homeScore ? (
            <Button size="lg" className="w-full" onClick={() => navigate(`/match/knockout-${currentRoundName}`)}>
              ⚽ 进行{currentRoundName}比赛 <ArrowRight className="inline ml-1" size={18} />
            </Button>
          ) : (
            <div className="space-y-2">
              <p className="text-white/30 text-xs text-center">选择轮次查看对阵</p>
              <Button variant="secondary" className="w-full" onClick={() => navigate('/final-result')}>
                查看最终成绩
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
