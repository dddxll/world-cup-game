import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ResultCard } from '@/components/share/ResultCard'
import { useGameStore } from '@/store/gameStore'
import { Download, Copy, Share2 } from 'lucide-react'
import html2canvas from 'html2canvas'

export default function FinalResultPage() {
  const navigate = useNavigate()
  const { userTeam, pkData, savePkResult, switchPkPlayer, tournament } = useGameStore()
  const isPk = pkData.playerA !== null

  async function downloadCard() {
    const card = document.getElementById('result-card')
    if (!card) return
    const canvas = await html2canvas(card, { backgroundColor: '#0D2818', scale: 2 })
    const link = document.createElement('a')
    link.download = `worldcup-${userTeam.name}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.origin)
    alert('链接已复制！')
  }

  function handlePkNext() {
    if (!tournament) return
    if (pkData.currentPlayer === 'A' && !pkData.playerA) {
      savePkResult('A', userTeam, tournament)
      switchPkPlayer()
    } else if (pkData.currentPlayer === 'B') {
      savePkResult('B', userTeam, tournament)
      navigate('/pk-compare')
    }
  }

  return (
    <div className="min-h-screen px-4 py-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        {isPk && <p className="text-gold text-center mb-2 font-bold">⚔️ 玩家 {pkData.currentPlayer} 完赛</p>}
        <h1 className="text-xl font-bold text-center mb-4">🏆 世界杯征程结束</h1>

        <ResultCard />

        <div className="mt-4 space-y-2 mb-4">
          <Button variant="secondary" className="w-full" onClick={downloadCard}>
            <Download className="inline mr-2" size={16} />保存成绩截图
          </Button>
          <Button variant="secondary" className="w-full" onClick={copyLink}>
            <Copy className="inline mr-2" size={16} />复制游戏链接
          </Button>
        </div>

        {isPk ? (
          <Button size="lg" className="w-full" onClick={handlePkNext}>
            {pkData.currentPlayer === 'A' && !pkData.playerA
              ? '交给玩家 B'
              : '查看 PK 结果'}
          </Button>
        ) : (
          <Button size="lg" className="w-full" onClick={() => navigate('/')}>
            <Share2 className="inline mr-2" size={16} />再来一局
          </Button>
        )}
      </motion.div>
    </div>
  )
}
