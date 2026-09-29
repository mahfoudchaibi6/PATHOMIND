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
import { Safari } from '@/components/ui/safari'
import { LabVideo } from '@/components/lab-video'

const VIDEO_TAB = {
  key: 'video',
  label: 'Visite vidéo',
  caption: 'Le parcours complet d’un dossier en 1 min 48 : réception, macroscopie, blocs et lames, compte-rendu, PDF et facturation.',
}
const TABS = [VIDEO_TAB, ...LAB_SCREENS]

export function LabDemo() {
  const [active, setActive] = useState(VIDEO_TAB.key)
  const tab = TABS.find((s) => s.key === active)!
  const screen = LAB_SCREENS.find((s) => s.key === active)

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
            lead="Vidéo et captures réelles du logiciel, sur un jeu de données fictif."
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
              {TABS.map((s) => (
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
            <p className="mt-4 text-sm leading-relaxed text-slate-500 lg:hidden">{tab.caption}</p>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0 lg:col-span-8">
            <TabsContent value={active} forceMount>
              <Safari url="lab.pathomind.local" className="drop-shadow-[0_30px_50px_rgba(15,23,42,.22)]">
                {active === VIDEO_TAB.key ? (
                  <LabVideo />
                ) : (
                  <AnimatePresence initial={false}>
                    {screen && (
                      <m.div
                        key={screen.key}
                        className="absolute inset-0 bg-slate-50"
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
                    )}
                  </AnimatePresence>
                )}
              </Safari>
            </TabsContent>
          </Reveal>
        </Tabs>
      </div>
    </section>
  )
}
