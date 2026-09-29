import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  light?: boolean
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ eyebrow, title, lead, light, align = 'left', className }: Props) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <Reveal>
        <span className={cn('eyebrow', light && 'eyebrow-dark')}>{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className={cn('h2 mt-5', light && 'h2-dark')}>{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className={cn('lead mt-5', light && 'lead-dark')}>{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
