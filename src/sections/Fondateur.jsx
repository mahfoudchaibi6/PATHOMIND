import { motion } from 'framer-motion'
import { Reveal, Stagger } from '../components/ui'
import { fadeInLeft, fadeInUp } from '../lib/animations'

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

const muted = 'rgba(255,255,255,.55)'

function Label({ children }) {
  return <div className="pm-mono uppercase mb-4" style={{ fontSize: '.68rem', letterSpacing: '.18em', color: '#a78bfa' }}>{children}</div>
}

export default function Fondateur() {
  return (
    <section id="fondateur" className="pm-section">
      <div className="pm-container">
        <Reveal className="mb-16 md:mb-20"><span className="pm-eyebrow pm-eyebrow-light">Le fondateur</span></Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 lg:gap-24 items-start">

          {/* Profil */}
          <Reveal variants={fadeInLeft} className="lg:sticky lg:top-28">
            <div className="relative w-36 h-36">
              <div aria-hidden="true" className="absolute -inset-1.5 rounded-full" style={{ background: 'conic-gradient(from 140deg, #7c3aed, #c4b5fd, #4c1d95, #7c3aed)' }}/>
              <div aria-hidden="true" className="absolute -inset-0.5 rounded-full" style={{ background: '#050810' }}/>
              <img src="/photo.jpg" alt="Dr. Mahfoud Chaibi" className="relative w-full h-full rounded-full object-cover"/>
            </div>

            <h3 className="pm-display mt-8" style={{ fontSize: '1.9rem', lineHeight: 1.15, color: 'rgba(255,255,255,.95)' }}>Dr. Mahfoud Chaibi</h3>
            <p className="mt-2" style={{ fontSize: '.9375rem', lineHeight: 1.6, color: '#c4b5fd', fontWeight: 500 }}>
              Anatomopathologiste · Fondateur
            </p>

            <ul className="flex flex-wrap gap-2 mt-7 list-none">
              {EXPERTISES.map((t) => (
                <li key={t} className="rounded-full px-3 py-1" style={{ fontSize: '.8rem', lineHeight: 1.6, color: 'rgba(255,255,255,.7)', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}>{t}</li>
              ))}
            </ul>
          </Reveal>

          {/* Bio */}
          <Stagger>
            <motion.blockquote variants={fadeInUp} className="pm-display italic"
              style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.15rem)', lineHeight: 1.35, letterSpacing: '-.02em', color: 'rgba(255,255,255,.95)' }}>
              « PathoMind ne naît pas d'une idée de startup, mais d'une <span className="pm-gradient-text">frustration clinique</span> :
              l'anatomopathologie africaine mérite les mêmes outils qu'à Paris ou à Boston. »
            </motion.blockquote>

            <motion.div variants={fadeInUp} className="pm-divider-dark my-14"/>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              <div>
                <Label>Expertise médicale</Label>
                <p style={{ fontSize: '1rem', lineHeight: 1.8, color: muted }}>
                  Anatomopathologiste spécialisé en pathologie digitale et en IA appliquée aux lames histologiques, le Dr. Chaibi a mesuré au quotidien les lacunes de l'infrastructure diagnostique : délais de rendu, absence de téléexpertise structurée, formations sans support numérique. PathoMind y répond de l'intérieur, par un praticien, pour des praticiens.
                </p>
              </div>
              <div>
                <Label>Crédibilité scientifique</Label>
                <p style={{ fontSize: '1rem', lineHeight: 1.8, color: muted }}>
                  Ses recherches portent sur une question clé de la lymphopathologie : <strong style={{ color: 'rgba(255,255,255,.88)', fontWeight: 500 }}>peut-on prédire, dès l'analyse histologique initiale, le comportement d'un lymphome B diffus à grandes cellules ?</strong> Ces travaux ont fait l'objet de publications scientifiques.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-14">
              <Label>Algorithmes IA développés · DLBCL</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {ALGOS.map((a) => (
                  <motion.div key={a.num} whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="pm-card p-7">
                    <div className="flex items-center justify-between">
                      <span className="pm-mono" style={{ fontSize: '.72rem', letterSpacing: '.12em', color: '#a78bfa' }}>{a.num}</span>
                      <span className="pm-mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5"
                        style={{ fontSize: '.64rem', lineHeight: 1.7, color: '#c4b5fd', background: 'rgba(124,58,237,.12)', border: '1px solid rgba(167,139,250,.25)' }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#a78bfa' }}/>Publié
                      </span>
                    </div>
                    <h4 className="mt-5" style={{ fontSize: '1.05rem', lineHeight: 1.45, fontWeight: 600, color: 'rgba(255,255,255,.92)' }}>{a.title}</h4>
                    <p className="mt-3" style={{ fontSize: '.9rem', lineHeight: 1.75, color: muted }}>{a.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.figure variants={fadeInUp} className="relative mt-14 rounded-2xl p-9 md:p-11 overflow-hidden" style={{ background: 'rgba(124,58,237,.06)', border: '1px solid rgba(167,139,250,.15)' }}>
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 100% 0%, rgba(124,58,237,.25), transparent 70%)' }}/>
              <div aria-hidden="true" className="absolute top-4 left-7 pm-display select-none" style={{ fontSize: '6rem', lineHeight: 1, color: 'rgba(167,139,250,.18)' }}>“</div>
              <blockquote className="relative pm-display italic" style={{ fontSize: '1.2rem', lineHeight: 1.7, color: 'rgba(255,255,255,.85)' }}>
                Si un patient DLBCL est suivi dans un hôpital de wilaya, sans accès à la biologie moléculaire ni à un hématopathologiste expert, comment l'aider à recevoir le bon traitement dès le départ ? La réponse est dans la lame, et l'IA peut l'y trouver.
              </blockquote>
              <figcaption className="relative pm-mono mt-7 pt-6" style={{ fontSize: '.7rem', letterSpacing: '.12em', color: 'rgba(255,255,255,.4)', borderTop: '1px solid rgba(255,255,255,.08)' }}>
                DR. MAHFOUD CHAIBI · FONDATEUR, PATHOMIND
              </figcaption>
            </motion.figure>
          </Stagger>
        </div>
      </div>
    </section>
  )
}
