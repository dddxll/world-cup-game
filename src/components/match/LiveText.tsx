import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// framer-motion v10 类型问题
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const M = motion.div as any

interface Message { id: number; text: string; type: 'normal' | 'highlight' | 'goal' | 'event' }

interface Props { messages: Message[] }

export function LiveText({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const colorMap = {
    normal: 'text-white/50',
    highlight: 'text-white/80',
    goal: 'text-gold font-bold text-lg',
    event: 'text-yellow-400',
  }

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-3 h-64 overflow-y-auto">
      <AnimatePresence>
        {messages.map(m => (
          <M key={m.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`${colorMap[m.type]} text-sm py-0.5 border-b border-white/5 last:border-0`}>
            {m.text}
          </M>
        ))}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  )
}
