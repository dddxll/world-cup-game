interface Props {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export function Button({ children, onClick, variant = 'primary', size = 'md', disabled, className = '' }: Props) {
  const base = 'rounded-lg font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
  const v = {
    primary: 'bg-gold text-pitch hover:bg-gold-light',
    secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/20',
    ghost: 'text-white/60 hover:text-white hover:bg-white/5',
  }
  const s = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5 text-base', lg: 'px-8 py-3 text-lg' }
  return (
    <button className={`${base} ${v[variant]} ${s[size]} ${className}`}
      onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
