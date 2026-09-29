import { useEffect, useRef, useState } from 'react'

// Compteur 0 → valeur, déclenché quand le bloc .reveal parent reçoit la classe "in"
// (donc après le splash et à l'arrivée à l'écran). Ex. : "58", "100%".
export default function CountUp({ value, duration = 1600 }) {
  const match = String(value).match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ''
  const ref = useRef(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!match) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(target); return }
    const host = ref.current?.closest('.reveal')
    let raf
    const run = () => {
      const t0 = performance.now()
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration)
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    if (!host || host.classList.contains('in')) { run(); return () => cancelAnimationFrame(raf) }
    const mo = new MutationObserver(() => {
      if (host.classList.contains('in')) { mo.disconnect(); setTimeout(run, 250) }
    })
    mo.observe(host, { attributes: true, attributeFilter: ['class'] })
    return () => { mo.disconnect(); cancelAnimationFrame(raf) }
  }, [target, duration])

  if (!match) return value
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true" style={{ fontVariantNumeric: "tabular-nums" }}>{n}{suffix}</span>
    </span>
  )
}
