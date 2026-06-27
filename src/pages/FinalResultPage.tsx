import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ResultCard } from '@/components/share/ResultCard'
import { useGameStore } from '@/store/gameStore'
import { getFinalRankText } from '@/engine/tournament'
import { Download, Copy, Share2 } from 'lucide-react'
import html2canvas from 'html2canvas'

export default function FinalResultPage() {
  const navigate = useNavigate()
  const { userTeam, tournament } = useGameStore()

  const finalRank = useMemo(() => {
    if (!tournament) return '未知'
    // 兜底：如果赛事状态异常未完结，从已有数据推断
    if (!tournament.isPlayerEliminated && tournament.currentRound !== 'finished') {
      const playedKnockout = tournament.knockoutRounds?.filter(
        m => (m.homeTeam === '玩家球队' || m.awayTeam === '玩家球队') && m.homeScore !== undefined
      ) || []
      if (playedKnockout.length > 0) {
        const order = ['32强', '16强', '8强', '4强', '季军赛', '决赛']
        const last = playedKnockout.sort((a, b) => order.indexOf(b.round) - order.indexOf(a.round))[0]
        if (last) {
          const won = last.winner === '玩家球队'
          if (last.round === '决赛') return won ? '🏆 世界杯冠军！' : '🥈 亚军'
          if (last.round === '季军赛') return won ? '🥉 季军' : '殿军'
          if (!won) return `${last.round}被淘汰`
          return `${last.round}晋级`
        }
      }
      if (tournament.currentRound === 'group') {
        const pr = tournament.groups[tournament.playerGroup]?.find(r => r.teamId === tournament.playerTeamId)
        if (pr) {
          const idx = tournament.groups[tournament.playerGroup]?.indexOf(pr) ?? -1
          return `小组赛第 ${idx + 1} 名`
        }
      }
      return getFinalRankText(tournament)
    }
    return getFinalRankText(tournament)
  }, [tournament])

  // 生成赛事路径
  const tournamentPath = useMemo(() => {
    if (!tournament) return ''
    const parts: string[] = []
    const pr = tournament.groups[tournament.playerGroup]?.find(r => r.teamId === tournament.playerTeamId)
    if (pr) {
      parts.push(`小组赛${pr.played}场${pr.won}胜${pr.drawn}平${pr.lost}负`)
    }
    const knockoutMatches = tournament.knockoutRounds.filter(m =>
      (m.homeTeam === '玩家球队' || m.awayTeam === '玩家球队') && m.homeScore !== undefined
    )
    for (const m of knockoutMatches) {
      const isHome = m.homeTeam === '玩家球队'
      const userScore = isHome ? m.homeScore! : m.awayScore!
      const oppScore = isHome ? m.awayScore! : m.homeScore!
      const oppName = isHome ? m.awayTeam : m.homeTeam
      const won = (m.winner === '玩家球队')
      parts.push(`${m.round} ${won ? '胜' : '负'} ${oppName} ${userScore}-${oppScore}`)
    }
    return parts.join(' → ')
  }, [tournament])

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

  return (
    <div className="min-h-screen px-4 py-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-xl font-bold text-center mb-1">🏆 世界杯征程结束</h1>
        <p className="text-gold text-lg font-bold text-center mb-2">{finalRank}</p>
        {tournamentPath && (
          <p className="text-white/30 text-xs text-center mb-4 px-4">{tournamentPath}</p>
        )}

        <ResultCard rank={finalRank} />

        <div className="mt-4 space-y-2 mb-4">
          <Button variant="secondary" className="w-full" onClick={downloadCard}>
            <Download className="inline mr-2" size={16} />保存成绩截图
          </Button>
          <Button variant="secondary" className="w-full" onClick={copyLink}>
            <Copy className="inline mr-2" size={16} />复制游戏链接
          </Button>
        </div>

        <Button size="lg" className="w-full" onClick={() => navigate('/')}>
          <Share2 className="inline mr-2" size={16} />再来一局
        </Button>
      </motion.div>
    </div>
  )
}
