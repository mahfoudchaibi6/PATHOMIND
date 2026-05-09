import SectionHeader from '../components/SectionHeader'

const STATS = [
  {
    n: '~200',
    src: 'Source : SNAAP Algérie, 2023',
    desc: <><strong className="text-text font-medium">Anatomopathologistes en exercice</strong> pour 45 millions d'habitants — soit un ratio dix fois inférieur aux standards de l'OMS, concentrés majoritairement à Alger, Oran et Constantine.</>,
  },
  {
    n: '48h – 3 sem.',
    src: 'Données CHU, enquête terrain 2022',
    desc: <><strong className="text-text font-medium">Délais de rendu des comptes-rendus histologiques</strong> dans les structures publiques algériennes, pouvant atteindre plusieurs semaines dans les wilayas de l'intérieur.</>,
  },
  {
    n: '> 80%',
    src: 'Registre national du cancer, 2021',
    desc: <><strong className="text-text font-medium">Des cancers diagnostiqués à un stade III ou IV</strong> en Algérie — une réalité directement liée à l'absence de filière diagnostique anatomopathologique rapide et accessible.</>,
  },
]

const ITEMS = [
  {
    num: '01',
    title: 'Des lames qui voyagent, des patients qui attendent',
    body: "Dans de nombreuses wilayas, les prélèvements sont acheminés physiquement vers Alger ou une capitale régionale. Cette logistique précaire entraîne des délais de plusieurs semaines, des pertes de lames et une rupture du lien entre le clinicien et le résultat.",
  },
  {
    num: '02',
    title: 'Une téléexpertise encore artisanale',
    body: "Faute de plateforme dédiée, les pathologistes échangent des photographies via WhatsApp ou email — sans traçabilité, sans sécurité des données, sans cadre médico-légal.",
  },
  {
    num: '03',
    title: 'Des déserts diagnostiques dans les territoires éloignés',
    body: "Les patients des Hauts-Plateaux, du Grand Sud et des zones rurales n'ont accès à aucun service d'anatomopathologie local. Ils parcourent des centaines de kilomètres pour un résultat qu'ils pourraient obtenir à distance.",
  },
  {
    num: '04',
    title: 'Une formation des résidents sur lames de verre',
    body: "Les internes et résidents sont formés sans accès à des bibliothèques de cas numériques, sans outils de cotation, et sans supervision à distance par des experts nationaux ou internationaux.",
  },
]

export default function Probleme() {
  return (
    <section id="probleme" className="section-off py-32 px-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="reveal">
          <SectionHeader
            eyebrow="Le défi diagnostique"
            title="Un accès à l'expertise anatomopathologique profondément inégal"
            subtitle="En Algérie comme dans la grande majorité des pays d'Afrique, l'anatomopathologie reste une spécialité rare, concentrée dans quelques grands centres universitaires, inaccessible pour l'écrasante majorité des patients et des établissements de santé."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Stats */}
          <div className="flex flex-col gap-px reveal delay-1">
            {STATS.map((s, i) => (
              <StatCard key={i} stat={s} first={i === 0} last={i === STATS.length - 1} />
            ))}
          </div>

          {/* Problem items */}
          <div className="reveal delay-2">
            <h3 className="font-serif text-ink leading-snug mb-8" style={{ fontSize: '1.85rem', letterSpacing: '-.02em' }}>
              Ce que vivent chaque jour patients et praticiens
            </h3>
            <div className="flex flex-col">
              {ITEMS.map((item, i) => (
                <div key={i} className="flex gap-5 py-6 border-b border-border last:border-0 first:pt-0">
                  <span className="font-mono text-blue-2 font-medium flex-shrink-0 pt-0.5" style={{ fontSize: '.68rem' }}>
                    {item.num}
                  </span>
                  <div>
                    <h5 className="text-sm font-semibold text-ink mb-1.5">{item.title}</h5>
                    <p className="font-light text-muted leading-relaxed" style={{ fontSize: '.81rem' }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat, first, last }) {
  return (
    <div
      className="bg-white border border-border px-10 py-9 relative overflow-hidden group transition-all duration-300 hover:translate-x-2"
      style={{
        borderRadius: first ? '12px 12px 0 0' : last ? '0 0 12px 12px' : undefined,
        boxShadow: undefined,
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-2 scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"
      />
      <div className="font-serif text-blue font-medium leading-none mb-2" style={{ fontSize: '2.8rem' }}>
        {stat.n}
      </div>
      <div className="font-mono text-muted uppercase tracking-wide mb-2.5" style={{ fontSize: '.6rem' }}>
        {stat.src}
      </div>
      <p className="font-light text-muted leading-relaxed" style={{ fontSize: '.86rem' }}>
        {stat.desc}
      </p>
    </div>
  )
}
