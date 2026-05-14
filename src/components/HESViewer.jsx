import { useEffect, useRef, useState } from 'react'

const TABS = ['Visionneuse', 'Segmentation IA', 'Téléexpertise', 'Compte-rendu']

// Zones tumorales — coordonnées en pourcentage de la taille du canvas
const TUMOR_ZONES = [
  { x: 0.12, y: 0.10, w: 0.18, h: 0.22, label: 'Nid tumoral', conf: 96, color: 'rgba(239,68,68,' },
  { x: 0.38, y: 0.08, w: 0.22, h: 0.20, label: 'Invasion stromale', conf: 91, color: 'rgba(249,115,22,' },
  { x: 0.65, y: 0.15, w: 0.20, h: 0.25, label: 'Nid tumoral', conf: 94, color: 'rgba(239,68,68,' },
  { x: 0.08, y: 0.45, w: 0.16, h: 0.20, label: 'Mitoses ×3', conf: 88, color: 'rgba(234,179,8,' },
  { x: 0.30, y: 0.50, w: 0.20, h: 0.22, label: 'Nid tumoral', conf: 97, color: 'rgba(239,68,68,' },
  { x: 0.60, y: 0.48, w: 0.18, h: 0.20, label: 'Stroma desmoplasique', conf: 85, color: 'rgba(168,85,247,' },
  { x: 0.72, y: 0.62, w: 0.22, h: 0.28, label: 'Nid tumoral', conf: 95, color: 'rgba(239,68,68,' },
  { x: 0.18, y: 0.68, w: 0.18, h: 0.22, label: 'Invasion vasculaire', conf: 82, color: 'rgba(234,179,8,' },
  { x: 0.44, y: 0.72, w: 0.16, h: 0.18, label: 'Nécrose tumorale', conf: 90, color: 'rgba(249,115,22,' },
]

export default function HESViewer() {
  const canvasRef  = useRef(null)
  const imgRef     = useRef(null)
  const animRef    = useRef(null)
  const [activeTab, setActiveTab] = useState(0)
  const [phase, setPhase] = useState('idle')
  const [loaded, setLoaded] = useState(false)

  // Charger l'image
  useEffect(() => {
    const img = new Image()
    img.src = '/hes_slide.jpg'
    img.onload = () => {
      imgRef.current = img
      setLoaded(true)
      drawSlide()
    }
    img.onerror = () => {
      setLoaded(true)
      setPhase('scanning')
    }
  }, [])

  // Dessiner la lame de base
  const drawSlide = () => {
    const canvas = canvasRef.current
    if (!canvas || !imgRef.current) return
    const ctx = canvas.getContext('2d')
    ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height)
  }

  // Lancer l'animation IA
  useEffect(() => {
    if (!loaded) return
    const t = setTimeout(() => setPhase('scanning'), 800)
    return () => clearTimeout(t)
  }, [loaded])

  useEffect(() => {
    if (phase !== 'scanning' && phase !== 'trigger') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height

    let startTime = null
    const SCAN_DUR    = 2500
    const DETECT_DUR  = 2500
    const TOTAL       = SCAN_DUR + DETECT_DUR

    function draw(ts) {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime

      // Redessiner la lame
      ctx.clearRect(0, 0, W, H)
      if (imgRef.current) {
        ctx.drawImage(imgRef.current, 0, 0, W, H)
      } else {
        ctx.fillStyle = '#f5dde8'
        ctx.fillRect(0, 0, W, H)
      }

      // ── PHASE 1 : SCAN ──
      if (elapsed < SCAN_DUR) {
        const p = elapsed / SCAN_DUR
        const scanY = p * H

        // Heatmap progressive
        ctx.fillStyle = `rgba(124,58,237,${p * 0.12})`
        ctx.fillRect(0, 0, W, scanY)

        // Ligne de scan lumineuse
        const grad = ctx.createLinearGradient(0, scanY - 16, 0, scanY + 6)
        grad.addColorStop(0, 'rgba(167,139,250,0)')
        grad.addColorStop(0.5, 'rgba(196,181,253,0.7)')
        grad.addColorStop(1, 'rgba(255,255,255,0.95)')
        ctx.fillStyle = grad
        ctx.fillRect(0, scanY - 16, W, 22)

        // Ligne principale
        ctx.strokeStyle = 'rgba(255,255,255,0.9)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(0, scanY)
        ctx.lineTo(W, scanY)
        ctx.stroke()

        // Grille d'analyse
        ctx.strokeStyle = 'rgba(124,58,237,0.12)'
        ctx.lineWidth = 0.5
        const gridSize = 30
        for (let gx = 0; gx <= W; gx += gridSize) {
          ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, scanY); ctx.stroke()
        }
        for (let gy = 0; gy <= scanY; gy += gridSize) {
          ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke()
        }

        // Label scan
        ctx.fillStyle = 'rgba(196,181,253,0.9)'
        ctx.font = '500 11px "JetBrains Mono", monospace'
        ctx.fillText(`ANALYSE IA EN COURS  ${Math.round(p * 100)}%`, 14, 24)
      }

      // ── PHASE 2 : DÉTECTION ──
      if (elapsed >= SCAN_DUR) {
        const p2 = Math.min(1, (elapsed - SCAN_DUR) / DETECT_DUR)

        // Overlay heatmap global
        ctx.fillStyle = 'rgba(124,58,237,0.10)'
        ctx.fillRect(0, 0, W, H)

        // Grille légère
        ctx.strokeStyle = 'rgba(124,58,237,0.06)'
        ctx.lineWidth = 0.4
        for (let gx = 0; gx <= W; gx += 30) {
          ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke()
        }
        for (let gy = 0; gy <= H; gy += 30) {
          ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke()
        }

        // Zones détectées
        const visCount = Math.ceil(p2 * TUMOR_ZONES.length)
        TUMOR_ZONES.slice(0, visCount).forEach((zone, i) => {
          const zx = zone.x * W
          const zy = zone.y * H
          const zw = zone.w * W
          const zh = zone.h * H

          const alpha = i === visCount - 1
            ? Math.min(1, (p2 * TUMOR_ZONES.length - i) * 2.5)
            : 1

          ctx.globalAlpha = alpha

          // Remplissage zone
          ctx.fillStyle = `${zone.color}0.12)`
          ctx.fillRect(zx, zy, zw, zh)

          // Contour de segmentation
          ctx.strokeStyle = `${zone.color}0.9)`
          ctx.lineWidth = 1.8
          ctx.setLineDash([])
          ctx.strokeRect(zx, zy, zw, zh)

          // Coins marqueurs style QuPath
          const cs = 8
          ctx.lineWidth = 2.5
          ctx.strokeStyle = `${zone.color}1)`
          ;[
            [zx, zy, 1, 1],
            [zx+zw, zy, -1, 1],
            [zx, zy+zh, 1, -1],
            [zx+zw, zy+zh, -1, -1],
          ].forEach(([cx, cy, dx, dy]) => {
            ctx.beginPath()
            ctx.moveTo(cx + dx*cs, cy)
            ctx.lineTo(cx, cy)
            ctx.lineTo(cx, cy + dy*cs)
            ctx.stroke()
          })

          // Label
          const labelW = zone.label.length * 6.5 + 42
          ctx.fillStyle = `${zone.color}0.92)`
          ctx.fillRect(zx, zy - 20, labelW, 18)

          ctx.fillStyle = '#fff'
          ctx.font = '600 9px "JetBrains Mono", monospace'
          ctx.fillText(`${zone.label}  ${zone.conf}%`, zx + 5, zy - 6)

          ctx.globalAlpha = 1
        })

        // Résumé IA
        if (p2 > 0.7) {
          const sa = Math.min(1, (p2 - 0.7) / 0.3)
          ctx.globalAlpha = sa
          ctx.fillStyle = 'rgba(8,13,26,0.88)'
          ctx.fillRect(W - 185, 10, 173, 90)
          ctx.strokeStyle = 'rgba(167,139,250,0.5)'
          ctx.lineWidth = 1
          ctx.strokeRect(W - 185, 10, 173, 90)

          ctx.fillStyle = '#c4b5fd'
          ctx.font = '600 9px "JetBrains Mono", monospace'
          ctx.fillText('RÉSULTATS IA', W - 175, 28)

          ctx.fillStyle = 'rgba(255,255,255,0.8)'
          ctx.font = '400 8.5px "JetBrains Mono", monospace'
          ctx.fillText(`Régions détectées : ${visCount}`, W - 175, 44)
          ctx.fillText(`Nids tumoraux : ${TUMOR_ZONES.filter(z=>z.label.includes('tumoral')).length}`, W - 175, 57)
          ctx.fillText(`Mitoses détectées : 3`, W - 175, 70)

          ctx.fillStyle = '#f87171'
          ctx.font = '600 8.5px "JetBrains Mono", monospace'
          ctx.fillText(`→ Carcinome invasif  Gr.II`, W - 175, 88)
          ctx.globalAlpha = 1
        }

        if (p2 >= 1) {
          setPhase('complete')
          return
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [phase])

  const relaunch = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    const canvas = canvasRef.current
    if (canvas && imgRef.current) {
      const ctx = canvas.getContext('2d')
      ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height)
    }
    setPhase('trigger')
    setTimeout(() => setPhase('scanning'), 50)
  }

  return (
    <div className="relative select-none">
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,.04)',
          border: '1px solid rgba(255,255,255,.1)',
          boxShadow: '0 40px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04)',
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-b"
          style={{ background: 'rgba(255,255,255,.03)', borderColor: 'rgba(255,255,255,.07)' }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-white/28" style={{ fontSize: '.6rem' }}>
              Carcinome canalaire invasif · Sein · HES · ×20
            </span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{
                background: phase === 'complete' ? '#4ade80' : phase === 'scanning' ? '#a78bfa' : '#475569',
                boxShadow: phase === 'scanning' ? '0 0 6px #a78bfa' : undefined,
              }}/>
              <span className="font-mono text-white/30" style={{ fontSize: '.58rem' }}>
                {phase === 'complete' ? 'Analyse terminée' : phase === 'scanning' ? 'Analyse IA...' : 'En attente'}
              </span>
            </div>
          </div>
          <div className="w-8" />
        </div>

        {/* Canvas */}
        <div className="relative" style={{ lineHeight: 0 }}>
          <canvas
            ref={canvasRef}
            width={560}
            height={360}
            style={{ display: 'block', width: '100%', imageRendering: 'crisp-edges' }}
          />
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-t"
          style={{ background: 'rgba(255,255,255,.02)', borderColor: 'rgba(255,255,255,.07)' }}
        >
          <span className="font-mono text-white/28" style={{ fontSize: '.6rem' }}>
            PathoMind · IA Clinique v2.4
          </span>
          <button
            onClick={relaunch}
            className="flex items-center gap-1.5 font-mono text-white/40 hover:text-sky transition-colors"
            style={{ fontSize: '.6rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4s1-3 7-3a7 7 0 1 1-7 7"/><path d="M1 1v4h4"/>
            </svg>
            RELANCER
          </button>
          <div className="flex items-center gap-2">
            <span className="font-mono text-white/28" style={{ fontSize: '.6rem' }}>IA</span>
            <div className="w-14 h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,.1)' }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: phase === 'complete' ? '100%' : phase === 'scanning' ? '60%' : '0%',
                  background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
                }}
              />
            </div>
            <span className="font-mono font-medium" style={{ fontSize: '.63rem', color: '#a78bfa' }}>
              {phase === 'complete' ? '100%' : phase === 'scanning' ? '...' : '—'}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-px px-4 py-3 border-t border-white/5" style={{ background: 'rgba(0,0,0,.3)' }}>
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTab(i)}
              className="flex-1 text-center py-1.5 rounded font-mono font-medium tracking-widest uppercase transition-all duration-200"
              style={{
                fontSize: '.62rem',
                color: activeTab === i ? '#a78bfa' : 'rgba(255,255,255,.28)',
                background: activeTab === i ? 'rgba(124,58,237,.35)' : 'transparent',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Meta chips */}
      <div className="flex gap-2 mt-2.5 justify-end">
        {['Coloration HES', 'Grossissement ×20', 'IA activée'].map((t) => (
          <div
            key={t}
            className="font-mono text-white/30 px-2 py-1 rounded"
            style={{
              fontSize: '.58rem',
              background: 'rgba(255,255,255,.05)',
              border: '1px solid rgba(255,255,255,.07)',
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}
