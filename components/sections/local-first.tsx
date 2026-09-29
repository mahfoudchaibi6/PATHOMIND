import { DatabaseBackup, History, KeyRound, Server, Share2, WifiOff } from 'lucide-react'
import { Card, CardDescription, CardIcon, CardTitle } from '@/components/ui/card'
import { SectionHeader } from '@/components/section-header'
import { Reveal } from '@/components/motion/reveal'
import { LocalDiagram } from '@/components/sections/local-diagram'

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

export function LocalFirst() {
  return (
    <section id="donnees" className="section overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-12rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,.14),transparent)] blur-2xl"
      />
      <div className="shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            eyebrow="Local-first"
            title={
              <>
                Vos données restent <span className="hl">sous votre contrôle.</span>
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
