import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FormationPitch } from '@/components/formation/FormationPitch'
import { PlayerDrawer } from '@/components/player/PlayerDrawer'
import { useGameStore } from '@/store/gameStore'
import type { Player, Position } from '@/types'

export default function SquadPage() {
  const navigate = useNavigate()
  const { userTeam, setStartingPlayer, pkData } = useGameStore()
  const formation = userTeam.formation
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const isPk = pkData.playerA !== null

  // 已使用的国家
  const usedCountryIds = useMemo(() => {
    const ids: string[] = []
    for (const p of userTeam.startingXI) {
      if (p) ids.push(p.nationality)
    }
    for (const p of userTeam.bench) {
      if (p && !ids.includes(p.nationality)) ids.push(p.nationality)
    }
    return ids
  }, [userTeam.startingXI, userTeam.bench])

  // 下一个待选位置
  const nextEmptyIndex = useMemo(() =>
    userTeam.startingXI.findIndex(p => p === null),
    [userTeam.startingXI]
  )

  if (!formation) { navigate('/formation'); return null }

  function handleSlotClick(index: number) {
    if (userTeam.startingXI[index]) return // 已选不能改
    setActiveIndex(index)
  }

  function handlePlayerSelect(player: Player, _countryId: string) {
    if (activeIndex === null) return
    setStartingPlayer(activeIndex, player)
    setActiveIndex(null)
    // 选满11人自动跳转
    const filled = userTeam.startingXI.filter(p => p !== null).length + 1
    if (filled >= 11) {
      setTimeout(() => navigate('/squad-bench'), 500)
    }
  }

  const filledCount = userTeam.startingXI.filter(p => p !== null).length
  const position = activeIndex !== null ? formation.positions[activeIndex] : null

  return (
    <div className="min-h-screen px-4 py-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        {isPk && <p className="text-gold text-center mb-2 font-bold">⚔️ 玩家 {pkData.currentPlayer}</p>}
        <h1 className="text-xl font-bold text-center mb-1">选择首发阵容</h1>
        <p className="text-white/40 text-sm text-center mb-2">
          阵型 {formation.name} · 已选 {filledCount}/11
        </p>

        {/* 进度条 */}
        <div className="h-1 bg-white/10 rounded-full mb-4">
          <div className="h-full bg-gold rounded-full transition-all duration-500"
            style={{ width: `${(filledCount/11)*100}%` }} />
        </div>

        {/* 阵型图 */}
        <div className="max-w-sm mx-auto">
          <FormationPitch formation={formation} players={userTeam.startingXI}
            onSlotClick={handleSlotClick} highlightIndex={nextEmptyIndex} />
        </div>

        <p className="text-white/30 text-xs text-center mt-4">
          {nextEmptyIndex >= 0
            ? `点击阵型图中的 ⊕ 选择 ${formation.positions[nextEmptyIndex]} 位置球员`
            : '全部位置已选满！'}
        </p>

        {/* 选人弹窗 */}
        {position && (
          <PlayerDrawer
            open={activeIndex !== null}
            position={position}
            usedCountryIds={usedCountryIds}
            onSelect={handlePlayerSelect}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </motion.div>
    </div>
  )
}
