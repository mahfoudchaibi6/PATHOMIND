import HistoBackground from '../components/HistoBackground'
import CountUp from '../components/CountUp'

// Découpe un texte en mots animés ; `start` continue la numérotation d'un bloc à l'autre
function Words({ text, start = 0 }) {
  return text.split(' ').map((w, i) => (
    <span key={i}>
      <span className="pm-word" style={{ '--i': start + i }}>{w}</span>{' '}
    </span>
  ))
}

const L1 = 'La suite logicielle médicale conçue en Algérie.'
const L2 = 'Par des médecins. Pour des médecins.'

const METRICS = [
  { n: '3', l: 'Produits dans la suite' },
  { n: '58', l: 'Wilayas couvertes' },
  { n: '100%', l: 'Données hébergées en Algérie' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#080d1a', paddingTop: '11rem', paddingBottom: '7rem' }}>
      <HistoBackground opacity={0.05} color="#7c3aed" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(124,58,237,.28) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 85% 90%, rgba(167,139,250,.08) 0%, transparent 70%)',
      }}/>
      <div className="pm-drift absolute pointer-events-none" aria-hidden="true" style={{
        left: '15%', top: '-10%', width: '70%', height: '70%', filter: 'blur(40px)',
        background: 'radial-gradient(closest-side, rgba(124,58,237,.22), transparent)',
      }}/>
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #080d1a)' }}/>

      <div className="relative z-10 max-w-[1040px] mx-auto px-6 w-full text-center">
        <div className="reveal inline-flex items-center gap-2.5 mb-12 px-4 py-2 rounded-full"
          style={{ background: 'rgba(124,58,237,.12)', border: '1px solid rgba(167,139,250,.22)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#a78bfa' }}/>
          <span className="font-mono uppercase" style={{ fontSize: '.68rem', letterSpacing: '.18em', color: '#c4b5fd' }}>
            Éditeur de logiciels médicaux · Algérie
          </span>
        </div>

        <h1 className="reveal pm-words font-serif font-medium text-white"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.4rem)', lineHeight: 1.12, letterSpacing: '-.035em', transitionDelay: '.08s' }}>
          <Words text={L1}/><br className="hidden md:block"/>
          <em className="italic" style={{ color: '#a78bfa' }}><Words text={L2} start={L1.split(' ').length}/></em>
        </h1>

        <p className="reveal font-light mx-auto mt-10"
          style={{ fontSize: '1rem', lineHeight: 1.9, color: 'rgba(255,255,255,.58)', maxWidth: 560, transitionDelay: '.16s' }}>
          Du laboratoire d'anatomopathologie à l'IA clinique — des outils pensés pour la réalité des établissements algériens.
        </p>

        <div className="reveal flex items-center justify-center gap-4 mt-12 flex-wrap" style={{ transitionDelay: '.24s' }}>
          <a href="#produits" className="pm-btn">
            Découvrir nos produits
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </a>
          <a href="#contact" className="pm-btn-ghost">Parler à notre équipe</a>
        </div>

        <div className="reveal flex justify-between gap-6 mx-auto mt-28 pt-12"
          style={{ maxWidth: 760, borderTop: '1px solid rgba(255,255,255,.08)', transitionDelay: '.32s' }}>
          {METRICS.map((m) => (
            <div key={m.l}>
              <div className="font-serif text-white font-medium leading-none" style={{ fontSize: 'clamp(1.8rem,3vw,2.5rem)' }}><CountUp value={m.n}/></div>
              <div className="font-mono uppercase mt-3" style={{ fontSize: '.64rem', letterSpacing: '.16em', color: 'rgba(167,139,250,.65)', lineHeight: 1.6 }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
