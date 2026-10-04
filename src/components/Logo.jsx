// Symbole (version transparente de /logo.png) + wordmark en texte net
export default function Logo({ size = 30 }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img src="/logo-mark.png" alt="" aria-hidden="true" width={Math.round(size * 165 / 192)} height={size}
        style={{ height: size, width: 'auto', filter: 'drop-shadow(0 0 10px rgba(124,58,237,.35))' }}/>
      <span className="font-medium" style={{ fontSize: size * 0.5, letterSpacing: '.28em', color: 'rgba(255,255,255,.92)' }}>
        PATHO<span style={{ color: '#a78bfa' }}>MIND</span>
      </span>
    </span>
  )
}
