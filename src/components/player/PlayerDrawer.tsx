import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { PlayerCard } from './PlayerCard'
import { getPlayers } from '@/data/players'
import { allTeams } from '@/data/teams'
import type { Player, Position, NationalTeam } from '@/types'
import { RotateCcw } from 'lucide-react'

// framer-motion v10 类型问题：motion.div 在 strict TS 下缺 className 类型
/* eslint-disable @typescript-eslint/no-explicit-any */
const M = motion.div as any
const AP = AnimatePresence as any

interface Props {
  open: boolean
  position: Position
  usedCountryIds: string[]
  onSelect: (player: Player, countryId: string) => void
  onClose: () => void
  allowAnyPosition?: boolean
  maxRerolls?: number
}

export function PlayerDrawer({ open, position, usedCountryIds, onSelect, onClose, allowAnyPosition = false, maxRerolls = 2 }: Props) {
  const [country, setCountry] = useState<NationalTeam | null>(null)
  const [rerollsLeft, setRerollsLeft] = useState(maxRerolls)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [animating, setAnimating] = useState(false)

  const availableCountries = useMemo(() =>
    allTeams.filter(t => !usedCountryIds.includes(t.id)),
    [usedCountryIds]
  )

  function rollCountry() {
    if (availableCountries.length === 0) return
    setAnimating(true)
    const picked = availableCountries[Math.floor(Math.random() * availableCountries.length)]
    setTimeout(() => {
      setCountry(picked)
      setSelectedPlayer(null)
      setAnimating(false)
    }, 300)
  }

  function handleReroll() {
    if (rerollsLeft <= 0) return
    setRerollsLeft(r => r - 1)
    rollCountry()
  }

  // 首次打开时随机
  useEffect(() => {
    if (open) {
      setRerollsLeft(maxRerolls)
      setSelectedPlayer(null)
      rollCountry()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, position, maxRerolls])

  // 所有位置列表
  const allPositionsList: Position[] = ['GK','CB','LB','RB','LWB','RWB','CDM','CM','CAM','LM','RM','LW','RW','ST']

  const players = useMemo(() => {
    if (!country) return []
    if (allowAnyPosition) {
      const seen = new Set<string>()
      const result: Player[] = []
      for (const pos of allPositionsList) {
        for (const p of getPlayers(country.id, pos)) {
          if (!seen.has(p.id)) {
            seen.add(p.id)
            result.push(p)
          }
        }
      }
      return result
    }
    return getPlayers(country.id, position)
  }, [country, position, allowAnyPosition])

  function handleConfirm() {
    if (!selectedPlayer || !country) return
    onSelect(selectedPlayer, country.id)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={`选择 ${allowAnyPosition ? '替补' : position} 位置球员`}>
      {/* 国家展示区 */}
      <div className="text-center mb-3 min-h-[80px] flex flex-col items-center justify-center">
        <AP mode="wait">
          {animating ? (
            <M key="rolling" initial={{ rotateY: 0 }} animate={{ rotateY: 360 }}
              transition={{ duration: 0.4 }} className="text-4xl">🎰</M>
          ) : country ? (
            <M key={country.id} initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring' }}>
              <img src={country.flag} alt={country.name} className="w-12 h-8 mx-auto mb-1 object-cover rounded"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <p className="text-white font-bold">{country.name}</p>
              <p className="text-white/40 text-xs">FIFA 第{country.tier}档</p>
            </M>
          ) : null}
        </AP>
      </div>

      {/* 球员列表 */}
      <div className="space-y-2 max-h-[40vh] overflow-y-auto mb-3">
        {players.map(p => (
          <PlayerCard key={p.id} player={p} selected={selectedPlayer?.id === p.id}
            onClick={() => setSelectedPlayer(p)} />
        ))}
        {players.length === 0 && !animating && country && (
          <p className="text-white/30 text-center py-4">该国没有{allowAnyPosition ? '可用' : position}位置的球员</p>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={handleReroll} disabled={rerollsLeft <= 0 || availableCountries.length <= 1}>
          <RotateCcw className="inline mr-1" size={14} />重新随机 ({rerollsLeft}/{maxRerolls})
        </Button>
        <Button size="sm" className="flex-1" onClick={handleConfirm} disabled={!selectedPlayer}>
          确认选择 {selectedPlayer?.name || ''}
        </Button>
      </div>
    </Modal>
  )
}
