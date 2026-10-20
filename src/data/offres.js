// Offres PathoMind Lab : seule source des noms, prix et contenus.
// Modifier un prix ici met à jour les cartes, le tableau comparatif, la FAQ et le JSON-LD.
// Prix en dinars, nombres entiers (ex. 15000). L'affichage « 15 000 DA » est calculé.

// ── Programme Centre pilote ──────────────────────────────────────────────
// [À COMPLÉTER] places réellement restantes. À 0, le bandeau disparaît automatiquement.
export const PILOTE_PLACES_RESTANTES = 3

export const PILOTE = {
  nom: 'Programme Centre pilote',
  labos: 3,
  ville: 'Alger',
  jours: 45,
  remise: 30,        // en %, si le laboratoire poursuit
  garantieMois: 36,  // prix garanti après le pilote
}

// ── Offres ───────────────────────────────────────────────────────────────
export const OFFRES = [
  {
    id: 'essentiel',
    nom: 'Essentiel',
    accroche: 'Pour démarrer, en solo',
    pour: '1 pathologiste, labo récent ou de petite taille',
    mensuel: 15000,
    annuel: 150000,
    miseEnService: 50000,
    miseEnServiceNote: '',
    postes: 'Jusqu\'à 5 postes',
    intro: '',
    contenu: [
      'Logiciel complet : réception, macroscopie, blocs et lames, comptes rendus avec modèles, validation, PDF, facturation',
      'Jusqu\'à 5 postes connectés',
      'Installé sur le PC du laboratoire (configuration minimale requise)',
      'Sauvegardes automatiques chaque nuit',
      'Export complet de vos données à tout moment',
      'Formation sur site : 2 demi-journées',
      'Support WhatsApp, heures ouvrées',
    ],
    options: 'Options : import de vos modèles Word, reprise de l\'historique',
    cta: 'Choisir Essentiel',
  },
  {
    id: 'cabinet',
    nom: 'Cabinet',
    recommandee: true,
    badge: 'Recommandée',
    accroche: 'Pour les laboratoires établis',
    pour: '2 à 4 pathologistes',
    mensuel: 25000,
    annuel: 250000,
    miseEnService: 70000,
    miseEnServiceNote: '',
    postes: 'Jusqu\'à 12 postes',
    intro: 'Tout Essentiel, plus :',
    contenu: [
      'Jusqu\'à 12 postes connectés',
      'PC du laboratoire ou boîtier PathoMind (en achat)',
      'Import de vos modèles Word inclus',
      'Restauration du serveur sous 48 h',
      '1 demi-journée de formation supplémentaire par an',
      'Support prioritaire, réponse sous 4 h',
    ],
    options: 'Option : reprise de l\'historique',
    cta: 'Choisir Cabinet',
  },
  {
    id: 'serenite',
    nom: 'Sérénité',
    accroche: 'Vous ne vous occupez de rien',
    pour: 'les laboratoires qui veulent un service clé en main',
    mensuel: 40000,
    annuel: 400000,
    miseEnService: 120000,
    miseEnServiceNote: 'boîtier PathoMind compris',
    postes: 'Postes illimités',
    intro: 'Tout Cabinet, plus :',
    contenu: [
      'Postes illimités',
      'Boîtier PathoMind fourni avec onduleur et disque de sauvegarde',
      'Boîtier remplacé sous 72 h en cas de panne',
      'Reprise de l\'historique incluse',
      'Visite sur place chaque trimestre',
      'Support prioritaire + téléphone direct',
    ],
    options: '',
    cta: 'Choisir Sérénité',
  },
]

export const ANNUEL_MENTION = '2 mois offerts'

export const INSTITUTION = {
  nom: 'Institution (sur devis)',
  texte: 'CHU, EHS, plusieurs sites : offre Institution sur devis.',
}

export const MENTIONS = [
  'Engagement 12 mois, puis résiliable avec un mois de préavis. Prix garantis 24 mois.',
  'Changement d\'offre possible à tout moment.',
  'Vos données vous appartiennent : export complet à tout moment, même en fin de contrat.',
]

// Liste « Offre qui vous intéresse » du formulaire de contact
export const CHOIX_FORMULAIRE = [
  ...OFFRES.map((o) => o.nom),
  INSTITUTION.nom,
  PILOTE.nom,
  'Je ne sais pas encore',
]

export const CHOIX_PATHOLOGISTES = ['1', '2 à 4', '5 et plus']

// ── Mise en forme ────────────────────────────────────────────────────────
export const formatDA = (n) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} DA`

// ── Tableau comparatif ───────────────────────────────────────────────────
// Valeurs : true = ✓, false = —, texte = affiché tel quel. Une valeur par offre, dans l'ordre de OFFRES.
export const PANNE = ['restauration sur un autre PC', 'restauration sous 48 h', 'boîtier remplacé sous 72 h']

export const COMPARATIF = [
  ['Pathologistes', ['1', '2 à 4', 'sans limite']],
  ['Postes connectés', ['5', '12', 'illimité']],
  ['Serveur', ['PC du labo', 'PC du labo ou boîtier acheté', 'boîtier fourni']],
  ['Onduleur et disque de sauvegarde', [false, false, true]],
  ['Sauvegardes automatiques', [true, true, true]],
  ['Export complet des données', [true, true, true]],
  ['Panne du serveur', PANNE],
  ['Import des modèles Word', ['option', true, true]],
  ['Reprise de l\'historique', ['option', 'option', true]],
  ['Formation', ['2 demi-journées', '+ 1 demi-journée/an', '+ 1 visite/trimestre']],
  ['Support', ['WhatsApp, heures ouvrées', 'prioritaire, 4 h', 'prioritaire + téléphone']],
  ['Mise en service', OFFRES.map((o) => formatDA(o.miseEnService))],
  ['Abonnement', OFFRES.map((o) => `${formatDA(o.mensuel)}/mois`)],
]

// ── Configuration minimale du PC serveur (Essentiel et Cabinet) ──────────
export const CONFIG_MINIMALE = [
  'Processeur 4 cœurs récent',
  '8 Go de mémoire vive',
  'Disque SSD de 256 Go',
  'Port réseau Ethernet',
  'PC dédié au serveur (pas le poste de la secrétaire)',
  'Un disque externe pour les sauvegardes',
]
