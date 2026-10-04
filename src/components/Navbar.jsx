import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { EASE } from '../lib/animations'
import Logo from './Logo'

const LINKS = [
  { href: '#produits', label: 'Produits' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#consulting', label: 'Consulting' },
  { href: '#fondateur', label: 'Fondateur' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ ready = true }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Section active : celle qui traverse le milieu de l'écran
  useEffect(() => {
    const els = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive('#' + e.target.id) }),
      { rootMargin: '-50% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    const hero = document.querySelector('#hero')
    const ioHero = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive('') }, { rootMargin: '-50% 0px -50% 0px' })
    if (hero) ioHero.observe(hero)
    return () => { io.disconnect(); ioHero.disconnect() }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <>
      <motion.div aria-hidden="true" className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left pointer-events-none"
        style={{ scaleX: progress, background: 'linear-gradient(90deg, #7c3aed, #a78bfa)' }}/>

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-[background,border-color,backdrop-filter] duration-500"
        style={{
          background: scrolled ? 'rgba(5,8,16,.88)' : 'transparent',
          borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,.08)' : 'transparent'}`,
          backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
        }}
      >
        <div className="max-w-[1100px] h-full mx-auto px-5 md:px-6 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center">
          <a href="#hero" className="flex items-center justify-self-start" aria-label="PathoMind — accueil">
            <Logo size={30}/>
          </a>

          <ul className="hidden lg:flex items-center gap-9 list-none">
            {LINKS.map((l) => {
              const isActive = active === l.href
              return (
                <li key={l.href} className="relative">
                  <a href={l.href} className="pm-navlink" aria-current={isActive ? 'true' : undefined}>{l.label}</a>
                  {isActive && (
                    <motion.span layoutId="nav-dot" aria-hidden="true"
                      className="absolute left-1/2 -bottom-2.5 w-1 h-1 -ml-0.5 rounded-full"
                      style={{ background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}/>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="hidden lg:flex justify-self-end">
            <a href="#contact" className="pm-btn pm-btn-sm">Demander une démo</a>
          </div>

          <button className="lg:hidden justify-self-end text-white/80 hover:text-white p-2 -mr-2" onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu" aria-expanded={open}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M4 8h16M4 16h16"/>
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[70] lg:hidden flex flex-col"
            style={{ background: 'rgba(5,8,16,.96)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center justify-between px-5 h-16">
              <Logo size={28}/>
              <button onClick={() => setOpen(false)} aria-label="Fermer le menu" className="text-white/70 hover:text-white p-2 -mr-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <motion.nav className="flex flex-col px-5 pt-8 flex-1"
              initial="hidden" animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}>
              {LINKS.map((l) => (
                <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
                  className="pm-display py-4 text-white/85 hover:text-white"
                  style={{ fontSize: '2rem', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                  {l.label}
                </motion.a>
              ))}
            </motion.nav>
            <div className="p-5 pb-8">
              <a href="#contact" onClick={() => setOpen(false)} className="pm-btn w-full">Demander une démo</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
