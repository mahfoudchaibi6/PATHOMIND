import { motion } from 'framer-motion'
import { Stagger } from '../components/ui'
import { fadeInUp } from '../lib/animations'

// Uniquement des soutiens réels. `logo` : chemin dans public/images/ une fois fourni ([À COMPLÉTER]), sinon texte simple.
const PARTENAIRES = [
  { name: 'Algeria Venture', role: 'Incubateur', logo: null },
  { name: 'Label « Projet innovant »', role: 'startup.dz', logo: null },
]

// Laboratoires pilotes : à activer seulement avec de vrais noms et de vraies citations, validés par les laboratoires.
export const SHOW_PILOTS = false
const PILOTES = [
  // { lab: 'Nom du laboratoire', ville: 'Ville', citation: '…', auteur: 'Dr …' },
]

export function Pilotes({ show = SHOW_PILOTS }) {
  if (!show || PILOTES.length === 0) return null
  return (
    <section aria-label="Laboratoires pilotes" className="pb-20">
      <Stagger className="pm-container grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div variants={fadeInUp} className="md:col-span-2 pm-mono uppercase"
          style={{ fontSize: '.68rem', letterSpacing: '.18em', color: '#a78bfa' }}>Laboratoires pilotes</motion.div>
        {PILOTES.map((p) => (
          <motion.figure key={p.lab} variants={fadeInUp} className="pm-card p-7">
            <blockquote className="pm-display italic" style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'rgba(255,255,255,.9)' }}>« {p.citation} »</blockquote>
            <figcaption className="mt-5" style={{ fontSize: '.875rem', color: 'rgba(255,255,255,.6)' }}>{p.auteur} · {p.lab}, {p.ville}</figcaption>
          </motion.figure>
        ))}
      </Stagger>
    </section>
  )
}

export default function Partenaires() {
  return (
    <section aria-labelledby="partenaires-titre" className="py-16 md:py-20 relative">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 pm-divider-dark"/>
      <Stagger className="pm-container flex flex-col md:flex-row items-center justify-center gap-6 md:gap-14 text-center">
        <motion.h2 id="partenaires-titre" variants={fadeInUp} className="pm-mono uppercase"
          style={{ fontSize: '.7rem', letterSpacing: '.18em', color: '#a78bfa' }}>
          Ils nous accompagnent
        </motion.h2>
        {PARTENAIRES.map((p) => (
          <motion.div key={p.name} variants={fadeInUp} className="flex flex-col items-center">
            {p.logo ? (
              <img src={p.logo} alt={p.name} loading="lazy" decoding="async" height="40" className="h-10 w-auto"/>
            ) : (
              <span className="pm-display" style={{ fontSize: '1.35rem', color: 'rgba(255,255,255,.9)' }}>{p.name}</span>
            )}
            <span className="mt-1" style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.6)' }}>{p.role}</span>
          </motion.div>
        ))}
      </Stagger>
    </section>
  )
}
