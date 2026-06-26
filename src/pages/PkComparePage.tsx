import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useGameStore } from '@/store/gameStore'
import { Trophy, Medal, RotateCcw } from 'lucide-react'

// 轮次分数映射
const ROUND_SCORE: Record<string, number> = {
  '冠军': 7, '亚军': 6, '季军': 5, '4强': 4, '8强': 3, '16强': 2, '32强': 1, '小组赛': 0,
}

function getRoundLabel(tournament: any): string {
  if (!tournament) return '未完成'
  if (tournament.isPlayerEliminated) return '小组赛'
  // 简化判定
  return '16强'
}

export default function PkComparePage() {
  const navigate = useNavigate()
  const { pkData, resetGame } = useGameStore()

  const a = pkData.playerA
  const b = pkData.playerB
  if (!a || !b) { navigate('/'); return null }

  const aRound = getRoundLabel(a.result)
  const bRound = getRoundLabel(b.result)
  const aScore = ROUND_SCORE[aRound] || 0
  const bScore = ROUND_SCORE[bRound] || 0

  const winner = aScore > bScore ? 'A' : bScore > aScore ? 'B' : null
  const aRatings = a.team.overallRating
  const bRatings = b.team.overallRating

  return (
    <div className="min-h-screen px-4 py-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-2xl font-bold text-center mb-2">⚔️ 双人 PK 结果</h1>

        {winner && (
          <div className="text-center mb-6">
            <Trophy size={48} className="text-gold mx-auto mb-2" />
            <p className="text-xl font-bold text-gold">玩家 {winner} 获胜！</p>
          </div>
        )}
        {!winner && (
          <p className="text-center text-white/40 mb-6">势均力敌！打平了 🤝</p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* 玩家 A */}
          <Card className={winner === 'A' ? 'border-gold shadow-gold/20' : ''}>
            <h2 className="text-center font-bold mb-2" style={{ color: a.team.color }}>玩家 A</h2>
            <p className="text-white/80 text-center truncate">{a.team.name}</p>
            <div className="text-center my-2">
              <span className="text-3xl font-bold text-gold">{aRatings}</span>
            </div>
            <p className="text-white/50 text-center text-sm">{a.team.coach?.name}</p>
            <p className="text-white/50 text-center text-sm">{a.team.formation?.name}</p>
            <div className="text-center mt-2">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold
                ${aScore >= 3 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {aRound}
              </span>
            </div>
          </Card>

          {/* 玩家 B */}
          <Card className={winner === 'B' ? 'border-gold shadow-gold/20' : ''}>
            <h2 className="text-center font-bold mb-2" style={{ color: b.team.color }}>玩家 B</h2>
            <p className="text-white/80 text-center truncate">{b.team.name}</p>
            <div className="text-center my-2">
              <span className="text-3xl font-bold text-gold">{bRatings}</span>
            </div>
            <p className="text-white/50 text-center text-sm">{b.team.coach?.name}</p>
            <p className="text-white/50 text-center text-sm">{b.team.formation?.name}</p>
            <div className="text-center mt-2">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold
                ${bScore >= 3 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {bRound}
              </span>
            </div>
          </Card>
        </div>

        {/* 详细对比 */}
        <Card className="mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-white/10">
                <th className="py-2 text-left">对比项</th>
                <th className="py-2">玩家 A</th>
                <th className="py-2">玩家 B</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['球队评分', aRatings, bRatings],
                ['晋级轮次', aRound, bRound],
                ['教练', a.team.coach?.name ?? '-', b.team.coach?.name ?? '-'],
                ['阵型', a.team.formation?.name ?? '-', b.team.formation?.name ?? '-'],
              ].map(([label, va, vb]) => (
                <tr key={label as string} className="border-b border-white/5">
                  <td className="py-2 text-white/60">{label as string}</td>
                  <td className={`py-2 text-center ${va > vb ? 'text-gold font-bold' : 'text-white/60'}`}>{String(va)}</td>
                  <td className={`py-2 text-center ${vb > va ? 'text-gold font-bold' : 'text-white/60'}`}>{String(vb)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Button size="lg" className="w-full" onClick={() => { resetGame(); navigate('/') }}>
          <RotateCcw className="inline mr-2" size={16} />再来一局
        </Button>
      </motion.div>
    </div>
  )
}
