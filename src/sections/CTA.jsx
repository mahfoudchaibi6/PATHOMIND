import { useState } from 'react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSent(true)
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-32 px-16 text-center"
      style={{ background: '#1246a8' }}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,13,26,.35) 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0 cta-grid-lines" />

      <div className="relative z-10 max-w-2xl mx-auto reveal">
        <p className="font-mono uppercase tracking-widest text-white/48 mb-6" style={{ fontSize: '.68rem' }}>
          Prendre contact
        </p>
        <h2
          className="font-serif text-white font-medium leading-tight mb-5"
          style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', letterSpacing: '-.022em' }}
        >
          Demandez une démonstration personnalisée
        </h2>
        <p className="font-light text-white/58 leading-relaxed mb-12" style={{ fontSize: '.93rem' }}>
          Notre équipe adaptera la démonstration au contexte précis de votre établissement — qu'il s'agisse d'un CHU, d'une direction régionale de santé, d'un programme de résidanat ou d'un partenaire institutionnel.
        </p>

        {sent ? (
          <div
            className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-lg px-8 py-5 text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
            </svg>
            <span className="font-medium">Message reçu — nous vous contacterons sous 24h.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex gap-3 justify-center flex-wrap max-w-md mx-auto mb-8"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email professionnelle"
              className="flex-1 min-w-[210px] bg-white/10 border border-white/20 text-white placeholder-white/33 font-light px-5 py-3 rounded-sm outline-none transition-all duration-200 focus:bg-white/15 focus:border-white/50"
              style={{ fontSize: '.87rem', fontFamily: 'inherit' }}
              required
            />
            <button type="submit" className="btn-white">
              Demander une démo
            </button>
          </form>
        )}

        <p className="text-white/40 mb-8" style={{ fontSize: '.78rem' }}>
          Ou écrivez-nous directement :{' '}
          <a href="mailto:pathomind2026@hotmail.com" className="text-white/70 hover:text-white transition-colors">
            pathomind2026@hotmail.com
          </a>
        </p>

        <div className="flex gap-8 justify-center flex-wrap">
          {[
            { icon: '🔒', label: 'Données hébergées en Algérie' },
            { icon: '✓', label: 'Sans engagement' },
            { icon: '🌐', label: 'Français · Arabe · Anglais' },
            { icon: '📋', label: 'ISO 13485' },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2 text-white/42" style={{ fontSize: '.73rem' }}>
              <span>{t.icon}</span>
              {t.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
