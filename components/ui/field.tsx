import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Style commun des champs de formulaire PathoMind (input, textarea, select). */
export const fieldClass =
  'w-full min-w-0 rounded-[10px] border border-white/10 bg-white/[0.04] px-3.5 text-sm text-white placeholder:text-slate-500 transition-[color,border-color,box-shadow] outline-hidden hover:border-white/20 focus-visible:border-brand-400 focus-visible:ring-2 focus-visible:ring-brand-400/30 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-rose-400/60'

/** Select natif : sur mobile, le sélecteur du système reste le plus ergonomique. */
export const NativeSelect = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(fieldClass, 'h-11 cursor-pointer appearance-none pr-10 [&>option]:bg-ink-900', className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
    </div>
  )
)
NativeSelect.displayName = 'NativeSelect'
