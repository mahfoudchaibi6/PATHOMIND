import { useEffect, useRef, useState } from 'react'

const TABS = ['Visionneuse', 'Segmentation IA', 'Téléexpertise', 'Compte-rendu']

// Contours de segmentation précis — tracés à la main sur la lame
// Coordonnées en % (0-1) de width/height du canvas 560x380
// Basés sur la morphologie réelle du carcinome canalaire invasif HES
const SEGMENTS = [
  // Grands massifs tumoraux — nids épithéliaux denses (rouge)
  {
    type: 'tumor',
    color: 'rgba(239,68,68,',
    label: 'Massif tumoral',
    conf: 96,
    points: [[0.06,0.08],[0.14,0.06],[0.22,0.10],[0.24,0.20],[0.18,0.28],[0.10,0.26],[0.05,0.18]],
  },
  {
    type: 'tumor',
    color: 'rgba(239,68,68,',
    label: 'Massif tumoral',
    conf: 94,
    points: [[0.30,0.05],[0.42,0.04],[0.48,0.12],[0.44,0.22],[0.34,0.24],[0.28,0.16]],
  },
  {
    type: 'tumor',
    color: 'rgba(239,68,68,',
    label: 'Massif tumoral',
    conf: 97,
    points: [[0.58,0.06],[0.72,0.05],[0.78,0.15],[0.74,0.28],[0.62,0.30],[0.55,0.20],[0.54,0.12]],
  },
  {
    type: 'tumor',
    color: 'rgba(239,68,68,',
    label: 'Nid tumoral',
    conf: 93,
    points: [[0.08,0.38],[0.18,0.35],[0.24,0.42],[0.22,0.54],[0.12,0.56],[0.06,0.48]],
  },
  {
    type: 'tumor',
    color: 'rgba(239,68,68,',
    label: 'Massif tumoral',
    conf: 95,
    points: [[0.32,0.42],[0.46,0.40],[0.52,0.50],[0.48,0.62],[0.36,0.64],[0.28,0.55],[0.28,0.46]],
  },
  {
    type: 'tumor',
    color: 'rgba(239,68,68,',
    label: 'Nid tumoral',
    conf: 91,
    points: [[0.60,0.40],[0.72,0.38],[0.78,0.48],[0.74,0.60],[0.62,0.62],[0.56,0.52]],
  },
  {
    type: 'tumor',
    color: 'rgba(239,68,68,',
    label: 'Massif tumoral',
    conf: 96,
    points: [[0.72,0.65],[0.88,0.62],[0.94,0.74],[0.90,0.88],[0.76,0.90],[0.68,0.80],[0.68,0.70]],
  },
  {
    type: 'tumor',
    color: 'rgba(239,68,68,',
    label: 'Nid tumoral',
    conf: 92,
    points: [[0.14,0.68],[0.26,0.66],[0.32,0.76],[0.28,0.86],[0.16,0.88],[0.10,0.78]],
  },
  {
    type: 'tumor',
    color: 'rgba(239,68,68,',
    label: 'Nid tumoral',
    conf: 89,
    points: [[0.42,0.70],[0.54,0.68],[0.58,0.78],[0.54,0.88],[0.44,0.90],[0.38,0.80]],
  },
  // Stroma desmoplasique (violet)
  {
    type: 'stroma',
    color: 'rgba(167,139,250,',
    label: 'Stroma desmoplasique',
    conf: 88,
    points: [[0.22,0.28],[0.32,0.24],[0.36,0.32],[0.28,0.40],[0.20,0.36]],
  },
  {
    type: 'stroma',
    color: 'rgba(167,139,250,',
    label: 'Stroma fibreux',
    conf: 84,
    points: [[0.50,0.25],[0.58,0.22],[0.62,0.32],[0.54,0.38],[0.46,0.34]],
  },
  // Mitoses (jaune)
  {
    type: 'mitosis',
    color: 'rgba(234,179,8,',
    label: 'Mitose atypique',
    conf: 87,
    points: [[0.16,0.44],[0.20,0.42],[0.22,0.46],[0.20,0.50],[0.16,0.50],[0.14,0.47]],
  },
  {
    type: 'mitosis',
    color: 'rgba(234,179,8,',
    label: 'Mitose atypique',
    conf: 83,
    points: [[0.38,0.55],[0.42,0.53],[0.44,0.57],[0.42,0.61],[0.38,0.61],[0.36,0.58]],
  },
  // Invasion vasculaire (orange)
  {
    type: 'vascular',
    color: 'rgba(249,115,22,',
    label: 'Embole vasculaire',
    conf: 81,
    points: [[0.82,0.32],[0.90,0.30],[0.94,0.38],[0.90,0.46],[0.82,0.46],[0.78,0.38]],
  },
]

export default function HESViewer() {
  const canvasRef = useRef(null)
  const imgRef    = useRef(null)
  const animRef   = useRef(null)
  const [activeTab, setActiveTab] = useState(0)
  const [phase, setPhase]   = useState('idle')
  const [loaded, setLoaded] = useState(false)

  // Charger l'image
  useEffect(() => {
    const img = new Image()
    img.src = '/hes_slide.jpg'
    img.onload = () => {
      imgRef.current = img
      setLoaded(true)
    }
    img.onerror = () => setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    // Dessiner lame de base
    const canvas = canvasRef.current
    if (canvas && imgRef.current) {
      const ctx = canvas.getContext('2d')
      ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height)
    }
    const t = setTimeout(() => setPhase('scanning'), 900)
    return () => clearTimeout(t)
  }, [loaded])

  // Animation principale
  useEffect(() => {
    if (phase !== 'scanning' && phase !== 'trigger') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height

    let startTime = null
    const SCAN_DUR   = 2600
    const DETECT_DUR = 3000

    // Convertir les points % en pixels
    const toPx = (pts) => pts.map(([px, py]) => [px * W, py * H])

    function drawSegment(seg, alpha) {
      const pts = toPx(seg.points)
      if (pts.length < 3) return

      ctx.globalAlpha = alpha

      // Remplissage semi-transparent
      ctx.beginPath()
      ctx.moveTo(pts[0][0], pts[0][1])
      pts.slice(1).forEach(([x, y]) => ctx.lineTo(x, y))
      ctx.closePath()
      ctx.fillStyle = `${seg.color}0.18)`
      ctx.fill()

      // Contour net
      ctx.beginPath()
      ctx.moveTo(pts[0][0], pts[0][1])
      pts.slice(1).forEach(([x, y]) => ctx.lineTo(x, y))
      ctx.closePath()
      ctx.strokeStyle = `${seg.color}0.95)`
      ctx.lineWidth = seg.type === 'mitosis' ? 1.5 : 2
      ctx.setLineDash(seg.type === 'stroma' ? [4, 3] : [])
      ctx.stroke()
      ctx.setLineDash([])

      // Label sur le premier point
      if (seg.type !== 'mitosis') {
        const lx = pts[0][0]
        const ly = pts[0][1] - 6
        const lw = seg.label.length * 5.8 + 32
        ctx.fillStyle = `${seg.color}0.92)`
        ctx.fillRect(lx, ly - 14, lw, 14)
        ctx.fillStyle = '#fff'
        ctx.font = '600 8px "JetBrains Mono", monospace'
        ctx.fillText(`${seg.label} ${seg.conf}%`, lx + 4, ly - 3)
      }

      ctx.globalAlpha = 1
    }

    function draw(ts) {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime

      // Redessiner la lame
      ctx.clearRect(0, 0, W, H)
      if (imgRef.current) {
        ctx.drawImage(imgRef.current, 0, 0, W, H)
      } else {
        // Fallback fond rose HES
        ctx.fillStyle = '#f0d8e4'
        ctx.fillRect(0, 0, W, H)
      }

      // ── PHASE 1 : SCAN ──
      if (elapsed < SCAN_DUR) {
        const p = elapsed / SCAN_DUR
        const scanY = p * H

        // Heatmap progressive violette
        const heatGrad = ctx.createLinearGradient(0, 0, 0, scanY)
        heatGrad.addColorStop(0, 'rgba(124,58,237,0.10)')
        heatGrad.addColorStop(1, 'rgba(124,58,237,0.05)')
        ctx.fillStyle = heatGrad
        ctx.fillRect(0, 0, W, scanY)

        // Grille d'analyse
        ctx.strokeStyle = 'rgba(124,58,237,0.10)'
        ctx.lineWidth = 0.5
        const gs = 28
        for (let gx = 0; gx <= W; gx += gs) {
          ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, scanY); ctx.stroke()
        }
        for (let gy = 0; gy <= scanY; gy += gs) {
          ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke()
        }

        // Ligne de scan lumineuse
        const sg = ctx.createLinearGradient(0, scanY - 18, 0, scanY + 6)
        sg.addColorStop(0, 'rgba(196,181,253,0)')
        sg.addColorStop(0.6, 'rgba(196,181,253,0.65)')
        sg.addColorStop(1, 'rgba(255,255,255,0.92)')
        ctx.fillStyle = sg
        ctx.fillRect(0, scanY - 18, W, 24)

        ctx.strokeStyle = 'rgba(255,255,255,0.88)'
        ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(W, scanY); ctx.stroke()

        // Label
        ctx.fillStyle = 'rgba(196,181,253,0.9)'
        ctx.font = '500 10px "JetBrains Mono", monospace'
        ctx.fillText(`SEGMENTATION IA  ${Math.round(p * 100)}%`, 12, 22)

        // Segments partiellement visibles pendant le scan
        SEGMENTS.forEach(seg => {
          const segCenter = seg.points.reduce((acc, [, py]) => acc + py, 0) / seg.points.length
          if (segCenter < p - 0.05) drawSegment(seg, 0.6)
        })
      }

      // ── PHASE 2 : SEGMENTATION COMPLÈTE ──
      if (elapsed >= SCAN_DUR) {
        const p2 = Math.min(1, (elapsed - SCAN_DUR) / DETECT_DUR)

        // Overlay léger
        ctx.fillStyle = 'rgba(124,58,237,0.06)'
        ctx.fillRect(0, 0, W, H)

        // Afficher les segments progressivement
        const visCount = Math.ceil(p2 * SEGMENTS.length)
        SEGMENTS.slice(0, visCount).forEach((seg, i) => {
          const alpha = i === visCount - 1
            ? Math.min(1, (p2 * SEGMENTS.length - i) * 3)
            : 1
          drawSegment(seg, alpha)
        })

        // Légende
        if (p2 > 0.8) {
          const la = Math.min(1, (p2 - 0.8) / 0.2)
          ctx.globalAlpha = la
          ctx.fillStyle = 'rgba(8,13,26,0.90)'
          ctx.fillRect(W - 190, H - 100, 180, 92)
          ctx.strokeStyle = 'rgba(167,139,250,0.4)'
          ctx.lineWidth = 1
          ctx.strokeRect(W - 190, H - 100, 180, 92)

          ctx.font = '600 8.5px "JetBrains Mono", monospace'
          const legend = [
            { color: 'rgba(239,68,68,0.9)',  label: 'Massifs tumoraux' },
            { color: 'rgba(167,139,250,0.9)', label: 'Stroma desmoplasique' },
            { color: 'rgba(234,179,8,0.9)',  label: 'Mitoses atypiques' },
            { color: 'rgba(249,115,22,0.9)', label: 'Emboles vasculaires' },
          ]
          legend.forEach((l, i) => {
            ctx.fillStyle = l.color
            ctx.fillRect(W - 182, H - 90 + i * 20, 10, 10)
            ctx.fillStyle = 'rgba(255,255,255,0.75)'
            ctx.fillText(l.label, W - 168, H - 82 + i * 20)
          })
          ctx.globalAlpha = 1
        }

        // Résumé diagnostic
        if (p2 > 0.6) {
          const ra = Math.min(1, (p2 - 0.6) / 0.3)
          ctx.globalAlpha = ra
          ctx.fillStyle = 'rgba(8,13,26,0.90)'
          ctx.fillRect(10, H - 48, 280, 38)
          ctx.strokeStyle = 'rgba(239,68,68,0.5)'
          ctx.lineWidth = 1
          ctx.strokeRect(10, H - 48, 280, 38)
          ctx.fillStyle = '#f87171'
          ctx.font = '600 9px "JetBrains Mono", monospace'
          ctx.fillText('→ Carcinome canalaire invasif  Grade II–III', 18, H - 32)
          ctx.fillStyle = 'rgba(255,255,255,0.55)'
          ctx.font = '400 8px "JetBrains Mono", monospace'
          ctx.fillText(`${SEGMENTS.filter(s=>s.type==='tumor').length} massifs · 3 mitoses · 1 embole vasculaire`, 18, H - 18)
          ctx.globalAlpha = 1
        }

        if (p2 >= 1) { setPhase('complete'); return }
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
    setTimeout(() => setPhase('scanning'), 50)
  }

  return (
    <div className="relative select-none w-full">
      <div
        className="rounded-2xl overflow-hidden w-full"
        style={{
          background: 'rgba(255,255,255,.04)',
          border: '1px solid rgba(255,255,255,.1)',
          boxShadow: '0 40px 100px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.04)',
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ background: 'rgba(255,255,255,.03)', borderColor: 'rgba(255,255,255,.07)' }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="font-mono text-white/28" style={{ fontSize: '.6rem' }}>
            Carcinome canalaire invasif · Sein · HES · ×20
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{
              background: phase === 'complete' ? '#4ade80' : '#a78bfa',
              boxShadow: phase === 'scanning' ? '0 0 6px #a78bfa' : undefined,
            }}/>
            <span className="font-mono text-white/30" style={{ fontSize: '.58rem' }}>
              {phase === 'complete' ? 'Segmentation terminée' : 'Analyse IA...'}
            </span>
          </div>
        </div>

        {/* Canvas — GRAND FORMAT */}
        <div style={{ lineHeight: 0, width: '100%' }}>
          <canvas
            ref={canvasRef}
            width={700}
            height={460}
            style={{ display: 'block', width: '100%', imageRendering: 'crisp-edges' }}
          />
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-t"
          style={{ background: 'rgba(255,255,255,.02)', borderColor: 'rgba(255,255,255,.07)' }}
        >
          <span className="font-mono text-white/25" style={{ fontSize: '.58rem' }}>
            PathoMind · Segmentation IA v2.4
          </span>
          <button
            onClick={relaunch}
            className="flex items-center gap-1.5 transition-colors font-mono"
            style={{
              fontSize: '.6rem', color: 'rgba(255,255,255,.35)',
              background: 'none', border: 'none', cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.35)'}
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4s1-3 7-3a7 7 0 1 1-7 7"/><path d="M1 1v4h4"/>
            </svg>
            RELANCER
          </button>
          <div className="flex items-center gap-2">
            <span className="font-mono text-white/25" style={{ fontSize: '.58rem' }}>IA</span>
            <div className="w-16 h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,.1)' }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: phase === 'complete' ? '100%' : phase === 'scanning' ? '55%' : '0%',
                  background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
                }}
              />
            </div>
            <span className="font-mono font-medium" style={{ fontSize: '.63rem', color: '#a78bfa' }}>
              {phase === 'complete' ? '100%' : '...'}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-px px-4 py-3 border-t border-white/5" style={{ background: 'rgba(0,0,0,.3)' }}>
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTab(i)}
              className="flex-1 text-center py-1.5 rounded font-mono tracking-widest uppercase transition-all duration-200"
              style={{
                fontSize: '.6rem', fontWeight: 500,
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
      <div className="flex gap-2 mt-2.5 justify-end flex-wrap">
        {['Coloration HES', 'Grossissement ×20', 'Segmentation IA active'].map((t) => (
          <div key={t} className="font-mono text-white/30 px-2 py-1 rounded"
            style={{ fontSize: '.58rem', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.07)' }}>
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}
