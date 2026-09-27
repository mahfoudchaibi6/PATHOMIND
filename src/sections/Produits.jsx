const ICONS = {
  lab: (
    <>
      <path d="M9 3h6M10 3v6.5L4.8 18.2A1.8 1.8 0 0 0 6.3 21h11.4a1.8 1.8 0 0 0 1.5-2.8L14 9.5V3"/>
      <path d="M7.5 15h9"/>
    </>
  ),
  view: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
      <circle cx="12" cy="10.5" r="3"/>
      <path d="m14.2 12.7 2.3 2.3"/>
    </>
  ),
  ai: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2"/>
      <rect x="9.5" y="9.5" width="5" height="5" rx="1"/>
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>
    </>
  ),
}

const BADGES = {
  green:  { color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0', dot: '#22c55e' },
  violet: { color: '#6d28d9', bg: '#f5f3ff', border: '#ddd6fe', dot: '#7c3aed' },
  blue:   { color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', dot: '#3b82f6' },
}

const PRODUITS = [
  {
    key: 'lab',
    name: 'PathoMind Lab',
    tag: "LIS d'anatomopathologie",
    badge: { label: 'Disponible maintenant', tone: 'green' },
    desc: "Le système d'information de laboratoire qui accompagne chaque dossier, du prélèvement au compte-rendu signé.",
    features: [
      'Dossiers patients & prescripteurs',
      'Traçabilité prélèvements → blocs → lames',
      'Worklist pathologiste',
      'Éditeur de compte-rendu avec modèles',
      'Export PDF automatique',
    ],
    cta: 'Demander une démo',
    primary: true,
  },
  {
    key: 'view',
    name: 'PathoMind View',
    tag: 'Pathologie digitale & téléexpertise',
    badge: { label: 'En déploiement', tone: 'violet' },
    desc: 'La lame entière dans le navigateur, partagée en toute sécurité entre établissements.',
    features: [
      'Visionneuse WSI haute résolution',
      'Annotations collaboratives',
      'Téléexpertise inter-établissements',
      'Compatible SVS · NDPI · MRXS',
    ],
    cta: 'Rejoindre le programme pilote',
  },
  {
    key: 'ai',
    name: 'PathoMind AI',
    tag: 'IA clinique oncologique',
    badge: { label: 'En validation', tone: 'blue' },
    desc: "Des algorithmes d'aide au diagnostic pour gagner en précision et en temps sur les cas oncologiques.",
    features: [
      'Segmentation tumorale',
      'Quantification Ki-67 & HER2',
      'Détection des mitoses',
      'Priorisation des cas urgents',
    ],
    cta: 'Suivre la validation',
  },
]

function Badge({ label, tone }) {
  const b = BADGES[tone]
  return (
    <span className="inline-flex items-center gap-2 font-mono rounded-full px-3 py-1.5"
      style={{ fontSize: '.62rem', letterSpacing: '.06em', color: b.color, background: b.bg, border: `1px solid ${b.border}` }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: b.dot }}/>
      {label}
    </span>
  )
}

export default function Produits() {
  return (
    <section id="produits" className="pm-section bg-white">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">

        <div className="max-w-[680px] mb-24">
          <div className="reveal pm-eyebrow">Nos produits</div>
          <h2 className="reveal pm-h2 text-ink mt-6">
            Une suite, trois produits.<br/>
            <em className="italic" style={{ color: '#7c3aed' }}>Un seul workflow.</em>
          </h2>
          <p className="reveal pm-lead mt-8" style={{ color: '#5b6b86' }}>
            Chaque produit fonctionne seul et s'intègre naturellement aux autres — du laboratoire à l'IA clinique.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRODUITS.map((p, i) => (
            <article key={p.key}
              className="reveal pm-product-card flex flex-col rounded-2xl p-10"
              style={{
                transitionDelay: `${i * 0.1}s`,
                background: p.primary ? 'linear-gradient(180deg, #faf8ff 0%, #ffffff 60%)' : '#ffffff',
                border: `1px solid ${p.primary ? '#ddd6fe' : '#e8ecf4'}`,
              }}>

              <div className="flex items-start justify-between gap-4 mb-10">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: '#f5f3ff', border: '1px solid #ede9fe', color: '#7c3aed' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[p.key]}
                  </svg>
                </div>
                <Badge {...p.badge}/>
              </div>

              <div className="font-mono uppercase mb-3" style={{ fontSize: '.62rem', letterSpacing: '.18em', color: '#8b93a7' }}>{p.tag}</div>
              <h3 className="font-serif font-medium text-ink mb-5" style={{ fontSize: '1.75rem', letterSpacing: '-.025em' }}>{p.name}</h3>
              <p className="font-light mb-10" style={{ fontSize: '.88rem', lineHeight: 1.85, color: '#5b6b86' }}>{p.desc}</p>

              <ul className="flex flex-col gap-4 mb-12 flex-1 list-none">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3" style={{ fontSize: '.84rem', lineHeight: 1.6, color: '#2a3550' }}>
                    <svg className="flex-shrink-0 mt-1" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3.5 8.5 3 3 6-7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#contact" className={p.primary ? 'pm-btn justify-center' : 'pm-btn-light justify-center'}>
                {p.cta}
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
