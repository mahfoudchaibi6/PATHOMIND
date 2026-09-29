import { useState, useEffect } from 'react'

const LINKS = [
  { href: '#produits', label: 'Produits' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#consulting', label: 'Consulting' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'h-16' : 'h-24'}`}
        style={{
          background: scrolled ? 'rgba(8,13,26,0.92)' : 'transparent',
          borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
          backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : undefined,
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : undefined,
        }}
      >
        <div className="max-w-[1240px] h-full mx-auto px-6 lg:px-12 flex items-center justify-between">
          <a href="#hero" className="flex items-center" aria-label="PathoMind — accueil">
            <img src="/logo.png" alt="PathoMind"
              style={{ height: scrolled ? 40 : 50, width: 'auto', objectFit: 'contain', transition: 'height .4s ease' }}/>
          </a>

          <ul className="hidden lg:flex items-center gap-12 list-none">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="pm-navlink">{l.label}</a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="hidden lg:inline-flex pm-btn pm-btn-sm">
            Demander une démo
          </a>

          <button className="lg:hidden text-white p-2" onClick={() => setOpen(!open)}
            aria-label="Menu" aria-expanded={open}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M4 8h16M4 16h16"/>}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 lg:hidden" style={{ background: 'rgba(8,13,26,.6)' }}
            onClick={() => setOpen(false)}/>
          <div className="fixed top-0 right-0 bottom-0 z-50 lg:hidden flex flex-col"
            style={{ width: 290, background: '#080d1a', borderLeft: '1px solid rgba(255,255,255,.08)' }}>
            <div className="flex items-center justify-between px-6 h-20">
              <img src="/logo.png" alt="PathoMind" style={{ height: 38, width: 'auto' }}/>
              <button onClick={() => setOpen(false)} aria-label="Fermer" className="text-white/60 p-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="flex flex-col flex-1 px-6 pt-6 gap-1">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="py-4 text-white/75 hover:text-white transition-colors"
                  style={{ fontSize: '1.05rem', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                  {l.label}
                </a>
              ))}
            </div>
            <div className="p-6">
              <a href="#contact" onClick={() => setOpen(false)} className="pm-btn w-full justify-center">
                Demander une démo
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
