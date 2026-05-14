import HESViewer from '../components/HESViewer'
import HistoBackground from '../components/HistoBackground'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#080d1a', paddingTop: '10rem', paddingBottom: '6rem' }}
    >
      <HistoBackground opacity={0.07} color="#7c3aed" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 130% 80% at 100% 25%, rgba(76,29,149,.4) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 15% 85%, rgba(26,92,212,.15) 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, rgba(8,13,26,.75) 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: 'linear-gradient(to bottom, transparent, #080d1a)' }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

        {/* ── Texte ── */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-3 mb-10 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(76,29,149,.3)',
              border: '1px solid rgba(167,139,250,.25)',
            }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(124,58,237,.25)',
                border: '1px solid rgba(167,139,250,.4)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#c4b5fd' }} />
            </div>
            <span
              className="font-mono font-medium uppercase tracking-widest"
              style={{ fontSize: '.7rem', color: '#c4b5fd' }}
            >
              Algérie · Afrique · Pathologie Digitale
            </span>
          </div>

          {/* Titre */}
          <h1
            className="font-serif font-medium text-white"
            style={{
              fontSize: 'clamp(1.9rem, 4vw, 3.6rem)',
              lineHeight: 1.1,
              letterSpacing: '-.03em',
              marginBottom: 0,
            }}
          >
            La pathologie de précision,<br />
            <em
              className="italic"
              style={{ color: '#a78bfa' }}
            >
              enfin accessible en Algérie.
            </em>
          </h1>

          <div
            className="w-10 h-px my-7"
            style={{ background: 'rgba(167,139,250,.4)' }}
          />

          {/* Description */}
          <p
            className="font-light leading-relaxed"
            style={{
              fontSize: '.95rem',
              color: 'rgba(255,255,255,.65)',
              maxWidth: '480px',
            }}
          >
            Chaque tumeur raconte une histoire unique. PathoMind donne aux pathologistes algériens l'intelligence artificielle et les outils digitaux pour la lire avec précision — et orienter chaque patient vers le traitement qui lui correspond.
          </p>

          {/* Boutons */}
          <div className="flex items-center gap-5 mt-9 flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-wider text-white rounded-sm transition-all duration-200"
              style={{
                fontSize: '.8rem',
                background: '#7c3aed',
                padding: '.85rem 2rem',
                boxShadow: '0 4px 24px rgba(124,58,237,.45)',
                letterSpacing: '.08em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#6d28d9'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#7c3aed'
                e.currentTarget.style.transform = 'none'
              }}
            >
              Demander une démo
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
            <a
              href="#probleme"
              className="inline-flex items-center font-mono font-medium uppercase tracking-wider rounded-sm transition-all duration-200"
              style={{
                fontSize: '.78rem',
                color: 'rgba(255,255,255,.5)',
                padding: '.85rem 1.7rem',
                border: '1px solid rgba(255,255,255,.15)',
                letterSpacing: '.06em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,.9)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,.5)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)'
              }}
            >
              Comprendre l'enjeu
            </a>
          </div>

          {/* Métriques */}
          <div
            className="flex gap-10 mt-12 pt-10 flex-wrap"
            style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}
          >
            {[
              { n: '~200', l: 'Anatomopathologistes en Algérie' },
              { n: '48h+', l: 'Délai moyen de rendu' },
              { n: '58',   l: 'Wilayas à couvrir' },
            ].map((m) => (
              <div key={m.l}>
                <div
                  className="font-serif text-white font-medium leading-none"
                  style={{ fontSize: '2rem' }}
                >
                  {m.n}
                </div>
                <div
                  className="font-mono uppercase tracking-widest mt-1"
                  style={{ fontSize: '.68rem', color: 'rgba(167,139,250,.5)' }}
                >
                  {m.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Visionneuse HES ── */}
        <div className="hidden lg:block">
          <HESViewer />
        </div>

      </div>
    </section>
  )
}
