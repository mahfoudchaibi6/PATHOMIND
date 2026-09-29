import { Blocks, Compass, HeartHandshake, MapPinned, Route, Stethoscope } from 'lucide-react'
import { Card, CardDescription, CardIcon, CardTitle } from '@/components/ui/card'
import { SectionHeader } from '@/components/section-header'
import { Reveal } from '@/components/motion/reveal'

const REASONS = [
  {
    icon: Stethoscope,
    title: 'Conçu de l’intérieur',
    text: 'Chaque écran part de la pratique quotidienne d’un anatomopathologiste, pas d’un modèle générique de LIS.',
  },
  {
    icon: MapPinned,
    title: 'Adapté au contexte algérien',
    text: 'Organisation des laboratoires privés et publics, facturation et caisse, interface en français.',
  },
  {
    icon: Route,
    title: 'Traçabilité de bout en bout',
    text: 'Du numéro de dossier à la validation signée, chaque action est rattachée à un utilisateur et à une date.',
  },
  {
    icon: Blocks,
    title: 'Une suite modulaire',
    text: 'Démarrez avec Lab. Ajoutez la lame numérique et la télépathologie quand votre laboratoire est prêt.',
  },
  {
    icon: HeartHandshake,
    title: 'Un accompagnement humain',
    text: 'Audit de vos flux, paramétrage, reprise des modèles de comptes-rendus, formation des équipes et support.',
  },
  {
    icon: Compass,
    title: 'L’IA à sa juste place',
    text: 'Nos travaux de recherche en pathologie numérique avancent séparément. Rien n’entre dans le produit sans validation.',
  },
]

export function Why() {
  return (
    <section id="pourquoi" className="section border-t border-white/[0.06] bg-ink-900/40">
      <div className="container">
        <SectionHeader
          align="center"
          eyebrow="Pourquoi PathoMind"
          title={
            <>
              Un outil de laboratoire, <span className="accent">pas une promesse.</span>
            </>
          }
          lead="Nous préférons un logiciel fiable, utilisé chaque jour, à des fonctionnalités spectaculaires."
        />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={0.04 * i}>
              <Card interactive className="h-full p-7">
                <CardIcon>
                  <Icon aria-hidden />
                </CardIcon>
                <CardTitle className="mt-5">{title}</CardTitle>
                <CardDescription className="mt-2">{text}</CardDescription>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
