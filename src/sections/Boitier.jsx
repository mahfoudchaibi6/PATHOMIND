import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, Stagger } from '../components/ui'
import { fadeInLeft, fadeInUp } from '../lib/animations'
import { BOX_OWNERSHIP, BOX_SPECS, INCLUDED, TEXT } from '../lib/site'

// Photo du boîtier : WebP puis PNG de repli ; tant qu'aucune n'est présente, emplacement neutre aux mêmes dimensions
const BOX_SRCS = ['/images/pathomind-boitier.webp', '/images/pathomind-boitier.png']
const BOX_W = 800
const BOX_H = 600

const ETAPES = [
  {
    title: 'Le boîtier PathoMind',
    desc: 'Installé dans le labo, il contient le logiciel et la base de données.',
    icon: <><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 12h.01M11 12h6"/></>,
  },
  {
    title: 'Le réseau du laboratoire',
    desc: 'Câble ou Wi-Fi local, comme une imprimante partagée.',
    icon: <><path d="M12 20h.01M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 14 0M2 9.5a15 15 0 0 1 20 0"/></>,
  },
  {
    title: 'Vos postes',
    desc: 'Secrétariat, salle technique, bureaux des pathologistes, comptabilité : un navigateur suffit, rien à installer.',
    icon: <><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></>,
  },
]

const ET_SI = [
  { q: '…Internet coupe ?', a: 'Rien ne change, le labo continue de travailler.' },
  { q: '…le courant coupe ?', a: TEXT.power },
  { q: '…le boîtier tombe en panne ?', a: TEXT.failure },
  { q: '…je veux arrêter ?', a: TEXT.exit },
]

// Lignes vides retirées ; la fiche entière n'apparaît qu'une fois les caractéristiques matérielles renseignées
const SHOW_FICHE = Boolean(BOX_SPECS.format && BOX_SPECS.cpuRam && BOX_SPECS.storage)
const FICHE = [
  ['Format', BOX_SPECS.format],
  ['Processeur / mémoire', BOX_SPECS.cpuRam],
  ['Stockage', BOX_SPECS.storage],
  ['Consommation', BOX_SPECS.power],
  ['Postes connectés', 'Autant que nécessaire sur le réseau du labo'],
  ['Propriété du boîtier', BOX_OWNERSHIP],
].filter(([, v]) => v)

const muted = 'rgba(255,255,255,.6)'

function BoxPhoto() {
  const [idx, setIdx] = useState(0)
  const src = BOX_SRCS[idx]

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute -inset-8 md:-inset-12 pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,.38), rgba(124,58,237,.1) 55%, transparent 75%)', filter: 'blur(24px)' }}/>
      <div className="relative rounded-[24px] overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(124,58,237,.18), rgba(5,8,16,.9) 75%)', border: '1px solid rgba(255,255,255,.08)' }}>
        {src ? (
          <img src={src} alt="Mini-PC serveur PathoMind installé dans le laboratoire"
            width={BOX_W} height={BOX_H} loading="lazy" decoding="async"
            className="block w-full h-auto"
            onError={() => setIdx((i) => i + 1)}/>
        ) : (
          <div role="img" aria-label="Photo du boîtier PathoMind à venir"
            className="w-full flex items-center justify-center" style={{ aspectRatio: `${BOX_W} / ${BOX_H}` }}>
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="rgba(196,181,253,.45)" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
              <rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 12h.01M11 12h6"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

function Check() {
  return (
    <span className="flex-shrink-0 mt-[3px] w-5 h-5 rounded-full flex items-center justify-center"
      style={{ background: 'rgba(124,58,237,.15)', border: '1px solid rgba(167,139,250,.3)' }}>
      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#c4b5fd" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7"/></svg>
    </span>
  )
}

export function IncludedList({ items = INCLUDED, className = '' }) {
  return (
    <ul className={`flex flex-col gap-3 list-none ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3" style={{ fontSize: '.9375rem', lineHeight: 1.6, color: 'rgba(255,255,255,.8)' }}>
          <Check/>{t}
        </li>
      ))}
    </ul>
  )
}

function Label({ children, className = '' }) {
  return <div className={`pm-mono uppercase ${className}`} style={{ fontSize: '.68rem', letterSpacing: '.18em', color: '#a78bfa' }}>{children}</div>
}

export default function Boitier() {
  const [ficheOpen, setFicheOpen] = useState(false)

  return (
    <section id="boitier" className="pm-section relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 pm-divider-dark"/>
      <div className="relative pm-container">

        {/* Photo + accroche */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <Reveal variants={fadeInLeft}><BoxPhoto/></Reveal>

          <Stagger>
            <motion.div variants={fadeInUp}><span className="pm-eyebrow pm-eyebrow-light">Installation</span></motion.div>
            <motion.h2 variants={fadeInUp} className="pm-h2 mt-6" style={{ color: 'rgba(255,255,255,.95)' }}>
              Un petit boîtier.<br/><em className="italic pm-gradient-text">Tout votre laboratoire.</em>
            </motion.h2>
            <motion.p variants={fadeInUp} className="pm-lead mt-7" style={{ color: muted }}>
              PathoMind Lab tourne sur un mini-PC serveur installé chez vous. Vos postes s'y connectent par le réseau local du laboratoire, sans Internet.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10">
              <Label className="mb-5">Ce qui est inclus</Label>
              <IncludedList/>
            </motion.div>
          </Stagger>
        </div>

        {/* Comment ça marche */}
        <Reveal className="mt-24 md:mt-28">
          <Label className="mb-8 text-center">Comment ça marche</Label>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 list-none">
            {ETAPES.map((e, i) => (
              <li key={e.title} className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-0 md:text-center md:px-6">
                {/* Liaison réseau entre les étapes */}
                {i > 0 && (
                  <span aria-hidden="true" className="hidden md:block absolute top-8 right-1/2 w-full h-px"
                    style={{ background: 'repeating-linear-gradient(90deg, rgba(167,139,250,.6) 0 6px, transparent 6px 12px)', marginRight: 32 }}/>
                )}
                {i > 0 && (
                  <span aria-hidden="true" className="md:hidden absolute -top-4 left-8 w-px h-4"
                    style={{ background: 'rgba(167,139,250,.5)' }}/>
                )}
                <span className="relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: '#0d0a1f', border: '1px solid rgba(167,139,250,.35)', boxShadow: '0 0 30px -8px rgba(124,58,237,.6)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{e.icon}</svg>
                </span>
                <div className="md:mt-6">
                  <div className="pm-mono" style={{ fontSize: '.7rem', letterSpacing: '.16em', color: '#a78bfa' }}>0{i + 1}</div>
                  <h3 className="mt-1.5" style={{ fontSize: '1.05rem', fontWeight: 600, color: 'rgba(255,255,255,.92)' }}>{e.title}</h3>
                  <p className="mt-2" style={{ fontSize: '.9rem', lineHeight: 1.7, color: muted }}>{e.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Et si… ? */}
        <div className="mt-24 md:mt-28">
          <Reveal><Label className="mb-8">Et si… ?</Label></Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ET_SI.map((c) => (
              <motion.div key={c.q} variants={fadeInUp} className="pm-card p-6">
                <h3 className="pm-display" style={{ fontSize: '1.15rem', lineHeight: 1.3, color: 'rgba(255,255,255,.95)' }}>{c.q}</h3>
                <p className="mt-3" style={{ fontSize: '.9rem', lineHeight: 1.7, color: muted }}>{c.a}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>

        {/* Fiche technique : repliable sur mobile */}
        {SHOW_FICHE && <Reveal className="mt-20 max-w-[720px]">
          <button type="button" onClick={() => setFicheOpen((o) => !o)} aria-expanded={ficheOpen} aria-controls="fiche-technique"
            className="md:hidden w-full flex items-center justify-between py-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,.08)' }}>
            <Label>Fiche technique</Label>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#a78bfa" strokeWidth="1.8" aria-hidden="true"
              style={{ transform: ficheOpen ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }}><path d="m4 6 4 4 4-4"/></svg>
          </button>
          <Label className="hidden md:block mb-5">Fiche technique</Label>
          <div id="fiche-technique" className={`${ficheOpen ? 'block' : 'hidden'} md:block`}>
            <table className="w-full text-left" style={{ fontSize: '.9rem', lineHeight: 1.6 }}>
              <caption className="sr-only">Fiche technique du boîtier PathoMind</caption>
              <tbody>
                {FICHE.map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                    <th scope="row" className="py-3 pr-4 align-top font-normal" style={{ color: muted, width: '40%' }}>{k}</th>
                    <td className="py-3 break-words" style={{ color: 'rgba(255,255,255,.85)' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>}

        <Reveal>
          <p className="mt-16 max-w-[720px]" style={{ fontSize: '.875rem', lineHeight: 1.7, color: muted }}>
            Le boîtier concerne PathoMind Lab. PathoMind Viewer (lames numériques) nécessite une installation dimensionnée selon votre volume de lames : nous consulter.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
