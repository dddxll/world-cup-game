import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useGameStore } from '@/store/gameStore'
import { calculateTeamRatings } from '@/engine/rating'
import { generateTournament } from '@/engine/tournament'
import { allTeams } from '@/data/teams'
import { ArrowRight, Shield, Swords, Zap } from 'lucide-react'

export default function TeamReviewPage() {
  const navigate = useNavigate()
  const { userTeam, setTeamRatings, setTournament, tournament, pkData } = useGameStore()

  // 计算球队评分（try-catch 防御）
  const ratings = useMemo(() => {
    try {
      return calculateTeamRatings(userTeam)
    } catch (e) {
      console.error('calculateTeamRatings error:', e)
      return { attack: 0, defense: 0, midfield: 0, overall: 0 }
    }
  }, [userTeam])

  useEffect(() => {
    if (ratings.attack === 0 && ratings.defense === 0 && ratings.midfield === 0) return // 异常值跳过
    setTeamRatings(ratings.attack, ratings.defense, ratings.midfield, ratings.overall)
  }, [ratings, setTeamRatings])

  const radarData = [
    { stat: '进攻', value: ratings.attack, fullMark: 100 },
    { stat: '防守', value: ratings.defense, fullMark: 100 },
    { stat: '中场', value: ratings.midfield, fullMark: 100 },
  ]

  // 随机分配玩家到一个小组
  const playerGroup = useMemo(() => {
    const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
    return groups[Math.floor(Math.random() * groups.length)]
  }, [])

  function handleStart() {
    const t = generateTournament(userTeam, allTeams, playerGroup)
    setTournament(t)
    navigate('/match/group-1')
  }

  const isPk = pkData.playerA !== null
  const bench = userTeam.bench

  return (
    <div className="min-h-screen px-4 py-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        {isPk && <p className="text-gold text-center mb-2 font-bold">⚔️ 玩家 {pkData.currentPlayer}</p>}
        <h1 className="text-2xl font-bold text-center mb-1">{userTeam.name || '你的球队'}</h1>
        <p className="text-white/40 text-sm text-center mb-2">
          {userTeam.coach?.name} · {userTeam.formation?.name} · 分入 {playerGroup} 组
        </p>

        {/* 综合分 */}
        <div className="text-center mb-4">
          <span className="text-5xl font-bold text-gold">{ratings.overall}</span>
          <span className="text-white/40 text-sm ml-2">综合评分</span>
        </div>

        {/* 三围雷达图 - 纯SVG */}
	        <Card className="mb-4">
	          <svg viewBox="-60 -60 120 120" className="w-full h-[220px]">
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
	              const att = ratings.attack / 100
	              const def = ratings.defense / 100
	              const mid = ratings.midfield / 100
	              const pts = `0,${-100 * att} ${100 * def * 0.866},${100 * def * 0.5} ${-100 * mid * 0.866},${100 * mid * 0.5}`
	              return <polygon points={pts} fill="#D4A843" fillOpacity="0.25" stroke="#D4A843" strokeWidth="2" />
	            })()}
	            {ratings.overall > 0 && [
	              { v: ratings.attack, cx: 0, cy: -100 },
	              { v: ratings.defense, cx: 100 * 0.866, cy: 100 * 0.5 },
	              { v: ratings.midfield, cx: -100 * 0.866, cy: 100 * 0.5 },
	            ].map((pt, i) => (<g key={i}>
	              <circle cx={pt.cx * pt.v/100} cy={pt.cy * pt.v/100} r="3" fill="#D4A843" />
	              <text x={pt.cx * pt.v/100} y={pt.cy * pt.v/100 - 6} textAnchor="middle" fill="#D4A843" fontSize="9" fontWeight="bold">{pt.v}</text>
	            </g>))}
	          </svg>
	        </Card>

        {/* 三围数值 */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Card className="text-center">
            <Swords className="mx-auto text-red-400 mb-1" size={20} />
            <p className="text-2xl font-bold text-white">{ratings.attack}</p>
            <p className="text-white/40 text-xs">进攻</p>
          </Card>
          <Card className="text-center">
            <Shield className="mx-auto text-blue-400 mb-1" size={20} />
            <p className="text-2xl font-bold text-white">{ratings.defense}</p>
            <p className="text-white/40 text-xs">防守</p>
          </Card>
          <Card className="text-center">
            <Zap className="mx-auto text-green-400 mb-1" size={20} />
            <p className="text-2xl font-bold text-white">{ratings.midfield}</p>
            <p className="text-white/40 text-xs">中场</p>
          </Card>
        </div>

        {/* 首发阵容 */}
        <h3 className="text-sm font-bold text-white/60 mb-2">首发 11 人</h3>
        <div className="grid grid-cols-6 gap-1 mb-4">
          {userTeam.startingXI.map((p, i) => (
            <div key={i} className="text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-xs text-gold font-bold">
                {p ? p.rating : '-'}
              </div>
              <p className="text-[9px] text-white/40 mt-0.5 truncate">{userTeam.formation?.positions[i]}</p>
            </div>
          ))}
        </div>

        {/* 替补阵容 */}
        <h3 className="text-sm font-bold text-white/60 mb-2">替补 {bench.length}/15 人</h3>
        <div className="flex gap-1 flex-wrap mb-20">
          {bench.map((p, i) => (
            <span key={i} className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
              {p.name} <span className="text-gold">{p.rating}</span>
            </span>
          ))}
          {bench.length === 0 && <span className="text-white/20 text-xs">尚未选择替补</span>}
        </div>

        {/* 确认开赛 */}
        <div className="fixed bottom-0 left-0 right-0 max-w-game mx-auto p-4 bg-gradient-to-t from-pitch via-pitch/95 to-transparent">
          <Button size="lg" className="w-full" onClick={handleStart}>
            ⚽ 确认开赛！征战世界杯 <ArrowRight className="inline ml-1" size={18} />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
