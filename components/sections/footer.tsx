import { Logo } from '@/components/logo'
import { SITE } from '@/lib/content'

const COLS = [
  {
    title: 'Produits',
    links: [
      { label: 'PathoMind Lab', href: '#produits' },
      { label: 'PathoMind Viewer', href: '#produits' },
      { label: 'PathoMind Share', href: '#produits' },
    ],
  },
  {
    title: 'PathoMind',
    links: [
      { label: 'Workflow ACP', href: '#workflow' },
      { label: 'Données sous contrôle', href: '#donnees' },
      { label: 'Fondateur', href: '#fondateur' },
      { label: 'Questions fréquentes', href: '#faq' },
      { label: 'Demander une démo', href: '#contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-950">
      <div className="shell py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-500">
              Suite logicielle pour l’anatomie et la cytologie pathologiques. Conçue en Algérie.
            </p>
          </div>

          {COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate-500">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate-500">Contact</p>
            <address className="mt-5 space-y-3 not-italic">
              <a href={`mailto:${SITE.email}`} className="block text-sm text-slate-400 transition-colors hover:text-white">
                {SITE.email}
              </a>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm leading-relaxed text-slate-400 transition-colors hover:text-white"
              >
                {SITE.address}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.06] pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-slate-500">
            PathoMind est un logiciel d’organisation et de gestion du laboratoire. Il ne constitue pas un dispositif
            médical certifié et ne se substitue pas au jugement du pathologiste. Les captures présentées utilisent des
            données fictives.
          </p>
          <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-slate-600 sm:flex-row">
            <p>© {new Date().getFullYear()} PathoMind. Tous droits réservés.</p>
            <p>Incubé à Algeria Venture · Alger</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
