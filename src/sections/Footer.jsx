const COLS = [
  {
    title: 'Produits',
    links: ['PathoMind Lab — LIS','PathoMind WSI — Pathologie digitale','PathoMind AI — IA Clinique','PathoMind Connect','PathoMind Edu','Conseil & Intégration'],
  },
  {
    title: 'Clients',
    links: ['CHU & Hôpitaux publics','Laboratoires privés','Facultés de médecine','Ministère de la Santé','Partenaires MENA','Industriels & scanners'],
  },
  {
    title: 'Entreprise',
    links: ['À propos de PathoMind','Notre équipe','Publications scientifiques','Algeria Venture','Politique de confidentialité',"Conditions d'utilisation"],
  },
]

export default function Footer() {
  return (
    <footer className="px-6 lg:px-16 pt-20 pb-10 border-t"
      style={{ background: '#060d1a', borderColor: 'rgba(255,255,255,.05)' }}>
      <div className="max-w-[1200px] mx-auto">

        <div className="flex gap-16 flex-wrap mb-16">

          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <a href="#" className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="PathoMind" style={{ height: 44, width: 'auto', objectFit: 'contain' }}/>
            </a>

            <p className="font-mono uppercase tracking-widest mb-3"
              style={{ fontSize: '.58rem', color: 'rgba(167,139,250,.5)' }}>
              Startup Medtech Algérienne
            </p>

            <p className="font-light text-white/28 leading-relaxed mb-6"
              style={{ fontSize: '.78rem' }}>
              Suite de logiciels médicaux conçue par des médecins pour les laboratoires et hôpitaux algériens et africains.
            </p>

            {/* Produits disponibles */}
            <div className="flex flex-col gap-2 mb-6">
              {[
                { name: 'PathoMind Lab', status: 'Disponible', color: '#4ade80' },
                { name: 'PathoMind WSI', status: 'En déploiement', color: '#a78bfa' },
              ].map(p => (
                <div key={p.name} className="flex items-center justify-between rounded px-3 py-2"
                  style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)' }}>
                  <span className="font-mono" style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.5)' }}>{p.name}</span>
                  <span className="font-mono flex items-center gap-1" style={{ fontSize: '.58rem', color: p.color }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.color, display: 'inline-block' }}/>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-2.5">
              <a href="mailto:pathomind2026@hotmail.com"
                style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.35)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
                onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,.7)'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,.35)'}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
                </svg>
                pathomind2026@hotmail.com
              </a>
              <a href="tel:+33759101452"
                style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.35)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
                onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,.7)'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,.35)'}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.1 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +33 7 59 10 14 52
              </a>
              <a href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x128fafea06d2f2f7:0xc85fa3b9927e5616"
                target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.35)', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: 8 }}
                onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,.7)'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,.35)'}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Algeria Venture · Dounia Parc<br/>Dély Ibrahim 16000, Algérie</span>
              </a>
            </div>
          </div>

          {/* Colonnes */}
          {COLS.map((col) => (
            <div key={col.title}>
              <h5 className="font-mono font-medium uppercase tracking-widest mb-5"
                style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.22)' }}>
                {col.title}
              </h5>
              <ul className="flex flex-col gap-2.5 list-none">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors duration-200 hover:text-white/80"
                      style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.32)' }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t"
          style={{ borderColor: 'rgba(255,255,255,.06)' }}>
          <p className="font-mono text-white/18" style={{ fontSize: '.62rem', letterSpacing: '.04em' }}>
            © 2025 PathoMind Technologies · Algérie · Afrique · MENA · Tous droits réservés
          </p>
          <div className="flex gap-2 flex-wrap">
            {['Éditeur logiciel médical','ISO 13485','RGPD','Souveraineté des données'].map((b) => (
              <div key={b} className="font-mono text-white/18 border px-2 py-0.5 rounded-sm"
                style={{ fontSize: '.58rem', borderColor: 'rgba(255,255,255,.07)', letterSpacing: '.04em', textTransform: 'uppercase' }}>
                {b}
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
