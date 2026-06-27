import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FormationPitch } from '@/components/formation/FormationPitch'
import { useGameStore } from '@/store/gameStore'
import { formations } from '@/data/formations'
import type { FormationDef } from '@/types'
import { ArrowRight } from 'lucide-react'

export default function FormationPage() {
  const navigate = useNavigate()
  const { setFormation, userTeam } = useGameStore()
  const coach = userTeam.coach

  // 只显示教练擅长阵型
  const available = formations.filter((f) =>
    coach?.preferredFormations.includes(f.id)
  )
  const [selected, setSelected] = useState<FormationDef | null>(
    available.length === 1 ? available[0] : null
  )

  useEffect(() => {
    if (!coach) {
      navigate('/coach')
    }
  }, [coach, navigate])

  const handleNext = () => {
    if (!selected) return
    setFormation(selected)
    navigate('/squad')
  }

  if (!coach) return null

  return (
    <div className="min-h-screen px-4 py-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-xl font-bold text-center mb-1">选择阵型</h1>
        <p className="text-white/40 text-sm text-center mb-2">
          主教练:{' '}
          <span className="text-gold">{coach.name}</span> · {coach.style}
        </p>
        <p className="text-white/30 text-xs text-center mb-4">
          教练擅长的阵型，选一个开始建队
        </p>

        <div className="space-y-4 mb-20">
          {available.map((f) => (
            <Card
              key={f.id}
              selected={selected?.id === f.id}
              onClick={() => setSelected(f)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">{f.name}</h3>
                <span className="text-white/40 text-sm">{f.displayName}</span>
              </div>
              <FormationPitch formation={f} />
              {/* 克制信息 */}
              <div className="flex gap-2 mt-2 text-xs">
                {f.counters.length > 0 && (
                  <span className="text-green-400">
                    克制: {f.counters.join(', ')}
                  </span>
                )}
                {f.counteredBy.length > 0 && (
                  <span className="text-red-400">
                    被克制: {f.counteredBy.join(', ')}
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 max-w-game mx-auto p-4 bg-gradient-to-t from-pitch via-pitch/95 to-transparent">
          <Button
            size="lg"
            className="w-full"
            onClick={handleNext}
            disabled={!selected}
          >
            {selected ? `使用 ${selected.name}` : '请选择阵型'}{' '}
            <ArrowRight className="inline ml-1" size={18} />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
