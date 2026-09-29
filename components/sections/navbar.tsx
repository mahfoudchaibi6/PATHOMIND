'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { DemoCta } from '@/components/demo-cta'
import { Button } from '@/components/ui/button'
import { NAV } from '@/lib/content'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open
          ? 'border-b border-white/[0.06] bg-ink-950/90 backdrop-blur-xl'
          : 'border-b border-transparent'
      )}
    >
      <nav className="shell flex h-16 items-center justify-between md:h-[72px]" aria-label="Navigation principale">
        <a href="#top" aria-label="PathoMind, retour en haut de page" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3.5 py-2 text-sm text-slate-400 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <DemoCta size="sm" className="hidden sm:inline-flex" />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-slate-200 hover:bg-white/5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="h-[calc(100dvh-4rem)] border-t border-white/[0.06] bg-ink-950 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="shell flex flex-col gap-1 pt-6">
              {NAV.map((l, i) => (
                <m.li
                  key={l.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/[0.06] py-4 text-lg text-slate-200"
                  >
                    {l.label}
                  </a>
                </m.li>
              ))}
            </ul>
            <div className="shell mt-8">
              <Button asChild size="lg" className="w-full">
                <a href="#contact" onClick={() => setOpen(false)}>
                  Demander une démo
                </a>
              </Button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
