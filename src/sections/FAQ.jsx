import { motion } from 'framer-motion'
import { SectionHeading, Stagger } from '../components/ui'
import { fadeInUp } from '../lib/animations'
import {
  BACKUP_SUPPORT, EXPORT_FORMATS, PRICE_MONTHLY, PRICE_SETUP, PRICE_TODO, REPLACEMENT_DELAY, UPDATES_MODE, UPS_POLICY,
} from '../lib/site'

// Réponses courtes, alignées sur les sections Boîtier et Tarifs (mêmes constantes)
const QUESTIONS = [
  {
    q: 'Faut-il une connexion Internet ?',
    a: `Non. PathoMind Lab tourne sur le boîtier installé dans votre laboratoire et vos postes s'y connectent par le réseau local. Le labo continue de travailler si Internet coupe. Mises à jour : ${UPDATES_MODE}.`,
  },
  {
    q: 'Où sont stockées les données des patients ?',
    a: `Sur le boîtier PathoMind, dans votre laboratoire, pas dans un cloud. Personne d'autre n'y a accès. Sauvegardes automatiques quotidiennes ${BACKUP_SUPPORT}.`,
  },
  {
    q: 'Que se passe-t-il si le boîtier tombe en panne ?',
    a: `Les données sont sauvegardées chaque jour. Remplacement et restauration sous ${REPLACEMENT_DELAY}.`,
  },
  {
    q: 'Et en cas de coupure de courant ?',
    a: `${UPS_POLICY}. Au redémarrage, tout reprend là où c'était.`,
  },
  {
    q: 'Combien de postes peut-on connecter ?',
    a: "Autant que nécessaire sur le réseau du labo : secrétariat, salle technique, pathologistes, comptabilité. Un navigateur suffit, rien à installer sur les postes.",
  },
  {
    q: 'Combien ça coûte ?',
    a: `À partir de ${PRICE_MONTHLY} / mois ${PRICE_TODO}, plus une mise en service de ${PRICE_SETUP} ${PRICE_TODO}. Grands laboratoires, CHU, plusieurs sites : sur devis.`,
  },
  {
    q: "Mes données m'appartiennent-elles si j'arrête ?",
    a: `Oui. Vos données vous appartiennent : export complet ${EXPORT_FORMATS}.`,
  },
  {
    q: "Comment se passent l'installation et la formation ?",
    a: "Nous livrons et installons le boîtier préconfiguré sur site, configurons les comptes, l'en-tête du labo et les tarifs, puis formons votre équipe sur place.",
  },
]

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: QUESTIONS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function FAQ() {
  return (
    <section id="faq" className="pm-section relative">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 pm-divider-dark"/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}/>
      <div className="pm-container">
        <SectionHeading center dark
          eyebrow="Questions fréquentes"
          title={<>Vos questions, <em className="italic pm-gradient-text">nos réponses.</em></>}
          className="mb-14 md:mb-16"
        />
        <Stagger stagger={0.05} className="mx-auto max-w-[780px] flex flex-col gap-3">
          {QUESTIONS.map(({ q, a }) => (
            <motion.details key={q} variants={fadeInUp} className="group rounded-2xl"
              style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)' }}>
              <summary className="pm-summary cursor-pointer list-none flex items-center justify-between gap-4 px-5 sm:px-6 py-5">
                <span style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.5, color: 'rgba(255,255,255,.92)' }}>{q}</span>
                <svg className="transition-transform duration-300 group-open:rotate-45 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>
              </summary>
              <p className="px-5 sm:px-6 pb-5 -mt-1" style={{ fontSize: '.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,.65)' }}>{a}</p>
            </motion.details>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
