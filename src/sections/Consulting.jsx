import { motion } from 'framer-motion'
import { Arrow, Stagger } from '../components/ui'
import { fadeInUp } from '../lib/animations'

const SERVICES = [
  {
    n: '01',
    title: 'Audit digital',
    desc: 'État des lieux de vos outils et de vos flux, et feuille de route de transformation adaptée à votre établissement.',
    icon: <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-4-4"/>,
  },
  {
    n: '02',
    title: 'Déploiement & configuration',
    desc: 'Installation, paramétrage de vos modèles et intégration à votre SIH existant.',
    icon: <path d="M4 7h10M4 17h6m4 0h6M18 7h2M14 4v6M10 14v6"/>,
  },
  {
    n: '03',
    title: 'Formation des équipes',
    desc: 'Sessions sur site pour médecins, techniciens et secrétariat, jusqu’à l’autonomie complète.',
    icon: <path d="m3 9 9-5 9 5-9 5-9-5Zm4 2.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5"/>,
  },
  {
    n: '04',
    title: 'Support continu',
    desc: 'Une équipe locale qui répond vite, en français et en arabe, et fait évoluer la solution avec vous.',
    icon: <path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2Zm16 0v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z"/>,
  },
]

export default function Consulting() {
  return (
    <section id="consulting" className="pm-section bg-white" style={{ color: '#0a0f1e' }}>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 pm-divider"/>
      <div className="pm-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-16 lg:gap-20 items-start">

          <Stagger className="lg:sticky lg:top-32">
            <motion.div variants={fadeInUp}><span className="pm-eyebrow">Consulting & Intégration</span></motion.div>
            <motion.h2 variants={fadeInUp} className="pm-h2 mt-6" style={{ color: '#0a0f1e' }}>
              La technologie ne suffit pas.<br/>
              <em className="italic pm-gradient-text-dark">On vous accompagne.</em>
            </motion.h2>
            <motion.p variants={fadeInUp} className="pm-lead mt-7" style={{ color: '#5a6478' }}>
              Nous accompagnons les laboratoires et hôpitaux dans leur transformation digitale, de l'audit initial au support au quotidien.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10">
              <a href="#contact" className="pm-btn">Parler à un consultant <Arrow size={13}/></a>
            </motion.div>
          </Stagger>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICES.map((s) => (
              <motion.div key={s.title} variants={fadeInUp}
                whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="pm-card-light p-8">
                <div className="flex items-center justify-between mb-8">
                  <span className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(145deg, #f5f1ff, #ede7ff)', border: '1px solid #e4dcff' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{s.icon}</svg>
                  </span>
                  <span className="pm-mono" style={{ fontSize: '.72rem', letterSpacing: '.18em', color: '#b7a6f5' }}>{s.n}</span>
                </div>
                <h3 className="pm-display" style={{ fontSize: '1.4rem', lineHeight: 1.25, letterSpacing: '-.02em', color: '#0a0f1e' }}>{s.title}</h3>
                <p className="mt-3" style={{ fontSize: '.9375rem', lineHeight: 1.75, color: '#5a6478' }}>{s.desc}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
