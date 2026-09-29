import Image from 'next/image'
import { cn } from '@/lib/utils'

/** Symbole PathoMind + wordmark typographique (net à toutes les tailles). */
export function Logo({ className, size = 30 }: { className?: string; size?: number }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Image
        src="/images/pathomind-mark.png"
        alt=""
        width={Math.round(size * 0.88)}
        height={size}
        priority
      />
      <span className="text-[0.95rem] font-medium tracking-[0.32em] text-slate-100">
        PATHO<span className="text-brand-400">MIND</span>
      </span>
    </span>
  )
}
