const SERVICES = [
  {
    n: '01',
    title: 'Audit digital',
    desc: 'État des lieux de vos outils et de vos flux, et feuille de route de transformation adaptée à votre établissement.',
  },
  {
    n: '02',
    title: 'Déploiement & configuration',
    desc: 'Installation, paramétrage de vos modèles et intégration à votre SIH existant.',
  },
  {
    n: '03',
    title: 'Formation des équipes',
    desc: 'Sessions sur site pour médecins, techniciens et secrétariat — jusqu’à l’autonomie complète.',
  },
  {
    n: '04',
    title: 'Support continu',
    desc: 'Une équipe locale qui répond vite, en français et en arabe, et fait évoluer la solution avec vous.',
  },
]

export default function Consulting() {
  return (
    <section id="consulting" className="pm-section" style={{ background: '#f7f8fc' }}>
      <div className="max-w-[1140px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-20 lg:gap-28 items-start">

          <div className="lg:sticky lg:top-32">
            <div className="reveal pm-eyebrow">Consulting & Intégration</div>
            <h2 className="reveal pm-h2 text-ink mt-6">
              La technologie ne suffit pas.<br/>
              <em className="italic" style={{ color: '#7c3aed' }}>On vous accompagne.</em>
            </h2>
            <p className="reveal pm-lead mt-8" style={{ color: '#5b6b86' }}>
              Nous accompagnons les laboratoires et hôpitaux dans leur transformation digitale, de l'audit initial au support au quotidien.
            </p>
            <a href="#contact" className="reveal pm-btn mt-12">
              Parler à un consultant
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="font-mono mb-5" style={{ fontSize: '.7rem', letterSpacing: '.2em', color: '#7c3aed' }}>{s.n}</div>
                <div className="h-px mb-7" style={{ background: '#e2e0ef' }}/>
                <h3 className="font-serif font-medium text-ink mb-4" style={{ fontSize: '1.3rem', letterSpacing: '-.02em' }}>{s.title}</h3>
                <p className="font-light" style={{ fontSize: '.86rem', lineHeight: 1.9, color: '#5b6b86' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
