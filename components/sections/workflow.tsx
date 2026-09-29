'use client'

import { useRef } from 'react'
import { useScroll, useSpring } from 'motion/react'
import * as m from 'motion/react-m'
import { SectionHeader } from '@/components/section-header'
import { Reveal } from '@/components/motion/reveal'
import { WORKFLOW } from '@/lib/content'

export function Workflow() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="workflow" className="section bg-paper text-slate-700">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              light
              eyebrow="Workflow ACP"
              title={
                <>
                  Chaque prélèvement suivi, <span className="hl hl-dark">étape par étape.</span>
                </>
              }
              lead="PathoMind suit l’organisation réelle d’un laboratoire d’anatomie et cytologie pathologiques. Rien n’est perdu entre la réception et la validation."
            />
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2 text-xs">
                {['Lab', 'Viewer', 'Share'].map((p) => (
                  <span key={p} className="rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-slate-600">
                    PathoMind {p}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7">
          {/* Rail + progression liée au scroll */}
          <div aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-slate-200" />
          <m.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-6 left-[19px] top-6 w-px origin-top bg-linear-to-b from-brand-600 via-brand-500 to-cyan-accent-500"
          />

          {WORKFLOW.map((step, i) => (
            <Reveal as="li" key={step.title} delay={0.03 * i} className="relative flex gap-6 pb-10 last:pb-0">
              <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white font-mono text-xs font-medium text-brand-700 shadow-soft">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft transition-[border-color,box-shadow] duration-300 hover:border-brand-200 hover:shadow-[0_16px_40px_-16px_rgba(124,58,237,.25)]">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-ink-950">{step.title}</h3>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-brand-700/80">
                    {step.product}
                  </span>
                </div>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-600">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
