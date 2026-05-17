import HistoBackground from '../components/HistoBackground'

const CHIFFRES = [
  {
    n: '1/250 000',
    unit: 'Densité critique',
    desc: 'Ratio pathologiste/habitant en Afrique subsaharienne, contre 1/5 000 en Europe',
  },
  {
    n: 'Trop tard',
    unit: 'Cancers détectés tardivement',
    desc: "De nombreux cancers sont diagnostiqués à un stade avancé, faute d'un accès rapide au diagnostic histologique",
  },
  {
    n: '×2',
    unit: 'Projection 2040',
    desc: "Le fardeau oncologique africain devrait doubler d'ici 2040 selon les projections OMS-AFRO",
  },
  {
    n: 'Plusieurs',
    unit: 'Régions sans laboratoire',
    desc: "De nombreuses régions algériennes n'ont pas encore accès à un service d'anatomopathologie de proximité",
  },
]

export default function ChiffresCles() {
  return (
    <div
      className="relative border-y overflow-hidden"
      style={{ background: '#0e0a1f', borderColor: 'rgba(255,255,255,.06)' }}
    >
      <HistoBackground opacity={0.05} color="#6baef8" />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {CHIFFRES.map((c, i) => (
            <div
              key={c.unit}
              className="reveal px-8 py-12 text-center"
              style={{
                borderRight: i < CHIFFRES.length - 1 ? '1px solid rgba(255,255,255,.07)' : undefined,
                transitionDelay: `${i * 0.07}s`,
              }}
            >
              <div
                className="font-serif text-white font-medium leading-none mb-2"
                style={{ fontSize: '2.6rem' }}
              >
                {c.n}
              </div>
              <div
                className="font-mono uppercase tracking-widest mb-2 block"
                style={{ fontSize: '.65rem', color: '#a78bfa' }}
              >
                {c.unit}
              </div>
              <div className="text-white/35 leading-relaxed" style={{ fontSize: '.78rem' }}>
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
