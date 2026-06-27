import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { GroupTable } from '@/components/tournament/GroupTable'
import { useGameStore } from '@/store/gameStore'
import { isGroupStageComplete, isPlayerAdvanced, getPlayerGroupRank } from '@/engine/tournament'
import { ArrowRight, Play } from 'lucide-react'

export default function GroupStandingsPage() {
  const navigate = useNavigate()
  const { tournament, userTeam } = useGameStore()

  const playerGroup = tournament?.playerGroup || 'A'
  const groupRecords = tournament?.groups[playerGroup] || []
  const allDone = tournament ? isGroupStageComplete(tournament) : false
  const advanced = tournament ? isPlayerAdvanced(tournament) : false
  const playerRank = tournament ? getPlayerGroupRank(tournament) : 1
  const matchIndex = tournament?.currentMatchIndex || 0

  // 小组赛战绩摘要
  const recordSummary = useMemo(() => {
    const pr = groupRecords.find(r => r.teamId === tournament?.playerTeamId)
    if (!pr) return '暂无数据'
    return `${pr.played} 场 ${pr.won} 胜 ${pr.drawn} 平 ${pr.lost} 负 · ${pr.points} 分 · 进${pr.goalsFor}/失${pr.goalsAgainst}`
  }, [groupRecords, tournament])

  return (
    <div className="min-h-screen px-4 py-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-xl font-bold text-center mb-1">{playerGroup} 组积分榜</h1>
        <p className="text-white/40 text-sm text-center mb-1">
          {userTeam.name} · {userTeam.formation?.name}
        </p>
        <p className="text-white/30 text-xs text-center mb-3">{recordSummary}</p>

        {/* 状态卡片 */}
        {allDone ? (
          <Card className={`mb-4 text-center ${advanced ? 'border-green-500/50' : 'border-red-500/50'}`}>
            {advanced ? (
              <p className="text-green-400 font-bold text-lg">
                {playerRank <= 2 ? `✅ 小组第 ${playerRank} — 晋级 32 强！` : '✅ 最佳小组第三 — 晋级 32 强！'}
              </p>
            ) : (
              <p className="text-red-400 font-bold text-lg">❌ 小组第 {playerRank} — 遗憾出局</p>
            )}
          </Card>
        ) : (
          <Card className="mb-4 text-center border-gold/30">
            <p className="text-gold font-bold">
              已赛 {matchIndex}/3 场 · 小组第 {playerRank}
            </p>
          </Card>
        )}

        <GroupTable records={groupRecords} playerTeamId={tournament?.playerTeamId || 'PLAYER'} />

        {/* 其他小组 */}
        {tournament && Object.entries(tournament.groups)
          .filter(([k]) => k !== playerGroup)
          .map(([key, records]) => (
            <details key={key} className="mt-3">
              <summary className="text-white/50 text-sm cursor-pointer hover:text-white/80">{key} 组</summary>
              <GroupTable records={records} playerTeamId="" />
            </details>
          ))}

        {/* 底部按钮 */}
        <div className="mt-6 mb-20 space-y-2">
          {!allDone ? (
            <Button size="lg" className="w-full" onClick={() => navigate(`/match/group-${matchIndex + 1}`)}>
              <Play className="inline mr-1" size={16} />下一场比赛（第{matchIndex + 1}场）<ArrowRight className="inline ml-1" size={18} />
            </Button>
          ) : advanced ? (
            <Button size="lg" className="w-full" onClick={() => navigate('/knockout-bracket')}>
              查看淘汰赛签表 <ArrowRight className="inline ml-1" size={18} />
            </Button>
          ) : (
            <Button size="lg" className="w-full" onClick={() => navigate('/final-result')}>
              查看最终成绩 <ArrowRight className="inline ml-1" size={18} />
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
