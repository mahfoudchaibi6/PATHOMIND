import { useState } from 'react'
import { motion } from 'framer-motion'
import { Arrow, Reveal, SectionHeading, Stagger } from '../components/ui'
import { fadeInUp } from '../lib/animations'
import { contactLink } from '../lib/contact'
import { whatsappHref } from '../lib/site'
import {
  ANNUEL_MENTION, COMPARATIF, CONFIG_MINIMALE, INSTITUTION, MENTIONS, OFFRES, PILOTE, PILOTE_PLACES_RESTANTES, formatDA,
} from '../data/offres'

const muted = 'rgba(255,255,255,.6)'

// Balisage Product : un Offer par offre, prix mensuel en DZD
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'PathoMind Lab',
  description: "Logiciel de gestion de laboratoire d'anatomopathologie, installé dans le laboratoire, sans Internet.",
  brand: { '@type': 'Brand', name: 'PathoMind' },
  url: 'https://pathomind.org/#offres',
  offers: OFFRES.map((o) => ({
    '@type': 'Offer',
    name: o.nom,
    price: o.mensuel,
    priceCurrency: 'DZD',
    url: 'https://pathomind.org/#offres',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: o.mensuel,
      priceCurrency: 'DZD',
      unitCode: 'MON',
      billingDuration: 'P1M',
    },
  })),
}

function Check({ size = 10 }) {
  return (
    <span className="flex-shrink-0 mt-[3px] w-5 h-5 rounded-full flex items-center justify-center"
      style={{ background: 'rgba(124,58,237,.15)', border: '1px solid rgba(167,139,250,.3)' }}>
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="#c4b5fd" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7"/></svg>
    </span>
  )
}

function Chevron({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#a78bfa" strokeWidth="1.8" aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }}><path d="m4 6 4 4 4-4"/></svg>
  )
}

function BandeauPilote() {
  if (PILOTE_PLACES_RESTANTES <= 0) return null
  const places = `${PILOTE_PLACES_RESTANTES} place${PILOTE_PLACES_RESTANTES > 1 ? 's' : ''} restante${PILOTE_PLACES_RESTANTES > 1 ? 's' : ''}`
  return (
    <Reveal className="rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6"
      style={{ background: 'rgba(124,58,237,.1)', border: '1px solid rgba(167,139,250,.25)' }}>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff' }}>
            {PILOTE.nom} — {PILOTE.labos} laboratoires à {PILOTE.ville}
          </h3>
          <span className="pm-mono uppercase rounded-full px-2.5 py-1"
            style={{ fontSize: '.64rem', letterSpacing: '.14em', color: '#ddd6fe', background: 'rgba(124,58,237,.22)', border: '1px solid rgba(167,139,250,.35)' }}>
            {places}
          </span>
        </div>
        <p className="mt-3" style={{ fontSize: '.9375rem', lineHeight: 1.7, color: 'rgba(255,255,255,.82)' }}>
          {PILOTE.jours} jours gratuits : installation, formation et support offerts.
          Si vous poursuivez : −{PILOTE.remise} % sur l'offre choisie, mise en service offerte, prix garanti {PILOTE.garantieMois} mois.
          Sinon, nous reprenons le matériel et vous gardez vos données.
        </p>
        <p className="mt-2" style={{ fontSize: '.8125rem', color: muted }}>Pour Sérénité, le prix du boîtier reste dû.</p>
      </div>
      <a {...contactLink({ offer: PILOTE.nom, subject: 'Candidature au programme Centre pilote' })} className="pm-btn-ghost flex-shrink-0 self-start md:self-center text-center" style={{ whiteSpace: 'normal' }}>
        Candidater au programme pilote <Arrow size={13}/>
      </a>
    </Reveal>
  )
}

function Interrupteur({ annuel, setAnnuel }) {
  const opt = (value, label) => (
    <button type="button" role="radio" aria-checked={annuel === value} onClick={() => setAnnuel(value)}
      className="rounded-full px-5 py-2 transition-colors duration-200"
      style={{
        fontSize: '.875rem', fontWeight: 500,
        background: annuel === value ? '#7c3aed' : 'transparent',
        color: annuel === value ? '#fff' : 'rgba(255,255,255,.7)',
      }}>
      {label}
    </button>
  )
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div role="radiogroup" aria-label="Période de facturation" className="inline-flex rounded-full p-1"
        style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)' }}>
        {opt(false, 'Mensuel')}
        {opt(true, 'Annuel')}
      </div>
      <span style={{ fontSize: '.8125rem', color: '#c4b5fd' }}>Paiement annuel : {ANNUEL_MENTION} sur l'abonnement</span>
    </div>
  )
}

function Carte({ o, annuel }) {
  const mis = o.recommandee
  return (
    <motion.article variants={fadeInUp}
      className={`relative pm-card p-7 sm:p-8 flex flex-col ${mis ? 'order-first lg:order-none lg:-my-4 lg:py-11' : ''}`}
      style={mis
        ? { background: 'rgba(124,58,237,.09)', border: '1px solid rgba(167,139,250,.7)', boxShadow: '0 30px 80px -30px rgba(124,58,237,.6)' }
        : { background: 'rgba(255,255,255,.035)' }}>
      {mis && (
        <span className="absolute -top-3 left-7 pm-mono uppercase rounded-full px-3 py-1"
          style={{ fontSize: '.64rem', letterSpacing: '.14em', color: '#fff', background: '#7c3aed' }}>
          {o.badge}
        </span>
      )}
      <h3 className="pm-display" style={{ fontSize: '1.75rem', color: '#fff' }}>{o.nom}</h3>
      <p className="mt-1" style={{ fontSize: '.9375rem', color: '#c4b5fd' }}>{o.accroche}</p>
      <p className="mt-2" style={{ fontSize: '.875rem', lineHeight: 1.6, color: muted }}>Pour : {o.pour}</p>

      <p className="pm-display mt-6" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', lineHeight: 1.1, color: '#fff' }}>
        {formatDA(annuel ? o.annuel : o.mensuel)}
        <span style={{ fontSize: '1rem', color: muted }}> / {annuel ? 'an' : 'mois'}</span>
      </p>
      <p className="mt-2" style={{ fontSize: '.8125rem', minHeight: '1.3em', color: '#c4b5fd' }}>
        {annuel ? ANNUEL_MENTION : `ou ${formatDA(o.annuel)} / an`}
      </p>
      <p className="mt-4 pt-4" style={{ fontSize: '.9rem', lineHeight: 1.6, color: 'rgba(255,255,255,.85)', borderTop: '1px solid rgba(255,255,255,.08)' }}>
        Mise en service : <strong style={{ fontWeight: 600 }}>{formatDA(o.miseEnService)}</strong>
        {o.miseEnServiceNote && <span style={{ color: muted }}>, {o.miseEnServiceNote}</span>}
      </p>

      <div className="mt-6 flex-1">
        {o.intro && <p className="mb-3" style={{ fontSize: '.875rem', fontWeight: 600, color: 'rgba(255,255,255,.9)' }}>{o.intro}</p>}
        <ul className="flex flex-col gap-3 list-none">
          {o.contenu.map((t) => (
            <li key={t} className="flex items-start gap-3" style={{ fontSize: '.9rem', lineHeight: 1.6, color: 'rgba(255,255,255,.8)' }}>
              <Check/>{t}
            </li>
          ))}
        </ul>
        {o.options && <p className="mt-4" style={{ fontSize: '.8125rem', lineHeight: 1.6, color: muted }}>{o.options}</p>}
      </div>

      <a {...contactLink({ offer: o.nom, product: 'PathoMind Lab', subject: `Offre ${o.nom}` })}
        className={`${mis ? 'pm-btn' : 'pm-btn-ghost'} w-full mt-8`} style={{ whiteSpace: 'normal' }}>
        {o.cta} <Arrow size={13}/>
      </a>
    </motion.article>
  )
}

function Valeur({ v }) {
  if (v === true) return <span aria-label="Inclus" style={{ color: '#c4b5fd', fontSize: '1.05rem' }}>✓</span>
  if (v === false) return <span aria-label="Non inclus" style={{ color: 'rgba(255,255,255,.4)' }}>—</span>
  return v
}

function Comparatif() {
  const [open, setOpen] = useState(false)
  const cabinet = OFFRES.findIndex((o) => o.recommandee)
  const hl = (i) => (i === cabinet ? { background: 'rgba(124,58,237,.12)' } : undefined)

  return (
    <div className="mt-12">
      <div className="flex justify-center">
        <button type="button" onClick={() => setOpen((x) => !x)} aria-expanded={open} aria-controls="offres-comparatif"
          className="pm-btn-ghost text-center" style={{ whiteSpace: 'normal' }}>
          Comparer les offres en détail <Chevron open={open}/>
        </button>
      </div>
      <div id="offres-comparatif" hidden={!open} className="mt-8">
        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(255,255,255,.08)' }}>
          <table className="w-full text-left" style={{ minWidth: 640, fontSize: '.875rem', lineHeight: 1.5, borderCollapse: 'separate', borderSpacing: 0 }}>
            <caption className="sr-only">Comparatif des offres PathoMind Lab</caption>
            <thead>
              <tr>
                <th scope="col" className="sticky left-0 z-10 py-4 px-4 font-normal" style={{ background: '#0a0d18', color: muted, width: '28%' }}>Critère</th>
                {OFFRES.map((o, i) => (
                  <th key={o.id} scope="col" className="py-4 px-4" style={{ fontWeight: 600, color: '#fff', ...hl(i) }}>
                    {o.nom}
                    {o.recommandee && <span className="block pm-mono uppercase mt-1" style={{ fontSize: '.6rem', letterSpacing: '.14em', color: '#c4b5fd' }}>{o.badge}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARATIF.map(([critere, valeurs]) => (
                <tr key={critere}>
                  <th scope="row" className="sticky left-0 z-10 py-3 px-4 font-normal align-top"
                    style={{ background: '#0a0d18', color: 'rgba(255,255,255,.75)', borderTop: '1px solid rgba(255,255,255,.07)' }}>
                    {critere}
                  </th>
                  {valeurs.map((v, i) => (
                    <td key={i} className="py-3 px-4 align-top"
                      style={{ color: 'rgba(255,255,255,.85)', borderTop: '1px solid rgba(255,255,255,.07)', ...hl(i) }}>
                      <Valeur v={v}/>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ConfigMinimale() {
  const wa = whatsappHref("Bonjour, voici l'étiquette de mon PC : peut-il servir de serveur PathoMind Lab ?")
  return (
    <details className="group mt-6 rounded-2xl" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)' }}>
      <summary className="pm-summary cursor-pointer list-none flex items-center justify-between gap-4 px-5 sm:px-6 py-5">
        <span>
          <span className="block" style={{ fontSize: '1rem', fontWeight: 500, color: 'rgba(255,255,255,.92)' }}>Mon PC peut-il servir de serveur ?</span>
          <span className="block mt-1" style={{ fontSize: '.8125rem', color: muted }}>Configuration minimale pour Essentiel et Cabinet</span>
        </span>
        <svg className="transition-transform duration-300 group-open:rotate-45 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>
      </summary>
      <div className="px-5 sm:px-6 pb-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none">
          {CONFIG_MINIMALE.map((t) => (
            <li key={t} className="flex items-start gap-3" style={{ fontSize: '.9rem', lineHeight: 1.6, color: 'rgba(255,255,255,.8)' }}>
              <Check/>{t}
            </li>
          ))}
        </ul>
        <p className="mt-5" style={{ fontSize: '.9rem', lineHeight: 1.7, color: muted }}>
          Pas sûr ? Envoyez-nous une photo de l'étiquette de votre PC sur{' '}
          {wa
            ? <a href={wa} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 text-[#c4b5fd] hover:text-white">WhatsApp</a>
            : 'WhatsApp'}
          , on vérifie pour vous.
        </p>
      </div>
    </details>
  )
}

export default function Offres() {
  const [annuel, setAnnuel] = useState(false)

  return (
    <section id="offres" className="pm-section relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}/>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 pm-divider-dark"/>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 45% at 50% 30%, rgba(124,58,237,.16), transparent 70%)',
      }}/>
      <div className="relative pm-container">
        <SectionHeading center dark
          eyebrow="Nos offres"
          title={<>Une offre pour <em className="italic pm-gradient-text">chaque laboratoire.</em></>}
          lead="Prix affichés, sans surprise. Installation, formation et support inclus."
          className="mb-12 md:mb-14"
        />

        <BandeauPilote/>

        <div className="mt-10 mb-12">
          <Interrupteur annuel={annuel} setAnnuel={setAnnuel}/>
        </div>

        <Stagger className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-5 items-stretch">
          {OFFRES.map((o) => <Carte key={o.id} o={o} annuel={annuel}/>)}
        </Stagger>

        <Reveal className="mt-12 text-center">
          <p style={{ fontSize: '.9375rem', color: 'rgba(255,255,255,.85)' }}>
            {INSTITUTION.texte}{' '}
            <a {...contactLink({ offer: INSTITUTION.nom, subject: 'Offre Institution' })}
              className="underline underline-offset-4 text-[#c4b5fd] hover:text-white whitespace-nowrap">
              Nous contacter
            </a>
          </p>
          <ul className="mt-6 flex flex-col gap-1.5 list-none" style={{ fontSize: '.8125rem', lineHeight: 1.6, color: muted }}>
            {MENTIONS.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </Reveal>

        <Comparatif/>

        <div className="mx-auto max-w-[780px]">
          <ConfigMinimale/>
        </div>
      </div>
    </section>
  )
}
