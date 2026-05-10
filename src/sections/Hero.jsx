import HESViewer from '../components/HESViewer'
import HistoBackground from '../components/HistoBackground'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#060d1a', paddingTop: '10rem', paddingBottom: '6rem' }}
    >
      {/* Layer 1 — histology tissue pattern */}
      <HistoBackground opacity={0.09} color="#6baef8" />

      {/* Layer 2 — blue radial glows */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 130% 80% at 100% 25%, rgba(18,70,168,.45) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 15% 85%, rgba(26,92,212,.2) 0%, transparent 50%)',
        }}
      />

      {/* Layer 3 — vignette so text stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, rgba(6,13,26,.72) 100%)',
        }}
      />

      {/* Layer 4 — bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: 'linear-gradient(to bottom, transparent, #060d1a)' }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full">

        {/* ── LEFT — text ── */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-3 mb-10 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(18,70,168,.3)', border: '1px solid rgba(107,174,248,.22)' }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(58,127,245,.22)', border: '1px solid rgba(107,174,248,.38)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-sky" />
            </div>
            <span
              className="font-mono font-medium text-sky uppercase tracking-widest"
              style={{ fontSize: '.7rem' }}
            >
              Algérie · Afrique · Pathologie Digitale
            </span>
          </div>

          {/* Slogan — Algeria-focused */}
          <h1
            className="font-serif font-medium text-white mb-0"
            style={{
              fontSize: 'clamp(1.7rem, 7vw, 4.4rem)',
              lineHeight: 1.07,
              letterSpacing: '-.03em',
            }}
          >
            L'anatomopathologie<br />
            algérienne entre<br />
            <em className="italic text-sky">dans une nouvelle ère.</em>
          </h1>

          <div className="w-10 h-px my-8" style={{ background: 'rgba(107,174,248,.4)' }} />

          <p
            className="font-light leading-relaxed text-white/60 max-w-md"
            style={{ fontSize: '.95rem' }}
          >
            PathoMind dote chaque pathologiste algérien des outils qu'il mérite : numérisation des lames, téléexpertise sécurisée et intelligence artificielle clinique — pour que le code postal d'un patient ne détermine plus la qualité de son diagnostic.
          </p>

          <div className="flex items-center gap-6 mt-10 flex-wrap">
            <a href="#contact" className="btn-primary">
              Demander une démo
              <ArrowIcon />
            </a>
            <a href="#probleme" className="btn-outline">
              Comprendre l'enjeu
            </a>
          </div>

          {/* Metrics */}
          <div
            className="flex gap-10 mt-14 pt-10 flex-wrap"
            style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}
          >
            {[
              { n: '~200', l: 'Anatomopathologistes en Algérie' },
              { n: '48h+', l: 'Délai moyen de rendu' },
              { n: '58', l: 'Wilayas à couvrir' },
            ].map((m) => (
              <div key={m.l}>
                <div
                  className="font-serif text-white font-medium leading-none"
                  style={{ fontSize: '2rem' }}
                >
                  {m.n}
                </div>
                <div
                  className="font-mono text-white/38 uppercase tracking-widest mt-1"
                  style={{ fontSize: '.68rem' }}
                >
                  {m.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — HES slide with AI animation ── */}
        <div className="hidden lg:block">
          <HESViewer />
        </div>

      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 16 16"
      fill="none" stroke="currentColor" strokeWidth="2"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}
