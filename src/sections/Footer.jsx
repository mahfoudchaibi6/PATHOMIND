const COLS = [
  {
    title: 'Plateforme',
    links: ['Visionneuse WSI','Téléexpertise','IA Clinique','Formation médicale','Intégration SIL','Tableaux de bord'],
  },
  {
    title: 'Institutions',
    links: ['CHU & Hôpitaux publics','Facultés de médecine','Centres anticancéreux','Ministère de la Santé','Laboratoires privés','Partenaires africains'],
  },
  {
    title: 'Ressources',
    links: ['Documentation clinique','Études de cas','Publications scientifiques','Réglementation','Politique de confidentialité',"Conditions d'utilisation"],
  },
]

export default function Footer() {
  return (
    <footer
      className="px-6 lg:px-16 pt-20 pb-10 border-t"
      style={{ background: '#060d1a', borderColor: 'rgba(255,255,255,.05)' }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Top */}
        <div className="flex gap-16 flex-wrap mb-16">

          {/* Brand + contact */}
          <div style={{ maxWidth: 280 }}>
            <a href="#" className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="PathoMind" style={{ height: '44px', width: 'auto', objectFit: 'contain' }} />
            </a>
            <p className="font-light text-white/28 leading-relaxed mb-6" style={{ fontSize: '.78rem' }}>
              Moderniser l'anatomopathologie par la visualisation digitale, l'IA clinique et la téléexpertise — au service des patients algériens, africains et du Moyen-Orient.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3">

              {/* Email */}
              <a
                href="mailto:pathomind2026@hotmail.com"
                className="flex items-center gap-2 transition-colors duration-200 hover:text-white/70"
                style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.38)', textDecoration: 'none' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".6">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 7 10-7"/>
                </svg>
                pathomind2026@hotmail.com
              </a>

              {/* Téléphone */}
              <a
                href="tel:+33759101452"
                className="flex items-center gap-2 transition-colors duration-200 hover:text-white/70"
                style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.38)', textDecoration: 'none' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".6">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.1 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +33 7 59 10 14 52
              </a>

              {/* Adresse */}
              <a
                href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x128fafea06d2f2f7:0xc85fa3b9927e5616"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 transition-colors duration-200 hover:text-white/70"
                style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.38)', textDecoration: 'none' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".6" style={{ marginTop: 2, flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Algeria Venture<br/>Dounia Parc, Dély Ibrahim<br/>16000, Algérie</span>
              </a>

            </div>
          </div>

          {/* Colonnes liens */}
          {COLS.map((col) => (
            <div key={col.title}>
              <h5
                className="font-mono font-medium uppercase tracking-widest mb-5"
                style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.22)' }}
              >
                {col.title}
              </h5>
              <ul className="flex flex-col gap-2.5 list-none">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="transition-colors duration-200 hover:text-white/80"
                      style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.32)' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t"
          style={{ borderColor: 'rgba(255,255,255,.06)' }}
        >
          <p
            className="font-mono text-white/18"
            style={{ fontSize: '.62rem', letterSpacing: '.04em' }}
          >
            © 2025 PathoMind Technologies · Algérie · Afrique · Moyen-Orient · Tous droits réservés
          </p>
          <div className="flex gap-2 flex-wrap">
            {['ISO 13485','CE Roadmap','RGPD','Souveraineté des données'].map((b) => (
              <div
                key={b}
                className="font-mono text-white/18 border px-2 py-0.5 rounded-sm"
                style={{
                  fontSize: '.58rem',
                  borderColor: 'rgba(255,255,255,.07)',
                  letterSpacing: '.05em',
                  textTransform: 'uppercase',
                }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
