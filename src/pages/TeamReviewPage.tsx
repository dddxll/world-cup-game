import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FormationPitch } from '@/components/formation/FormationPitch'
import { useGameStore } from '@/store/gameStore'
import { calculateTeamRatings } from '@/engine/rating'
import { generateTournament } from '@/engine/tournament'
import { allTeams } from '@/data/teams'
import { ArrowRight, Shield, Swords, Zap } from 'lucide-react'

export default function TeamReviewPage() {
  const navigate = useNavigate()
  const { userTeam, setTeamRatings, setTournament, swapWithBench } = useGameStore()

  // 首发↔替补交换状态
  const [selectedXiIndex, setSelectedXiIndex] = useState<number | null>(null)

  // 计算球队评分（try-catch 防御）
  const ratings = useMemo(() => {
    try {
      return calculateTeamRatings(userTeam)
    } catch (e) {
      console.error('calculateTeamRatings error:', e)
      return { attack: 0, defense: 0, midfield: 0, overall: 0 }
    }
  }, [userTeam])

  // 随机分配玩家到一个小组
  const playerGroup = useMemo(() => {
    const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
    return groups[Math.floor(Math.random() * groups.length)]
  }, [])

  function handleStart() {
    // 在开赛时一次性写入评分（不在 effect 中写，避免无限渲染循环）
    setTeamRatings(ratings.attack, ratings.defense, ratings.midfield, ratings.overall)
    const t = generateTournament(userTeam, allTeams, playerGroup)
    setTournament(t)
    navigate('/match/group-1')
  }

  // 交换操作
  function handleStarterClick(index: number) {
    if (selectedXiIndex === index) {
      setSelectedXiIndex(null) // 再次点击取消选中
    } else {
      setSelectedXiIndex(index)
    }
  }

  function handleBenchClick(benchIndex: number) {
    if (selectedXiIndex === null) return
    swapWithBench(selectedXiIndex, benchIndex)
    setSelectedXiIndex(null)
  }

  const bench = userTeam.bench

  return (
    <div className="min-h-screen px-4 py-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
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

        {/* 首发阵容 — 阵型图交互 */}
        <h3 className="text-sm font-bold text-white/60 mb-2">
          首发 11 人
          {selectedXiIndex !== null && (
            <span className="text-gold text-xs ml-2">— 已选中，点击替补交换</span>
          )}
        </h3>

        {/* 选中提示 */}
        {selectedXiIndex !== null && userTeam.startingXI[selectedXiIndex] && (
          <p className="text-gold text-xs text-center mb-2 animate-pulse">
            👆 已选中{' '}
            <span className="font-bold">{userTeam.startingXI[selectedXiIndex]!.name}</span>
            {' '}（{userTeam.startingXI[selectedXiIndex]!.rating}分 · {userTeam.startingXI[selectedXiIndex]!.positions.join('/')}），请点击下方替补球员进行交换
          </p>
        )}

        {userTeam.formation && (
          <div className="max-w-[300px] mx-auto mb-3">
            <FormationPitch
              formation={userTeam.formation}
              players={userTeam.startingXI}
              onSlotClick={handleStarterClick}
              highlightIndex={selectedXiIndex ?? undefined}
            />
          </div>
        )}

        {/* 替补阵容 */}
        <h3 className="text-sm font-bold text-white/60 mb-2">
          替补 {bench.length}/15 人
          {selectedXiIndex !== null && <span className="text-gold text-xs ml-2">— 点击交换</span>}
        </h3>
        <div className="flex gap-1.5 flex-wrap mb-20">
          {bench.map((p, i) => {
            const canSwap = selectedXiIndex !== null
            // 判断该替补是否适配选中的首发位置
            const selectedPos = selectedXiIndex !== null ? userTeam.formation?.positions[selectedXiIndex] : null
            const isPositionMatch = selectedPos ? p.positions.includes(selectedPos) : false
            return (
              <button key={i}
                onClick={() => handleBenchClick(i)}
                disabled={!canSwap}
                className={`px-2.5 py-1.5 rounded-full border text-xs transition-all
                  ${canSwap && isPositionMatch
                    ? 'border-green-400/60 bg-green-400/15 hover:bg-green-400/25 hover:border-green-400 cursor-pointer text-white'
                    : canSwap
                      ? 'border-gold/40 bg-gold/10 hover:bg-gold/20 hover:border-gold/60 cursor-pointer text-white'
                      : 'border-white/10 bg-white/5 text-white/60'}`}>
                <span className="text-gold font-bold mr-1">{p.rating}</span>
                {p.name}
                <span className={`ml-1 text-[10px] ${canSwap && isPositionMatch ? 'text-green-400 font-bold' : 'text-white/20'}`}>
                  {p.positions.join('/')}
                  {canSwap && isPositionMatch && ' ✓'}
                </span>
              </button>
            )
          })}
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
