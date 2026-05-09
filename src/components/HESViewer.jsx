import { useEffect, useRef, useState } from 'react'

/**
 * HESViewer
 * Renders a realistic HES-stained histological slide simulation
 * with an animated AI analysis overlay effect.
 *
 * The slide is drawn entirely on a <canvas> element:
 *   - Pink eosinophil cytoplasm tissue background
 *   - Purple/blue haematoxylin nuclei scattered realistically
 *   - Collagen fibres in pale pink
 *   - Blood vessel lumen
 * The AI overlay animates:
 *   - A scanning line sweeping top→bottom
 *   - Bounding boxes appearing progressively on nuclei
 *   - A confidence heatmap tint fading in
 *   - Detection labels
 */

// Seeded pseudo-random for deterministic cell layout
function seededRand(seed) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

export default function HESViewer() {
  const canvasRef  = useRef(null)
  const overlayRef = useRef(null)
  const animRef    = useRef(null)
  const [phase, setPhase] = useState('idle') // idle | scanning | detected | complete

  // ── Draw the static HES slide onto canvas ──────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width  = 560
    const H = canvas.height = 380
    const rand = seededRand(42)

    // 1. Background — pale eosinophilic pink (extracellular matrix)
    ctx.fillStyle = '#f5dde8'
    ctx.fillRect(0, 0, W, H)

    // 2. Collagen fibres — wavy pale pink stripes
    ctx.strokeStyle = '#ebb8c8'
    ctx.lineWidth = 1.2
    for (let i = 0; i < 18; i++) {
      const y = i * 22 + 5
      ctx.beginPath()
      ctx.moveTo(0, y)
      for (let x = 0; x <= W; x += 30) {
        const amp = (i % 2 === 0 ? 1 : -1) * (6 + rand() * 6)
        ctx.quadraticCurveTo(x + 15, y + amp, x + 30, y)
      }
      ctx.globalAlpha = 0.35
      ctx.stroke()
    }
    ctx.globalAlpha = 1

    // 3. Glandular lumen (large vessel / gland)
    ctx.beginPath()
    ctx.ellipse(420, 195, 90, 70, 0.2, 0, Math.PI * 2)
    ctx.fillStyle = '#fdeef3'
    ctx.fill()
    ctx.strokeStyle = '#d4a0b5'
    ctx.lineWidth = 1.5
    ctx.stroke()

    // 4. Cells — epithelial + stromal
    const cells = []
    const rand2 = seededRand(99)
    // Scattered stromal cells
    for (let i = 0; i < 120; i++) {
      cells.push({
        x: rand2() * W,
        y: rand2() * H,
        rx: 7 + rand2() * 5,
        ry: 6 + rand2() * 4,
        rot: rand2() * Math.PI,
        type: rand2() > 0.15 ? 'stromal' : 'atypical',
      })
    }
    // Epithelial ring cells around the lumen
    for (let a = 0; a < 22; a++) {
      const angle = (a / 22) * Math.PI * 2
      cells.push({
        x: 420 + Math.cos(angle) * 95,
        y: 195 + Math.sin(angle) * 74,
        rx: 9, ry: 11,
        rot: angle + Math.PI / 2,
        type: a % 5 === 0 ? 'atypical' : 'epithelial',
      })
    }

    cells.forEach(({ x, y, rx, ry, rot, type }) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rot)

      // Cytoplasm
      ctx.beginPath()
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
      ctx.fillStyle = type === 'atypical'
        ? 'rgba(210,120,160,.55)'
        : 'rgba(240,190,210,.45)'
      ctx.fill()

      // Nucleus
      const nr = rx * 0.48
      ctx.beginPath()
      ctx.ellipse(0, 0, nr, nr * 0.9, rand() * 0.5, 0, Math.PI * 2)
      ctx.fillStyle = type === 'atypical' ? '#3b2c7a' : '#5c3d8f'
      ctx.globalAlpha = type === 'atypical' ? 0.95 : 0.82
      ctx.fill()
      ctx.globalAlpha = 1

      // Nucleolus
      if (type === 'atypical') {
        ctx.beginPath()
        ctx.arc(nr * 0.2, -nr * 0.15, nr * 0.28, 0, Math.PI * 2)
        ctx.fillStyle = '#7b5ea7'
        ctx.fill()
      }

      ctx.restore()
    })

    // 5. Store cell positions for AI overlay
    canvas._cells = cells.filter(c => c.type === 'atypical').slice(0, 14)

    // 6. Subtle noise texture
    for (let i = 0; i < 3000; i++) {
      const nx = rand2() * W
      const ny = rand2() * H
      ctx.fillStyle = `rgba(${rand2() > 0.5 ? 180 : 120},80,100,${rand2() * 0.06})`
      ctx.fillRect(nx, ny, 1, 1)
    }

  }, [])

  // ── Animate the AI overlay on the canvas overlay ──────────────────────────
  useEffect(() => {
    if (phase === 'idle') return

    const canvas  = canvasRef.current
    const overlay = overlayRef.current
    if (!canvas || !overlay) return

    const ctx = overlay.getContext('2d')
    overlay.width  = canvas.width
    overlay.height = canvas.height
    const W = overlay.width
    const H = overlay.height
    const cells = canvas._cells || []

    let startTime = null
    const SCAN_DURATION   = 2200   // ms — scan line sweep
    const DETECT_DURATION = 1800   // ms — boxes appear
    const TOTAL           = SCAN_DURATION + DETECT_DURATION

    function draw(ts) {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime
      ctx.clearRect(0, 0, W, H)

      // ── PHASE 1: scanning line ──
      if (elapsed < SCAN_DURATION) {
        const progress = elapsed / SCAN_DURATION
        const scanY = progress * H

        // Heatmap tint (progressive reveal)
        ctx.fillStyle = `rgba(58,127,245,${progress * 0.07})`
        ctx.fillRect(0, 0, W, scanY)

        // Scan line
        const grad = ctx.createLinearGradient(0, scanY - 12, 0, scanY + 4)
        grad.addColorStop(0, 'rgba(58,127,245,0)')
        grad.addColorStop(0.6, 'rgba(107,174,248,0.55)')
        grad.addColorStop(1, 'rgba(200,230,255,0.9)')
        ctx.fillStyle = grad
        ctx.fillRect(0, scanY - 12, W, 16)

        // Bright edge line
        ctx.strokeStyle = 'rgba(200,230,255,0.95)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(0, scanY)
        ctx.lineTo(W, scanY)
        ctx.stroke()

        // Grid pattern on scanned area
        ctx.strokeStyle = 'rgba(58,127,245,0.08)'
        ctx.lineWidth = 0.5
        for (let gx = 0; gx <= W; gx += 28) {
          ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, scanY); ctx.stroke()
        }
        for (let gy = 0; gy <= scanY; gy += 28) {
          ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke()
        }

        // Scanning label
        ctx.fillStyle = 'rgba(107,174,248,0.9)'
        ctx.font = '500 11px "JetBrains Mono", monospace'
        ctx.fillText(`ANALYSE EN COURS  ${Math.round(progress * 100)}%`, 14, 22)

        setPhase('scanning')
      }

      // ── PHASE 2: detection boxes appear ──
      if (elapsed >= SCAN_DURATION) {
        const progress2 = Math.min(1, (elapsed - SCAN_DURATION) / DETECT_DURATION)

        // Full heatmap tint
        ctx.fillStyle = 'rgba(58,127,245,0.07)'
        ctx.fillRect(0, 0, W, H)

        // Grid stays faint
        ctx.strokeStyle = 'rgba(58,127,245,0.055)'
        ctx.lineWidth = 0.4
        for (let gx = 0; gx <= W; gx += 28) {
          ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke()
        }
        for (let gy = 0; gy <= H; gy += 28) {
          ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke()
        }

        // Boxes appear one by one
        const visibleCount = Math.ceil(progress2 * cells.length)
        const labels = ['Atypique', 'Mitose', 'Atypique', 'Suspect', 'Atypique',
          'Mitose', 'Atypique', 'Suspect', 'Atypique', 'Mitose',
          'Atypique', 'Suspect', 'Atypique', 'Mitose']
        const confs = [94, 87, 91, 78, 96, 88, 93, 82, 95, 89, 90, 76, 92, 85]

        cells.slice(0, visibleCount).forEach((cell, i) => {
          const bx = cell.x - 18, by = cell.y - 20
          const bw = 36,         bh = 38
          const alpha = i === visibleCount - 1
            ? Math.min(1, (progress2 * cells.length - i) * 2.5)
            : 1

          ctx.globalAlpha = alpha

          // Box glow
          ctx.shadowColor = '#3a7ff5'
          ctx.shadowBlur  = 8

          // Box border
          ctx.strokeStyle = '#3a7ff5'
          ctx.lineWidth = 1.5
          ctx.strokeRect(bx, by, bw, bh)

          // Corner markers
          const cs = 5
          ctx.strokeStyle = '#6baef8'
          ctx.lineWidth = 2
          ctx.shadowBlur = 0
          ;[[bx, by, 1, 1],[bx+bw, by, -1, 1],[bx, by+bh, 1, -1],[bx+bw, by+bh, -1, -1]].forEach(([cx, cy, dx, dy]) => {
            ctx.beginPath()
            ctx.moveTo(cx + dx * cs, cy)
            ctx.lineTo(cx, cy)
            ctx.lineTo(cx, cy + dy * cs)
            ctx.stroke()
          })

          // Label background
          const label  = labels[i % labels.length]
          const conf   = confs[i % confs.length]
          const lw     = label.length * 6.2 + 28
          ctx.fillStyle = 'rgba(26,92,212,0.88)'
          ctx.fillRect(bx, by - 18, lw, 16)

          // Label text
          ctx.fillStyle = '#fff'
          ctx.font = '500 9px "JetBrains Mono", monospace'
          ctx.shadowBlur = 0
          ctx.fillText(`${label}  ${conf}%`, bx + 4, by - 6)

          ctx.globalAlpha = 1
        })

        // Summary top-right
        if (progress2 > 0.6) {
          const summaryAlpha = (progress2 - 0.6) / 0.4
          ctx.globalAlpha = summaryAlpha
          ctx.fillStyle = 'rgba(6,13,26,0.82)'
          ctx.fillRect(W - 170, 10, 158, 66)
          ctx.strokeStyle = 'rgba(58,127,245,0.5)'
          ctx.lineWidth = 1
          ctx.strokeRect(W - 170, 10, 158, 66)

          ctx.fillStyle = '#6baef8'
          ctx.font = '500 9px "JetBrains Mono", monospace'
          ctx.fillText('RÉSULTATS IA', W - 160, 26)

          ctx.fillStyle = '#fff'
          ctx.font = '400 9px "JetBrains Mono", monospace'
          ctx.fillText(`Cellules détectées : ${visibleCount}`, W - 160, 42)
          ctx.fillText(`Mitoses : ${Math.ceil(visibleCount * 0.35)}`, W - 160, 54)

          ctx.fillStyle = '#4ade80'
          ctx.fillText(`Confiance : 91%`, W - 160, 67)
          ctx.globalAlpha = 1
        }

        if (progress2 >= 1) { setPhase('complete'); return }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [phase])

  const startAnalysis = () => {
    if (phase === 'scanning') return
    setPhase('starting')
    const overlay = overlayRef.current
    if (overlay) {
      const ctx = overlay.getContext('2d')
      ctx.clearRect(0, 0, overlay.width, overlay.height)
    }
    setTimeout(() => setPhase('scan'), 50)
  }

  // trigger the animation
  useEffect(() => {
    if (phase === 'scan') setPhase('idle_ready')
  }, [phase])

  const triggerScan = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    setPhase('trigger')
  }
  useEffect(() => {
    if (phase === 'trigger') {
      const overlay = overlayRef.current
      if (overlay) overlay.getContext('2d').clearRect(0, 0, overlay.width, overlay.height)
      setPhase('scanning')
    }
  }, [phase])

  // Auto-start after 1.5s on mount
  useEffect(() => {
    const t = setTimeout(() => setPhase('scanning'), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative select-none">
      {/* Card frame */}
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
            <span
              className="font-mono text-white/28"
              style={{ fontSize: '.6rem', letterSpacing: '.06em' }}
            >
              Lame B24-11042 · Tissu mammaire · HES · ×40
            </span>
            {/* Status dot */}
            <div className="flex items-center gap-1">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: phase === 'complete' ? '#4ade80' : phase === 'scanning' ? '#6baef8' : '#475569',
                  boxShadow: phase === 'scanning' ? '0 0 6px #6baef8' : undefined,
                  animation: phase === 'scanning' ? 'pulse 1s infinite' : undefined,
                }}
              />
              <span
                className="font-mono text-white/30"
                style={{ fontSize: '.58rem' }}
              >
                {phase === 'complete' ? 'Analyse terminée' : phase === 'scanning' ? 'Analyse IA...' : 'En attente'}
              </span>
            </div>
          </div>
          <div className="w-16" />
        </div>

        {/* Canvas stack */}
        <div className="relative" style={{ lineHeight: 0 }}>
          {/* HES slide */}
          <canvas
            ref={canvasRef}
            style={{ display: 'block', width: '100%', imageRendering: 'crisp-edges' }}
          />
          {/* AI overlay */}
          <canvas
            ref={overlayRef}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-t"
          style={{ background: 'rgba(255,255,255,.02)', borderColor: 'rgba(255,255,255,.07)' }}
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-white/28" style={{ fontSize: '.6rem' }}>
              CHU Mustapha Pacha · Alger
            </span>
            <span className="font-mono text-white/18" style={{ fontSize: '.6rem' }}>|</span>
            <span className="font-mono text-white/28" style={{ fontSize: '.6rem' }}>
              Dr. M. Chaibi
            </span>
          </div>

          {/* Re-run button */}
          <button
            onClick={triggerScan}
            className="flex items-center gap-1.5 font-mono text-white/40 hover:text-sky transition-colors duration-200"
            style={{ fontSize: '.6rem', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '.06em' }}
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4s1-3 7-3a7 7 0 1 1-7 7"/>
              <path d="M1 1v4h4"/>
            </svg>
            RELANCER L'ANALYSE
          </button>

          <div className="flex items-center gap-2">
            <span className="font-mono text-white/28" style={{ fontSize: '.6rem' }}>IA PathoMind</span>
            <div className="w-14 h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,.1)' }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: phase === 'complete' ? '100%' : phase === 'scanning' ? '60%' : '0%',
                  background: 'linear-gradient(90deg, #1a5cd4, #4ade80)',
                }}
              />
            </div>
            <span className="font-mono text-sky" style={{ fontSize: '.62rem' }}>
              {phase === 'complete' ? '100%' : phase === 'scanning' ? '...' : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Floating meta chips */}
      <div className="flex gap-2 mt-2.5 justify-end">
        {['Coloration HES', 'Grossissement ×40', 'IA activée'].map((t) => (
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
