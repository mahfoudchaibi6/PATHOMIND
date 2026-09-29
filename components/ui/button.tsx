import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-600 text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,.7)] hover:bg-brand-500 hover:shadow-[0_12px_32px_-8px_rgba(124,58,237,.8)] active:translate-y-px',
        secondary:
          'border border-white/10 bg-white/[0.04] text-slate-100 backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.08]',
        outline:
          'border border-slate-300 bg-white text-ink-950 hover:border-brand-400 hover:text-brand-700',
        ghost: 'text-slate-300 hover:bg-white/5 hover:text-white',
        link: 'px-0 text-brand-300 underline-offset-4 hover:text-brand-200 hover:underline',
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-11 px-5',
        lg: 'h-12 px-6 text-[0.95rem]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
