import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#produits', label: 'Nos produits' },
    { href: '#solution', label: 'Plateforme' },
    { href: '#hopitaux', label: 'Hôpitaux' },
    { href: '#pathologistes', label: 'Pathologistes' },
    { href: '#ia', label: 'IA Clinique' },
    { href: '#fondateur', label: 'Fondateur' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16 transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}
        style={{
          background: scrolled ? 'rgba(6,13,26,0.97)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : undefined,
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : undefined,
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src="/logo.png" alt="PathoMind"
            style={{ height: scrolled ? '44px' : '56px', width: 'auto', objectFit: 'contain', transition: 'height .3s' }}/>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}
                className="font-mono text-xs font-medium tracking-widest uppercase transition-colors duration-200 relative group"
                style={{ color: 'rgba(255,255,255,0.7)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ background: '#a78bfa' }}/>
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="#contact"
          className="hidden lg:block font-mono text-xs font-semibold tracking-widest uppercase text-white border border-white/40 px-5 py-2 rounded-sm transition-all duration-200 hover:bg-white/15 hover:border-white/70">
          Demander une démo
        </a>

        {/* Mobile hamburger */}
        <button className="lg:hidden text-white hover:text-white/80 p-2"
          onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 7h18M3 12h18M3 17h18"/>}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 lg:hidden" style={{ background: 'rgba(0,0,0,.45)' }}
            onClick={() => setOpen(false)}/>
          <div className="fixed top-0 right-0 bottom-0 z-50 lg:hidden flex flex-col"
            style={{ width: 280, background: '#ffffff', boxShadow: '-10px 0 40px rgba(0,0,0,.2)' }}>
            <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid #f0f0f0' }}>
              <img src="/logo.png" alt="PathoMind" style={{ height: 38, width: 'auto' }}/>
              <button onClick={() => setOpen(false)}
                style={{ background: '#f5f5f5', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="flex flex-col flex-1 p-4" style={{ overflowY: 'auto' }}>
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 12px', borderRadius: 10, fontSize: '.92rem', fontWeight: 500, color: '#1e3a5f', textDecoration: 'none', marginBottom: 4 }}
                  onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  {l.label}
                  <svg style={{ marginLeft: 'auto', opacity: .3 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </a>
              ))}
            </div>
            <div className="p-4" style={{ borderTop: '1px solid #f0f0f0' }}>
              <a href="#contact" onClick={() => setOpen(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 14, background: '#7c3aed', color: '#fff', fontSize: '.85rem', fontWeight: 600, borderRadius: 10, textDecoration: 'none' }}>
                Demander une démo
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
