import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { GroupTable } from '@/components/tournament/GroupTable'
import { useGameStore } from '@/store/gameStore'
import { ArrowRight } from 'lucide-react'

export default function GroupStandingsPage() {
  const navigate = useNavigate()
  const { tournament, userTeam, pkData } = useGameStore()

  // 找到玩家所在组
  const playerGroup = useMemo(() => {
    if (!tournament) return null
    for (const [key, records] of Object.entries(tournament.groups)) {
      if (records.some(r => r.teamId === tournament.playerTeamId)) return key
    }
    return Object.keys(tournament.groups)[0]
  }, [tournament])

  const groupRecords = playerGroup ? tournament?.groups[playerGroup] || [] : []

  // 检查玩家是否晋级(前2)
  const playerRecord = groupRecords.find(r => r.teamId === tournament?.playerTeamId)
  const sorted = [...groupRecords].sort((a, b) => {
    if (a.points !== b.points) return b.points - a.points
    if (a.goalDiff !== b.goalDiff) return b.goalDiff - a.goalDiff
    return b.goalsFor - a.goalsFor
  })
  const playerRank = sorted.findIndex(r => r.teamId === tournament?.playerTeamId) + 1
  const advanced = playerRank <= 2

  return (
    <div className="min-h-screen px-4 py-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        {pkData.playerA && <p className="text-gold text-center mb-2 font-bold">⚔️ 玩家 {pkData.currentPlayer}</p>}
        <h1 className="text-xl font-bold text-center mb-1">{playerGroup} 组积分榜</h1>
        <p className="text-white/40 text-sm text-center mb-4">
          {userTeam.name} · {userTeam.formation?.name}
        </p>

        {/* 晋级状态 */}
        <Card className={`mb-4 text-center ${advanced ? 'border-green-500/50' : 'border-red-500/50'}`}>
          {advanced ? (
            <p className="text-green-400 font-bold text-lg">✅ 小组第 {playerRank} — 晋级 32 强！</p>
          ) : playerRank === 3 ? (
            <p className="text-yellow-400 font-bold text-lg">⏳ 小组第 3 — 等待其他组结果...</p>
          ) : (
            <p className="text-red-400 font-bold text-lg">❌ 小组第 {playerRank} — 遗憾出局</p>
          )}
        </Card>

        <GroupTable records={groupRecords} playerTeamId={tournament?.playerTeamId || 'PLAYER'} />

        {/* 所有小组积分榜(折叠) */}
        {tournament && Object.entries(tournament.groups).filter(([k]) => k !== playerGroup).map(([key, records]) => (
          <details key={key} className="mt-3">
            <summary className="text-white/50 text-sm cursor-pointer hover:text-white/80">{key} 组</summary>
            <GroupTable records={records} playerTeamId="" />
          </details>
        ))}

        <div className="mt-6 mb-20">
          <Button size="lg" className="w-full" onClick={() => navigate(advanced ? '/knockout-bracket' : '/final-result')}>
            {advanced ? '查看淘汰赛对阵' : '查看最终成绩'} <ArrowRight className="inline ml-1" size={18} />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
