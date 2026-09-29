import { GitBranch, HeartHandshake, ShieldCheck, Stethoscope } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'

const ITEMS = [
  { icon: Stethoscope, title: 'Conçu par un anatomopathologiste', text: 'À partir du workflow réel d’un laboratoire ACP.' },
  { icon: GitBranch, title: 'Workflow ACP de bout en bout', text: 'Du prélèvement au compte-rendu validé.' },
  { icon: ShieldCheck, title: 'Traçabilité à chaque étape', text: 'Qui a fait quoi, sur quel dossier, et quand.' },
  { icon: HeartHandshake, title: 'Accompagnement local', text: 'Installation, formation et support en Algérie.' },
]

export function TrustBar() {
  return (
    <section aria-label="Engagements PathoMind" className="border-y border-white/[0.06] bg-ink-900/60">
      <div className="container grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.05} className="flex gap-3.5 py-7 lg:px-6 lg:first:pl-0">
            <Icon className="mt-0.5 size-5 shrink-0 text-brand-400" aria-hidden />
            <div>
              <p className="text-sm font-medium text-slate-100">{title}</p>
              <p className="mt-1 text-sm text-slate-500">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
