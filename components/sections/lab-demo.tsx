'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { Reveal, EASE } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { LAB_SCREENS } from '@/lib/content'
import { cn } from '@/lib/utils'

export function LabDemo() {
  const [active, setActive] = useState(LAB_SCREENS[0].key)
  const screen = LAB_SCREENS.find((s) => s.key === active)!

  return (
    <section id="demo-lab" className="section bg-paper">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            light
            eyebrow="Aperçu · PathoMind Lab"
            title={
              <>
                Une interface claire, <span className="accent accent-dark">pensée pour l’équipe.</span>
              </>
            }
            lead="Captures réelles du logiciel, sur un jeu de données fictif."
          />
          <Reveal>
            <Button asChild variant="outline">
              <a href="#contact">
                Voir une démo en direct
                <ArrowRight />
              </a>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="min-w-0 lg:col-span-4">
            <div role="tablist" aria-label="Écrans PathoMind Lab" className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
              {LAB_SCREENS.map((s) => {
                const selected = s.key === active
                return (
                  <button
                    key={s.key}
                    role="tab"
                    aria-selected={selected}
                    aria-controls="lab-screen"
                    onClick={() => setActive(s.key)}
                    className={cn(
                      'shrink-0 rounded-xl border px-4 py-3 text-left transition-[background-color,border-color,box-shadow] duration-200 lg:p-5',
                      selected
                        ? 'border-brand-200 bg-white shadow-soft'
                        : 'border-transparent hover:border-slate-200 hover:bg-white/60'
                    )}
                  >
                    <span className={cn('text-sm font-semibold', selected ? 'text-brand-700' : 'text-slate-700')}>
                      {s.label}
                    </span>
                    <span className="mt-1.5 hidden text-sm leading-relaxed text-slate-500 lg:block">{s.caption}</span>
                  </button>
                )
              })}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 lg:hidden">{screen.caption}</p>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0 lg:col-span-8">
            <div id="lab-screen" role="tabpanel" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,.35)]">
              <div className="flex h-8 items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-slate-200" />
                <span className="size-2.5 rounded-full bg-slate-200" />
                <span className="size-2.5 rounded-full bg-slate-200" />
              </div>
              <div className="relative aspect-[16/9] bg-slate-50">
                <AnimatePresence initial={false}>
                  <m.div
                    key={screen.key}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      fill
                      sizes="(min-width: 1024px) 780px, 100vw"
                      className="object-cover object-top"
                    />
                  </m.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
