import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.08em]',
  {
    variants: {
      tone: {
        available: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
        rollout: 'border-brand-400/25 bg-brand-400/10 text-brand-300',
        info: 'border-cyan-accent-400/25 bg-cyan-accent-400/10 text-cyan-accent-300',
        neutral: 'border-white/10 bg-white/5 text-slate-300',
      },
    },
    defaultVariants: { tone: 'neutral' },
  }
)

const dotColor = {
  available: 'bg-emerald-400',
  rollout: 'bg-brand-400',
  info: 'bg-cyan-accent-400',
  neutral: 'bg-slate-400',
} as const

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

export function Badge({ className, tone, dot = true, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      {dot && <span className={cn('size-1.5 rounded-full', dotColor[tone ?? 'neutral'])} />}
      {children}
    </span>
  )
}
