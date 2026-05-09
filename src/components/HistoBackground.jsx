/**
 * HistoBackground
 * Renders an anatomical tissue-inspired SVG pattern as an absolutely
 * positioned background layer. Inspired by glandular / epithelial histology.
 * Opacity and color are configurable via props.
 */
export default function HistoBackground({
  opacity = 0.1,
  color = '#6baef8',
  className = '',
}) {
  const W = 1400
  const H = 900
  const R = 52          // gland lumen radius base
  const cols = 8
  const rows = 5

  // Build gland structures
  const glands = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * 182 + (row % 2) * 88 + 55
      const cy = row * 188 + 75
      const r  = R + ((col + row) % 3) * 9
      glands.push({ cx, cy, r })
    }
  }

  // Wavy collagen fiber paths
  const fibers = Array.from({ length: 14 }, (_, i) => {
    const y = i * 68 + 15
    let d = `M0,${y}`
    for (let x = 0; x <= W; x += 50) {
      const amp = i % 2 === 0 ? 18 : -18
      d += ` Q${x + 25},${y + amp} ${x + 50},${y}`
    }
    return d
  })

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
      >
        {/* ── Collagen fibers (background) ── */}
        {fibers.map((d, i) => (
          <path
            key={`fiber-${i}`}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth="0.4"
            opacity="0.25"
          />
        ))}

        {/* ── Glandular structures ── */}
        {glands.map(({ cx, cy, r }, gi) => {
          // 10 epithelial cells arranged around the lumen
          const cells = Array.from({ length: 10 }, (_, a) => {
            const angle = (a / 10) * Math.PI * 2
            const ex = cx + Math.cos(angle) * (r - 5)
            const ey = cy + Math.sin(angle) * (r - 5)
            const ew = 6 + (a % 3) * 2
            const eh = ew * 1.35
            const rot = (a * 36)
            return { ex, ey, ew, eh, rot, angle }
          })

          return (
            <g key={`gland-${gi}`}>
              {/* Lumen border */}
              <circle
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={color}
                strokeWidth="0.75"
                opacity="0.7"
              />

              {/* Epithelial cells */}
              {cells.map(({ ex, ey, ew, eh, rot }, ci) => (
                <g key={`cell-${gi}-${ci}`}>
                  <ellipse
                    cx={ex} cy={ey}
                    rx={ew} ry={eh}
                    transform={`rotate(${rot} ${ex} ${ey})`}
                    fill={color}
                    opacity="0.1"
                    stroke={color}
                    strokeWidth="0.5"
                    opacity2="0.55"
                  />
                  {/* Nucleus */}
                  <circle
                    cx={ex} cy={ey}
                    r={ew * 0.38}
                    fill={color}
                    opacity="0.38"
                  />
                </g>
              ))}

              {/* Lumen content suggestion */}
              <circle
                cx={cx} cy={cy}
                r={r * 0.28}
                fill={color}
                opacity="0.06"
              />
            </g>
          )
        })}

        {/* ── Scattered individual cells (interstitial) ── */}
        {[
          [320, 140], [820, 80], [1100, 260], [60, 450],
          [1340, 480], [500, 760], [1200, 780], [250, 840],
        ].map(([cx, cy], i) => (
          <g key={`iso-${i}`}>
            <circle cx={cx} cy={cy} r={14} fill="none" stroke={color} strokeWidth="0.6" opacity="0.5" />
            <circle cx={cx - 1} cy={cy - 1} r={5} fill={color} opacity="0.25" stroke={color} strokeWidth="0.4" />
            <circle cx={cx - 1} cy={cy - 1} r={2} fill={color} opacity="0.55" />
          </g>
        ))}

        {/* ── Fine capillary vessels ── */}
        <path
          d={`M0,310 Q180,290 360,325 Q560,362 760,308 Q960,255 1160,300 Q1300,332 1400,315`}
          fill="none" stroke={color} strokeWidth="1.1" opacity="0.3"
        />
        <path
          d={`M0,620 Q220,598 440,628 Q680,660 900,605 Q1100,558 1320,595 Q1370,610 1400,600`}
          fill="none" stroke={color} strokeWidth="1.1" opacity="0.3"
        />
      </svg>
    </div>
  )
}
