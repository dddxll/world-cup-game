import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useGameStore } from '@/store/gameStore'
import { Trophy, Swords } from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()
  const { resetGame } = useGameStore()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', delay: 0.2 }}
      >
        <Trophy size={80} className="text-gold mx-auto mb-4" />
      </motion.div>

      <div>
        <motion.h1
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-4xl font-bold text-gold mb-2 block">
            2026 世界杯
          </span>
        </motion.h1>
      </div>

      <div>
        <motion.p
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-white/60 text-lg block mb-12">
            即时策略挑战
          </span>
        </motion.p>
      </div>

      <div>
        <motion.div
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="space-y-4 w-full max-w-xs">
            <Button size="lg" className="w-full" onClick={() => { resetGame(); navigate('/create') }}>
              <Swords className="inline mr-2" size={20} />
              开始游戏
            </Button>
          </div>
        </motion.div>
      </div>

      <div>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-white/30 text-sm block mt-16">
            选教练 · 定阵型 · 抽球员 · 战世界杯
          </span>
        </motion.p>
      </div>
    </div>
  )
}
