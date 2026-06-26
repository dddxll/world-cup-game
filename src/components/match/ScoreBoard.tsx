interface Props {
  homeName: string; awayName: string
  homeScore: number; awayScore: number
  homeColor?: string; minute: number
}

export function ScoreBoard({ homeName, awayName, homeScore, awayScore, homeColor, minute }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-4 text-center">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="w-12 h-12 mx-auto rounded-full mb-1" style={{ backgroundColor: homeColor || '#D4A843' }} />
          <p className="text-white font-bold text-sm truncate max-w-[120px] mx-auto">{homeName}</p>
        </div>
        <div className="flex items-center gap-3 px-4">
          <span className="text-4xl font-bold text-white tabular-nums">{homeScore}</span>
          <span className="text-white/30 text-lg">-</span>
          <span className="text-4xl font-bold text-white tabular-nums">{awayScore}</span>
        </div>
        <div className="flex-1">
          <div className="w-12 h-12 mx-auto rounded-full mb-1 bg-white/10" />
          <p className="text-white font-bold text-sm truncate max-w-[120px] mx-auto">{awayName}</p>
        </div>
      </div>
      <p className="text-gold text-sm mt-2">{minute}'</p>
    </div>
  )
}
