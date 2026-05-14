import { useState, useRef } from 'react'

const EMAILJS_SERVICE  = 'service_b7tmm2g'
const EMAILJS_TEMPLATE = 'template_558y11r'
const EMAILJS_KEY      = 'UYHtFLisDfCmXL72J'

export default function CTA() {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('sending')
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  EMAILJS_SERVICE,
          template_id: EMAILJS_TEMPLATE,
          user_id:     EMAILJS_KEY,
          template_params: {
            from_email: email,
            message: `Nouvelle demande de démo PathoMind depuis pathomind.org\n\nEmail : ${email}`,
          },
        }),
      })
      if (res.ok) { setStatus('sent'); setEmail('') }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-32 px-6 lg:px-16 text-center"
      style={{ background: '#1e1b4b' }}
    >
      {/* Fond radial subtil */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,.2) 0%, transparent 70%)',
      }}/>
      <div className="absolute inset-0 cta-grid-lines" style={{ opacity: .4 }}/>

      <div className="relative z-10 max-w-2xl mx-auto reveal">

        {/* Eyebrow */}
        <p style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '.68rem', letterSpacing: '.2em',
          textTransform: 'uppercase',
          color: '#c4b5fd',
          marginBottom: '1.2rem',
        }}>
          Prendre contact
        </p>

        {/* Titre */}
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          color: '#ffffff',
          lineHeight: 1.12, letterSpacing: '-.022em',
          marginBottom: '1.2rem',
          fontWeight: 500,
        }}>
          Demandez une démonstration<br/>personnalisée
        </h2>

        {/* Sous-titre */}
        <p style={{
          fontSize: '.93rem', fontWeight: 300,
          color: 'rgba(255,255,255,.75)',
          lineHeight: 1.78, marginBottom: '2.8rem',
        }}>
          Notre équipe adaptera la démonstration au contexte précis de votre
          établissement — qu'il s'agisse d'un CHU, d'une direction régionale
          de santé, d'un programme de résidanat ou d'un partenaire institutionnel.
        </p>

        {/* Formulaire */}
        {status === 'sent' ? (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.25)',
            borderRadius: '10px', padding: '1.2rem 2rem', color: '#fff',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
            </svg>
            <span style={{ fontWeight: 500, fontSize: '.95rem' }}>
              Message reçu — nous vous contacterons sous 24h.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex', gap: '.75rem',
              justifyContent: 'center', flexWrap: 'wrap',
              maxWidth: '480px', margin: '0 auto 1.5rem',
            }}
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Votre adresse email professionnelle"
              disabled={status === 'sending'}
              required
              style={{
                flex: 1, minWidth: '210px',
                background: 'rgba(255,255,255,.12)',
                border: '1px solid rgba(255,255,255,.3)',
                color: '#fff',
                fontFamily: 'Sora, sans-serif',
                fontSize: '.88rem', fontWeight: 300,
                padding: '.85rem 1.2rem',
                borderRadius: '5px', outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                background: '#a78bfa',
                color: '#fff',
                fontFamily: 'Sora, sans-serif',
                fontSize: '.8rem', fontWeight: 600,
                letterSpacing: '.08em', textTransform: 'uppercase',
                padding: '.85rem 1.8rem',
                borderRadius: '5px', border: 'none',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                opacity: status === 'sending' ? .7 : 1,
                whiteSpace: 'nowrap',
                transition: 'opacity .2s, transform .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = status === 'sending' ? '.7' : '1'}
            >
              {status === 'sending' ? 'Envoi...' : 'Demander une démo'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p style={{ color: '#fca5a5', fontSize: '.82rem', marginBottom: '1rem' }}>
            Une erreur est survenue. Écrivez-nous directement à pathomind2026@hotmail.com
          </p>
        )}

        {/* Email direct */}
        <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '.8rem', marginBottom: '2rem' }}>
          Ou écrivez-nous directement :{' '}
          <a
            href="mailto:pathomind2026@hotmail.com"
            style={{ color: '#c4b5fd', textDecoration: 'none', fontWeight: 500 }}
          >
            pathomind2026@hotmail.com
          </a>
        </p>

        {/* Trust signals */}
        <div style={{
          display: 'flex', gap: '1.5rem',
          justifyContent: 'center', flexWrap: 'wrap',
        }}>
          {[
            { icon: '🔒', label: 'Données hébergées en Algérie' },
            { icon: '✓',  label: 'Sans engagement' },
            { icon: '🌐', label: 'Français · Arabe · Anglais' },
            { icon: '📋', label: 'ISO 13485' },
          ].map(t => (
            <div key={t.label} style={{
              display: 'flex', alignItems: 'center', gap: '.5rem',
              fontSize: '.75rem',
              color: 'rgba(255,255,255,.65)',
            }}>
              <span>{t.icon}</span>{t.label}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
