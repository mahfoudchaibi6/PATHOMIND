/**
 * Contenu éditorial du site PathoMind.
 * Règles : pas de promesse réglementaire non prouvée, pas de données patient réelles,
 * l'IA reste présentée comme un axe de recherche, pas comme une fonctionnalité produit.
 */

export const SITE = {
  name: 'PathoMind',
  url: 'https://www.pathomind.org',
  email: 'pathomind2026@hotmail.com',
  address: 'Algeria Venture · Dounia Parc, Dély Ibrahim 16000, Alger',
  mapsUrl: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x128fafea06d2f2f7:0xc85fa3b9927e5616',
  description:
    "PathoMind est une suite logicielle pour l'anatomie et la cytologie pathologiques : gestion de laboratoire ACP, visualisation de lames numériques et télépathologie. Conçue en Algérie par un anatomopathologiste.",
}

export const NAV = [
  { href: '#produits', label: 'Produits' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#donnees', label: 'Données' },
  { href: '#demo-lab', label: 'Aperçu' },
  { href: '#fondateur', label: 'Fondateur' },
]

export type ProductKey = 'lab' | 'viewer' | 'share'

export const PRODUCTS: {
  key: ProductKey
  name: string
  short: string
  tagline: string
  status: { label: string; tone: 'available' | 'rollout' }
  description: string
  features: string[]
  image: { src: string; alt: string; width: number; height: number }
}[] = [
  {
    key: 'lab',
    name: 'PathoMind Lab',
    short: 'Lab',
    tagline: 'Gestion de laboratoire ACP',
    status: { label: 'Disponible', tone: 'available' },
    description:
      "Le système de gestion du laboratoire d'anatomie et cytologie pathologiques : de l'enregistrement du prélèvement à la validation du compte-rendu, chaque étape est tracée.",
    features: [
      'Dossiers patients, prescripteurs et prélèvements',
      'Suivi prélèvement → bloc → lame',
      'Worklist pathologiste et priorisation des urgences',
      'Comptes-rendus structurés avec modèles, export PDF',
      'Caisse, facturation et rôles utilisateurs',
    ],
    image: {
      src: '/images/lab-dashboard.webp',
      alt: 'Tableau de bord PathoMind Lab : dossiers reçus, en cours, urgents et comptes-rendus à valider',
      width: 1424,
      height: 805,
    },
  },
  {
    key: 'viewer',
    name: 'PathoMind Viewer',
    short: 'Viewer',
    tagline: 'Visualisation de lames numériques',
    status: { label: 'En déploiement', tone: 'rollout' },
    description:
      "Une visionneuse de lames numériques dans le navigateur, pour consulter, mesurer et annoter les lames entières sans poste dédié.",
    features: [
      'Navigation fluide sur lames entières (WSI)',
      'Zoom multi-niveaux et vue d’ensemble',
      'Annotations et mesures calibrées',
      'Colorations standard et immunohistochimie',
      'Lien direct avec le dossier PathoMind Lab',
    ],
    image: {
      src: '/images/viewer.webp',
      alt: 'Interface PathoMind Viewer affichant une lame H&E numérisée avec vue d’ensemble et barre d’échelle',
      width: 1600,
      height: 900,
    },
  },
  {
    key: 'share',
    name: 'PathoMind Share',
    short: 'Share',
    tagline: 'Télépathologie et second avis',
    status: { label: 'En déploiement', tone: 'rollout' },
    description:
      'Partager un cas avec un confrère, demander un second avis ou préparer une réunion de concertation, avec les lames et le contexte clinique au même endroit.',
    features: [
      'Partage de cas entre établissements',
      'Demande de second avis tracée',
      'Préparation des réunions de concertation (RCP)',
      'Discussion et annotations partagées',
      'Invitations et accès contrôlés par cas',
    ],
    image: {
      src: '/images/share.webp',
      alt: 'Interface PathoMind Share : cas partagé, lame annotée et discussion entre pathologistes',
      width: 1600,
      height: 900,
    },
  },
]

export const WORKFLOW = [
  {
    title: 'Réception et enregistrement',
    text: 'Patient, prescripteur, nature du prélèvement : un numéro de dossier unique est attribué dès l’arrivée.',
    product: 'Lab',
  },
  {
    title: 'Macroscopie',
    text: 'Description macroscopique, nombre de fragments et répartition en cassettes.',
    product: 'Lab',
  },
  {
    title: 'Technique',
    text: 'Inclusion, coupe, coloration : chaque bloc et chaque lame restent rattachés à leur dossier.',
    product: 'Lab',
  },
  {
    title: 'Lecture',
    text: 'Worklist du pathologiste, priorisation des urgences, consultation des lames numériques.',
    product: 'Lab · Viewer',
  },
  {
    title: 'Second avis',
    text: 'Si nécessaire, le cas est partagé avec un confrère ou préparé pour une RCP.',
    product: 'Share',
  },
  {
    title: 'Compte-rendu',
    text: 'Rédaction structurée à partir de modèles, techniques complémentaires, conclusion.',
    product: 'Lab',
  },
  {
    title: 'Validation et diffusion',
    text: 'Validation horodatée par le pathologiste, PDF, archivage et facturation.',
    product: 'Lab',
  },
]

export const LAB_SCREENS = [
  {
    key: 'dashboard',
    label: 'Tableau de bord',
    caption: 'Activité du jour, urgences et comptes-rendus en attente de validation, en un coup d’œil.',
    src: '/images/lab-dashboard.webp',
    alt: 'Tableau de bord PathoMind Lab',
  },
  {
    key: 'report',
    label: 'Compte-rendu',
    caption: 'Compte-rendu structuré, validé et horodaté par le pathologiste, exportable en PDF.',
    src: '/images/lab-report.webp',
    alt: 'Compte-rendu validé dans PathoMind Lab (données fictives, identité masquée)',
  },
  {
    key: 'billing',
    label: 'Caisse & facturation',
    caption: 'Encaissements, factures impayées et export comptable, avec un rôle dédié.',
    src: '/images/lab-billing.webp',
    alt: 'Module caisse et facturation de PathoMind Lab (données fictives, noms masqués)',
  },
  {
    key: 'login',
    label: 'Accès sécurisé',
    caption: 'Comptes individuels et worklists par rôle : administrateur, secrétariat, technicien, pathologiste, comptabilité.',
    src: '/images/lab-login.webp',
    alt: 'Écran de connexion PathoMind Lab',
  },
]

export const FAQ = [
  {
    q: 'PathoMind est-il un dispositif médical certifié ?',
    a: 'Non. PathoMind est un logiciel d’organisation et de gestion du laboratoire. Il ne pose pas de diagnostic et ne se substitue pas au jugement du pathologiste.',
  },
  {
    q: 'Où sont stockées les données de nos patients ?',
    a: 'Sur le serveur de votre laboratoire ou sur l’infrastructure que vous choisissez. Aucune donnée n’est transmise à un service tiers sans décision de votre établissement.',
  },
  {
    q: 'Faut-il une connexion internet permanente ?',
    a: 'Non pour PathoMind Lab, qui fonctionne sur le réseau local. Une connexion n’est utile que pour la télépathologie avec Share et, si vous l’autorisez, pour la maintenance à distance.',
  },
  {
    q: 'Pouvons-nous reprendre nos modèles de comptes-rendus ?',
    a: 'Oui. Le paramétrage initial comprend la reprise de vos modèles, de vos actes et de votre organisation par rôle.',
  },
  {
    q: 'Comment se passent le déploiement et la formation ?',
    a: 'Après un audit de vos flux, nous établissons un calendrier adapté à votre volume d’activité et au nombre de postes. Les équipes sont formées par rôle, sur site ou à distance.',
  },
  {
    q: 'PathoMind Viewer est-il compatible avec notre scanner de lames ?',
    a: 'Viewer est en cours de déploiement. La compatibilité est vérifiée au cas par cas : indiquez le modèle de votre scanner dans votre demande de démo.',
  },
  {
    q: 'Quel est le prix ?',
    a: 'La tarification dépend de la taille de l’établissement et des modules choisis. Nous vous transmettons une proposition détaillée après la démonstration.',
  },
]
