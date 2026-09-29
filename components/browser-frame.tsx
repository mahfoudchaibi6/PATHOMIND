import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Cadre de navigateur sobre pour présenter les captures produit. */
export function BrowserFrame({
  children,
  url = 'lab.pathomind.local',
  className,
}: {
  children: React.ReactNode
  url?: string
  className?: string
}) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-white/10 bg-ink-800 shadow-product', className)}>
      <div className="flex h-9 items-center gap-3 border-b border-white/[0.06] bg-ink-900/90 px-3.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div className="mx-auto flex h-6 max-w-[260px] flex-1 items-center justify-center gap-1.5 rounded-md bg-white/[0.04] px-3 font-mono text-[0.66rem] text-slate-500">
          <Lock className="size-3" aria-hidden />
          <span className="truncate">{url}</span>
        </div>
        <div className="w-[42px]" aria-hidden />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
