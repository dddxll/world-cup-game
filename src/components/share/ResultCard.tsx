import { useMemo } from 'react'
import { Card } from '@/components/ui/Card'
import { useGameStore } from '@/store/gameStore'
import { calculateTeamRatings } from '@/engine/rating'
import { Trophy, Medal } from 'lucide-react'

interface Props { rank?: string }

export function ResultCard({ rank }: Props) {
  const { userTeam } = useGameStore()
  const ratings = useMemo(() => {
    try { return calculateTeamRatings(userTeam) }
    catch { return { attack: 0, defense: 0, midfield: 0, overall: 0 } }
  }, [userTeam])

  return (
    <div id="result-card" className="bg-pitch p-6 rounded-2xl border border-white/10">
      <div className="text-center mb-4">
        <div className="w-16 h-16 mx-auto rounded-full mb-2 flex items-center justify-center text-3xl"
          style={{ backgroundColor: userTeam.color }}>
          <Trophy className="text-white" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-white">{userTeam.name}</h1>
        <div className="flex items-center justify-center gap-2 mt-1">
          <Medal size={20} className="text-gold" />
          <span className="text-gold font-bold text-lg">{rank || '?'}</span>
        </div>
        <p className="text-white/40 text-xs mt-1">
          {userTeam.coach?.name} · {userTeam.formation?.name}
        </p>
      </div>

      <Card className="text-center mb-4">
        <span className="text-4xl font-bold text-gold">{ratings.overall}</span>
        <p className="text-white/40 text-xs">球队综合评分</p>
      </Card>

      {/* 三围雷达图 — 纯 SVG */}
      <Card className="mb-4">
        <svg viewBox="-60 -60 120 120" className="w-full h-[200px]">
          {[30, 60, 90].map(r => (
            <polygon key={r}
              points={`0,${-r} ${r*0.866},${r*0.5} ${-r*0.866},${r*0.5}`}
              fill="none" stroke="#ffffff15" strokeWidth="1" />
          ))}
          {[0, 120, 240].map(angle => {
            const rad = (angle - 90) * Math.PI / 180
            return <line key={angle} x1={0} y1={0} x2={100 * Math.cos(rad)} y2={100 * Math.sin(rad)} stroke="#ffffff20" strokeWidth="0.5" />
          })}
          <text x={0} y={-105} textAnchor="middle" fill="#ffffff60" fontSize="10">进攻</text>
          <text x={95} y={55} textAnchor="middle" fill="#ffffff60" fontSize="10">防守</text>
          <text x={-95} y={55} textAnchor="middle" fill="#ffffff60" fontSize="10">中场</text>
          {ratings.overall > 0 && (() => {
            const att = ratings.attack / 100, def = ratings.defense / 100, mid = ratings.midfield / 100
            return <polygon points={`0,${-100*att} ${100*def*0.866},${100*def*0.5} ${-100*mid*0.866},${100*mid*0.5}`}
              fill="#D4A843" fillOpacity="0.25" stroke="#D4A843" strokeWidth="2" />
          })()}
          {ratings.overall > 0 && [
            { v: ratings.attack, cx: 0, cy: -100 },
            { v: ratings.defense, cx: 100*0.866, cy: 100*0.5 },
            { v: ratings.midfield, cx: -100*0.866, cy: 100*0.5 },
          ].map((pt, i) => (<g key={i}>
            <circle cx={pt.cx*pt.v/100} cy={pt.cy*pt.v/100} r="3" fill="#D4A843" />
            <text x={pt.cx*pt.v/100} y={pt.cy*pt.v/100-6} textAnchor="middle" fill="#D4A843" fontSize="9" fontWeight="bold">{pt.v}</text>
          </g>))}
        </svg>
      </Card>

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

      <div className="text-center border-t border-white/10 pt-4">
        <p className="text-gold text-sm font-bold">2026 世界杯 · 即时策略挑战</p>
        <p className="text-white/30 text-xs">扫描二维码 来挑战你的世界杯阵容</p>
      </div>
    </div>
  )
}
