import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Modal } from '@/components/ui/Modal'
import type { GameEvent } from '@/types'

// framer-motion v10 类型问题
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const M = motion.div as any

interface Props {
  event: GameEvent
  onChoose: (optionId: string) => void
  onTimeout: () => void
}

export function EventModal({ event, onChoose, onTimeout }: Props) {
  const timeLimit = event.level === 'critical' ? 20 : 15
  const [timeLeft, setTimeLeft] = useState(timeLimit)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); onTimeout(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const levelColors = { minor: 'text-gray-400', major: 'text-yellow-400', critical: 'text-red-400' }

  return (
    <Modal open={true} onClose={() => {}} title={event.title}>
      <p className="text-white/60 text-sm mb-3">{event.description}</p>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-white/40 mb-1">
          <span className={levelColors[event.level]}>
            {event.level === 'critical' ? '重大事件' : event.level === 'major' ? '重要事件' : '普通事件'}
          </span>
          <span className={timeLeft <= 5 ? 'text-red-400 font-bold' : ''}>倒计时 {timeLeft}s</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <M
            className={`h-full rounded-full ${timeLeft <= 5 ? 'bg-red-500' : 'bg-gold'}`}
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / timeLimit) * 100}%` }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {event.options.map(opt => (
          <M key={opt.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChoose(opt.id)}
            className="w-full text-left p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-gold/50 transition-all">
            <span className="text-white font-medium text-sm">{opt.text}</span>
            <span className={`ml-2 text-xs ${opt.scoreEffect >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {opt.scoreEffect >= 0 ? '+' : ''}{opt.scoreEffect}
            </span>
          </M>
        ))}
      </div>
    </Modal>
  )
}
