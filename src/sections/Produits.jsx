import { Fragment } from 'react'
import { motion } from 'framer-motion'
import ProductVisual from '../components/DeviceFrame'
import { Arrow, SectionHeading, Stagger } from '../components/ui'
import { EASE, fadeInLeft, fadeInRight, fadeInUp, inView } from '../lib/animations'

const BADGES = {
  green:  { color: '#86efac', bg: 'rgba(34,197,94,.1)',  border: 'rgba(34,197,94,.28)',  dot: '#22c55e', pulse: true },
  violet: { color: '#c4b5fd', bg: 'rgba(124,58,237,.12)', border: 'rgba(167,139,250,.28)', dot: '#a78bfa' },
  blue:   { color: '#93c5fd', bg: 'rgba(59,130,246,.1)',  border: 'rgba(96,165,250,.28)',  dot: '#60a5fa' },
}

const PRODUITS = [
  {
    key: 'lab',
    index: '01',
    name: 'PathoMind Lab',
    tag: "Le LIS d'anatomopathologie algérien",
    badge: { label: 'Disponible', tone: 'green' },
    desc: "Gérez l'intégralité du workflow de votre laboratoire, des dossiers patients aux comptes-rendus PDF, dans une interface simple, rapide et conçue pour les laboratoires algériens.",
    features: [
      'Dossiers patients & prescripteurs',
      'Suivi prélèvements → blocs → lames',
      'Worklist pathologiste',
      'Éditeur de comptes-rendus avec modèles',
      'Export PDF automatique',
    ],
    visual: { kind: 'browser', url: 'lab.pathomind.org/tableau-de-bord', srcs: ['/screenshots/lab-tableau-de-bord.png'] },
    cta: 'Demander une démo',
    primary: true,
  },
  {
    key: 'viewer',
    index: '02',
    name: 'PathoMind Viewer',
    tag: 'La visionneuse de lames numériques',
    badge: { label: 'En déploiement', tone: 'violet' },
    desc: "Visualisez, annotez et analysez vos lames histologiques en haute résolution depuis n'importe quel navigateur, sans installation et sans limite de taille.",
    features: [
      'Visionneuse WSI haute résolution',
      'Zoom multi-niveaux (×2 à ×40)',
      'Annotations & mesures',
      'Compatible H&E, IHC, FISH',
      'Accès multi-utilisateurs',
    ],
    visual: { kind: 'photo', srcs: ['/products/pathomind-viewer.png'] },
    cta: 'En savoir plus',
  },
  {
    key: 'share',
    index: '03',
    name: 'PathoMind Share',
    tag: 'La téléexpertise pathologique sécurisée',
    badge: { label: 'En déploiement', tone: 'blue' },
    desc: 'Partagez vos cas, invitez des experts et organisez vos réunions de concertation pluridisciplinaire, en temps réel et en toute sécurité.',
    features: [
      'Cas partagés & téléexpertise',
      'RCP & réunions de concertation',
      'Discussion en temps réel',
      'Deuxième avis expert',
      'Annotations collaboratives',
    ],
    visual: { kind: 'photo', srcs: ['/products/pathomind-share.png'] },
    cta: 'En savoir plus',
  },
]

function Badge({ label, tone }) {
  const b = BADGES[tone]
  return (
    <span className="pm-mono inline-flex items-center gap-2 rounded-full px-3 py-1"
      style={{ fontSize: '.68rem', lineHeight: 1.6, letterSpacing: '.04em', color: b.color, background: b.bg, border: `1px solid ${b.border}` }}>
      <span className="relative inline-flex w-1.5 h-1.5">
        {b.pulse && <span className="absolute inset-0 rounded-full animate-ping" style={{ background: b.dot, opacity: .6 }}/>}
        <span className="relative w-1.5 h-1.5 rounded-full" style={{ background: b.dot }}/>
      </span>
      {label}
    </span>
  )
}

// Coche violette qui se dessine à l'apparition
const itemV = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
}
const checkV = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 0.5, ease: 'easeOut', delay: 0.15 } },
}

function Feature({ children }) {
  return (
    <motion.li variants={itemV} className="flex items-start gap-3.5" style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255,255,255,.82)' }}>
      <span className="flex-shrink-0 mt-[3px] w-5 h-5 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(124,58,237,.15)', border: '1px solid rgba(167,139,250,.3)' }}>
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#c4b5fd" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <motion.path d="m3.5 8.5 3 3 6-7" variants={checkV}/>
        </svg>
      </span>
      {children}
    </motion.li>
  )
}

export default function Produits() {
  return (
    <section id="produits" className="pm-section overflow-hidden">
      <div aria-hidden="true" className="absolute pointer-events-none" style={{
        left: '-25%', top: '20%', width: '70%', height: '60%',
        background: 'radial-gradient(closest-side, rgba(124,58,237,.12), transparent)', filter: 'blur(20px)',
      }}/>
      <div className="pm-container">

        <SectionHeading dark
          eyebrow="Nos produits"
          title={<>Une suite, trois produits.<br/><em className="italic pm-gradient-text">Un seul workflow.</em></>}
          lead="Chaque produit fonctionne seul et s'intègre naturellement aux autres, du laboratoire à la téléexpertise."
          className="mb-24 md:mb-32"
        />

        {PRODUITS.map((p, i) => {
          const reversed = i % 2 === 1
          return (
            <Fragment key={p.key}>
              {i > 0 && <div className="pm-divider-dark my-24 md:my-32" aria-hidden="true"/>}
              <article className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">

                <motion.div {...inView} variants={reversed ? fadeInRight : fadeInLeft}
                  className={`lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
                  <ProductVisual {...p.visual} alt={`${p.name} — ${p.tag}`}/>
                </motion.div>

                <Stagger stagger={0.08} className={`lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
                  <motion.div variants={fadeInUp} className="flex items-center gap-4">
                    <span className="pm-mono" style={{ fontSize: '.72rem', letterSpacing: '.18em', color: '#a78bfa' }}>{p.index}</span>
                    <Badge {...p.badge}/>
                  </motion.div>
                  <motion.h3 variants={fadeInUp} className="pm-display mt-6"
                    style={{ fontSize: 'clamp(2.1rem, 3.4vw, 2.75rem)', color: 'rgba(255,255,255,.95)', lineHeight: 1.1 }}>
                    {p.name}
                  </motion.h3>
                  <motion.div variants={fadeInUp} className="pm-mono uppercase mt-4"
                    style={{ fontSize: '.7rem', letterSpacing: '.16em', color: '#a78bfa', lineHeight: 1.6 }}>
                    {p.tag}
                  </motion.div>
                  <motion.p variants={fadeInUp} className="mt-6" style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: 'rgba(255,255,255,.55)' }}>
                    {p.desc}
                  </motion.p>

                  <motion.ul variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
                    className="flex flex-col gap-3.5 mt-8 list-none">
                    {p.features.map((f) => <Feature key={f}>{f}</Feature>)}
                  </motion.ul>

                  <motion.div variants={fadeInUp} className="mt-10">
                    <a href="#contact" className={p.primary ? 'pm-btn' : 'pm-btn-ghost'}>
                      {p.cta} <Arrow size={13}/>
                    </a>
                  </motion.div>
                </Stagger>
              </article>
            </Fragment>
          )
        })}
      </div>
    </section>
  )
}
