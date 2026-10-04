import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserFrame, SmartImage } from '../components/DeviceFrame'
import { Reveal, SectionHeading } from '../components/ui'
import { EASE, scaleIn } from '../lib/animations'

const VUES = [
  {
    key: 'dashboard',
    label: 'Tableau de bord',
    url: 'lab.pathomind.org/dashboard',
    srcs: ['/screenshots/2_tableau_de_bord.png'],
    desc: "Vue d'ensemble de l'activité du laboratoire : dossiers en cours, retards, cas à valider.",
  },
  {
    key: 'facturation',
    label: 'Facturation',
    url: 'lab.pathomind.org/caisse',
    srcs: ['/screenshots/4_caisse_facturation.png'],
    desc: 'Caisse du jour intégrée : encaissements, factures impayées, reçus et export CSV.',
  },
  {
    key: 'cr',
    label: 'Compte-rendu',
    url: 'lab.pathomind.org/compte-rendu',
    srcs: ['/screenshots/3_compte_rendu_valide.png'],
    desc: 'Éditeur structuré avec modèles, validation et export PDF en un clic.',
  },
]

export default function ScreenshotsLab() {
  const [active, setActive] = useState(0)
  const vue = VUES[active]

  return (
    <section id="solutions" className="pm-section relative overflow-hidden" style={{ background: 'transparent' }}>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px pm-divider-dark"/>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 45% at 50% 85%, rgba(124,58,237,.2) 0%, transparent 70%)',
      }}/>

      <div className="relative pm-container">
        <SectionHeading center dark
          eyebrow="PathoMind Lab en action"
          title={<>Le laboratoire, <em className="italic pm-gradient-text">enfin fluide.</em></>}
          lead="Une interface claire, pensée pour le quotidien des techniciens, secrétaires et pathologistes."
          className="mb-16"
        />

        {/* Onglets */}
        <Reveal className="flex justify-center mb-10">
          <div role="tablist" aria-label="Écrans de PathoMind Lab"
            className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-full"
            style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}>
            {VUES.map((v, i) => (
              <button key={v.key} role="tab" aria-selected={i === active} onClick={() => setActive(i)}
                className="relative rounded-full px-5 py-2 transition-colors duration-300"
                style={{ fontSize: '.875rem', fontWeight: 500, color: i === active ? '#fff' : 'rgba(255,255,255,.55)' }}>
                {i === active && (
                  <motion.span layoutId="lab-tab" className="absolute inset-0 rounded-full"
                    style={{ background: '#7c3aed', boxShadow: '0 6px 20px -4px rgba(124,58,237,.6)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}/>
                )}
                <span className="relative">{v.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Fenêtre navigateur */}
        <Reveal variants={scaleIn} className="relative">
          <div aria-hidden="true" className="absolute -inset-x-10 -bottom-10 top-10 rounded-[40px] pointer-events-none"
            style={{ background: 'radial-gradient(50% 50% at 50% 60%, rgba(124,58,237,.35), transparent 75%)', filter: 'blur(40px)' }}/>
          <div className="relative">
            <BrowserFrame dark url={vue.url}>
              <div className="relative w-full bg-white" style={{ aspectRatio: '16 / 9' }}>
                {/* Toutes les vues restent montées : images préchargées, fondu enchaîné */}
                {VUES.map((v, i) => (
                  <motion.div key={v.key} className="absolute inset-0" aria-hidden={i !== active}
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.015 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    style={{ pointerEvents: i === active ? 'auto' : 'none' }}>
                    <SmartImage srcs={v.srcs} alt={`PathoMind Lab — ${v.label}`}/>
                  </motion.div>
                ))}
              </div>
            </BrowserFrame>
          </div>
        </Reveal>

        <div className="mt-10 min-h-[3.5rem]">
          <AnimatePresence mode="wait">
            <motion.p key={vue.key} className="text-center mx-auto max-w-[540px]"
              style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,.55)' }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}>
              {vue.desc}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
