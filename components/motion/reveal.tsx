'use client'

import * as m from 'motion/react-m'
import { cn } from '@/lib/utils'

export const EASE = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'article'
}

/** Fade-in léger au scroll, joué une seule fois. */
export function Reveal({ children, className, delay = 0, y = 16, as = 'div' }: RevealProps) {
  const Comp = m[as]
  return (
    <Comp
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </Comp>
  )
}
