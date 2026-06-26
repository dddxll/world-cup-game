import type { Coach } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface Props { coach: Coach; selected: boolean; onSelect: (coach: Coach) => void }

const STYLE_COLORS: Record<string, 'gold' | 'green' | 'red' | 'blue'> = {
  '高位压迫': 'red', '传控渗透': 'blue', '防守反击': 'green', '两翼齐飞': 'gold', '铁桶大巴': 'red',
}

export function CoachCard({ coach, selected, onSelect }: Props) {
  return (
    <div onClick={() => onSelect(coach)}
      className={`bg-white/5 rounded-xl border p-3 cursor-pointer transition-all active:scale-95
        ${selected ? 'border-gold shadow-lg shadow-gold/20' : 'border-white/10 hover:border-white/30'}`}>

      <div className="flex items-center gap-3 mb-3">
        <img src={coach.avatar} alt={coach.name} className="w-12 h-12 rounded-full object-cover bg-white/10"
          onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23D4A843" width="100" height="100"/><text x="50" y="65" text-anchor="middle" fill="white" font-size="40" font-family="sans-serif">⚽</text></svg>' }} />
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-sm truncate">{coach.name}</h3>
          <p className="text-white/40 text-xs truncate">{coach.nameEn} · {coach.nationality}</p>
        </div>
      </div>

      <Badge color={STYLE_COLORS[coach.style] || 'gold'}>{coach.style}</Badge>

      <div className="mt-2 space-y-1">
        <ProgressBar value={coach.att} max={20} label="进攻" color="bg-red-500" />
        <ProgressBar value={coach.def} max={20} label="防守" color="bg-blue-500" />
        <ProgressBar value={coach.adp} max={20} label="临场" color="bg-green-500" />
      </div>

      <p className="text-white/30 text-xs mt-2 line-clamp-1">{coach.description}</p>
    </div>
  )
}
