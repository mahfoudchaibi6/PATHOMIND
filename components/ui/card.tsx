import * as React from 'react'
import { cn } from '@/lib/utils'

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }>(
  ({ className, interactive, ...props }, ref) => (
    <div ref={ref} className={cn('glass p-6', interactive && 'glass-hover', className)} {...props} />
  )
)
Card.displayName = 'Card'

export function CardIcon({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'flex size-10 items-center justify-center rounded-xl border border-brand-400/20 bg-brand-500/10 text-brand-300 [&_svg]:size-5',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-base font-semibold text-white', className)} {...props} />
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm leading-relaxed text-slate-400', className)} {...props} />
}
