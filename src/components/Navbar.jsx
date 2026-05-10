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
    { href: '#probleme', label: 'Problème' },
    { href: '#solution', label: 'Plateforme' },
    { href: '#hopitaux', label: 'Hôpitaux' },
    { href: '#pathologistes', label: 'Pathologistes' },
    { href: '#ia', label: 'IA Clinique' },
    { href: '#fondateur', label: 'Fondateur' },
  ]

  return (
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
      <a href="#" className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="PathoMind"
          style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
        />
      </a>

      {/* Desktop links */}
      <ul className="hidden lg:flex gap-8 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="font-mono text-xs font-medium tracking-widest uppercase transition-colors duration-200 relative group"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-sky transition-all duration-300 group-hover:w-full" />
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <a
        href="#contact"
        className="hidden lg:block font-mono text-xs font-semibold tracking-widest uppercase text-white border border-white/40 px-5 py-2 rounded-sm transition-all duration-200 hover:bg-white/15 hover:border-white/70"
      >
        Demander une démo
      </a>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden text-white hover:text-white/80 p-2"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {open
            ? <path d="M18 6L6 18M6 6l12 12" />
            : <path d="M3 8h18M3 16h18" />
          }
        </svg>
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 flex flex-col gap-1 lg:hidden"
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            padding: '1.5rem',
          }}
        >
          {/* Logo mobile menu */}
          <div className="flex justify-center mb-4 pb-4" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <img src="/logo.png" alt="PathoMind" style={{ height: '32px', width: 'auto' }} />
          </div>

          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1rem', borderRadius: '8px',
                fontSize: '0.875rem', fontWeight: '500', color: '#1e3a5f',
                textDecoration: 'none', letterSpacing: '0.02em',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1a5cd4', flexShrink: 0 }} />
              {l.label}
            </a>
          ))}
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '100%', padding: '0.75rem 1.5rem',
                background: '#1a5cd4', color: '#ffffff',
                fontSize: '0.8rem', fontWeight: '600', borderRadius: '6px',
                textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase',
              }}
            >
              Demander une démo
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
