'use client'

import { useState } from 'react'
import Image from 'next/image'
import * as m from 'motion/react-m'
import { ArrowRight, Check, FlaskConical, Microscope, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SectionHeader } from '@/components/section-header'
import { Reveal, EASE } from '@/components/motion/reveal'
import { PRODUCTS, type ProductKey } from '@/lib/content'
import { cn } from '@/lib/utils'

const ICONS: Record<ProductKey, typeof FlaskConical> = {
  lab: FlaskConical,
  viewer: Microscope,
  share: Share2,
}

export function Products() {
  const [active, setActive] = useState<ProductKey>('lab')
  const product = PRODUCTS.find((p) => p.key === active)!

  return (
    <section id="produits" className="section">
      <div className="shell">
        <SectionHeader
          eyebrow="La suite PathoMind"
          title={
            <>
              Trois produits, <span className="hl">un seul workflow.</span>
            </>
          }
          lead="Chaque module fonctionne seul et s’intègre aux autres. Commencez par la gestion du laboratoire, ajoutez la lame numérique et la télépathologie à votre rythme."
        />

        <Tabs value={active} onValueChange={(v) => setActive(v as ProductKey)} className="mt-12 gap-0">
          <Reveal delay={0.1}>
            <TabsList
              aria-label="Produits PathoMind"
              className="grid h-auto w-full grid-cols-3 gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-1.5 sm:inline-grid sm:w-auto"
            >
              {PRODUCTS.map((p) => {
                const Icon = ICONS[p.key]
                const selected = p.key === active
                return (
                  <TabsTrigger
                    key={p.key}
                    value={p.key}
                    className="relative h-auto rounded-xl border-0 px-3 py-2.5 text-slate-400 hover:text-slate-200 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none sm:px-5"
                  >
                    {selected && (
                      <m.span
                        layoutId="product-tab"
                        className="absolute inset-0 rounded-xl border border-brand-400/25 bg-brand-500/15"
                        transition={{ duration: 0.35, ease: EASE }}
                      />
                    )}
                    <Icon className="relative size-4" aria-hidden />
                    <span className="relative">
                      <span className="hidden sm:inline">PathoMind </span>
                      {p.short}
                    </span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Reveal>

          {/* Panneau produit : transition douce à chaque changement */}
          <TabsContent value={product.key} className="mt-10 min-h-[560px] lg:min-h-[520px]">
            <m.div
              key={product.key}
              className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="lg:col-span-5">
                <Badge tone={product.status.tone}>{product.status.label}</Badge>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white md:text-3xl">{product.name}</h3>
                <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.16em] text-brand-300">
                  {product.tagline}
                </p>
                <p className="mt-5 leading-relaxed text-slate-400">{product.description}</p>
                <ul className="mt-7 space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.95rem] text-slate-200">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-300">
                        <Check className="size-3" aria-hidden />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={product.key === 'lab' ? 'primary' : 'secondary'} className="mt-9">
                  <a href="#contact">
                    {product.key === 'lab' ? 'Demander une démo de Lab' : 'Être informé du déploiement'}
                    <ArrowRight />
                  </a>
                </Button>
              </div>

              <div className="relative lg:col-span-7">
                <div
                  aria-hidden
                  className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(124,58,237,.22),transparent)] blur-2xl"
                />
                <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-product">
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    width={product.image.width}
                    height={product.image.height}
                    sizes="(min-width: 1024px) 680px, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                {product.key !== 'lab' && (
                  <p className="mt-3 text-center text-xs text-slate-500">Visuel de présentation. Interface en cours de déploiement.</p>
                )}
              </div>
            </m.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
