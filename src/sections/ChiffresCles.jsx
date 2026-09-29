const CHIFFRES = [
  {
    n: '01',
    unit: 'Conçu par des médecins',
    desc: "Chaque écran est pensé avec des pathologistes, à partir du workflow réel d'un laboratoire algérien.",
  },
  {
    n: '02',
    unit: 'Souveraineté des données',
    desc: 'Hébergement en Algérie, conforme aux exigences du Ministère de la Santé.',
  },
  {
    n: '03',
    unit: 'Support local',
    desc: 'Une équipe basée à Alger — déploiement sur site, assistance en français et en arabe.',
  },
]

export default function ChiffresCles() {
  return (
    <section className="pm-section relative" style={{ background: '#080d1a' }}>
      <div className="max-w-[1140px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {CHIFFRES.map((c, i) => (
            <div key={c.unit} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="font-mono mb-6" style={{ fontSize: '.72rem', letterSpacing: '.2em', color: '#a78bfa' }}>{c.n}</div>
              <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, rgba(167,139,250,.5), transparent)' }}/>
              <h3 className="font-serif text-white font-medium mb-4" style={{ fontSize: '1.45rem', letterSpacing: '-.02em' }}>{c.unit}</h3>
              <p className="font-light" style={{ fontSize: '.88rem', lineHeight: 1.9, color: 'rgba(255,255,255,.5)' }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
