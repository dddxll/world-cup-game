import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { CoachCard } from '@/components/coach/CoachCard'
import { useGameStore } from '@/store/gameStore'
import { allCoaches } from '@/data/coaches'
import type { Coach, PlayStyle } from '@/types'
import { ArrowRight } from 'lucide-react'

const STYLES: PlayStyle[] = ['高位压迫', '传控渗透', '防守反击', '两翼齐飞', '铁桶大巴']

export default function CoachPage() {
  const navigate = useNavigate()
  const { setCoach, userTeam, pkData } = useGameStore()
  const [selected, setSelected] = useState<Coach | null>(userTeam.coach)
  const [filter, setFilter] = useState<PlayStyle | '全部'>('全部')

  const filtered = useMemo(() =>
    filter === '全部' ? allCoaches : allCoaches.filter(c => c.style === filter),
    [filter]
  )

  const handleNext = () => {
    if (!selected) return
    setCoach(selected)
    navigate('/formation')
  }

  const isPk = pkData.playerA !== null

  return (
    <div className="min-h-screen px-4 py-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        {isPk && <p className="text-gold text-center mb-2 font-bold">⚔️ 玩家 {pkData.currentPlayer}</p>}
        <h1 className="text-xl font-bold text-center mb-1">选择主教练</h1>
        <p className="text-white/40 text-sm text-center mb-4">教练决定打法风格和擅长阵型</p>

        {/* 风格筛选 */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
          {['全部', ...STYLES].map(s => (
            <button key={s}
              onClick={() => setFilter(s as PlayStyle | '全部')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all
                ${filter === s ? 'bg-gold text-pitch' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
              {s}
            </button>
          ))}
        </div>

        {/* 教练网格 */}
        <div className="grid grid-cols-2 gap-3 mb-20">
          {filtered.map(c => (
            <CoachCard key={c.id} coach={c} selected={selected?.id === c.id} onSelect={setSelected} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-2 text-white/30 text-center py-8">没有匹配的教练</p>
          )}
        </div>

        {/* 底部固定按钮 */}
        <div className="fixed bottom-0 left-0 right-0 max-w-game mx-auto p-4 bg-gradient-to-t from-pitch via-pitch/95 to-transparent">
          <Button size="lg" className="w-full" onClick={handleNext} disabled={!selected}>
            {selected ? `选择 ${selected.name}` : '请选择一位教练'} <ArrowRight className="inline ml-1" size={18} />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
