import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Arrow, Reveal, Stagger } from '../components/ui'
import { EASE, fadeInRight, fadeInUp } from '../lib/animations'

const EMAILJS_SERVICE  = 'service_b7tmm2g'
const EMAILJS_TEMPLATE = 'template_558y11r'
const EMAILJS_KEY      = 'UYHtFLisDfCmXL72J'

const EMPTY = { name: '', email: '', org: '', product: '', message: '' }

const CONTACTS = [
  {
    label: 'pathomind2026@hotmail.com',
    href: 'mailto:pathomind2026@hotmail.com',
    icon: <path d="M4 6h16v12H4zM4 7l8 6 8-6"/>,
  },
  {
    label: 'Algeria Venture · Dounia Parc, Dély Ibrahim 16000',
    href: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x128fafea06d2f2f7:0xc85fa3b9927e5616',
    icon: <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>,
  },
]

const PROMISES = ['Réponse sous 24 h', 'Sans engagement', 'Démo adaptée à votre contexte']

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="pm-label">{label}</span>
      {children}
    </label>
  )
}

export default function CTA() {
  const [form, setForm]     = useState(EMPTY)
  const [status, setStatus] = useState('idle')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

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
      if (res.ok) { setStatus('sent'); setForm(EMPTY) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" className="pm-section relative overflow-hidden" style={{ background: 'transparent' }}>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 pm-divider-dark"/>
      <div aria-hidden="true" className="absolute pointer-events-none" style={{
        right: '-10%', top: '10%', width: '70%', height: '80%',
        background: 'radial-gradient(closest-side, rgba(124,58,237,.22), transparent)', filter: 'blur(20px)',
      }}/>

      <div className="relative pm-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-16 lg:gap-20 items-start">

          {/* Gauche */}
          <Stagger>
            <motion.div variants={fadeInUp}><span className="pm-eyebrow pm-eyebrow-light">Prendre contact</span></motion.div>
            <motion.h2 variants={fadeInUp} className="pm-h2 mt-6" style={{ color: 'rgba(255,255,255,.95)' }}>
              Parlons de votre <em className="italic pm-gradient-text">laboratoire.</em>
            </motion.h2>
            <motion.p variants={fadeInUp} className="pm-lead mt-7" style={{ color: 'rgba(255,255,255,.55)', maxWidth: 460 }}>
              Laboratoire privé, CHU, faculté de médecine ou partenaire institutionnel : chaque démonstration est adaptée à votre contexte.
            </motion.p>

            <motion.ul variants={fadeInUp} className="flex flex-col gap-3 mt-12 list-none">
              {PROMISES.map((t) => (
                <li key={t} className="flex items-center gap-3" style={{ fontSize: '.9375rem', color: 'rgba(255,255,255,.75)' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(124,58,237,.18)', border: '1px solid rgba(167,139,250,.3)' }}>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#c4b5fd" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7"/></svg>
                  </span>
                  {t}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeInUp} className="pm-divider-dark my-12"/>

            <motion.div variants={fadeInUp} className="flex flex-col gap-4">
              {CONTACTS.map((c) => {
                const external = c.href.startsWith('http')
                return (
                  <a key={c.href} href={c.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-start gap-3 transition-colors duration-200 text-white/55 hover:text-white"
                    style={{ fontSize: '.9375rem', lineHeight: 1.6 }}>
                    <svg className="mt-0.5 flex-shrink-0 text-[#a78bfa]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{c.icon}</svg>
                    {c.label}
                  </a>
                )
              })}
            </motion.div>
          </Stagger>

          {/* Formulaire */}
          <Reveal variants={fadeInRight} className="pm-card p-7 sm:p-9" style={{ background: 'rgba(255,255,255,.035)' }}>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div key="ok" className="flex flex-col items-center justify-center text-center py-16"
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ background: 'rgba(124,58,237,.15)', border: '1px solid rgba(167,139,250,.35)' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <motion.path d="m6 12.5 4 4 8-9" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }}/>
                    </svg>
                  </div>
                  <h3 className="pm-display" style={{ fontSize: '1.75rem', color: '#fff' }}>Message reçu.</h3>
                  <p className="mt-3" style={{ fontSize: '.9375rem', color: 'rgba(255,255,255,.55)' }}>Nous vous recontactons sous 24 heures.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-5"
                  initial={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                  <div>
                    <h3 className="pm-display" style={{ fontSize: '1.6rem', lineHeight: 1.2, color: '#fff' }}>Demander une démonstration</h3>
                    <p className="mt-2" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.45)' }}>Quelques informations pour préparer l'échange.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                    <Field label="Nom complet">
                      <input className="pm-field" type="text" autoComplete="name" value={form.name} onChange={set('name')} placeholder="Dr. Nom Prénom" required/>
                    </Field>
                    <Field label="Email professionnel">
                      <input className="pm-field" type="email" autoComplete="email" value={form.email} onChange={set('email')} placeholder="vous@etablissement.dz" required/>
                    </Field>
                  </div>
                  <Field label="Établissement">
                    <input className="pm-field" type="text" autoComplete="organization" value={form.org} onChange={set('org')} placeholder="CHU, laboratoire, clinique…"/>
                  </Field>
                  <Field label="Produit qui vous intéresse">
                    <select className="pm-field" value={form.product} onChange={set('product')} style={{ color: form.product ? '#fff' : 'rgba(255,255,255,.4)' }}>
                      <option value="">Sélectionner un produit</option>
                      <option value="PathoMind Lab">PathoMind Lab — LIS d'anatomopathologie</option>
                      <option value="PathoMind Viewer">PathoMind Viewer — Lames numériques</option>
                      <option value="PathoMind Share">PathoMind Share — Téléexpertise</option>
                      <option value="Suite complète">Suite complète</option>
                      <option value="Consulting & intégration">Consulting & intégration</option>
                    </select>
                  </Field>
                  <Field label="Message (optionnel)">
                    <textarea className="pm-field" rows={4} value={form.message} onChange={set('message')} style={{ resize: 'vertical' }}
                      placeholder="Votre besoin, votre établissement, vos contraintes…"/>
                  </Field>

                  {status === 'error' && (
                    <p role="alert" style={{ color: '#fca5a5', fontSize: '.875rem' }}>
                      Erreur d'envoi. Écrivez-nous directement : pathomind2026@hotmail.com
                    </p>
                  )}

                  <button type="submit" disabled={status === 'sending'} className="pm-btn w-full mt-1 disabled:opacity-70 disabled:cursor-not-allowed">
                    {status === 'sending' ? 'Envoi en cours…' : <>Envoyer la demande <Arrow size={13}/></>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
