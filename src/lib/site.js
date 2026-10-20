import { OFFRES, PANNE } from '../data/offres'

// Informations partagées par toutes les sections (boîtier, tarifs, FAQ, contact).
// Règle : une valeur vide n'est jamais affichée. La phrase ou la ligne concernée est masquée ou reformulée,
// et réapparaît automatiquement dès que la valeur est renseignée ici.

// ── Contact ──────────────────────────────────────────────────────────────
// Adresse publique. Passer à 'contact@pathomind.org' dès que la boîte existe et reçoit bien les messages.
export const EMAIL = 'pathomind2026@hotmail.com'
export const PHONE = ''            // ex. '+213 5 XX XX XX XX' (affiché tel quel)
export const WHATSAPP = ''         // vide pour l'instant (boutons WhatsApp masqués) ; format international sans « + » ni espaces, ex. '2135XXXXXXXX'

export const EMAIL_HREF = `mailto:${EMAIL}`
export const PHONE_HREF = PHONE ? `tel:${PHONE.replace(/[^\d+]/g, '')}` : null
// Lien WhatsApp avec message pré-rempli ; null tant que le numéro n'est pas renseigné
export const whatsappHref = (text) => (WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}` : null)
export const WHATSAPP_HREF = whatsappHref('Bonjour, je souhaite une démo de PathoMind Lab')

export const ADDRESS = 'Algeria Venture · Dounia Parc, Dély Ibrahim 16000, Alger'
export const MAPS_URL = 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x128fafea06d2f2f7:0xc85fa3b9927e5616'

// ── Démo ─────────────────────────────────────────────────────────────────
export const DEMO_VIDEO_URL = ''   // URL d'intégration de la vidéo de 2 min ; bloc masqué si vide

// ── Boîtier & service (vide = non affiché) ───────────────────────────────
export const BACKUP_SUPPORT = ''   // ex. 'sur disque externe'
export const UPDATES_MODE = ''     // ex. 'à distance, avec votre accord'
export const UPS_POLICY = ''       // ex. 'Un onduleur est fourni avec le boîtier.'
export const EXPORT_FORMATS = ''   // ex. 'PDF des comptes rendus + Excel'
export const BOX_OWNERSHIP = ''    // ex. 'Inclus dans l'abonnement'

// Fiche technique : affichée seulement quand les valeurs matérielles sont renseignées
export const BOX_SPECS = {
  format: '',      // ex. 'Mini-PC 12 × 12 × 4 cm'
  cpuRam: '',
  storage: '',
  power: '',
}

const withDetail = (base, detail, sep = ' ') => (detail ? `${base}${sep}${detail}` : base)

export const INCLUDED = [
  'Installation sur site, sur le PC du laboratoire ou le boîtier PathoMind',
  'Configuration des comptes, de l\'en-tête du labo et des tarifs',
  'Formation de l\'équipe sur place',
  withDetail('Sauvegardes automatiques quotidiennes', BACKUP_SUPPORT),
  withDetail('Mises à jour du logiciel', UPDATES_MODE, ', '),
]

export const TEXT = {
  power: withDetail(UPS_POLICY, "Au redémarrage, tout reprend là où c'était.").trim(),
  // Délais par offre : data/offres.js (PANNE)
  failure: `Les données sont sauvegardées chaque nuit. Selon l'offre : ${OFFRES.map((o, i) => `${PANNE[i]} (${o.nom})`).join(', ')}.`,
  exit: EXPORT_FORMATS
    ? `Vos données vous appartiennent : export complet (${EXPORT_FORMATS}).`
    : 'Vos données vous appartiennent : nous vous remettons un export complet.',
  backups: withDetail('Sauvegardes automatiques quotidiennes', BACKUP_SUPPORT) + '.',
}
