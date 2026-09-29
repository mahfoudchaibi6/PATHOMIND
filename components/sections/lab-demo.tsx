'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { Reveal, EASE } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LAB_SCREENS } from '@/lib/content'

export function LabDemo() {
  const [active, setActive] = useState(LAB_SCREENS[0].key)
  const screen = LAB_SCREENS.find((s) => s.key === active)!

  return (
    <section id="demo-lab" className="section bg-paper">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            light
            eyebrow="Aperçu · PathoMind Lab"
            title={
              <>
                Une interface claire, <span className="hl hl-dark">pensée pour l’équipe.</span>
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

        <Tabs value={active} onValueChange={setActive} className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="min-w-0 lg:col-span-4">
            <TabsList
              aria-label="Écrans PathoMind Lab"
              className="-mx-5 flex h-auto w-auto justify-start gap-2 overflow-x-auto rounded-none bg-transparent px-5 py-1 [scrollbar-width:none] lg:mx-0 lg:w-full lg:flex-col lg:items-stretch lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {LAB_SCREENS.map((s) => (
                <TabsTrigger
                  key={s.key}
                  value={s.key}
                  className="group h-auto flex-none flex-col items-start rounded-xl border border-transparent px-4 py-3 text-left whitespace-normal text-slate-700 shadow-none transition-[background-color,border-color,box-shadow] duration-200 hover:border-slate-200 hover:bg-white/60 hover:text-slate-700 focus-visible:ring-brand-400/40 data-[state=active]:border-brand-200 data-[state=active]:bg-white data-[state=active]:text-brand-700 data-[state=active]:shadow-soft lg:p-5"
                >
                  <span className="text-sm font-semibold">{s.label}</span>
                  <span className="mt-1.5 hidden text-sm leading-relaxed font-normal text-slate-500 lg:block">{s.caption}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 lg:hidden">{screen.caption}</p>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0 lg:col-span-8">
            <TabsContent value={active} forceMount>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,.35)]">
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
            </TabsContent>
          </Reveal>
        </Tabs>
      </div>
    </section>
  )
}
