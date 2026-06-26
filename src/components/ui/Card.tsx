interface Props {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  selected?: boolean
}

export function Card({ children, className = '', onClick, selected }: Props) {
  return (
    <div
      onClick={onClick}
      className={`bg-white/5 backdrop-blur rounded-xl border p-4 transition-all duration-200
        ${selected ? 'border-gold shadow-lg shadow-gold/20' : 'border-white/10 hover:border-white/20'}
        ${onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''} ${className}`}>
      {children}
    </div>
  )
}
