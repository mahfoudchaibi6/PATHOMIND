import { motion } from 'framer-motion'
import { SectionHeading, Stagger } from '../components/ui'
import { fadeInUp } from '../lib/animations'

const PILIERS = [
  {
    n: '01',
    title: 'Conçu par des médecins',
    desc: "Chaque écran est pensé avec des pathologistes, à partir du workflow réel d'un laboratoire algérien.",
    icon: <path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-2m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>,
  },
  {
    n: '02',
    title: 'Souveraineté des données',
    desc: 'Hébergement en Algérie, conforme aux exigences du Ministère de la Santé.',
    icon: <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Zm-3 9 2 2 4-4"/>,
  },
  {
    n: '03',
    title: 'Support local',
    desc: 'Une équipe basée à Alger : déploiement sur site, assistance en français et en arabe.',
    icon: <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>,
  },
]

export default function ChiffresCles() {
  return (
    <section className="pm-section relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 pm-divider-dark"/>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(124,58,237,.16), transparent 70%)',
      }}/>
      <div className="relative pm-container">
        <SectionHeading center dark
          eyebrow="Pourquoi PathoMind"
          title={<>Construit ici, <em className="italic pm-gradient-text">pour ici.</em></>}
          className="mb-16 md:mb-20"
        />
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILIERS.map((c) => (
            <motion.div key={c.title} variants={fadeInUp}
              whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="pm-card p-8 md:p-9">
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(124,58,237,.12)', border: '1px solid rgba(167,139,250,.2)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{c.icon}</svg>
                </span>
                <span className="pm-mono" style={{ fontSize: '.72rem', letterSpacing: '.18em', color: 'rgba(167,139,250,.6)' }}>{c.n}</span>
              </div>
              <h3 className="pm-display mt-10" style={{ fontSize: '1.5rem', lineHeight: 1.25, letterSpacing: '-.02em', color: 'rgba(255,255,255,.95)' }}>{c.title}</h3>
              <p className="mt-3" style={{ fontSize: '.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,.5)' }}>{c.desc}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
