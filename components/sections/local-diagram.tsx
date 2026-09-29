'use client'

import { useRef } from 'react'
import { Server, Share2 } from 'lucide-react'
import { AnimatedBeam } from '@/components/ui/animated-beam'

const NODES = ['Réception', 'Technique', 'Pathologistes', 'Secrétariat & caisse']

/** Schéma du réseau local : flux lents des postes vers le serveur, partage Share optionnel. */
export function LocalDiagram() {
  const container = useRef<HTMLDivElement>(null)
  const server = useRef<HTMLDivElement>(null)
  const share = useRef<HTMLDivElement>(null)
  const n0 = useRef<HTMLDivElement>(null)
  const n1 = useRef<HTMLDivElement>(null)
  const n2 = useRef<HTMLDivElement>(null)
  const n3 = useRef<HTMLDivElement>(null)
  const nodes = [n0, n1, n2, n3]

  return (
    <div
      ref={container}
      className="glass relative p-6 sm:p-8"
      role="img"
      aria-label="Schéma : postes du laboratoire reliés à un serveur PathoMind local ; le partage d’un cas vers PathoMind Share est optionnel."
    >
      <div className="relative rounded-2xl border border-dashed border-white/15 p-5 pt-10 sm:p-8 sm:pt-11">
        <span className="absolute top-3.5 left-5 font-mono text-[0.65rem] tracking-[0.16em] text-slate-500 uppercase">
          Réseau local du laboratoire
        </span>

        <div className="relative grid grid-cols-2 gap-x-10 gap-y-28 sm:gap-x-20">
          {NODES.map((n, i) => (
            <div
              key={n}
              ref={nodes[i]}
              className="relative z-10 rounded-xl border border-white/10 bg-ink-900 px-3 py-3 text-center text-xs text-slate-300 sm:text-sm"
            >
              {n}
            </div>
          ))}
        </div>

        <div className="absolute top-[52%] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div
            ref={server}
            className="flex items-center gap-2.5 rounded-xl border border-brand-400/30 bg-ink-900 px-4 py-3 shadow-glow"
          >
            <Server className="size-4 text-brand-300" aria-hidden />
            <span className="text-xs font-medium whitespace-nowrap text-white sm:text-sm">Serveur PathoMind</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div
          ref={share}
          className="relative z-10 flex items-center gap-2.5 rounded-xl border border-cyan-accent-400/25 bg-ink-900 px-4 py-2.5 text-xs text-slate-300 sm:text-sm"
        >
          <Share2 className="size-4 text-cyan-accent-300" aria-hidden />
          <span>
            Partage d’un cas via Share, <span className="text-slate-500">sur décision du pathologiste</span>
          </span>
        </div>
      </div>

      {nodes.map((ref, i) => (
        <AnimatedBeam
          key={i}
          containerRef={container}
          fromRef={ref}
          toRef={server}
          curvature={i < 2 ? -18 : 18}
          duration={6}
          delay={i * 0.8}
          pathColor="#a78bfa"
          pathOpacity={0.18}
          pathWidth={1.5}
          gradientStartColor="#a78bfa"
          gradientStopColor="#7c3aed"
        />
      ))}
      <AnimatedBeam
        containerRef={container}
        fromRef={server}
        toRef={share}
        duration={6}
        delay={3.2}
        pathColor="#22d3ee"
        pathOpacity={0.15}
        pathWidth={1.5}
        gradientStartColor="#67e8f9"
        gradientStopColor="#22d3ee"
      />
    </div>
  )
}
