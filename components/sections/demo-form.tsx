'use client'

import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { AlertCircle, CheckCircle2, Clock, Loader2, Mail, MapPin, Send, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { NativeSelect } from '@/components/ui/field'
import { SectionHeader } from '@/components/section-header'
import { Reveal } from '@/components/motion/reveal'
import { SITE } from '@/lib/content'

// Clés publiques EmailJS (conçues pour être exposées côté client)
const EMAILJS = {
  service: 'service_b7tmm2g',
  template: 'template_558y11r',
  publicKey: 'UYHtFLisDfCmXL72J',
}

const EMPTY = { name: '', email: '', org: '', orgType: '', product: '', message: '', website: '' }
type Form = typeof EMPTY
type Errors = Partial<Record<keyof Form, string>>

function validate(f: Form): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Indiquez votre nom.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Adresse e-mail invalide.'
  if (f.org.trim().length < 2) e.org = 'Indiquez votre établissement.'
  if (!f.orgType) e.orgType = 'Sélectionnez un type d’établissement.'
  return e
}

export function DemoForm() {
  const [form, setForm] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Honeypot : champ invisible rempli uniquement par les robots
    if (form.website) {
      setStatus('sent')
      return
    }
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      document.getElementById(`f-${first}`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS.service,
          template_id: EMAILJS.template,
          user_id: EMAILJS.publicKey,
          template_params: {
            from_email: form.email.trim(),
            message: [
              'Nouvelle demande de démo PathoMind',
              '',
              `Nom : ${form.name.trim()}`,
              `Email : ${form.email.trim()}`,
              `Établissement : ${form.org.trim()}`,
              `Type : ${form.orgType}`,
              `Intérêt : ${form.product || 'Non précisé'}`,
              `Message : ${form.message.trim() || '—'}`,
            ].join('\n'),
          },
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      setStatus('sent')
      setForm(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const err = (k: keyof Form) =>
    errors[k] ? (
      <p id={`f-${k}-err`} className="mt-1.5 text-xs text-rose-300">
        {errors[k]}
      </p>
    ) : null
  const aria = (k: keyof Form) => ({
    id: `f-${k}`,
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `f-${k}-err` : undefined,
  })

  return (
    <section id="contact" className="section overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,.18),transparent)] blur-2xl"
      />
      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Demande de démo"
            title={
              <>
                Voyons PathoMind <span className="hl">dans votre laboratoire.</span>
              </>
            }
            lead="Une démonstration adaptée à votre organisation : laboratoire privé, service hospitalier, clinique ou partenaire IT."
          />
          <Reveal delay={0.15}>
            <ul className="mt-10 space-y-4 text-sm text-slate-300">
              <li className="flex gap-3">
                <Clock className="size-5 shrink-0 text-brand-300" aria-hidden />
                Démonstration en ligne ou sur site, environ 45 minutes.
              </li>
              <li className="flex gap-3">
                <Mail className="size-5 shrink-0 text-brand-300" aria-hidden />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="size-5 shrink-0 text-brand-300" aria-hidden />
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {SITE.address}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="glass p-6 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'sent' ? (
                <m.div
                  key="sent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-16 text-center"
                  role="status"
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                    <CheckCircle2 className="size-7" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">Demande envoyée</h3>
                  <p className="mt-2 max-w-sm text-sm text-slate-400">
                    Merci. Nous revenons vers vous rapidement pour convenir d’un créneau.
                  </p>
                  <Button variant="secondary" size="sm" className="mt-8" onClick={() => setStatus('idle')}>
                    Envoyer une autre demande
                  </Button>
                </m.div>
              ) : (
                <m.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="f-name">Nom complet *</Label>
                      <Input {...aria('name')} autoComplete="name" placeholder="Dr Nom Prénom" value={form.name} onChange={set('name')} />
                      {err('name')}
                    </div>
                    <div>
                      <Label htmlFor="f-email">E-mail professionnel *</Label>
                      <Input {...aria('email')} type="email" autoComplete="email" placeholder="nom@etablissement.dz" value={form.email} onChange={set('email')} />
                      {err('email')}
                    </div>
                    <div>
                      <Label htmlFor="f-org">Établissement *</Label>
                      <Input {...aria('org')} autoComplete="organization" placeholder="Laboratoire, CHU, clinique…" value={form.org} onChange={set('org')} />
                      {err('org')}
                    </div>
                    <div>
                      <Label htmlFor="f-orgType">Type d’établissement *</Label>
                      <NativeSelect {...aria('orgType')} value={form.orgType} onChange={set('orgType')}>
                        <option value="">Sélectionner</option>
                        <option>Laboratoire ACP privé</option>
                        <option>Service ACP hospitalier / CHU</option>
                        <option>Clinique</option>
                        <option>Partenaire healthcare IT</option>
                        <option>Institution / autre</option>
                      </NativeSelect>
                      {err('orgType')}
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="f-product">Produit qui vous intéresse</Label>
                      <NativeSelect id="f-product" value={form.product} onChange={set('product')}>
                        <option value="">Non précisé</option>
                        <option>PathoMind Lab</option>
                        <option>PathoMind Viewer</option>
                        <option>PathoMind Share</option>
                        <option>Suite complète</option>
                        <option>Accompagnement / intégration</option>
                      </NativeSelect>
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="f-message">Votre besoin</Label>
                      <Textarea id="f-message" placeholder="Volume d’activité, outils actuels, contraintes…" value={form.message} onChange={set('message')} />
                    </div>
                    {/* Honeypot */}
                    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                      <label htmlFor="f-website">Site web</label>
                      <input id="f-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
                    </div>
                  </div>

                  <p className="mt-5 flex gap-2 text-xs leading-relaxed text-slate-500">
                    <ShieldAlert className="size-4 shrink-0 text-amber-300/70" aria-hidden />
                    Merci de ne transmettre aucune donnée patient via ce formulaire.
                  </p>

                  {status === 'error' && (
                    <p role="alert" className="mt-4 flex gap-2 rounded-lg border border-rose-400/20 bg-rose-400/10 p-3 text-sm text-rose-200">
                      <AlertCircle className="size-4 shrink-0" aria-hidden />
                      L’envoi a échoué. Réessayez ou écrivez-nous à {SITE.email}.
                    </p>
                  )}

                  <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="animate-spin" aria-hidden /> Envoi en cours…
                      </>
                    ) : (
                      <>
                        Demander une démo <Send aria-hidden />
                      </>
                    )}
                  </Button>
                </m.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
