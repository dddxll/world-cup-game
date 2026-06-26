import type { Player } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface Props { player: Player; selected?: boolean; onClick?: () => void }

export function PlayerCard({ player, selected, onClick }: Props) {
  return (
    <div onClick={onClick}
      className={`bg-white/5 rounded-xl border p-3 cursor-pointer transition-all active:scale-97
        ${selected ? 'border-gold shadow-gold/20' : 'border-white/10 hover:border-white/30'}`}>
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={player.avatar} className="w-12 h-12 rounded-full bg-white/10 object-cover"
            onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23333" width="100" height="100"/><text x="50" y="65" text-anchor="middle" fill="white" font-size="45">👤</text></svg>' }} />
          <span className="absolute -bottom-1 -right-1 bg-gold text-pitch text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {player.rating}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-sm truncate">{player.name}</h4>
          <p className="text-white/40 text-xs truncate">{player.nameEn}</p>
          <div className="flex gap-1 mt-1 flex-wrap">
            {player.positions.map(p => <Badge key={p} color="blue">{p}</Badge>)}
          </div>
        </div>
      </div>
      <div className="mt-2 space-y-0.5">
        <ProgressBar value={player.stats.speed} max={100} label="速度" color="bg-yellow-500" />
        <ProgressBar value={player.stats.shooting} max={100} label="射门" color="bg-red-500" />
        <ProgressBar value={player.stats.passing} max={100} label="传球" color="bg-blue-500" />
        <ProgressBar value={player.stats.defending} max={100} label="防守" color="bg-green-500" />
        <ProgressBar value={player.stats.physical} max={100} label="体能" color="bg-purple-500" />
      </div>
    </div>
  )
}
