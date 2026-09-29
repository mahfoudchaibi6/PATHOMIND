import { useEffect, useState } from 'react'

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 100)
    const t2 = setTimeout(() => setPhase('exit'), 3200)
    const t3 = setTimeout(() => onComplete(), 3900)
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
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes logoEntry {
          0%   { opacity:0; transform:scale(.5) translateY(30px);
                 filter:drop-shadow(0 0 0px rgba(124,58,237,0)); }
          60%  { opacity:1; transform:scale(1.06) translateY(-6px);
                 filter:drop-shadow(0 0 80px rgba(167,139,250,1)); }
          100% { opacity:1; transform:scale(1) translateY(0);
                 filter:drop-shadow(0 0 40px rgba(124,58,237,.7)); }
        }
        @keyframes orbBreath {
          0%,100% { transform:translate(-50%,-50%) scale(1); }
          50%     { transform:translate(-50%,-50%) scale(1.2); }
        }
        @keyframes ringPulse {
          0%,100% { transform:scale(1); opacity:.35; }
          50%     { transform:scale(1.08); opacity:.75; }
        }
        @keyframes ringPulse2 {
          0%,100% { transform:scale(1); opacity:.2; }
          50%     { transform:scale(1.12); opacity:.5; }
        }
        @keyframes scanLogo {
          0%   { top:calc(50% - 200px); opacity:0; }
          8%   { opacity:.9; }
          92%  { opacity:.9; }
          100% { top:calc(50% + 200px); opacity:0; }
        }
        @keyframes orbit {
          0%   { opacity:0; transform:rotate(var(--start)) translateX(var(--r)) scale(0); }
          10%  { opacity:.9; transform:rotate(calc(var(--start) + 36deg)) translateX(var(--r)) scale(1); }
          90%  { opacity:.9; }
          100% { opacity:0; transform:rotate(calc(var(--start) + 360deg)) translateX(var(--r)) scale(0); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:none; }
        }
        @keyframes fillBar {
          0%  { width:0%; }
          20% { width:18%; }
          55% { width:65%; }
          85% { width:88%; }
          100%{ width:100%; }
        }
        @keyframes dotBounce {
          0%,100% { transform:scale(1); opacity:.4; }
          50%     { transform:scale(1.7); opacity:1; }
        }
      `}</style>

      {/* Orbe de fond */}
      <div style={{
        position: 'absolute', borderRadius: '50%',
        width: '70vw', height: '70vw',
        maxWidth: 700, maxHeight: 700,
        background: 'rgba(124,58,237,.16)',
        filter: 'blur(100px)',
        top: '50%', left: '50%',
        animation: 'orbBreath 3.5s ease-in-out infinite',
        pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', borderRadius: '50%',
        width: '40vw', height: '40vw',
        maxWidth: 400, maxHeight: 400,
        background: 'rgba(167,139,250,.1)',
        filter: 'blur(60px)',
        top: '35%', left: '60%',
        animation: 'orbBreath 4s .5s ease-in-out infinite',
        pointerEvents: 'none',
      }}/>

      {/* Zone logo — occupe tout l'écran */}
      <div style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '80vmin', height: '80vmin',
        maxWidth: 600, maxHeight: 600,
      }}>
        {/* Anneau 1 */}
        <div style={{
          position: 'absolute',
          width: '105%', height: '105%',
          borderRadius: '50%',
          border: '1px solid rgba(167,139,250,.25)',
          animation: 'ringPulse 2.5s 1.2s ease-in-out infinite',
        }}/>
        {/* Anneau 2 */}
        <div style={{
          position: 'absolute',
          width: '120%', height: '120%',
          borderRadius: '50%',
          border: '1px solid rgba(124,58,237,.12)',
          animation: 'ringPulse2 2.8s 1.4s ease-in-out infinite',
        }}/>

        {/* Scan line */}
        <div style={{
          position: 'absolute',
          left: '50%', transform: 'translateX(-50%)',
          width: '75%', height: 2,
          background: 'linear-gradient(90deg, transparent, #a78bfa, transparent)',
          animation: 'scanLogo 2.2s 1s ease-in-out infinite',
          borderRadius: 1,
        }}/>

        {/* Particules orbitales */}
        {[
          { size: 7, dur: 3,   delay: 1.2, start: '0deg',   r: '52%' },
          { size: 5, dur: 3.8, delay: 1.5, start: '120deg', r: '52%' },
          { size: 6, dur: 2.9, delay: 1.8, start: '240deg', r: '52%' },
          { size: 4, dur: 4.2, delay: 2.1, start: '60deg',  r: '46%' },
          { size: 3, dur: 3.5, delay: 2.4, start: '180deg', r: '46%' },
        ].map((p, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: '#a78bfa',
            '--start': p.start,
            '--r': p.r,
            '--dur': `${p.dur}s`,
            animation: `orbit ${p.dur}s ${p.delay}s linear infinite`,
          }}/>
        ))}

        {/* Logo — grand format */}
        <img
          src="/logo.png"
          alt="PathoMind"
          style={{
            width: '100%', height: '100%',
            objectFit: 'contain',
            animation: 'logoEntry 1.3s cubic-bezier(.22,.68,0,1.2) forwards',
            opacity: 0,
            position: 'relative', zIndex: 2,
          }}
        />
      </div>

      {/* Texte sous le logo */}
      <div style={{ textAlign: 'center', marginTop: '2rem', zIndex: 2 }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 'clamp(.6rem, 2vw, .8rem)',
          letterSpacing: '.25em',
          textTransform: 'uppercase',
          color: 'rgba(167,139,250,.7)',
          animation: 'fadeUp 1s 1.2s ease forwards',
          opacity: 0,
        }}>
          IA · Pathologie Digitale · Algérie
        </div>

        {/* Barre de progression */}
        <div style={{
          width: 'clamp(120px, 30vw, 200px)',
          height: 1,
          background: 'rgba(124,58,237,.2)',
          borderRadius: 1,
          margin: '1rem auto 0',
          overflow: 'hidden',
          animation: 'fadeUp 1s 1.3s ease forwards',
          opacity: 0,
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #7c3aed, #a78bfa, #c4b5fd)',
            animation: 'fillBar 2.8s 1.4s ease forwards',
            width: '0%',
          }}/>
        </div>

        {/* Points */}
        <div style={{
          display: 'flex', gap: '.4rem',
          justifyContent: 'center',
          marginTop: '.8rem',
          animation: 'fadeUp 1s 1.5s ease forwards',
          opacity: 0,
        }}>
          {[0, .18, .36].map((d, i) => (
            <div key={i} style={{
              width: 5, height: 5, borderRadius: '50%',
              background: '#7c3aed',
              animation: `dotBounce .8s ${d}s ease-in-out infinite`,
            }}/>
          ))}
        </div>
      </div>
    </div>
  )
}
