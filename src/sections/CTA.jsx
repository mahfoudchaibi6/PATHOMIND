import { useState } from 'react'

const EMAILJS_SERVICE  = 'service_b7tmm2g'
const EMAILJS_TEMPLATE = 'template_558y11r'
const EMAILJS_KEY      = 'UYHtFLisDfCmXL72J'

export default function CTA() {
  const [form, setForm]     = useState({ name: '', email: '', org: '', product: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
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
            from_email: form.email,
            message: `Nouvelle demande PathoMind\n\nNom : ${form.name}\nEmail : ${form.email}\nOrganisation : ${form.org}\nProduit : ${form.product}\nMessage : ${form.message}`,
          },
        }),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', org: '', product: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-32 px-6 lg:px-16"
      style={{ background: '#1e1b4b' }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,.2) 0%, transparent 70%)',
      }}/>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-5 font-mono uppercase tracking-widest"
              style={{ fontSize: '.68rem', color: '#c4b5fd' }}>
              <span className="block w-5 h-px" style={{ background: '#c4b5fd' }}/>
              Prendre contact
            </div>

            <h2 className="font-serif font-medium text-white leading-tight mb-5"
              style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', letterSpacing: '-.025em' }}>
              Parlons de votre projet.
            </h2>

            <p className="font-light leading-relaxed mb-10"
              style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.6)' }}>
              Que vous soyez un laboratoire privé, un CHU, une faculté de médecine ou un partenaire institutionnel — notre équipe adapte chaque démonstration à votre contexte précis.
            </p>

            {/* Produits */}
            <div className="flex flex-col gap-3 mb-10">
              <div className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.3)' }}>
                Nos produits
              </div>
              {[
                { name: 'PathoMind Lab', desc: 'LIS d\'anatomopathologie — disponible', icon: '🗂️', badge: true },
                { name: 'PathoMind WSI', desc: 'Pathologie digitale & téléexpertise', icon: '🔬', badge: false },
                { name: 'PathoMind AI', desc: 'IA clinique oncologique', icon: '🤖', badge: false },
              ].map((p) => (
                <div key={p.name} className="flex items-center gap-3 rounded-lg px-4 py-3"
                  style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)' }}>
                  <span style={{ fontSize: '1rem' }}>{p.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white" style={{ fontSize: '.82rem' }}>{p.name}</span>
                      {p.badge && (
                        <span className="font-mono px-1.5 py-0.5 rounded"
                          style={{ fontSize: '.55rem', color: '#4ade80', background: 'rgba(74,222,128,.1)', border: '1px solid rgba(74,222,128,.2)' }}>
                          Disponible
                        </span>
                      )}
                    </div>
                    <div className="font-light" style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.38)' }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact direct */}
            <div className="flex flex-col gap-3">
              {[
                { icon: '📧', val: 'pathomind2026@hotmail.com', href: 'mailto:pathomind2026@hotmail.com' },
                { icon: '📍', val: 'Algeria Venture · Dounia Parc, Dély Ibrahim 16000', href: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x128fafea06d2f2f7:0xc85fa3b9927e5616' },
              ].map((c) => (
                <a key={c.val} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 transition-colors"
                  style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.45)', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,.8)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.45)'}>
                  <span>{c.icon}</span>
                  <span>{c.val}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Formulaire */}
          <div className="rounded-2xl p-8"
            style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)' }}>
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'rgba(74,222,128,.15)', border: '1px solid rgba(74,222,128,.3)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <h3 className="font-serif text-white text-xl mb-2">Message reçu !</h3>
                <p className="font-light" style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.5)' }}>
                  Nous vous recontacterons sous 24 heures.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="font-serif text-white mb-2" style={{ fontSize: '1.2rem' }}>
                  Demander une démonstration
                </h3>

                {/* Nom */}
                <div>
                  <label className="font-mono uppercase tracking-widest block mb-1.5"
                    style={{ fontSize: '.58rem', color: 'rgba(255,255,255,.4)' }}>Nom complet</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="Dr. Nom Prénom" required
                    style={{ width: '100%', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: '#fff', fontFamily: 'Sora,sans-serif', fontSize: '.85rem', padding: '.75rem 1rem', borderRadius: 6, outline: 'none' }}
                    onFocus={e => e.target.style.borderColor='rgba(167,139,250,.5)'}
                    onBlur={e => e.target.style.borderColor='rgba(255,255,255,.15)'}/>
                </div>

                {/* Email */}
                <div>
                  <label className="font-mono uppercase tracking-widest block mb-1.5"
                    style={{ fontSize: '.58rem', color: 'rgba(255,255,255,.4)' }}>Email professionnel</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    placeholder="votre@email.com" required
                    style={{ width: '100%', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: '#fff', fontFamily: 'Sora,sans-serif', fontSize: '.85rem', padding: '.75rem 1rem', borderRadius: 6, outline: 'none' }}
                    onFocus={e => e.target.style.borderColor='rgba(167,139,250,.5)'}
                    onBlur={e => e.target.style.borderColor='rgba(255,255,255,.15)'}/>
                </div>

                {/* Organisation */}
                <div>
                  <label className="font-mono uppercase tracking-widest block mb-1.5"
                    style={{ fontSize: '.58rem', color: 'rgba(255,255,255,.4)' }}>Établissement / Organisation</label>
                  <input type="text" value={form.org} onChange={e => setForm({...form, org: e.target.value})}
                    placeholder="CHU, Laboratoire, Ministère..."
                    style={{ width: '100%', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: '#fff', fontFamily: 'Sora,sans-serif', fontSize: '.85rem', padding: '.75rem 1rem', borderRadius: 6, outline: 'none' }}
                    onFocus={e => e.target.style.borderColor='rgba(167,139,250,.5)'}
                    onBlur={e => e.target.style.borderColor='rgba(255,255,255,.15)'}/>
                </div>

                {/* Produit */}
                <div>
                  <label className="font-mono uppercase tracking-widest block mb-1.5"
                    style={{ fontSize: '.58rem', color: 'rgba(255,255,255,.4)' }}>Produit qui vous intéresse</label>
                  <select value={form.product} onChange={e => setForm({...form, product: e.target.value})}
                    style={{ width: '100%', background: '#1e1b4b', border: '1px solid rgba(255,255,255,.15)', color: form.product ? '#fff' : 'rgba(255,255,255,.4)', fontFamily: 'Sora,sans-serif', fontSize: '.85rem', padding: '.75rem 1rem', borderRadius: 6, outline: 'none' }}
                    onFocus={e => e.target.style.borderColor='rgba(167,139,250,.5)'}
                    onBlur={e => e.target.style.borderColor='rgba(255,255,255,.15)'}>
                    <option value="">Sélectionner un produit</option>
                    <option value="PathoMind Lab — LIS">PathoMind Lab — LIS d'anatomopathologie</option>
                    <option value="PathoMind WSI — Pathologie digitale">PathoMind WSI — Pathologie digitale</option>
                    <option value="PathoMind AI — IA clinique">PathoMind AI — IA clinique</option>
                    <option value="Suite complète">Suite complète</option>
                    <option value="Conseil & intégration">Conseil & intégration hospitalière</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono uppercase tracking-widest block mb-1.5"
                    style={{ fontSize: '.58rem', color: 'rgba(255,255,255,.4)' }}>Message (optionnel)</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    placeholder="Décrivez votre besoin, votre établissement, vos contraintes..."
                    rows={3}
                    style={{ width: '100%', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: '#fff', fontFamily: 'Sora,sans-serif', fontSize: '.85rem', padding: '.75rem 1rem', borderRadius: 6, outline: 'none', resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor='rgba(167,139,250,.5)'}
                    onBlur={e => e.target.style.borderColor='rgba(255,255,255,.15)'}/>
                </div>

                {status === 'error' && (
                  <p style={{ color: '#fca5a5', fontSize: '.78rem' }}>
                    Erreur d'envoi. Contactez-nous directement : pathomind2026@hotmail.com
                  </p>
                )}

                <button type="submit" disabled={status === 'sending'}
                  style={{ background: '#7c3aed', color: '#fff', fontFamily: 'Sora,sans-serif', fontSize: '.8rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', padding: '.9rem', borderRadius: 8, border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer', opacity: status === 'sending' ? .7 : 1, boxShadow: '0 4px 20px rgba(124,58,237,.35)', transition: 'all .2s' }}
                  onMouseEnter={e => { if(status!=='sending') e.currentTarget.style.background='#6d28d9' }}
                  onMouseLeave={e => e.currentTarget.style.background='#7c3aed'}>
                  {status === 'sending' ? 'Envoi en cours...' : 'Envoyer la demande'}
                </button>

                <div className="flex gap-4 justify-center flex-wrap pt-1">
                  {['Réponse sous 24h', 'Sans engagement', 'Données sécurisées'].map(t => (
                    <span key={t} className="flex items-center gap-1" style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.3)' }}>
                      <span style={{ color: '#4ade80' }}>✓</span> {t}
                    </span>
                  ))}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
