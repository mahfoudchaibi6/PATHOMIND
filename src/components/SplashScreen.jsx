import { useEffect, useState } from 'react'

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('enter') // enter | visible | exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 100)
    const t2 = setTimeout(() => setPhase('exit'), 2800)
    const t3 = setTimeout(() => onComplete(), 3500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#080d1a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        transition: 'opacity .7s ease',
        opacity: phase === 'exit' ? 0 : phase === 'visible' ? 1 : 0,
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* Neural network SVG */}
      <div style={{ position: 'relative', width: 280, height: 200, marginBottom: '2rem' }}>
        <svg
          viewBox="0 0 280 200"
          width="280" height="200"
          style={{ position: 'absolute', inset: 0 }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* ── Edges ── */}
          {EDGES.map((e, i) => (
            <line
              key={i}
              x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke="#7c3aed"
              strokeWidth=".9"
              opacity=".35"
              strokeDasharray="4 4"
              style={{ animation: `dash ${1.2 + (i % 4) * .2}s linear infinite` }}
            />
          ))}

          {/* ── Nodes ── */}
          {NODES.map((n, i) => (
            <g key={i} filter={n.output ? 'url(#glow)' : undefined}>
              <circle
                cx={n.x} cy={n.y}
                r={n.output ? 10 : n.hidden ? 7 : 6}
                fill={n.output ? '#a78bfa' : n.hidden ? '#7c3aed' : '#4c1d95'}
                opacity={n.output ? 1 : .85}
                style={{
                  animation: `nodePulse ${2 + (i % 3) * .4}s ease-in-out infinite`,
                  animationDelay: `${i * .18}s`,
                }}
              />
              {n.output && (
                <circle cx={n.x} cy={n.y} r="16"
                  fill="none" stroke="#a78bfa" strokeWidth=".8" opacity=".3"
                  style={{ animation: 'ringPulse 2s ease-in-out infinite' }}
                />
              )}
            </g>
          ))}

          {/* ── Signal particles ── */}
          {PARTICLES.map((p, i) => (
            <circle key={i} r="2.5" fill="#c4b5fd" opacity=".9">
              <animateMotion
                dur={`${p.dur}s`}
                repeatCount="indefinite"
                begin={`${p.delay}s`}
                path={p.path}
              />
            </circle>
          ))}
        </svg>
      </div>

      {/* Logo */}
      <div style={{ textAlign: 'center' }}>
        <img
          src="/logo.png"
          alt="PathoMind"
          style={{ height: '52px', width: 'auto', marginBottom: '1rem' }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '.62rem', letterSpacing: '.2em',
          textTransform: 'uppercase', color: 'rgba(167,139,250,.6)',
          marginBottom: '1.2rem',
        }}>
          IA · Pathologie Digitale · Algérie
        </div>

        {/* Progress bar */}
        <div style={{
          width: 160, height: 1,
          background: 'rgba(124,58,237,.2)',
          borderRadius: 1, margin: '0 auto',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
            borderRadius: 1,
            animation: 'progressBar 2.6s ease forwards',
            width: '0%',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes nodePulse {
          0%, 100% { opacity: .4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: .15; transform: scale(1); }
          50% { opacity: .5; transform: scale(1.2); }
        }
        @keyframes dash {
          to { stroke-dashoffset: -16; }
        }
        @keyframes progressBar {
          0%   { width: 0%; }
          20%  { width: 15%; }
          60%  { width: 65%; }
          85%  { width: 88%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}

/* ── Layout data ── */
const NODES = [
  // Input layer (x=40)
  { x: 40,  y: 50,  hidden: false, output: false },
  { x: 40,  y: 90,  hidden: false, output: false },
  { x: 40,  y: 130, hidden: false, output: false },
  { x: 40,  y: 170, hidden: false, output: false },
  // Hidden layer 1 (x=100)
  { x: 100, y: 60,  hidden: true,  output: false },
  { x: 100, y: 100, hidden: true,  output: false },
  { x: 100, y: 140, hidden: true,  output: false },
  // Hidden layer 2 (x=160)
  { x: 160, y: 70,  hidden: true,  output: false },
  { x: 160, y: 110, hidden: true,  output: false },
  { x: 160, y: 150, hidden: true,  output: false },
  // Hidden layer 3 (x=220)
  { x: 220, y: 80,  hidden: true,  output: false },
  { x: 220, y: 120, hidden: true,  output: false },
  // Output (x=270)
  { x: 265, y: 100, hidden: false, output: true },
]

const EDGES = [
  // Input → H1
  {x1:40,y1:50, x2:100,y2:60},  {x1:40,y1:50, x2:100,y2:100},
  {x1:40,y1:90, x2:100,y2:60},  {x1:40,y1:90, x2:100,y2:100}, {x1:40,y1:90,x2:100,y2:140},
  {x1:40,y1:130,x2:100,y2:100}, {x1:40,y1:130,x2:100,y2:140},
  {x1:40,y1:170,x2:100,y2:100}, {x1:40,y1:170,x2:100,y2:140},
  // H1 → H2
  {x1:100,y1:60, x2:160,y2:70},  {x1:100,y1:60, x2:160,y2:110},
  {x1:100,y1:100,x2:160,y2:70},  {x1:100,y1:100,x2:160,y2:110},{x1:100,y1:100,x2:160,y2:150},
  {x1:100,y1:140,x2:160,y2:110}, {x1:100,y1:140,x2:160,y2:150},
  // H2 → H3
  {x1:160,y1:70, x2:220,y2:80},  {x1:160,y1:70, x2:220,y2:120},
  {x1:160,y1:110,x2:220,y2:80},  {x1:160,y1:110,x2:220,y2:120},
  {x1:160,y1:150,x2:220,y2:80},  {x1:160,y1:150,x2:220,y2:120},
  // H3 → Output
  {x1:220,y1:80, x2:255,y2:100},
  {x1:220,y1:120,x2:255,y2:100},
]

const PARTICLES = [
  { path: 'M40,90 L100,60 L160,70 L220,80 L265,100', dur: 1.8, delay: 0 },
  { path: 'M40,130 L100,100 L160,110 L220,120 L265,100', dur: 2.0, delay: .4 },
  { path: 'M40,50 L100,100 L160,150 L220,80 L265,100', dur: 2.2, delay: .8 },
  { path: 'M40,170 L100,140 L160,70 L220,120 L265,100', dur: 1.9, delay: 1.2 },
]
