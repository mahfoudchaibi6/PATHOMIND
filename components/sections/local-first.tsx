import { DatabaseBackup, History, KeyRound, Server, Share2, WifiOff } from 'lucide-react'
import { Card, CardDescription, CardIcon, CardTitle } from '@/components/ui/card'
import { SectionHeader } from '@/components/section-header'
import { Reveal } from '@/components/motion/reveal'

const POINTS = [
  {
    icon: Server,
    title: 'Installé chez vous',
    text: 'PathoMind Lab s’installe sur le serveur de votre laboratoire ou sur l’infrastructure de votre choix.',
  },
  {
    icon: WifiOff,
    title: 'Pensé pour le réseau local',
    text: 'Le travail quotidien ne dépend pas d’une connexion internet ni d’un service distant.',
  },
  {
    icon: KeyRound,
    title: 'Accès par rôle',
    text: 'Comptes individuels : secrétariat, technicien, pathologiste, comptabilité, administrateur.',
  },
  {
    icon: History,
    title: 'Historique traçable',
    text: 'Validation horodatée et nominative, historique des actions sur chaque dossier.',
  },
  {
    icon: DatabaseBackup,
    title: 'Sauvegardes maîtrisées',
    text: 'La politique de sauvegarde est définie avec vous lors du déploiement.',
  },
  {
    icon: Share2,
    title: 'Partage uniquement choisi',
    text: 'Avec Share, seul le cas que vous décidez de partager sort du laboratoire.',
  },
]

const NODES = ['Réception', 'Technique', 'Pathologistes', 'Secrétariat & caisse']

function LocalDiagram() {
  return (
    <div className="glass relative p-6 sm:p-8" role="img" aria-label="Schéma : postes du laboratoire reliés à un serveur PathoMind local ; le partage d’un cas vers PathoMind Share est optionnel.">
      <div className="relative rounded-2xl border border-dashed border-white/15 p-5 pt-9 sm:p-8 sm:pt-11">
        <span className="absolute left-5 top-3.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate-500">
          Réseau local du laboratoire
        </span>

        {/* Liaisons */}
        <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[
            [24, 24],
            [76, 24],
            [24, 80],
            [76, 80],
          ].map(([x, y]) => (
            <line key={`${x}-${y}`} x1="50" y1="52" x2={x} y2={y} stroke="rgba(167,139,250,.35)" strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>

        <div className="relative grid grid-cols-2 gap-x-10 gap-y-28 sm:gap-x-20">
          {NODES.map((n) => (
            <div key={n} className="rounded-xl border border-white/10 bg-ink-900 px-3 py-3 text-center text-xs text-slate-300 sm:text-sm">
              {n}
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-2.5 rounded-xl border border-brand-400/30 bg-ink-900 px-4 py-3 shadow-glow">
            <Server className="size-4 text-brand-300" aria-hidden />
            <span className="whitespace-nowrap text-xs font-medium text-white sm:text-sm">Serveur PathoMind</span>
          </div>
        </div>
      </div>

      {/* Sortie optionnelle */}
      <div className="flex flex-col items-center">
        <div aria-hidden className="h-8 w-px border-l border-dashed border-accent-400/40" />
        <div className="flex items-center gap-2.5 rounded-xl border border-accent-400/25 bg-accent-400/[0.06] px-4 py-2.5 text-xs text-slate-300 sm:text-sm">
          <Share2 className="size-4 text-accent-300" aria-hidden />
          Partage d’un cas via Share, <span className="text-slate-500">sur décision du pathologiste</span>
        </div>
      </div>
    </div>
  )
}

export function LocalFirst() {
  return (
    <section id="donnees" className="section overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-12rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,.14),transparent)] blur-2xl"
      />
      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            eyebrow="Local-first"
            title={
              <>
                Vos données restent <span className="accent">sous votre contrôle.</span>
              </>
            }
            lead="Les données de vos patients sont sensibles. PathoMind est conçu pour fonctionner au plus près du laboratoire, sans dépendance à un cloud étranger."
          />
          <Reveal delay={0.1}>
            <LocalDiagram />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={0.04 * i}>
              <Card interactive className="h-full">
                <CardIcon>
                  <Icon aria-hidden />
                </CardIcon>
                <CardTitle className="mt-5">{title}</CardTitle>
                <CardDescription className="mt-2">{text}</CardDescription>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-slate-500">
            PathoMind n’est pas un dispositif médical certifié. Les modalités d’hébergement, de sauvegarde et de
            sécurité sont définies avec chaque établissement, en fonction de son infrastructure et de ses obligations.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
