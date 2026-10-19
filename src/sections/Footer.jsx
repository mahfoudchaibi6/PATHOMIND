import { motion } from 'framer-motion'
import { Stagger } from '../components/ui'
import { fadeInUp } from '../lib/animations'
import Logo from '../components/Logo'
import { LAB_DEMO_URL } from '../lib/links'
import { ADDRESS, EMAIL, EMAIL_HREF, MAPS_URL, PHONE, PHONE_HREF, WHATSAPP_HREF } from '../lib/site'

const COLS = [
  {
    title: 'Produits',
    links: [
      { label: 'PathoMind Lab', href: '#produits' },
      { label: 'Démo PathoMind Lab ↗', href: LAB_DEMO_URL, external: true },
      { label: 'PathoMind Viewer', href: '#produits' },
      { label: 'PathoMind Share', href: '#produits' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'Installation', href: '#boitier' },
      { label: 'Tarifs', href: '#tarifs' },
      { label: 'Consulting', href: '#consulting' },
      { label: 'Fondateur', href: '#fondateur' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Demander une démo', href: '#contact' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: EMAIL, href: EMAIL_HREF },
      PHONE && { label: PHONE, href: PHONE_HREF },
      WHATSAPP_HREF && { label: 'WhatsApp', href: WHATSAPP_HREF, external: true },
      { label: ADDRESS.replace(', ', '\n'), href: MAPS_URL, external: true },
    ].filter(Boolean),
  },
]

export default function Footer() {
  return (
    <footer className="relative" style={{ background: 'linear-gradient(180deg, rgba(3,5,8,.7), #030508 60%)' }}>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #7c3aed 30%, #a78bfa 50%, #7c3aed 70%, transparent)' }}/>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 100% at 50% 0%, rgba(124,58,237,.12), transparent)' }}/>

      <div className="relative pm-container pt-24 md:pt-28 pb-10">
        <Stagger className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1.3fr] gap-x-8 gap-y-14 mb-20">
          <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
            <a href="#hero" className="inline-flex" aria-label="PathoMind — accueil">
              <Logo size={32}/>
            </a>
            <p className="mt-6 max-w-[280px]" style={{ fontSize: '.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,.6)' }}>
              Digitaliser l'anatomopathologie pour faire reculer le cancer, en Algérie et en Afrique.
            </p>
          </motion.div>

          {COLS.map((col) => (
            <motion.div key={col.title} variants={fadeInUp} className={col.title === 'Contact' ? 'col-span-2 md:col-span-1' : ''}>
              <h5 className="pm-mono uppercase mb-6" style={{ fontSize: '.68rem', letterSpacing: '.2em', color: 'rgba(167,139,250,.9)' }}>{col.title}</h5>
              <ul className="flex flex-col gap-3 list-none">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href || undefined}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noopener noreferrer' : undefined}
                      className="whitespace-pre-line break-words text-white/60 hover:text-white transition-colors duration-200"
                      style={{ fontSize: '.9375rem', lineHeight: 1.7 }}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </Stagger>

        <div className="flex items-center justify-between flex-wrap gap-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <p className="pm-mono" style={{ fontSize: '.7rem', letterSpacing: '.06em', color: 'rgba(255,255,255,.55)' }}>
            © {new Date().getFullYear()} PathoMind · Éditeur de logiciels médicaux · Algérie
          </p>
          <p className="pm-mono inline-flex items-center gap-2" style={{ fontSize: '.7rem', letterSpacing: '.06em', color: 'rgba(255,255,255,.55)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}/>
            Incubé à Algeria Venture
          </p>
        </div>
      </div>
    </footer>
  )
}
