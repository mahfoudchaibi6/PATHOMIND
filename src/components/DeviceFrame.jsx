import { useState } from 'react'

// Image avec skeleton pendant le chargement et sources de repli successives
export function SmartImage({ srcs, alt, className = '', dark = false, imgClassName = 'object-cover object-top' }) {
  const list = Array.isArray(srcs) ? srcs : [srcs]
  const [idx, setIdx] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const src = list[idx]

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {!loaded && <div className={`absolute inset-0 ${dark ? 'pm-skeleton-dark' : 'pm-skeleton'}`} aria-hidden="true"/>}
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full ${imgClassName}`}
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity .6s ease' }}
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(false); setIdx((i) => i + 1) }}
        />
      )}
    </div>
  )
}

// Fenêtre de navigateur façon macOS, pour les captures d'interface
export function BrowserFrame({ url, children, dark = false }) {
  return (
    <div className="relative rounded-[14px] overflow-hidden"
      style={{
        background: dark ? '#0e1222' : '#ffffff',
        border: `1px solid ${dark ? 'rgba(255,255,255,.1)' : '#e7e5f0'}`,
        boxShadow: dark
          ? '0 50px 120px -30px rgba(0,0,0,.7), 0 0 0 1px rgba(167,139,250,.06)'
          : '0 1px 2px rgba(15,23,42,.04), 0 30px 60px -20px rgba(46,16,101,.22), 0 60px 120px -40px rgba(15,23,42,.18)',
      }}>
      <div className="flex items-center gap-3 px-4 h-10"
        style={{ background: dark ? '#0b0f1c' : '#f7f6fb', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.07)' : '#eceaf3'}` }}>
        <div className="flex gap-1.5" aria-hidden="true">
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: dark ? .8 : 1 }}/>)}
        </div>
        <div className="flex-1 flex justify-center">
          <div className="pm-mono flex items-center gap-2 rounded-md px-3 py-1 w-full max-w-[340px] justify-center"
            style={{ fontSize: '.66rem', lineHeight: 1.4, color: dark ? 'rgba(255,255,255,.45)' : '#8a8fa3', background: dark ? 'rgba(255,255,255,.05)' : '#eeedf4' }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
            <span className="truncate">{url}</span>
          </div>
        </div>
        <div className="w-[42px]" aria-hidden="true"/>
      </div>
      {children}
    </div>
  )
}

// Visuel produit : fond dégradé + grille, avec soit une fenêtre navigateur, soit un visuel encadré
export default function ProductVisual({ kind = 'browser', url, srcs, alt }) {
  return (
    <div className="group relative">
      {/* Halo */}
      <div aria-hidden="true" className="absolute -inset-6 md:-inset-10 rounded-[32px] opacity-70 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(124,58,237,.18), transparent 70%)', filter: 'blur(20px)' }}/>
      <div className="relative rounded-[24px] p-3 sm:p-5 md:p-7"
        style={{
          background: 'linear-gradient(145deg, #f6f3ff 0%, #eef0fb 50%, #f8f7fc 100%)',
          border: '1px solid #ece8f8',
        }}>
        <div aria-hidden="true" className="absolute inset-0 rounded-[24px] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(124,58,237,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          WebkitMaskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 75%)',
          maskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 75%)',
        }}/>
        <div className="relative transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-1.5">
          {kind === 'browser' ? (
            <BrowserFrame url={url}>
              <div style={{ aspectRatio: '16 / 9.4' }}><SmartImage srcs={srcs} alt={alt}/></div>
            </BrowserFrame>
          ) : (
            <div className="rounded-[14px] overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,.6)', boxShadow: '0 30px 60px -20px rgba(46,16,101,.3), 0 60px 120px -40px rgba(15,23,42,.2)' }}>
              <div style={{ aspectRatio: '16 / 9' }}><SmartImage srcs={srcs} alt={alt} imgClassName="object-cover object-center"/></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
