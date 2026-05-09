import { useState } from 'react'

const TABS = ['Visionneuse', 'Analyse IA', 'Téléexpertise', 'Compte-rendu']

export default function SlideViewer() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/8"
      style={{ background: 'rgba(255,255,255,.04)', boxShadow: '0 40px 100px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.04)' }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/7" style={{ background: 'rgba(255,255,255,.03)' }}>
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <span className="font-mono text-xs text-white/28 tracking-wide">PathoMind · Lame N° A24-08914</span>
        <div className="w-8" />
      </div>

      {/* Canvas */}
      <div className="relative h-64 overflow-hidden" style={{ background: '#020810' }}>
        {/* Cells */}
        {[
          { size: 58, top: '18%', left: '12%', delay: '0s' },
          { size: 40, top: '44%', left: '22%', delay: '.8s' },
          { size: 68, top: '54%', left: '8%',  delay: '1.5s' },
          { size: 36, top: '21%', left: '42%', delay: '.4s' },
          { size: 52, top: '14%', left: '60%', delay: '1.1s' },
          { size: 42, top: '50%', left: '58%', delay: '.6s' },
          { size: 60, top: '64%', left: '72%', delay: '1.8s' },
          { size: 34, top: '30%', left: '78%', delay: '.2s' },
        ].map((c, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-breathe"
            style={{
              width: c.size, height: c.size, top: c.top, left: c.left,
              animationDelay: c.delay,
              border: '1px solid rgba(107,174,248,.32)',
              background: 'radial-gradient(circle at 35% 35%, rgba(107,174,248,.22), rgba(18,70,168,.07))',
            }}
          />
        ))}

        {/* Nuclei */}
        {[
          { w: 18, h: 18, top: '22%', left: '17%' },
          { w: 13, h: 13, top: '47%', left: '26%' },
          { w: 21, h: 21, top: '58%', left: '13%' },
          { w: 11, h: 11, top: '25%', left: '46%' },
        ].map((n, i) => (
          <div key={i} className="absolute rounded-full" style={{ width: n.w, height: n.h, top: n.top, left: n.left, background: 'rgba(58,127,245,.42)' }} />
        ))}

        {/* AI box */}
        <div
          className="absolute animate-scanpulse"
          style={{ top: '10%', left: '53%', width: 108, height: 98, border: '1.5px solid #3a7ff5', borderRadius: 4 }}
        >
          {[['top-[-1px]','left-[-1px]','border-t-2 border-l-2'],['top-[-1px]','right-[-1px]','border-t-2 border-r-2'],['bottom-[-1px]','left-[-1px]','border-b-2 border-l-2'],['bottom-[-1px]','right-[-1px]','border-b-2 border-r-2']].map(([a,b,c],i)=>(
            <div key={i} className={`absolute w-2 h-2 ${a} ${b} ${c} border-sky`} />
          ))}
          <div className="absolute -top-7 left-0 bg-blue-2 text-white font-mono text-xs px-1.5 py-0.5 rounded-sm whitespace-nowrap" style={{ fontSize: '.58rem' }}>
            ⚑ Atypique · 94.2%
          </div>
        </div>

        {/* Annotation */}
        <div
          className="absolute font-mono text-white/60 px-2 py-1 rounded-r"
          style={{ top: '62%', left: '5%', fontSize: '.55rem', background: 'rgba(255,255,255,.06)', borderLeft: '2px solid #6baef8' }}
        >
          Cellules atypiques
        </div>

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-px animate-scan"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(58,127,245,.55), transparent)' }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-white/7" style={{ background: 'rgba(255,255,255,.02)' }}>
        <span className="font-mono text-white/28" style={{ fontSize: '.6rem' }}>Gr. ×40 · H&E · CHU Mustapha</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-white/30" style={{ fontSize: '.6rem' }}>IA</span>
          <div className="w-16 h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,.1)' }}>
            <div className="h-full rounded-full bg-blue-3" style={{ width: '87%' }} />
          </div>
          <span className="font-mono text-sky font-medium" style={{ fontSize: '.63rem' }}>87%</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-px px-4 py-3 border-t border-white/5" style={{ background: 'rgba(0,0,0,.3)' }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setActiveTab(i)}
            className={`flex-1 text-center py-1.5 rounded font-mono font-medium tracking-widest uppercase transition-all duration-200 ${
              activeTab === i
                ? 'text-sky'
                : 'text-white/28 hover:text-white/50'
            }`}
            style={{
              fontSize: '.62rem',
              background: activeTab === i ? 'rgba(26,92,212,.38)' : 'transparent',
            }}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}
