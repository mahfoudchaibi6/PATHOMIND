import { motion } from 'framer-motion'
import { SectionHeading, Stagger } from '../components/ui'
import { fadeInUp } from '../lib/animations'
import { TEXT, UPDATES_MODE } from '../lib/site'
import { INSTITUTION, OFFRES, PILOTE, formatDA } from '../data/offres'

const [ESSENTIEL, CABINET, SERENITE] = OFFRES

// Réponses courtes, alignées sur les sections Boîtier et Offres (mêmes données)
const QUESTIONS = [
  {
    q: 'Quelle offre choisir ?',
    a: `${ESSENTIEL.nom} pour un pathologiste seul, ${CABINET.nom} pour 2 à 4 pathologistes, ${SERENITE.nom} si vous ne voulez gérer aucun matériel.`,
  },
  {
    q: 'Combien ça coûte ?',
    a: `${OFFRES.map((o) => `${o.nom} : ${formatDA(o.mensuel)} / mois (mise en service ${formatDA(o.miseEnService)})`).join(' ; ')}. ${INSTITUTION.texte}`,
  },
  {
    q: 'Que comprend la mise en service ?',
    a: `Installation sur site, configuration (comptes, en-tête du laboratoire, tarifs), formation de l'équipe. Pour ${SERENITE.nom}, le boîtier est compris.`,
  },
  {
    q: "Puis-je changer d'offre ?",
    a: 'Oui, à tout moment, sans nouveaux frais de mise en service.',
  },
  {
    q: "Que se passe-t-il si j'arrête ?",
    a: "Vous récupérez l'export complet de vos données (PDF des comptes rendus, Excel). Rien n'est supprimé sans votre accord.",
  },
  {
    q: 'Comment fonctionne le programme pilote ?',
    a: `${PILOTE.jours} jours gratuits pour ${PILOTE.labos} laboratoires ; −${PILOTE.remise} % si vous poursuivez.`,
  },
  {
    q: 'Faut-il une connexion Internet ?',
    a: `Non. PathoMind Lab tourne sur le serveur installé dans votre laboratoire (PC du labo ou boîtier PathoMind) et vos postes s'y connectent par le réseau local. Le labo continue de travailler si Internet coupe. ${UPDATES_MODE ? `Mises à jour du logiciel : ${UPDATES_MODE}.` : 'Une connexion ne sert que ponctuellement, pour les mises à jour.'}`,
  },
  {
    q: 'Où sont stockées les données des patients ?',
    a: `Sur le serveur de votre laboratoire, pas dans un cloud. Personne d'autre n'y a accès. ${TEXT.backups}`,
  },
  {
    q: 'Que se passe-t-il si le serveur tombe en panne ?',
    a: TEXT.failure,
  },
  {
    q: 'Et en cas de coupure de courant ?',
    a: TEXT.power,
  },
  {
    q: 'Combien de postes peut-on connecter ?',
    a: `${OFFRES.map((o) => `${o.nom} : ${o.postes.charAt(0).toLowerCase()}${o.postes.slice(1)}`).join(', ')}. Un navigateur suffit, rien à installer sur les postes.`,
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
