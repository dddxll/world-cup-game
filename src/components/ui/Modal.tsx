import { X } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function Modal({ open, onClose, title, children }: Props) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}>
      <div
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="bg-[#132a1c] border border-white/10 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto p-5 animate-slideUp">
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-lg font-bold text-gold">{title}</h3>}
          <button onClick={onClose} className="text-white/50 hover:text-white ml-auto"><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}
