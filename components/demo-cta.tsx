import { ArrowRight } from 'lucide-react'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { cn } from '@/lib/utils'

/** Bouton « Demander une démo » : reflet lent et discret, flèche en micro-mouvement au survol. */
export function DemoCta({
  size = 'lg',
  className,
  onClick,
  children = 'Demander une démo',
}: {
  size?: 'sm' | 'lg'
  className?: string
  onClick?: () => void
  children?: React.ReactNode
}) {
  return (
    <ShimmerButton
      href="#contact"
      onClick={onClick}
      background="linear-gradient(180deg,#8b5cf6 0%,#7c3aed 55%,#6d28d9 100%)"
      shimmerColor="#e9d5ff"
      shimmerDuration="4s"
      shimmerSize="0.06em"
      borderRadius="10px"
      className={cn(
        'gap-2 border-brand-300/20 font-medium shadow-[0_8px_24px_-8px_rgba(124,58,237,.7)] transition-[box-shadow,transform] hover:shadow-[0_14px_36px_-10px_rgba(124,58,237,.85)]',
        size === 'lg' ? 'h-12 px-6 text-[0.95rem]' : 'h-9 px-4 text-sm',
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight
        className="relative z-10 size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
        aria-hidden
      />
    </ShimmerButton>
  )
}
