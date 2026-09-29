import Image from 'next/image'
import { ArrowRight, CheckCircle2, FileCheck2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BrowserFrame } from '@/components/browser-frame'

/** Apparition CSS : visible sans attendre l'hydratation (meilleur LCP). */
function In({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`animate-fade-up ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  )
}

const POINTS = ['Déploiement local', 'Traçabilité de bout en bout', 'Accompagnement sur site']

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-44">
      {/* Fond : grille fine + halos très discrets */}
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-18rem] h-[42rem] w-[70rem] -translate-x-1/2 animate-drift rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,.28),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10rem] top-[26rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,.10),transparent)] blur-2xl"
      />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <In>
            <Badge tone="rollout" className="normal-case tracking-normal">
              <span className="sm:hidden">Anatomie et cytologie pathologiques</span>
              <span className="hidden sm:inline">Suite logicielle pour l’anatomie et la cytologie pathologiques</span>
            </Badge>
          </In>

          <In delay={0.06}>
            <h1 className="mt-7 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              Votre laboratoire ACP,{' '}
              <span className="accent">de la réception à la validation.</span>
            </h1>
          </In>

          <In delay={0.12}>
            <p className="lead mx-auto mt-6 max-w-2xl">
              PathoMind réunit gestion de laboratoire, visualisation de lames numériques et télépathologie dans une
              suite conçue par un anatomopathologiste, pour les laboratoires, cliniques et hôpitaux en Algérie.
            </p>
          </In>

          <In delay={0.18} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#contact">
                Demander une démo
                <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <a href="#produits">Découvrir la suite</a>
            </Button>
          </In>

          <In delay={0.24}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
              {POINTS.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-accent-400/80" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </In>
        </div>

        {/* Visuel produit */}
        <In delay={0.3} className="relative mx-auto mt-16 max-w-5xl md:mt-20">
          <div
            aria-hidden
            className="absolute -inset-x-8 -inset-y-6 rounded-[2rem] bg-gradient-to-b from-brand-600/20 via-brand-600/5 to-transparent blur-2xl"
          />
          <BrowserFrame className="relative">
            <Image
              src="/images/lab-dashboard.webp"
              alt="Tableau de bord PathoMind Lab : dossiers reçus, en cours, urgents et comptes-rendus à valider (données fictives)"
              width={1424}
              height={805}
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="h-auto w-full"
            />
          </BrowserFrame>

          {/* Carte flottante : validation tracée */}
          <div className="glass absolute -bottom-6 left-4 hidden items-center gap-3 bg-ink-900/80 px-4 py-3 shadow-product sm:flex md:-left-8">
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
              <FileCheck2 className="size-[18px]" aria-hidden />
            </div>
            <div className="text-left">
              <p className="text-[0.8rem] font-medium text-white">Compte-rendu validé</p>
              <p className="font-mono text-[0.66rem] text-slate-400">AP-2026-000011 · horodaté · signé</p>
            </div>
          </div>
        </In>
      </div>
    </section>
  )
}
