import { motion } from 'framer-motion'
import { Reveal, Stagger } from '../components/ui'
import { fadeInLeft, fadeInUp } from '../lib/animations'

// Publication DLBCL : renseigner le lien DOI pour réafficher le badge « Publié » ([À COMPLÉTER : référence + lien DOI])
const PUBLICATION = { ref: '', doi: '' }

const EXPERTISES = [
  'Pathologie digitale',
  "IA appliquée à l'histologie",
  'Classification des lymphomes',
  'Prédiction de rechute DLBCL',
  'Modernisation diagnostique en Afrique',
]

const ALGOS = [
  {
    num: 'Algo. I',
    title: 'Classification morphologique des DLBCL par deep learning',
    desc: "Modèle entraîné sur lames WSI pour classifier automatiquement les sous-types morphologiques de lymphome B diffus à grandes cellules, une tâche traditionnellement réservée à des centres experts disposant d'un panel immunohistochimique complet.",
  },
  {
    num: 'Algo. II',
    title: 'Prédiction de rechute chez les patients DLBCL',
    desc: "Algorithme de prédiction du risque de rechute à partir des caractéristiques histologiques numériques, permettant d'identifier dès le diagnostic initial les patients nécessitant une intensification thérapeutique, sans recourir à des examens génomiques coûteux.",
  },
]

const muted = 'rgba(255,255,255,.6)'

function Label({ children }) {
  return <div className="pm-mono uppercase mb-4" style={{ fontSize: '.68rem', letterSpacing: '.18em', color: '#a78bfa' }}>{children}</div>
}

function AlgoBadge() {
  const style = { fontSize: '.64rem', lineHeight: 1.7, color: '#c4b5fd', background: 'rgba(124,58,237,.12)', border: '1px solid rgba(167,139,250,.25)' }
  const dot = <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#a78bfa' }}/>
  if (PUBLICATION.doi) {
    return (
      <a href={PUBLICATION.doi} target="_blank" rel="noopener noreferrer" title={PUBLICATION.ref || undefined}
        className="pm-mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 hover:text-white" style={style}>
        {dot}Publié ↗
      </a>
    )
  }
  return <span className="pm-mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5" style={style}>{dot}Travaux de recherche</span>
}

export default function Fondateur() {
  return (
    <section id="fondateur" className="pm-section">
      <div className="pm-container">
        <Reveal className="mb-14 md:mb-16"><span className="pm-eyebrow pm-eyebrow-light">Le fondateur</span></Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-20 items-start">

          {/* Profil */}
          <Reveal variants={fadeInLeft}>
            <div className="relative w-32 h-32">
              <div aria-hidden="true" className="absolute -inset-1.5 rounded-full" style={{ background: 'conic-gradient(from 140deg, #7c3aed, #c4b5fd, #4c1d95, #7c3aed)' }}/>
              <div aria-hidden="true" className="absolute -inset-0.5 rounded-full" style={{ background: '#050810' }}/>
              <img src="/photo.webp" alt="Dr. Mahfoud Chaibi, anatomopathologiste et fondateur de PathoMind" loading="lazy" decoding="async"
                width="128" height="128" className="relative w-full h-full rounded-full object-cover"/>
            </div>
            <h3 className="pm-display mt-7" style={{ fontSize: '1.8rem', lineHeight: 1.15, color: 'rgba(255,255,255,.95)' }}>Dr. Mahfoud Chaibi</h3>
            <p className="mt-2" style={{ fontSize: '.9375rem', lineHeight: 1.6, color: '#c4b5fd', fontWeight: 500 }}>
              Anatomopathologiste · Fondateur
            </p>
          </Reveal>

          <Stagger>
            <motion.blockquote variants={fadeInUp} className="pm-display italic"
              style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', lineHeight: 1.35, letterSpacing: '-.02em', color: 'rgba(255,255,255,.95)' }}>
              « PathoMind ne naît pas d'une idée de startup, mais d'une <span className="pm-gradient-text">frustration clinique</span> :
              l'anatomopathologie africaine mérite les mêmes outils qu'à Paris ou à Boston. »
            </motion.blockquote>

            <motion.p variants={fadeInUp} className="mt-8 max-w-[640px]" style={{ fontSize: '1rem', lineHeight: 1.8, color: muted }}>
              Anatomopathologiste spécialisé en pathologie digitale, le Dr. Chaibi a vécu au quotidien les délais de rendu et le manque d'outils numériques des laboratoires.
              PathoMind y répond de l'intérieur : par un praticien, pour des praticiens.
            </motion.p>

            {/* Détail scientifique, replié par défaut */}
            <motion.details variants={fadeInUp} className="group mt-10 rounded-2xl"
              style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.08)' }}>
              <summary className="pm-summary cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-4">
                <span className="pm-mono uppercase" style={{ fontSize: '.7rem', letterSpacing: '.18em', color: '#a78bfa' }}>Recherche · IA & lymphomes DLBCL</span>
                <svg className="transition-transform duration-300 group-open:rotate-180 flex-shrink-0" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#a78bfa" strokeWidth="1.8" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>
              </summary>
              <div className="px-6 pb-7">
                <ul className="flex flex-wrap gap-2 list-none">
                  {EXPERTISES.map((t) => (
                    <li key={t} className="rounded-full px-3 py-1" style={{ fontSize: '.8rem', lineHeight: 1.6, color: 'rgba(255,255,255,.75)', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}>{t}</li>
                  ))}
                </ul>
                <p className="mt-6" style={{ fontSize: '.95rem', lineHeight: 1.8, color: muted }}>
                  Ses recherches portent sur une question clé de la lymphopathologie : <strong style={{ color: 'rgba(255,255,255,.88)', fontWeight: 500 }}>peut-on prédire, dès l'analyse histologique initiale, le comportement d'un lymphome B diffus à grandes cellules ?</strong>
                </p>
                <div className="mt-6">
                  <Label>Algorithmes IA développés · DLBCL</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ALGOS.map((a) => (
                      <div key={a.num} className="pm-card p-6">
                        <div className="flex items-center justify-between gap-3">
                          <span className="pm-mono" style={{ fontSize: '.72rem', letterSpacing: '.12em', color: '#a78bfa' }}>{a.num}</span>
                          <AlgoBadge/>
                        </div>
                        <h4 className="mt-4" style={{ fontSize: '1rem', lineHeight: 1.45, fontWeight: 600, color: 'rgba(255,255,255,.92)' }}>{a.title}</h4>
                        <p className="mt-3" style={{ fontSize: '.875rem', lineHeight: 1.75, color: muted }}>{a.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <blockquote className="pm-display italic mt-7" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,.8)' }}>
                  « Si un patient DLBCL est suivi dans un hôpital de wilaya, sans accès à la biologie moléculaire ni à un hématopathologiste expert, comment l'aider à recevoir le bon traitement dès le départ ? La réponse est dans la lame, et l'IA peut l'y trouver. »
                </blockquote>
              </div>
            </motion.details>
          </Stagger>
        </div>
      </div>
    </section>
  )
}
