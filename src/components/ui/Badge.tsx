export function Badge({ children, color = 'gold' }: { children: React.ReactNode; color?: 'gold' | 'green' | 'red' | 'blue' }) {
  const c = {
    gold: 'bg-gold/20 text-gold border-gold/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  }
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${c[color]}`}>
      {children}
    </span>
  )
}
