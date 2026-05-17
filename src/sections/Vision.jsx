export default function Vision() {
  return (
    <section
      id="vision"
      className="py-28 px-6 lg:px-16"
      style={{ background: '#06080f' }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Eyebrow */}
        <div className="reveal flex items-center gap-2 mb-5 font-mono uppercase tracking-widest"
          style={{ fontSize: '.68rem', color: '#a78bfa' }}>
          <span className="block w-5 h-px" style={{ background: '#a78bfa' }} />
          Plateforme & Vision
        </div>

        <h2
          className="reveal font-serif font-medium text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', letterSpacing: '-.025em', maxWidth: 680 }}
        >
          Construire l'infrastructure du diagnostic oncologique de demain — en Algérie et en Afrique.
        </h2>

        <p
          className="reveal font-light leading-relaxed mb-16"
          style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.52)', maxWidth: 580 }}
        >
          PathoMind ne remplace pas le pathologiste. PathoMind l'augmente — grâce à la pathologie digitale, la téléexpertise et l'intelligence artificielle clinique, au service d'un diagnostic oncologique plus précis, plus rapide et accessible à tous.
        </p>

        {/* Image workflow — pleine largeur */}
        <div
          className="reveal rounded-2xl overflow-hidden mb-16"
          style={{
            border: '1px solid rgba(255,255,255,.08)',
            boxShadow: '0 40px 100px rgba(0,0,0,.6)',
          }}
        >
          <img
            src="/pathomind-workflow.png"
            alt="PathoMind — Workflow de diagnostic oncologique intelligent"
            style={{ width: '100%', display: 'block', objectFit: 'cover' }}
            onError={e => e.target.style.display = 'none'}
          />
        </div>

        {/* 3 phases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px"
          style={{ background: 'rgba(255,255,255,.06)', borderRadius: 14, overflow: 'hidden' }}>
          {[
            {
              icon: '🏗️',
              phase: "Aujourd'hui — Déployé",
              title: 'Infrastructure de pathologie digitale',
              desc: 'Numérisation des lames WSI, visionneuse haute résolution, téléexpertise sécurisée, annotations collaboratives et formation médicale.',
              status: '#4ade80',
              statusLabel: 'Disponible',
            },
            {
              icon: '🤖',
              phase: '2025 – 2026 — En développement',
              title: "IA d'aide au diagnostic oncologique",
              desc: "Priorisation des cas urgents, quantification des biomarqueurs (Ki-67, HER2), détection des mitoses et assistance à la lecture histologique.",
              status: '#a78bfa',
              statusLabel: 'En validation',
            },
            {
              icon: '🧬',
              phase: '2026 – 2027 — Feuille de route',
              title: 'Plateforme de médecine de précision',
              desc: "RCP numérique, second avis intelligent, intégration multimodale et corrélation clinico-pathologique pour un traitement personnalisé.",
              status: 'rgba(255,255,255,.25)',
              statusLabel: 'Roadmap',
            },
          ].map((card, i) => (
            <div
              key={i}
              className="reveal p-8 cursor-default transition-colors duration-200"
              style={{
                background: '#0a0d18',
                transitionDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(109,40,217,.08)'}
              onMouseLeave={e => e.currentTarget.style.background = '#0a0d18'}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-lg"
                style={{ background: 'rgba(109,40,217,.15)', border: '1px solid rgba(139,92,246,.2)' }}
              >
                {card.icon}
              </div>
              <div
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: '.58rem', color: '#8b5cf6' }}
              >
                {card.phase}
              </div>
              <div
                className="font-semibold text-white mb-3 leading-snug"
                style={{ fontSize: '.92rem' }}
              >
                {card.title}
              </div>
              <div
                className="font-light leading-relaxed mb-4"
                style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.38)' }}
              >
                {card.desc}
              </div>
              <div className="flex items-center gap-1.5 font-mono" style={{ fontSize: '.6rem' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: card.status }} />
                <span style={{ color: card.status }}>{card.statusLabel}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
