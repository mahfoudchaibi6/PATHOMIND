const COLS = [
  {
    title: 'Produits',
    links: [
      { label: 'PathoMind Lab', href: '#produits' },
      { label: 'PathoMind View', href: '#produits' },
      { label: 'PathoMind AI', href: '#produits' },
      { label: 'Consulting & Intégration', href: '#consulting' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'Solutions', href: '#solutions' },
      { label: 'Fondateur', href: '#fondateur' },
      { label: 'Demander une démo', href: '#contact' },
    ],
  },
]

const CONTACT = [
  { label: 'pathomind2026@hotmail.com', href: 'mailto:pathomind2026@hotmail.com' },
  { label: '+33 7 59 10 14 52', href: 'tel:+33759101452' },
  {
    label: 'Algeria Venture · Dounia Parc\nDély Ibrahim 16000, Alger',
    href: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x128fafea06d2f2f7:0xc85fa3b9927e5616',
    external: true,
  },
]

const colTitle = 'font-mono uppercase mb-7'
const colTitleStyle = { fontSize: '.64rem', letterSpacing: '.2em', color: 'rgba(167,139,250,.7)' }
const linkStyle = { fontSize: '.86rem', lineHeight: 1.8 }

export default function Footer() {
  return (
    <footer style={{ background: '#080d1a', borderTop: '1px solid rgba(255,255,255,.06)' }}>
      <div className="max-w-[1140px] mx-auto px-6 lg:px-12 pt-28 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.3fr] gap-16 mb-24">

          <div>
            <a href="#hero" className="inline-flex mb-6">
              <img src="/logo.png" alt="PathoMind" style={{ height: 46, width: 'auto', objectFit: 'contain' }}/>
            </a>
            <p className="font-light max-w-[280px]" style={{ fontSize: '.86rem', lineHeight: 1.9, color: 'rgba(255,255,255,.45)' }}>
              La suite logicielle médicale conçue en Algérie. Par des médecins. Pour des médecins.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h5 className={colTitle} style={colTitleStyle}>{col.title}</h5>
              <ul className="flex flex-col gap-3 list-none">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-white/55 hover:text-white transition-colors duration-200" style={linkStyle}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h5 className={colTitle} style={colTitleStyle}>Contact</h5>
            <ul className="flex flex-col gap-3 list-none">
              {CONTACT.map((c) => (
                <li key={c.href}>
                  <a href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener noreferrer' : undefined}
                    className="text-white/55 hover:text-white transition-colors duration-200 whitespace-pre-line"
                    style={linkStyle}>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 pt-10"
          style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <p className="font-mono" style={{ fontSize: '.66rem', letterSpacing: '.06em', color: 'rgba(255,255,255,.3)' }}>
            © {new Date().getFullYear()} PathoMind · Éditeur de logiciels médicaux · Algérie
          </p>
          <p className="font-mono" style={{ fontSize: '.66rem', letterSpacing: '.06em', color: 'rgba(255,255,255,.3)' }}>
            Incubé à Algeria Venture
          </p>
        </div>
      </div>
    </footer>
  )
}
