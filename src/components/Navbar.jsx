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
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 transition-all duration-300 ${
        scrolled
          ? 'bg-ink/93 backdrop-blur-2xl border-b border-white/7 h-16'
          : 'bg-transparent border-b border-transparent h-20'
      }`}
      style={{ backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : undefined }}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-3 font-serif text-xl font-medium text-white tracking-tight">
        <Logomark />
        PathoMind
      </a>

      {/* Desktop links */}
      <ul className="hidden lg:flex gap-8 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="font-mono text-xs font-medium text-white/50 tracking-widest uppercase transition-colors duration-200 hover:text-white/90 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-sky transition-all duration-300 group-hover:w-full" />
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className="hidden lg:block font-mono text-xs font-semibold tracking-widest uppercase text-white border border-white/28 px-5 py-2 rounded-sm transition-all duration-200 hover:bg-white/10 hover:border-white/55"
      >
        Demander une démo
      </a>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden text-white/60 hover:text-white"
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
        <div className="absolute top-full left-0 right-0 bg-ink/98 border-b border-white/7 py-6 px-8 flex flex-col gap-4 lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-mono text-sm text-white/55 tracking-widest uppercase hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 self-start"
          >
            Demander une démo
          </a>
        </div>
      )}
    </nav>
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
