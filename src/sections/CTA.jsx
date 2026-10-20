import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Arrow, Reveal, Stagger } from '../components/ui'
import { EASE, fadeInRight, fadeInUp } from '../lib/animations'
import { CONTACT_EVENT } from '../lib/contact'
import {
  ADDRESS, EMAIL, EMAIL_HREF, MAPS_URL, PHONE, PHONE_HREF, whatsappHref,
} from '../lib/site'
import { CHOIX_FORMULAIRE, CHOIX_PATHOLOGISTES, PILOTE } from '../data/offres'

const EMAILJS_SERVICE  = 'service_b7tmm2g'
const EMAILJS_TEMPLATE = 'template_558y11r'
const EMAILJS_KEY      = 'UYHtFLisDfCmXL72J'

// `product` : produit transmis par un bouton du site (ex. PathoMind Viewer), envoyé dans l'e-mail sans être affiché
const EMPTY = { name: '', email: '', phone: '', org: '', city: '', offer: '', pathologists: '', product: '', subject: '', message: '' }

// Message WhatsApp pré-rempli avec l'offre sélectionnée, s'il y en a une
function waText(offer) {
  if (offer === PILOTE.nom) return `Bonjour, je suis intéressé(e) par le ${PILOTE.nom} de PathoMind Lab`
  if (offer && offer !== 'Je ne sais pas encore') return `Bonjour, je suis intéressé(e) par l'offre ${offer.replace(' (sur devis)', '')} de PathoMind Lab`
  return 'Bonjour, je suis intéressé(e) par les offres de PathoMind Lab'
}

// Les coordonnées non renseignées (lib/site.js) ne sont pas affichées
const CONTACTS = [
  {
    label: EMAIL,
    href: EMAIL_HREF,
    icon: <path d="M4 6h16v12H4zM4 7l8 6 8-6"/>,
  },
  {
    label: PHONE,
    href: PHONE_HREF,
    icon: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>,
  },
  {
    label: ADDRESS,
    href: MAPS_URL,
    icon: <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>,
  },
].filter((c) => c.label)

const PROMISES = ['Réponse sous 24 h', 'Sans engagement', 'Démo adaptée à votre contexte']

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="pm-label">{label}</label>
      {children}
    </div>
  )
}

export function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.3-.6-.4Z"/>
    </svg>
  )
}

export default function CTA() {
  const [form, setForm]     = useState(EMPTY)
  const [status, setStatus] = useState('idle')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const wa = whatsappHref(waText(form.offer))

  // Pré-remplissage depuis les boutons du site (offre, produit, objet)
  useEffect(() => {
    const onPrefill = (e) => {
      const { offer, product, subject } = e.detail || {}
      setStatus('idle')
      setForm((f) => ({ ...f, offer: offer || f.offer, product: product || '', subject: subject || '' }))
    }
    window.addEventListener(CONTACT_EVENT, onPrefill)
    return () => window.removeEventListener(CONTACT_EVENT, onPrefill)
  }, [])

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
            message: `Nouvelle demande PathoMind\n\nObjet : ${form.subject || 'Demande de démonstration'}\nNom : ${form.name}\nEmail : ${form.email}\nTéléphone / WhatsApp : ${form.phone}\nOrganisation : ${form.org}\nVille : ${form.city}\nOffre : ${form.offer || 'Non précisée'}\nNombre de pathologistes : ${form.pathologists || 'Non précisé'}${form.product ? `\nProduit : ${form.product}` : ''}\nMessage : ${form.message}`,
            // Champs aussi envoyés séparément, utilisables dans le template EmailJS
            subject: form.subject || 'Demande de démonstration',
            phone: form.phone,
            city: form.city,
            offre: form.offer || 'Non précisée',
            pathologistes: form.pathologists || 'Non précisé',
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
                const external = c.href?.startsWith('http')
                const Tag = c.href ? 'a' : 'span'
                return (
                  <Tag key={c.label} href={c.href || undefined} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-start gap-3 transition-colors duration-200 text-white/60 hover:text-white break-words min-w-0"
                    style={{ fontSize: '.9375rem', lineHeight: 1.6 }}>
                    <svg className="mt-0.5 flex-shrink-0 text-[#a78bfa]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{c.icon}</svg>
                    <span className="min-w-0">{c.label}</span>
                  </Tag>
                )
              })}
            </motion.div>

            {wa && (
              <motion.div variants={fadeInUp} className="mt-8">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="pm-btn-ghost">
                  <WhatsAppIcon size={17}/> Écrire sur WhatsApp
                </a>
              </motion.div>
            )}
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
                  <p role="status" className="mt-3" style={{ fontSize: '.9375rem', color: 'rgba(255,255,255,.65)' }}>Merci, nous vous recontactons sous 24 h (jours ouvrés).</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-5"
                  initial={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                  <div>
                    <h3 className="pm-display" style={{ fontSize: '1.6rem', lineHeight: 1.2, color: '#fff' }}>Demander une démonstration</h3>
                    <p className="mt-2" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.6)' }}>Quelques informations pour préparer l'échange.</p>
                  </div>

                  {form.subject && (
                    <div className="flex items-center justify-between gap-3 rounded-xl px-4 py-2.5"
                      style={{ background: 'rgba(124,58,237,.12)', border: '1px solid rgba(167,139,250,.28)' }}>
                      <span style={{ fontSize: '.875rem', color: '#ddd6fe' }}>Objet : {form.subject}</span>
                      <button type="button" onClick={() => setForm({ ...form, subject: '' })} aria-label="Retirer l'objet"
                        className="text-white/60 hover:text-white p-1 -mr-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                    <Field id="cf-name" label="Nom complet">
                      <input id="cf-name" name="name" className="pm-field" type="text" autoComplete="name" value={form.name} onChange={set('name')} placeholder="Dr. Nom Prénom" required/>
                    </Field>
                    <Field id="cf-email" label="Email professionnel">
                      <input id="cf-email" name="email" className="pm-field" type="email" autoComplete="email" value={form.email} onChange={set('email')} placeholder="vous@etablissement.dz" required/>
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field id="cf-phone" label="Téléphone / WhatsApp (facultatif)">
                      <input id="cf-phone" name="phone" className="pm-field" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} placeholder="05 XX XX XX XX"/>
                    </Field>
                    <Field id="cf-city" label="Ville">
                      <input id="cf-city" name="city" className="pm-field" type="text" autoComplete="address-level2" value={form.city} onChange={set('city')} placeholder="Alger, Oran, Sétif…"/>
                    </Field>
                  </div>
                  <Field id="cf-org" label="Établissement">
                    <input id="cf-org" name="organization" className="pm-field" type="text" autoComplete="organization" value={form.org} onChange={set('org')} placeholder="CHU, laboratoire, clinique…"/>
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field id="cf-offer" label="Offre qui vous intéresse">
                      <select id="cf-offer" name="offer" className="pm-field" value={form.offer} onChange={set('offer')} style={{ color: form.offer ? '#fff' : 'rgba(255,255,255,.6)' }}>
                        <option value="">Sélectionner une offre</option>
                        {CHOIX_FORMULAIRE.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field id="cf-patho" label="Nombre de pathologistes (facultatif)">
                      <select id="cf-patho" name="pathologists" className="pm-field" value={form.pathologists} onChange={set('pathologists')} style={{ color: form.pathologists ? '#fff' : 'rgba(255,255,255,.6)' }}>
                        <option value="">Sélectionner</option>
                        {CHOIX_PATHOLOGISTES.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field id="cf-message" label="Message (optionnel)">
                    <textarea id="cf-message" name="message" className="pm-field" rows={4} value={form.message} onChange={set('message')} style={{ resize: 'vertical' }}
                      placeholder="Votre besoin, votre établissement, vos contraintes…"/>
                  </Field>

                  {status === 'error' && (
                    <p role="alert" style={{ color: '#fca5a5', fontSize: '.875rem' }}>
                      Erreur d'envoi. Écrivez-nous directement : {EMAIL}
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
