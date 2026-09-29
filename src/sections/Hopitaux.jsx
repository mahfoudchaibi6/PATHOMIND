import SectionHeader from '../components/SectionHeader'

const BENEFITS = [
  { n: '01', icon: '🔬', title: 'Numérisation des lames', desc: 'Convertissez vos lames de verre en fichiers Whole Slide Image haute résolution, stockés de manière sécurisée et accessibles immédiatement depuis n\'importe quel poste connecté.', tag: 'WSI · Scanning' },
  { n: '02', icon: '🔗', title: 'Partage instantané des cas', desc: 'Partagez un cas en un clic avec un collègue, un service clinique ou un réseau partenaire. Plus de lames expédiées par voie postale — un lien sécurisé, une lame intégrale, une traçabilité complète.', tag: 'Collaboration' },
  { n: '03', icon: '📡', title: "Demande d'avis expert", desc: "Sollicitez un second avis auprès d'un référent national ou international directement depuis la visionneuse. L'expert rendra un avis structuré, horodaté et signé électroniquement.", tag: 'Téléexpertise' },
  { n: '04', icon: '🎓', title: 'Enseignement intégré', desc: 'Transformez chaque cas intéressant en ressource pédagogique. Assignez des cas aux résidents, corrigez leurs lectures et suivez leur progression — le tout en temps réel.', tag: 'Formation' },
  { n: '05', icon: '🩺', title: 'Organisation des RCP', desc: 'Lames projetées en haute résolution, annotations partagées en direct, comptes-rendus de RCP structurés et archivés automatiquement dans le dossier patient.', tag: 'RCP · Oncologie' },
  { n: '06', icon: '⚡', title: 'Réduction des délais', desc: 'Le triage automatique par IA priorise les cas urgents dès la numérisation. Résultat : des délais divisés par cinq et une prise en charge oncologique déclenchée bien plus tôt.', tag: 'IA · Urgences' },
  { n: '07', icon: '🤝', title: 'Collaboration inter-établissements', desc: 'Un CHU de référence peut piloter un réseau de dix hôpitaux de wilaya, avec tableau de bord centralisé, file d\'attente partagée et indicateurs de performance en temps réel.', tag: 'Réseau' },
  { n: '08', icon: '📊', title: 'Traçabilité & conformité', desc: 'Chaque action sur une lame est journalisée. Vos comptes-rendus sont archivés de manière immuable, vos données restent hébergées sur territoire algérien, dans le respect des normes ISO 13485.', tag: 'Conformité · ISO' },
]

const STRIPS = [
  { title: 'Vous êtes un hôpital public ou CHU ?', sub: 'Découvrez notre offre institutionnelle et les modalités de déploiement sur site' },
  { title: 'Vous dirigez un laboratoire privé ?', sub: 'Démarrez avec PathoMind Cloud en moins de 48 heures, sans infrastructure à déployer' },
  { title: 'Vous êtes responsable d\'un programme de formation ?', sub: 'Constituez une bibliothèque nationale de cas avec vos équipes universitaires' },
]

export default function Hopitaux() {
  return (
    <section id="hopitaux" className="section-white py-32 px-16 border-t border-border">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-20">
          <div className="reveal">
            <SectionHeader
              eyebrow="Pour les hôpitaux & laboratoires"
              title={<>Tout ce dont votre service a besoin — en une <em className="italic text-blue-2">seule plateforme.</em></>}
            />
          </div>
          <p className="reveal delay-2 font-light text-muted leading-relaxed" style={{ fontSize: '.95rem' }}>
            PathoMind s'intègre dans le quotidien de votre service d'anatomopathologie sans rupture de pratique. De la numérisation de la première lame à la signature du compte-rendu, chaque étape est{' '}
            <strong className="text-text font-medium">plus rapide, plus sûre et plus collaborative</strong> — que vous soyez au CHU Mustapha d'Alger ou dans un hôpital de wilaya.
          </p>
        </div>

        {/* Benefits grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6"
          style={{ border: '1px solid #dce4f0', borderRadius: 14, overflow: 'hidden', gap: '1px', background: '#dce4f0' }}
        >
          {BENEFITS.map((b, i) => (
            <div
              key={b.n}
              className="bg-white p-8 group hover:bg-frost transition-colors duration-200 cursor-default reveal"
              style={{ transitionDelay: `${(i % 4) * 0.07}s` }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg bg-frost border border-ice group-hover:bg-ice group-hover:border-blue-2/25 transition-colors duration-200">
                  {b.icon}
                </div>
                <span className="font-mono font-medium text-border group-hover:text-sky transition-colors duration-200" style={{ fontSize: '.65rem' }}>
                  {b.n}
                </span>
              </div>
              <div className="text-sm font-semibold text-ink mb-2 leading-snug">{b.title}</div>
              <div className="font-light text-muted leading-relaxed mb-4" style={{ fontSize: '.78rem' }}>{b.desc}</div>
              <div className="inline-block font-mono text-blue-2 bg-frost border border-ice px-2 py-0.5 rounded-sm" style={{ fontSize: '.58rem', letterSpacing: '.05em' }}>
                {b.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Strip */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3"
          style={{ border: '1px solid #dce4f0', borderRadius: 12, overflow: 'hidden', gap: '1px', background: '#dce4f0' }}
        >
          {STRIPS.map((s, i) => (
            <div
              key={i}
              className="bg-offwhite px-8 py-6 flex items-center gap-4 hover:bg-frost transition-colors duration-200 cursor-pointer group reveal"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-blue-2 group-hover:bg-blue-2 transition-all duration-200">
                <svg className="text-muted group-hover:text-white transition-colors duration-200" width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-text">{s.title}</div>
                <div className="font-light text-muted mt-0.5" style={{ fontSize: '.74rem' }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
