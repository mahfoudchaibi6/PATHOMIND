import HistoBackground from '../components/HistoBackground'

const CHIFFRES = [
  {
    n: '2',
    unit: 'Produits disponibles',
    desc: 'PathoMind Lab (LIS) et PathoMind WSI — déployables immédiatement en Algérie',
  },
  {
    n: '58',
    unit: 'Wilayas cibles',
    desc: "Couverture nationale de l'Algérie — du CHU de la capitale aux hôpitaux de wilaya",
  },
  {
    n: 'MENA',
    unit: 'Marché visé',
    desc: 'Algérie, Tunisie, Maroc, Libye et Moyen-Orient — une solution pensée pour la région',
  },
  {
    n: '100%',
    unit: 'Souveraineté',
    desc: 'Données hébergées en Algérie, conformes aux exigences du Ministère de la Santé',
  },
]

export default function ChiffresCles() {
  return (
    <div
      className="relative border-y overflow-hidden"
      style={{ background: '#0e0a1f', borderColor: 'rgba(255,255,255,.06)' }}
    >
      <HistoBackground opacity={0.05} color="#7c3aed" />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {CHIFFRES.map((c, i) => (
            <div
              key={c.unit}
              className="reveal px-6 py-12 text-center"
              style={{
                borderRight: i < CHIFFRES.length - 1 ? '1px solid rgba(255,255,255,.07)' : undefined,
                transitionDelay: `${i * 0.07}s`,
              }}
            >
              <div className="font-serif text-white font-medium leading-none mb-2"
                style={{ fontSize: '2.4rem' }}>{c.n}</div>
              <div className="font-mono uppercase tracking-widest mb-2 block"
                style={{ fontSize: '.62rem', color: '#a78bfa' }}>{c.unit}</div>
              <div className="text-white/35 leading-relaxed"
                style={{ fontSize: '.75rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
