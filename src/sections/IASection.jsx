import SectionHeader from '../components/SectionHeader'
import HistoBackground from '../components/HistoBackground'

const CAPS = ['Détection des mitoses','Segmentation tumorale','Quantification cellulaire','Contrôle qualité lames','Scoring biomarqueurs','Identification hotspots','Reconnaissance de patterns','Priorisation des cas urgents']

const PERFS = [
  { name: 'Détection des mitoses', val: '96,2 %', w: '96%' },
  { name: 'Contrôle qualité de lame', val: '98,8 %', w: '99%' },
  { name: 'Précision de détection ROI', val: '91,5 %', w: '91%' },
  { name: 'Priorisation des urgences oncologiques', val: '94,1 %', w: '94%' },
]

const PHASES = [
  {
    label: 'Phase 1 — Disponible',
    title: 'Triage et contrôle qualité des lames',
    desc: 'Priorisation automatique des cas selon leur degré d\'urgence clinique, contrôle de la qualité de numérisation et détection des zones d\'intérêt diagnostique — pour optimiser le temps du pathologiste.',
    statusColor: '#4ade80',
    statusLabel: 'Déployé cliniquement',
  },
  {
    label: 'Phase 2 — 2025–2026',
    title: 'Analyse quantitative des tissus',
    desc: 'Comptage automatique des mitoses, calcul du ratio tumeur-stroma, estimation de l\'index Ki-67 et détection des métastases ganglionnaires — pour les cancers les plus fréquents en Algérie.',
    statusColor: '#6baef8',
    statusLabel: 'En validation',
  },
  {
    label: 'Phase 3 — 2026+',
    title: 'Aide au diagnostic primaire',
    desc: 'Suggestion diagnostique supervisée pour la classification des néoplasies courantes — sous validation de marquage CE et agrément des autorités sanitaires algériennes, toujours sous contrôle du médecin pathologiste.',
    statusColor: 'rgba(255,255,255,.28)',
    statusLabel: 'Sur la feuille de route',
  },
]

export default function IASection() {
  return (
    <section id="ia" className="section-dark py-32 px-16 relative overflow-hidden">
      <HistoBackground opacity={0.055} color="#6baef8" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(18,70,168,.3) 0%, transparent 65%)' }} />
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="reveal">
          <SectionHeader
            eyebrow="Intelligence artificielle clinique"
            title="Une IA qui augmente le pathologiste — sans jamais le remplacer"
            subtitle="Notre approche de l'IA est fondée sur la validation clinique rigoureuse, la transparence des modèles et l'intégration progressive — pensée pour gagner la confiance des praticiens et satisfaire aux exigences des autorités réglementaires algériennes."
            light
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Left */}
          <div className="reveal delay-1">
            <p className="font-mono uppercase tracking-widest text-white/25 mb-4" style={{ fontSize: '.62rem' }}>
              Capacités disponibles
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {CAPS.map((c) => (
                <div
                  key={c}
                  className="font-mono border px-3 py-1.5 rounded-sm transition-all duration-200 cursor-default hover:text-sky"
                  style={{ fontSize: '.67rem', color: 'rgba(255,255,255,.52)', borderColor: 'rgba(255,255,255,.1)', letterSpacing: '.04em' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(107,174,248,.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'}
                >
                  {c}
                </div>
              ))}
            </div>

            {/* Performance block */}
            <div
              className="rounded-xl p-8"
              style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}
            >
              <p className="font-mono uppercase tracking-widest text-white/25 mb-5" style={{ fontSize: '.6rem' }}>
                Performances validées en contexte africain
              </p>
              <div className="flex flex-col gap-4">
                {PERFS.map((p) => (
                  <div key={p.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-white/48" style={{ fontSize: '.76rem' }}>{p.name}</span>
                      <span className="font-mono text-sky" style={{ fontSize: '.68rem' }}>{p.val}</span>
                    </div>
                    <div className="h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,.07)' }}>
                      <div className="h-full rounded-full bg-blue-3" style={{ width: p.w }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phases */}
          <div className="flex flex-col gap-4 reveal delay-2">
            {PHASES.map((ph) => (
              <div
                key={ph.label}
                className="rounded-xl p-7 cursor-default transition-all duration-200"
                style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.07)'; e.currentTarget.style.borderColor = 'rgba(107,174,248,.2)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)' }}
              >
                <div className="font-mono text-sky uppercase tracking-widest mb-2" style={{ fontSize: '.62rem' }}>
                  {ph.label}
                </div>
                <div className="font-medium text-white/88 mb-2" style={{ fontSize: '.92rem' }}>{ph.title}</div>
                <div className="font-light leading-relaxed mb-4" style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.38)' }}>
                  {ph.desc}
                </div>
                <div className="inline-flex items-center gap-1.5 font-mono" style={{ fontSize: '.6rem' }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: ph.statusColor }} />
                  <span style={{ color: ph.statusColor }}>{ph.statusLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
