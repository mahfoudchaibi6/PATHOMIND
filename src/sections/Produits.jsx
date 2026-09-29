const BADGES = {
  green:  { color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0', dot: '#22c55e' },
  violet: { color: '#6d28d9', bg: '#f5f3ff', border: '#ddd6fe', dot: '#7c3aed' },
  blue:   { color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', dot: '#3b82f6' },
}

const PRODUITS = [
  {
    key: 'lab',
    name: 'PathoMind Lab',
    tag: "Le LIS d'anatomopathologie algérien",
    badge: { label: 'Disponible maintenant', tone: 'green' },
    desc: "Gérez l'intégralité du workflow de votre laboratoire — des dossiers patients aux comptes-rendus PDF — dans une interface simple, rapide et conçue pour les laboratoires algériens.",
    features: [
      'Dossiers patients & prescripteurs',
      'Suivi prélèvements → blocs → lames',
      'Worklist pathologiste',
      'Éditeur CR avec modèles',
      'Export PDF automatique',
    ],
    img: '/products/pathomind-lab.png',
    fallback: '/screenshots/2_tableau_de_bord.png',
    cta: 'Demander une démo',
    primary: true,
  },
  {
    key: 'viewer',
    name: 'PathoMind Viewer',
    tag: 'La visionneuse de lames numériques',
    badge: { label: 'En déploiement', tone: 'violet' },
    desc: "Visualisez, annotez et analysez vos lames histologiques en haute résolution depuis n'importe quel navigateur — sans installation, sans limite de taille.",
    features: [
      'Visionneuse WSI haute résolution',
      'Zoom multi-niveaux (×2 à ×40)',
      'Annotations & mesures',
      'Compatible H&E, IHC, FISH',
      'Accès multi-utilisateurs',
    ],
    img: '/products/pathomind-viewer.png',
    cta: 'En savoir plus',
  },
  {
    key: 'share',
    name: 'PathoMind Share',
    tag: 'La téléexpertise pathologique sécurisée',
    badge: { label: 'En déploiement', tone: 'blue' },
    desc: 'Partagez vos cas, invitez des experts et organisez vos réunions de concertation pluridisciplinaire — en temps réel, en toute sécurité.',
    features: [
      'Cas partagés & télé-expertise',
      'RCP & réunions de concertation',
      'Discussion en temps réel',
      'Deuxième avis expert',
      'Annotations collaboratives',
    ],
    img: '/products/pathomind-share.png',
    cta: 'En savoir plus',
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

        <div className="max-w-[680px] mb-24 lg:mb-32">
          <div className="reveal pm-eyebrow">Nos produits</div>
          <h2 className="reveal pm-h2 text-ink mt-6">
            Une suite, trois produits.<br/>
            <em className="italic" style={{ color: '#7c3aed' }}>Un seul workflow.</em>
          </h2>
          <p className="reveal pm-lead mt-8" style={{ color: '#5b6b86' }}>
            Chaque produit fonctionne seul et s'intègre naturellement aux autres — du laboratoire à la téléexpertise.
          </p>
        </div>

        <div className="flex flex-col gap-28 lg:gap-40">
          {PRODUITS.map((p, i) => {
            const reversed = i % 2 === 1
            return (
              <article key={p.key} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                <div className={`reveal lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
                  <img
                    src={p.img}
                    alt={`${p.name} — ${p.tag}`}
                    loading="lazy"
                    onError={p.fallback ? (e) => { e.currentTarget.onerror = null; e.currentTarget.src = p.fallback } : undefined}
                    className="w-full h-auto block"
                    style={{
                      borderRadius: 16,
                      border: '1px solid #ece8f7',
                      boxShadow: '0 1px 2px rgba(15,23,42,.04), 0 24px 48px -12px rgba(46,16,101,.18), 0 48px 96px -24px rgba(15,23,42,.14)',
                    }}
                  />
                </div>

                <div className={`reveal lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`} style={{ transitionDelay: '.1s' }}>
                  <Badge {...p.badge}/>
                  <h3 className="font-serif font-medium text-ink mt-7 mb-3" style={{ fontSize: 'clamp(1.9rem, 3vw, 2.4rem)', letterSpacing: '-.03em', lineHeight: 1.15 }}>
                    {p.name}
                  </h3>
                  <div className="font-mono uppercase mb-7" style={{ fontSize: '.64rem', letterSpacing: '.16em', color: '#7c3aed' }}>{p.tag}</div>
                  <p className="font-light mb-9" style={{ fontSize: '.95rem', lineHeight: 1.9, color: '#5b6b86' }}>{p.desc}</p>

                  <ul className="flex flex-col gap-3.5 mb-11 list-none">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3" style={{ fontSize: '.88rem', lineHeight: 1.6, color: '#2a3550' }}>
                        <svg className="flex-shrink-0 mt-1" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m3.5 8.5 3 3 6-7"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a href="#contact"
                    className={p.primary ? 'pm-btn' : 'pm-btn-light'}
                    style={p.primary ? undefined : { background: 'transparent', border: '1px solid #c4b5fd', color: '#6d28d9' }}>
                    {p.cta}
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
