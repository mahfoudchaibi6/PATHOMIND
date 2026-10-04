import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

// Compteur 0 → valeur quand l'élément entre à l'écran (et que `start` est vrai). Ex. : "58", "100%".
export default function CountUp({ value, duration = 1.6, delay = 0, start = true }) {
  const match = String(value).match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ''
  const ref = useRef(null)
  const seen = useInView(ref, { once: true })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!match || !seen || !start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(target); return }
    const controls = animate(0, target, {
      duration, delay, ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [seen, start, target, duration, delay])

  if (!match) return value
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true" style={{ fontVariantNumeric: 'tabular-nums' }}>{n}{suffix}</span>
    </span>
  )
}
