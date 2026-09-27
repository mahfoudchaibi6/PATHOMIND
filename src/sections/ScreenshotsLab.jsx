import { useState } from 'react'

// Chaque vue essaie ses sources dans l'ordre, puis affiche un placeholder.
const VUES = [
  {
    key: 'dashboard',
    label: 'Tableau de bord',
    url: 'lab.pathomind.org/dashboard',
    srcs: ['/screenshots/lab-dashboard.png', '/screenshots/2_tableau_de_bord.png'],
    desc: "Vue d'ensemble de l'activité du laboratoire : dossiers en cours, retards, cas à valider.",
  },
  {
    key: 'dossier',
    label: 'Dossier patient',
    url: 'lab.pathomind.org/dossiers',
    srcs: ['/screenshots/lab-dossier.png'],
    desc: 'Toute la traçabilité du prélèvement au bloc et à la lame, sur un seul écran.',
  },
  {
    key: 'cr',
    label: 'Compte-rendu',
    url: 'lab.pathomind.org/compte-rendu',
    srcs: ['/screenshots/lab-cr.png', '/screenshots/3_compte_rendu_valide.png'],
    desc: 'Éditeur structuré avec modèles, validation et export PDF en un clic.',
  },
]

function Placeholder({ label }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5"
      style={{ background: 'linear-gradient(135deg, #f8f7fd 0%, #eef0f7 100%)' }}>
      <div className="w-14 h-14 rounded-xl flex items-center justify-center"
        style={{ background: '#ffffff', border: '1px solid #e4e0f5', boxShadow: '0 8px 24px rgba(76,29,149,.08)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 14h8"/>
        </svg>
      </div>
      <div className="text-center">
        <div className="font-serif text-ink" style={{ fontSize: '1.25rem' }}>{label}</div>
        <div className="font-mono uppercase mt-2" style={{ fontSize: '.6rem', letterSpacing: '.18em', color: '#8b93a7' }}>
          Capture bientôt disponible
        </div>
      </div>
    </div>
  )
}

function Capture({ vue }) {
  const [idx, setIdx] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const src = vue.srcs[idx]

  if (!src) return <Placeholder label={vue.label}/>

  return (
    <>
      {!loaded && <Placeholder label={vue.label}/>}
      <img
        src={src}
        alt={`PathoMind Lab — ${vue.label}`}
        className="absolute inset-0 w-full h-full object-cover object-top"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity .5s ease' }}
        onLoad={() => setLoaded(true)}
        onError={() => { setLoaded(false); setIdx(idx + 1) }}
      />
    </>
  )
}

export default function ScreenshotsLab() {
  const [active, setActive] = useState(0)
  const vue = VUES[active]

  return (
    <section id="solutions" className="pm-section relative overflow-hidden" style={{ background: '#080d1a' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(124,58,237,.22) 0%, transparent 70%)',
      }}/>

      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-[680px] mx-auto mb-20">
          <div className="reveal pm-eyebrow pm-eyebrow-light justify-center">PathoMind Lab en action</div>
          <h2 className="reveal pm-h2 text-white mt-6">
            Le laboratoire, <em className="italic" style={{ color: '#a78bfa' }}>enfin fluide.</em>
          </h2>
          <p className="reveal pm-lead mt-8" style={{ color: 'rgba(255,255,255,.55)' }}>
            Une interface claire, pensée pour le quotidien des techniciens, secrétaires et pathologistes.
          </p>
        </div>

        {/* Tabs */}
        <div className="reveal flex justify-center mb-10">
          <div role="tablist" className="inline-flex flex-wrap justify-center gap-1 p-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)' }}>
            {VUES.map((v, i) => (
              <button key={v.key} role="tab" aria-selected={i === active}
                onClick={() => setActive(i)}
                className="rounded-full px-5 py-2.5 transition-all duration-300"
                style={{
                  fontSize: '.8rem',
                  color: i === active ? '#ffffff' : 'rgba(255,255,255,.55)',
                  background: i === active ? '#7c3aed' : 'transparent',
                  boxShadow: i === active ? '0 4px 18px rgba(124,58,237,.4)' : 'none',
                }}>
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Browser mockup */}
        <div className="reveal mx-auto max-w-[1080px] rounded-2xl overflow-hidden"
          style={{ background: '#11172a', border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 50px 120px rgba(0,0,0,.55), 0 0 0 1px rgba(167,139,250,.06)' }}>
          <div className="flex items-center gap-4 px-5 h-12" style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
            <div className="flex gap-2">
              {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                <span key={c} className="w-3 h-3 rounded-full" style={{ background: c, opacity: .85 }}/>
              ))}
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 font-mono rounded-md px-4 py-1.5 w-full max-w-[420px]"
                style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.45)', background: 'rgba(255,255,255,.05)' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
                <span className="truncate">{vue.url}</span>
              </div>
            </div>
            <div className="w-[52px]"/>
          </div>
          <div className="relative w-full bg-white" style={{ aspectRatio: '16 / 9' }}>
            <Capture key={vue.key} vue={vue}/>
          </div>
        </div>

        <p className="text-center font-light mt-10 mx-auto max-w-[520px]"
          style={{ fontSize: '.88rem', lineHeight: 1.9, color: 'rgba(255,255,255,.5)' }}>
          {vue.desc}
        </p>
      </div>
    </section>
  )
}
