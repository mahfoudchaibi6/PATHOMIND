import { motion } from 'framer-motion'
import { Arrow, Reveal, SectionHeading, Stagger } from '../components/ui'
import { fadeInUp } from '../lib/animations'
import { contactLink } from '../lib/contact'
import { INCLUDED, PILOT_DURATION, PRICE_MONTHLY, PRICE_SETUP, PRICE_TODO, SETUP_BOX } from '../lib/site'
import { IncludedList } from './Boitier'

const muted = 'rgba(255,255,255,.6)'

function Todo({ children }) {
  return <span className="pm-mono" style={{ fontSize: '.72rem', color: '#fcd34d', letterSpacing: '.04em' }}>{children}</span>
}

export default function Tarifs() {
  return (
    <section id="tarifs" className="pm-section relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 pm-divider-dark"/>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 45% at 50% 30%, rgba(124,58,237,.16), transparent 70%)',
      }}/>
      <div className="relative pm-container">
        <SectionHeading center dark
          eyebrow="Tarifs"
          title={<>Un prix clair, <em className="italic pm-gradient-text">dès le départ.</em></>}
          lead="Un abonnement mensuel et une mise en service unique."
          className="mb-14 md:mb-16"
        />

        <Stagger className="mx-auto max-w-[880px] pm-card p-7 sm:p-10" style={{ background: 'rgba(255,255,255,.035)' }}>
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="pm-display" style={{ fontSize: '1.6rem', color: 'rgba(255,255,255,.95)' }}>PathoMind Lab</h3>
              <p className="mt-6" style={{ color: muted, fontSize: '.9rem' }}>À partir de</p>
              <p className="pm-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', lineHeight: 1.1, color: '#fff' }}>
                {PRICE_MONTHLY} <span style={{ fontSize: '1rem', color: muted }}>/ mois</span>
              </p>
              <Todo>{PRICE_TODO}</Todo>

              <div className="mt-7 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.9)' }}>
                  Mise en service : <strong style={{ fontWeight: 600 }}>{PRICE_SETUP}</strong> <Todo>{PRICE_TODO}</Todo>
                </p>
                <p className="mt-2" style={{ fontSize: '.875rem', lineHeight: 1.7, color: muted }}>
                  Installation, boîtier {SETUP_BOX}, configuration, formation.
                </p>
              </div>
            </div>

            <div>
              <div className="pm-mono uppercase mb-5" style={{ fontSize: '.68rem', letterSpacing: '.18em', color: '#a78bfa' }}>Inclus</div>
              <IncludedList items={[...INCLUDED, 'Support en français et en arabe']}/>
            </div>
          </motion.div>
        </Stagger>

        {/* Pilote */}
        <Reveal className="mx-auto max-w-[880px] mt-6 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
          style={{ background: 'rgba(124,58,237,.1)', border: '1px solid rgba(167,139,250,.25)' }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255,255,255,.9)' }}>
            Pilote de {PILOT_DURATION} pour les premiers laboratoires partenaires
          </p>
          <a {...contactLink({ product: 'PathoMind Lab', subject: 'Candidature au pilote' })} className="pm-btn flex-shrink-0">
            Candidater au pilote <Arrow size={13}/>
          </a>
        </Reveal>

        <Reveal>
          <p className="text-center mt-8" style={{ fontSize: '.875rem', color: muted }}>
            Grands laboratoires, CHU, plusieurs sites : sur devis.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
