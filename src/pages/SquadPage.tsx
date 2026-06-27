import { useState, useMemo, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FormationPitch } from '@/components/formation/FormationPitch'
import { PlayerDrawer } from '@/components/player/PlayerDrawer'
import { useGameStore } from '@/store/gameStore'
import { getPlayers } from '@/data/players'
import { allTeams } from '@/data/teams'
import type { Player, Position } from '@/types'
import { Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function SquadPage() {
  const navigate = useNavigate()
  const { userTeam, setStartingPlayer } = useGameStore()
  const formation = userTeam.formation
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

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

  // 一键随机填充所有首发位置
  const handleRandomFill = useCallback(() => {
    if (!formation) return
    const used = new Set(usedCountryIds)
    const xi = [...userTeam.startingXI]

    // 辅助：从指定国家列表中随机选一个球员（不限位置）
    function pickAnyPlayer(countryList: typeof allTeams): Player | null {
      const shuffled = [...countryList].sort(() => Math.random() - 0.5)
      for (const c of shuffled) {
        const allPositions: Position[] = ['GK','CB','LB','RB','LWB','RWB','CDM','CM','CAM','LM','RM','LW','RW','ST']
        for (const p of allPositions) {
          const pool = getPlayers(c.id, p)
          if (pool.length > 0) return pool[Math.floor(Math.random() * pool.length)]
        }
      }
      return null
    }

    for (let i = 0; i < 11; i++) {
      if (xi[i]) continue // 已选的不动
      const pos = formation.positions[i]
      // 找到有此位置球员的未使用国家
      const candidates = allTeams.filter(t => !used.has(t.id) && getPlayers(t.id, pos).length > 0)
      if (candidates.length === 0) {
        // 放宽限制：从未使用国家中尽力找一个能踢此位置的球员
        const fallbackCountries = allTeams.filter(t => !used.has(t.id))
        if (fallbackCountries.length === 0) break

        // 第一轮：遍历所有 fallback 国家，找能踢此位置的
        let selected: Player | null = null
        let selectedCountry: string | null = null
        const shuffledFallback = [...fallbackCountries].sort(() => Math.random() - 0.5)
        for (const fc of shuffledFallback) {
          const pool = getPlayers(fc.id, pos)
          if (pool.length > 0) {
            selected = pool[Math.floor(Math.random() * pool.length)]
            selectedCountry = fc.id
            break
          }
        }
        // 第二轮：实在没有任何国家有该位置球员，就随机选任意球员
        if (!selected) {
          selected = pickAnyPlayer(fallbackCountries)
          if (selected) selectedCountry = selected.nationality
        }
        if (selected && selectedCountry) {
          xi[i] = selected
          used.add(selectedCountry)
          setStartingPlayer(i, selected)
        }
        continue
      }
      const country = candidates[Math.floor(Math.random() * candidates.length)]
      const players = getPlayers(country.id, pos)
      const player = players[Math.floor(Math.random() * players.length)]
      xi[i] = player
      used.add(country.id)
      setStartingPlayer(i, player)
    }
  }, [formation, usedCountryIds, userTeam.startingXI, setStartingPlayer])

  // 选满11人自动跳转（监听 state 变化，避免旧 state 计数不准）
  useEffect(() => {
    const filled = userTeam.startingXI.filter(p => p !== null).length
    if (filled >= 11) {
      const timer = setTimeout(() => navigate('/squad-bench'), 500)
      return () => clearTimeout(timer)
    }
  }, [userTeam.startingXI, navigate])

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
    // 选满11人自动跳转由 useEffect 处理
  }

  const filledCount = userTeam.startingXI.filter(p => p !== null).length
  const position = activeIndex !== null ? formation.positions[activeIndex] : null

  return (
    <div className="min-h-screen px-4 py-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-xl font-bold text-center mb-1">选择首发阵容</h1>
        <p className="text-white/40 text-sm text-center mb-2">
          阵型 {formation.name} · 已选 {filledCount}/11
        </p>

        {/* 进度条 */}
        <div className="h-1 bg-white/10 rounded-full mb-3">
          <div className="h-full bg-gold rounded-full transition-all duration-500"
            style={{ width: `${(filledCount/11)*100}%` }} />
        </div>

        {/* 一键随机 */}
        {filledCount < 11 && (
          <div className="text-center mb-3">
            <Button variant="secondary" size="sm" onClick={handleRandomFill}>
              <Shuffle className="inline mr-1" size={14} />一键随机填充首发
            </Button>
          </div>
        )}

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

        {/* 选人弹窗 — 始终挂载，防止关闭重开组件卸载→ref丢失→无限刷新 */}
        <PlayerDrawer
          open={activeIndex !== null}
          position={position || formation.positions[0]}
          usedCountryIds={usedCountryIds}
          onSelect={handlePlayerSelect}
          onClose={() => setActiveIndex(null)}
          maxRerolls={2}
        />
      </motion.div>
    </div>
  )
}
