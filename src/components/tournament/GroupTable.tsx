import type { GroupRecord } from '@/types'

interface Props { records: GroupRecord[]; playerTeamId: string }

export function GroupTable({ records, playerTeamId }: Props) {
  const sorted = [...records].sort((a, b) => {
    if (a.points !== b.points) return b.points - a.points
    if (a.goalDiff !== b.goalDiff) return b.goalDiff - a.goalDiff
    return b.goalsFor - a.goalsFor
  })

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-white/40 text-xs border-b border-white/10">
            <th className="py-2 text-left w-6">#</th>
            <th className="py-2 text-left">球队</th>
            <th className="py-2 text-center w-8">赛</th>
            <th className="py-2 text-center w-8">胜</th>
            <th className="py-2 text-center w-8">平</th>
            <th className="py-2 text-center w-8">负</th>
            <th className="py-2 text-center w-10">进球</th>
            <th className="py-2 text-center w-10">失球</th>
            <th className="py-2 text-center w-10">净胜</th>
            <th className="py-2 text-center w-10 font-bold">分</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => (
            <tr key={r.teamId}
              className={`border-b border-white/5 ${r.teamId === playerTeamId ? 'bg-gold/10 text-gold' : 'text-white/70'}
                ${i < 2 ? 'font-medium' : ''}`}>
              <td className="py-2 text-white/40">{i + 1}</td>
              <td className="py-2">
                <span className="mr-1">{r.flag}</span>
                {r.teamName}
                {i < 2 && <span className="ml-1 text-green-400 text-xs">↑晋级</span>}
                {i === 2 && <span className="ml-1 text-yellow-400 text-xs">待定</span>}
              </td>
              <td className="py-2 text-center text-white/40">{r.played}</td>
              <td className="py-2 text-center">{r.won}</td>
              <td className="py-2 text-center">{r.drawn}</td>
              <td className="py-2 text-center">{r.lost}</td>
              <td className="py-2 text-center">{r.goalsFor}</td>
              <td className="py-2 text-center">{r.goalsAgainst}</td>
              <td className="py-2 text-center">{r.goalDiff > 0 ? '+' : ''}{r.goalDiff}</td>
              <td className="py-2 text-center font-bold">{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
