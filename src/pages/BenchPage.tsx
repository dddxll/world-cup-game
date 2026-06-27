import { useState, useMemo, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { PlayerDrawer } from '@/components/player/PlayerDrawer'
import { useGameStore } from '@/store/gameStore'
import { getPlayers } from '@/data/players'
import { allTeams } from '@/data/teams'
import type { Player } from '@/types'
import { Plus, ArrowRight, Shuffle } from 'lucide-react'

export default function BenchPage() {
  const navigate = useNavigate()
  const { userTeam, addBenchPlayer, removeBenchPlayer } = useGameStore()
  const [showDrawer, setShowDrawer] = useState(false)

  const allPositions = ['GK','CB','LB','RB','LWB','RWB','CDM','CM','CAM','LM','RM','LW','RW','ST'] as const

  // 一键随机填充替补
  const handleRandomFillBench = useCallback(() => {
    // 内联计算已使用国家
    const used = new Set<string>()
    for (const p of userTeam.startingXI) { if (p) used.add(p.nationality) }
    for (const p of userTeam.bench) { if (p) used.add(p.nationality) }
    const currentBench = [...userTeam.bench]
    const need = 15 - currentBench.length
    if (need <= 0) return

    let filled = 0
    const maxAttempts = need * 5
    let attempts = 0

    while (filled < need && attempts < maxAttempts) {
      attempts++
      const country = allTeams[Math.floor(Math.random() * allTeams.length)]
      const pos = allPositions[Math.floor(Math.random() * allPositions.length)]
      const players = getPlayers(country.id, pos)
      if (players.length === 0) continue
      const player = players[Math.floor(Math.random() * players.length)]
      if (userTeam.startingXI.some(p => p?.id === player.id)) continue
      if (currentBench.some(p => p.id === player.id)) continue
      currentBench.push(player)
      addBenchPlayer(player)
      filled++
    }
  }, [userTeam.bench, userTeam.startingXI, addBenchPlayer])

  // 选满15人自动跳转
  useEffect(() => {
    if (userTeam.bench.length >= 15) {
      const timer = setTimeout(() => navigate('/team-review'), 500)
      return () => clearTimeout(timer)
    }
  }, [userTeam.bench.length, navigate])

  const usedCountryIds = useMemo(() => {
    const ids: string[] = []
    for (const p of userTeam.startingXI) { if (p) ids.push(p.nationality) }
    for (const p of userTeam.bench) { if (p && !ids.includes(p.nationality)) ids.push(p.nationality) }
    return ids
  }, [userTeam.startingXI, userTeam.bench])

  // 位置覆盖建议
  const benchPositions = useMemo(() => {
    const covered = new Set(userTeam.bench.map(p => p.positions).flat())
    const suggestions: string[] = []
    if (!covered.has('GK') && !userTeam.startingXI.some(p => p?.positions.includes('GK'))) suggestions.push('GK')
    if (userTeam.bench.filter(p => p.positions.some(pos => ['CB', 'LB', 'RB'].includes(pos))).length < 2) suggestions.push('后卫')
    return suggestions
  }, [userTeam.startingXI, userTeam.bench])

  const handleSelect = (player: Player, _countryId: string) => {
    addBenchPlayer(player)
    setShowDrawer(false)
    // 跳转由 useEffect 处理
  }

  const benchCount = userTeam.bench.length
  const slots = Array.from({ length: 15 }, (_, i) => userTeam.bench[i] || null)

  return (
    <div className="min-h-screen px-4 py-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-xl font-bold text-center mb-1">选择替补球员</h1>
        <p className="text-white/40 text-sm text-center mb-2">已选 {benchCount}/15 人</p>

        {/* 首发迷你条 */}
        <div className="flex gap-1 overflow-x-auto mb-4 pb-2">
          {userTeam.startingXI.map((p, i) => p && (
            <div key={i} className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-xs text-gold font-bold">
              {p.rating}
            </div>
          ))}
        </div>

        {/* 建议 */}
        {benchPositions.length > 0 && (
          <p className="text-yellow-400/80 text-xs mb-3">💡 建议补充: {benchPositions.join('、')}</p>
        )}

        {/* 一键随机 */}
        {benchCount < 15 && (
          <div className="text-center mb-3">
            <Button variant="secondary" size="sm" onClick={handleRandomFillBench}>
              <Shuffle className="inline mr-1" size={14} />一键随机填充替补
            </Button>
          </div>
        )}

        {/* 替补槽位 */}
        <div className="grid grid-cols-5 gap-2 mb-20">
          {slots.map((p, i) => (
            <div key={i}
              onClick={() => p ? removeBenchPlayer(p.id) : setShowDrawer(true)}
              className={`aspect-square rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all
                ${p ? 'border-gold/50 bg-gold/10' : 'border-dashed border-white/20 bg-white/5 hover:border-white/40'}`}>
              {p ? (
                <>
                  <span className="text-gold font-bold text-sm">{p.rating}</span>
                  <span className="text-white/60 text-[10px] truncate max-w-full px-1">{p.name}</span>
                  <span className="text-white/30 text-[8px]">{p.positions[0]}</span>
                </>
              ) : (
                <Plus size={20} className="text-white/30" />
              )}
            </div>
          ))}
        </div>

        {/* 底部 */}
        <div className="fixed bottom-0 left-0 right-0 max-w-game mx-auto p-4 bg-gradient-to-t from-pitch via-pitch/95 to-transparent flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={() => setShowDrawer(true)} disabled={benchCount >= 15}>
            <Plus className="inline mr-1" size={16} />添加替补
          </Button>
          <Button className="flex-1" onClick={() => navigate('/team-review')} disabled={benchCount < 2}>
            阵容总览 <ArrowRight className="inline ml-1" size={16} />
          </Button>
        </div>

        {/* 弹窗 */}
        <PlayerDrawer
          open={showDrawer}
          position={'CM'}
          usedCountryIds={usedCountryIds}
          onSelect={handleSelect}
          onClose={() => setShowDrawer(false)}
          allowAnyPosition={true}
          maxRerolls={0}
        />
      </motion.div>
    </div>
  )
}
