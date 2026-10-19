// Informations partagées par toutes les sections (boîtier, tarifs, FAQ, contact).
// Les valeurs '[À COMPLÉTER …]' / '[À CONFIRMER]' restent visibles sur le site tant qu'elles ne sont pas remplacées.

// ── Contact ──────────────────────────────────────────────────────────────
// Laisser vide tant que l'info n'existe pas : le site affiche alors le placeholder.
export const EMAIL = ''            // ex. 'contact@pathomind.org'
export const PHONE = ''            // ex. '+213 5 XX XX XX XX' (affiché tel quel)
export const WHATSAPP = ''         // format international sans « + » ni espaces, ex. '2135XXXXXXXX'

export const EMAIL_LABEL = EMAIL || '[À COMPLÉTER : contact@pathomind.org]'
export const PHONE_LABEL = PHONE || '[À COMPLÉTER : téléphone]'
export const WHATSAPP_LABEL = WHATSAPP ? 'WhatsApp' : '[À COMPLÉTER : numéro WhatsApp]'

export const EMAIL_HREF = EMAIL ? `mailto:${EMAIL}` : null
export const PHONE_HREF = PHONE ? `tel:${PHONE.replace(/[^\d+]/g, '')}` : null
export const WHATSAPP_HREF = WHATSAPP
  ? `https://wa.me/${WHATSAPP}?text=Bonjour%2C%20je%20souhaite%20une%20d%C3%A9mo%20de%20PathoMind%20Lab`
  : null

export const ADDRESS = 'Algeria Venture · Dounia Parc, Dély Ibrahim 16000, Alger'
export const MAPS_URL = 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x128fafea06d2f2f7:0xc85fa3b9927e5616'

// ── Démo ─────────────────────────────────────────────────────────────────
export const DEMO_VIDEO_URL = ''   // [À COMPLÉTER : URL vidéo de 2 min, ex. YouTube embed] — section masquée si vide

// ── Boîtier & service ────────────────────────────────────────────────────
export const BACKUP_SUPPORT = '[À COMPLÉTER : sur disque externe / second support]'
export const UPDATES_MODE = '[À COMPLÉTER : à distance avec votre accord / sur site]'
export const UPS_POLICY = '[À COMPLÉTER : onduleur fourni / recommandé]'
export const REPLACEMENT_DELAY = '[À COMPLÉTER : délai]'
export const EXPORT_FORMATS = '[À COMPLÉTER : formats, ex. PDF des comptes rendus + Excel]'
export const BOX_OWNERSHIP = '[À COMPLÉTER : inclus dans l\'abonnement / acheté]'
export const ONSITE_COVERAGE = '[À COMPLÉTER : qui intervient sur site, dans quelles wilayas]'

export const INCLUDED = [
  'Boîtier préconfiguré, livré et installé sur site',
  'Configuration des comptes, de l\'en-tête du labo et des tarifs',
  'Formation de l\'équipe sur place',
  `Sauvegardes automatiques quotidiennes ${BACKUP_SUPPORT}`,
  `Mises à jour du logiciel ${UPDATES_MODE}`,
]

// ── Tarifs ───────────────────────────────────────────────────────────────
export const PRICE_MONTHLY = '15 000 DA'
export const PRICE_SETUP = '50 000 DA'
export const PRICE_TODO = '[À CONFIRMER]'
export const SETUP_BOX = '[À COMPLÉTER : boîtier inclus ou non]'
export const PILOT_DURATION = '[À COMPLÉTER : durée]'
