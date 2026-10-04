import { useEffect, useRef } from 'react'

// Particules très discrètes (canvas, 30 max) reliées par de fines lignes violettes.
export default function Particles({ count = 30, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0, visible = true
    let pts = []

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width; h = r.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const seed = () => {
      const n = w < 640 ? Math.round(count * 0.5) : count
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.3 + 0.5,
        a: Math.random() * 0.4 + 0.15,
      }))
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 140) {
            ctx.strokeStyle = `rgba(167,139,250,${0.07 * (1 - d / 140)})`
            ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
          }
        }
        ctx.fillStyle = `rgba(196,181,253,${p.a})`
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      }
    }
    const tick = () => {
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10
      }
      draw()
      if (visible) raf = requestAnimationFrame(tick)
    }

    resize(); seed()
    if (reduce) draw(); else raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(() => { resize(); seed(); if (reduce) draw() })
    ro.observe(canvas)
    // Pause hors écran
    const io = new IntersectionObserver(([e]) => {
      const was = visible
      visible = e.isIntersecting
      if (visible && !was && !reduce) raf = requestAnimationFrame(tick)
    })
    io.observe(canvas)

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [count])

  return <canvas ref={ref} aria-hidden="true" className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}/>
}
