import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useGameStore } from '@/store/gameStore'
import { ArrowRight } from 'lucide-react'

const COLORS = ['#D4A843', '#E74C3C', '#3498DB', '#2ECC71', '#9B59B6', '#1ABC9C', '#F39C12', '#E91E63']

export default function CreateTeamPage() {
  const navigate = useNavigate()
  const { setTeamName, setTeamColor, userTeam, pkData } = useGameStore()
  const [name, setName] = useState(userTeam.name || '')
  const [color, setColor] = useState(userTeam.color || COLORS[0])

  const isPk = pkData.playerA !== null
  const playerLabel = isPk ? `玩家 ${pkData.currentPlayer}` : ''

  const handleNext = () => {
    if (!name.trim()) return
    setTeamName(name.trim())
    setTeamColor(color)
    navigate('/coach')
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        {isPk && (
          <p className="text-gold text-center mb-4 font-bold text-lg">⚔️ 双人 PK · 玩家 {pkData.currentPlayer}</p>
        )}
        <h1 className="text-2xl font-bold text-center mb-8">创建你的球队</h1>

        <div className="space-y-6">
          <div>
            <label className="text-white/60 text-sm mb-2 block">球队名称</label>
            <input
              type="text" value={name}
              onChange={e => setName(e.target.value)}
              placeholder="输入你的球队名..." maxLength={12}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors text-center text-xl"
              autoFocus
            />
            <p className="text-white/30 text-xs text-right mt-1">{name.length}/12</p>
          </div>

          <div>
            <label className="text-white/60 text-sm mb-3 block">选择队徽颜色</label>
            <div className="grid grid-cols-4 gap-3">
              {COLORS.map(c => (
                <button key={c} onClick={() => setColor(c)}
                  className="w-full aspect-square rounded-xl border-2 transition-all"
                  style={{
                    backgroundColor: c,
                    borderColor: color === c ? 'white' : 'transparent',
                    transform: color === c ? 'scale(1.1)' : 'scale(1)',
                    opacity: color === c ? 1 : 0.7,
                  }}
                />
              ))}
            </div>
          </div>

          <Button size="lg" className="w-full mt-8" onClick={handleNext} disabled={!name.trim()}>
            下一步：选教练 <ArrowRight className="inline ml-1" size={18} />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
