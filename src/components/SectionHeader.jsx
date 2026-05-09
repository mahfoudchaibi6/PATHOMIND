export default function SectionHeader({ eyebrow, title, subtitle, light = false, centered = false }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      <div className={`${light ? 'eyebrow-light' : 'eyebrow'} ${centered ? 'justify-center' : ''} mb-5`}>
        {eyebrow}
      </div>
      <h2
        className={`font-serif font-medium leading-tight tracking-tight ${light ? 'text-white' : 'text-ink'}`}
        style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.8rem)', letterSpacing: '-.025em', maxWidth: centered ? '640px' : undefined, margin: centered ? '0 auto' : undefined }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 font-light leading-relaxed ${light ? 'text-white/60' : 'text-muted'}`}
          style={{ fontSize: '.95rem', maxWidth: '560px', margin: centered ? '1rem auto 0' : '1rem 0 0' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
