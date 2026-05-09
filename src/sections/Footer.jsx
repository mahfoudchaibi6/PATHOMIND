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
    links: ['Documentation clinique','Études de cas','Publications scientifiques','Réglementation','Politique de confidentialité','Conditions d\'utilisation'],
  },
]

export default function Footer() {
  return (
    <footer
      className="px-16 pt-20 pb-10 border-t"
      style={{ background: '#060d1a', borderColor: 'rgba(255,255,255,.05)' }}
    >
      <div className="max-w-[1200px] mx-auto">

        <div className="flex gap-20 flex-wrap mb-16">
          {/* Brand */}
          <div className="max-w-[260px]">
            <a href="#" className="flex items-center gap-3 font-serif text-xl font-medium text-white tracking-tight mb-4">
              <Logomark />
              PathoMind
            </a>
            <p className="font-light text-white/28 leading-relaxed" style={{ fontSize: '.78rem' }}>
              Moderniser l'anatomopathologie par la visualisation digitale, l'IA clinique et la téléexpertise — au service des patients algériens, africains et du Moyen-Orient.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h5 className="font-mono font-medium uppercase tracking-widest text-white/22 mb-5" style={{ fontSize: '.62rem' }}>
                {col.title}
              </h5>
              <ul className="flex flex-col gap-2.5 list-none">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/32 transition-colors duration-200 hover:text-white/80"
                      style={{ fontSize: '.78rem' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t"
          style={{ borderColor: 'rgba(255,255,255,.06)' }}
        >
          <p className="font-mono text-white/18" style={{ fontSize: '.62rem', letterSpacing: '.04em' }}>
            © 2025 PathoMind Technologies · Algérie · Afrique · Moyen-Orient · Tous droits réservés
          </p>
          <div className="flex gap-2">
            {['ISO 13485','CE Roadmap','RGPD','Souveraineté des données'].map((b) => (
              <div
                key={b}
                className="font-mono text-white/18 border px-2 py-0.5 rounded-sm"
                style={{ fontSize: '.58rem', borderColor: 'rgba(255,255,255,.07)', letterSpacing: '.05em', textTransform: 'uppercase' }}
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

function Logomark() {
  return (
    <div className="w-8 h-8 rounded-lg bg-blue-2 flex items-center justify-center relative overflow-hidden flex-shrink-0">
      <div className="absolute w-[18px] h-[18px] rounded-full border-2 border-white/90" />
      <div className="absolute w-[7px] h-[7px] rounded-full bg-white" />
    </div>
  )
}
