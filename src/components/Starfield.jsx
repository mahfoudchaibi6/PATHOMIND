import { useEffect, useRef } from 'react'

// Fond spatial fixe pour tout le site : étoiles sur 3 profondeurs, scintillement,
// parallaxe à la souris et au scroll, constellation autour du curseur, étoiles filantes.
export default function Starfield() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, lastW = 0, raf = 0, stars = [], shooting = null, nextShot = 0
    const mouse = { x: -9999, y: -9999, tx: 0.5, ty: 0.5, px: 0.5, py: 0.5, active: false }

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // sur mobile, la barre d'adresse change la hauteur au scroll : on ne régénère que si la largeur change
      if (stars.length && w === lastW) return
      lastW = w
      const n = Math.min(380, Math.round((w * h) / (w < 640 ? 6500 : 4200)))
      stars = Array.from({ length: n }, () => {
        const z = Math.random() ** 2 * 0.85 + 0.15 // beaucoup d'étoiles lointaines, peu de proches
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.35 + z * 1.25,
          a: 0.25 + z * 0.6,
          tw: Math.random() * Math.PI * 2,
          ts: 0.6 + Math.random() * 1.8,
          tint: Math.random() < 0.18 ? 'violet' : Math.random() < 0.1 ? 'blue' : 'white',
        }
      })
    }

    const color = (s, a) =>
      s.tint === 'violet' ? `rgba(196,181,253,${a})` : s.tint === 'blue' ? `rgba(165,200,255,${a})` : `rgba(255,255,255,${a})`

    const frame = (t) => {
      const time = t / 1000
      // lissage de la parallaxe
      mouse.px += (mouse.tx - mouse.px) * 0.05
      mouse.py += (mouse.ty - mouse.py) * 0.05
      const sy = window.scrollY
      ctx.clearRect(0, 0, w, h)

      // Halo doux qui suit le curseur
      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260)
        g.addColorStop(0, 'rgba(124,58,237,.10)')
        g.addColorStop(1, 'rgba(124,58,237,0)')
        ctx.fillStyle = g
        ctx.fillRect(mouse.x - 260, mouse.y - 260, 520, 520)
      }

      const near = []
      for (const s of stars) {
        // parallaxe : les étoiles proches bougent plus
        let x = s.x - (mouse.px - 0.5) * 60 * s.z
        let y = s.y - (mouse.py - 0.5) * 40 * s.z - sy * 0.06 * s.z
        x = ((x % w) + w) % w
        y = ((y % h) + h) % h

        let a = s.a * (reduce ? 1 : 0.65 + 0.35 * Math.sin(time * s.ts + s.tw))
        let r = s.r
        if (mouse.active) {
          const d = Math.hypot(x - mouse.x, y - mouse.y)
          if (d < 160) {
            const k = 1 - d / 160
            a = Math.min(1, a + k * 0.7)
            r += k * 0.9
            if (s.z > 0.3) near.push({ x, y, k })
          }
        }
        ctx.fillStyle = color(s, a)
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
        if (s.z > 0.8) { // petite lueur sur les étoiles les plus proches
          ctx.fillStyle = color(s, a * 0.12)
          ctx.beginPath(); ctx.arc(x, y, r * 3.2, 0, Math.PI * 2); ctx.fill()
        }
      }

      // Constellation autour du curseur
      ctx.lineWidth = 0.6
      for (let i = 0; i < near.length; i++) {
        const p = near[i]
        ctx.strokeStyle = `rgba(167,139,250,${p.k * 0.35})`
        ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(p.x, p.y); ctx.stroke()
        for (let j = i + 1; j < near.length; j++) {
          const q = near[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 90) {
            ctx.strokeStyle = `rgba(196,181,253,${Math.min(p.k, q.k) * 0.25 * (1 - d / 90)})`
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
          }
        }
      }

      // Étoile filante occasionnelle
      if (!shooting && time > nextShot) {
        const fromLeft = Math.random() < 0.5
        shooting = { x: fromLeft ? Math.random() * w * 0.5 : w * (0.5 + Math.random() * 0.5), y: Math.random() * h * 0.4, vx: (fromLeft ? 1 : -1) * (7 + Math.random() * 4), vy: 2.5 + Math.random() * 2, life: 0 }
        nextShot = time + 7 + Math.random() * 8
      }
      if (shooting) {
        const s = shooting
        s.x += s.vx; s.y += s.vy; s.life++
        const fade = Math.max(0, 1 - s.life / 70)
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 14, s.y - s.vy * 14)
        g.addColorStop(0, `rgba(255,255,255,${0.85 * fade})`)
        g.addColorStop(1, 'rgba(167,139,250,0)')
        ctx.strokeStyle = g; ctx.lineWidth = 1.2
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14); ctx.stroke()
        if (fade <= 0 || s.x < -200 || s.x > w + 200 || s.y > h + 200) shooting = null
      }

      if (!reduce) raf = requestAnimationFrame(frame)
    }

    const onMove = (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY
      mouse.tx = e.clientX / w; mouse.ty = e.clientY / h
      mouse.active = true
    }
    const onLeave = () => { mouse.active = false; mouse.x = mouse.y = -9999; mouse.tx = mouse.ty = 0.5 }
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduce) raf = requestAnimationFrame(frame)
    }
    const onScrollStatic = () => { if (reduce) frame(0) }

    resize()
    nextShot = 4
    raf = requestAnimationFrame(frame)
    window.addEventListener('resize', resize)
    if (finePointer) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
    }
    window.addEventListener('scroll', onScrollStatic, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScrollStatic)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}/>
}
