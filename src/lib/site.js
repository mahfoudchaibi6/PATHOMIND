// Informations partagées par toutes les sections (boîtier, tarifs, FAQ, contact).
// Règle : une valeur vide n'est jamais affichée. La phrase ou la ligne concernée est masquée ou reformulée,
// et réapparaît automatiquement dès que la valeur est renseignée ici.

// ── Contact ──────────────────────────────────────────────────────────────
// Adresse publique. Passer à 'contact@pathomind.org' dès que la boîte existe et reçoit bien les messages.
export const EMAIL = 'pathomind2026@hotmail.com'
export const PHONE = ''            // ex. '+213 5 XX XX XX XX' (affiché tel quel)
export const WHATSAPP = ''         // format international sans « + » ni espaces, ex. '2135XXXXXXXX'

export const EMAIL_HREF = `mailto:${EMAIL}`
export const PHONE_HREF = PHONE ? `tel:${PHONE.replace(/[^\d+]/g, '')}` : null
export const WHATSAPP_HREF = WHATSAPP
  ? `https://wa.me/${WHATSAPP}?text=Bonjour%2C%20je%20souhaite%20une%20d%C3%A9mo%20de%20PathoMind%20Lab`
  : null

export const ADDRESS = 'Algeria Venture · Dounia Parc, Dély Ibrahim 16000, Alger'
export const MAPS_URL = 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x128fafea06d2f2f7:0xc85fa3b9927e5616'

// ── Démo ─────────────────────────────────────────────────────────────────
export const DEMO_VIDEO_URL = ''   // URL d'intégration de la vidéo de 2 min ; bloc masqué si vide

// ── Boîtier & service (vide = non affiché) ───────────────────────────────
export const BACKUP_SUPPORT = ''   // ex. 'sur disque externe'
export const UPDATES_MODE = ''     // ex. 'à distance, avec votre accord'
export const UPS_POLICY = ''       // ex. 'Un onduleur est fourni avec le boîtier.'
export const REPLACEMENT_DELAY = ''// ex. '48 h'
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
  'Boîtier préconfiguré, livré et installé sur site',
  'Configuration des comptes, de l\'en-tête du labo et des tarifs',
  'Formation de l\'équipe sur place',
  withDetail('Sauvegardes automatiques quotidiennes', BACKUP_SUPPORT),
  withDetail('Mises à jour du logiciel', UPDATES_MODE, ', '),
]

export const TEXT = {
  power: withDetail(UPS_POLICY, "Au redémarrage, tout reprend là où c'était.").trim(),
  failure: REPLACEMENT_DELAY
    ? `Les données sont sauvegardées chaque jour. Remplacement et restauration sous ${REPLACEMENT_DELAY}.`
    : 'Les données sont sauvegardées chaque jour : le boîtier est remplacé et vos données restaurées à partir de la dernière sauvegarde.',
  exit: EXPORT_FORMATS
    ? `Vos données vous appartiennent : export complet (${EXPORT_FORMATS}).`
    : 'Vos données vous appartiennent : nous vous remettons un export complet.',
  backups: withDetail('Sauvegardes automatiques quotidiennes', BACKUP_SUPPORT) + '.',
}

// ── Tarifs ───────────────────────────────────────────────────────────────
// Prix affichés uniquement une fois confirmés (PRICES_CONFIRMED = true). Sinon : présentation « sur devis ».
export const PRICES_CONFIRMED = false
export const PRICE_MONTHLY = '15 000 DA'
export const PRICE_SETUP = '50 000 DA'
export const SETUP_BOX = ''        // ex. 'boîtier inclus'
export const PILOT_DURATION = ''   // ex. '3 mois'
