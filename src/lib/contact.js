// Ouvre le formulaire de contact (#contact) avec un produit et/ou un objet pré-remplis.
// Le formulaire (sections/CTA.jsx) écoute l'événement 'pm:contact'.
export const CONTACT_EVENT = 'pm:contact'

export function openContact({ product = '', subject = '' } = {}) {
  window.dispatchEvent(new CustomEvent(CONTACT_EVENT, { detail: { product, subject } }))
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Props à étaler sur un <a href="#contact"> : garde un lien valide sans JS.
export function contactLink(prefill) {
  return {
    href: '#contact',
    onClick: (e) => { e.preventDefault(); openContact(prefill) },
  }
}

export const GUIDED_DEMO = { product: 'PathoMind Lab', subject: 'Démo guidée avec un pathologiste' }
