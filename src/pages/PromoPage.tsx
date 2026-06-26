import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useGameStore } from '@/store/gameStore'
import { Trophy, Users, Shuffle, Swords, Zap, Flag } from 'lucide-react'

const STEPS = [
  { icon: Users, title: '选教练', desc: '48位真实主帅，5种打法互相克制' },
  { icon: Flag, title: '定阵型', desc: '8种经典阵型，选你擅长的打法' },
  { icon: Shuffle, title: '抽球员', desc: '随机国家→挑选球星，组建世界联队' },
  { icon: Swords, title: '战世界杯', desc: '小组赛+淘汰赛，每场突发事件决策' },
  { icon: Trophy, title: '出成绩', desc: '精美成绩卡片，分享截图给朋友' },
]

export default function PromoPage() {
  const navigate = useNavigate()
  const { resetGame } = useGameStore()

  return (
    <div className="min-h-screen px-4 py-8">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        {/* 头部 */}
        <div className="text-center mb-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }}>
            <Trophy size={64} className="text-gold mx-auto mb-3" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gold mb-1">2026 世界杯</h1>
          <p className="text-2xl font-bold text-white mb-2">即时策略挑战</p>
          <p className="text-white/40 text-sm">选教练 · 定阵型 · 抽球员 · 战世界杯</p>
        </div>

        {/* 玩法步骤 */}
        <div className="space-y-3 mb-8">
          {STEPS.map((step, i) => (
            <motion.div key={step.title}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}>
              <Card className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <step.icon size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{step.title}</h3>
                  <p className="text-white/40 text-xs">{step.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 二维码区域 */}
        <Card className="text-center mb-6">
          <p className="text-white/60 text-sm mb-2">📱 扫描二维码 即刻开玩</p>
          <div className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center">
            <span className="text-pitch text-xs">QR Code</span>
          </div>
          <p className="text-white/30 text-xs mt-2">或复制链接分享给朋友</p>
        </Card>

        <Button size="lg" className="w-full" onClick={() => { resetGame(); navigate('/create') }}>
          开始你的世界杯之旅
        </Button>
      </motion.div>
    </div>
  )
}
