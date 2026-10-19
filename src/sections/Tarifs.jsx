import { motion } from 'framer-motion'
import { Arrow, Reveal, SectionHeading, Stagger } from '../components/ui'
import { fadeInUp } from '../lib/animations'
import { contactLink } from '../lib/contact'
import { INCLUDED, PILOT_DURATION, PRICE_MONTHLY, PRICE_SETUP, PRICES_CONFIRMED, SETUP_BOX } from '../lib/site'
import { IncludedList } from './Boitier'

const muted = 'rgba(255,255,255,.6)'

// Prix chiffrés (affichés quand PRICES_CONFIRMED = true dans lib/site.js)
function Prix() {
  return (
    <>
      <p className="mt-6" style={{ color: muted, fontSize: '.9rem' }}>À partir de</p>
      <p className="pm-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', lineHeight: 1.1, color: '#fff' }}>
        {PRICE_MONTHLY} <span style={{ fontSize: '1rem', color: muted }}>/ mois</span>
      </p>
      <div className="mt-7 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.9)' }}>
          Mise en service : <strong style={{ fontWeight: 600 }}>{PRICE_SETUP}</strong>
        </p>
        <p className="mt-2" style={{ fontSize: '.875rem', lineHeight: 1.7, color: muted }}>
          Installation{SETUP_BOX ? `, ${SETUP_BOX}` : ''}, configuration, formation.
        </p>
      </div>
    </>
  )
}

// Sans prix confirmés : la structure de l'offre et un devis rapide
function Devis() {
  return (
    <>
      <div className="mt-6 flex flex-col gap-5">
        {[
          ['Abonnement mensuel', 'Logiciel, sauvegardes, mises à jour et support.'],
          ['Mise en service unique', 'Installation du boîtier, configuration, formation sur place.'],
        ].map(([t, d]) => (
          <div key={t}>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'rgba(255,255,255,.92)' }}>{t}</p>
            <p className="mt-1" style={{ fontSize: '.9rem', lineHeight: 1.7, color: muted }}>{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <p style={{ fontSize: '.9375rem', lineHeight: 1.7, color: 'rgba(255,255,255,.8)' }}>
          Le tarif dépend de la taille du laboratoire et du nombre de postes. Réponse sous 24 h.
        </p>
        <a {...contactLink({ product: 'PathoMind Lab', subject: 'Demande de devis' })} className="pm-btn mt-6">
          Demander un devis <Arrow size={13}/>
        </a>
      </div>
    </>
  )
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
          title={PRICES_CONFIRMED
            ? <>Un prix clair, <em className="italic pm-gradient-text">dès le départ.</em></>
            : <>Une offre simple, <em className="italic pm-gradient-text">à votre mesure.</em></>}
          lead="Un abonnement mensuel et une mise en service unique."
          className="mb-14 md:mb-16"
        />

        <Stagger className="mx-auto max-w-[880px] pm-card p-7 sm:p-10" style={{ background: 'rgba(255,255,255,.035)' }}>
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="pm-display" style={{ fontSize: '1.6rem', color: 'rgba(255,255,255,.95)' }}>PathoMind Lab</h3>
              {PRICES_CONFIRMED ? <Prix/> : <Devis/>}
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
            {PILOT_DURATION ? `Pilote de ${PILOT_DURATION}` : 'Programme pilote'} pour les premiers laboratoires partenaires
          </p>
          <a {...contactLink({ product: 'PathoMind Lab', subject: 'Candidature au pilote' })} className="pm-btn-ghost flex-shrink-0">
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
