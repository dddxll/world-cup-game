import { useMemo } from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/Card'
import { useGameStore } from '@/store/gameStore'
import { calculateTeamRatings } from '@/engine/rating'
import { Trophy, Medal, Swords } from 'lucide-react'

export function ResultCard() {
  const { userTeam, tournament } = useGameStore()
  const ratings = useMemo(() => calculateTeamRatings(userTeam), [userTeam])

  // 计算最终排名
  const finalRank = useMemo(() => {
    if (!tournament) return '?'
    // 简化: 从淘汰赛判断
    if (tournament.isPlayerEliminated) return '小组赛'
    return '16强' // 实际应从tournament推算
  }, [tournament])

  const radarData = [
    { stat: '进攻', value: ratings.attack, fullMark: 100 },
    { stat: '防守', value: ratings.defense, fullMark: 100 },
    { stat: '中场', value: ratings.midfield, fullMark: 100 },
  ]

  return (
    <div id="result-card" className="bg-pitch p-6 rounded-2xl border border-white/10">
      {/* 头部 */}
      <div className="text-center mb-4">
        <div className="w-16 h-16 mx-auto rounded-full mb-2 flex items-center justify-center text-3xl"
          style={{ backgroundColor: userTeam.color }}>
          <Trophy className="text-white" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-white">{userTeam.name}</h1>
        <div className="flex items-center justify-center gap-2 mt-1">
          <Medal size={20} className="text-gold" />
          <span className="text-gold font-bold text-lg">{finalRank}</span>
        </div>
        <p className="text-white/40 text-xs mt-1">
          {userTeam.coach?.name} · {userTeam.formation?.name}
        </p>
      </div>

      {/* 综合分 */}
      <Card className="text-center mb-4">
        <span className="text-4xl font-bold text-gold">{ratings.overall}</span>
        <p className="text-white/40 text-xs">球队综合评分</p>
      </Card>

      {/* 三围雷达图 */}
      <Card className="mb-4">
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#ffffff15" />
            <PolarAngleAxis dataKey="stat" stroke="#ffffff60" fontSize={12} />
            <PolarRadiusAxis domain={[0, 100]} stroke="#ffffff20" fontSize={10} />
            <Radar name="球队" dataKey="value" stroke="#D4A843" fill="#D4A843" fillOpacity={0.25} />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      {/* 三围数值 */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: '进攻', value: ratings.attack, color: 'text-red-400' },
          { label: '防守', value: ratings.defense, color: 'text-blue-400' },
          { label: '中场', value: ratings.midfield, color: 'text-green-400' },
        ].map(item => (
          <div key={item.label} className="text-center bg-white/5 rounded-lg p-2">
            <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
            <p className="text-white/30 text-[10px]">{item.label}</p>
          </div>
        ))}
      </div>

      {/* MVP 榜 — 选评分最高的3个首发球员 */}
      <h3 className="text-white/60 text-xs font-bold mb-2">🌟 赛事 MVP</h3>
      <div className="space-y-1 mb-4">
        {userTeam.startingXI.filter(Boolean).slice(0, 3).map((p, i) => p && (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="text-gold font-bold w-4">{['🥇','🥈','🥉'][i]}</span>
            <span className="text-white/80 truncate flex-1">{p.name}</span>
            <span className="text-gold font-bold">{p.rating}</span>
          </div>
        ))}
      </div>

      {/* 底部 */}
      <div className="text-center border-t border-white/10 pt-4">
        <p className="text-gold text-sm font-bold">2026 世界杯 · 即时策略挑战</p>
        <p className="text-white/30 text-xs">扫描二维码 来挑战你的世界杯阵容</p>
      </div>
    </div>
  )
}
