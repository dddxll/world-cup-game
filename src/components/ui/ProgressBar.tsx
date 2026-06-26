export function ProgressBar({ value, max = 100, label, color = 'bg-gold' }: { value: number; max?: number; label?: string; color?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs text-white/60 mb-1">
          <span>{label}</span><span>{value}</span>
        </div>
      )}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
