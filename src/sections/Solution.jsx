import SectionHeader from '../components/SectionHeader'

const PILLARS = [
  { n: '01', title: 'Numérisation et visionneuse WSI', desc: 'Visualisation haute résolution des lames entières directement dans le navigateur, avec outils de mesure, annotations multi-utilisateurs et comparaison de colorations.' },
  { n: '02', title: 'Téléexpertise sécurisée et traçable', desc: 'Consultation à distance entre établissements, avec compte-rendu horodaté, signature électronique et piste d\'audit — conforme aux exigences médico-légales algériennes.' },
  { n: '03', title: 'Réseaux de pathologie multi-sites', desc: 'Connexion des hôpitaux de proximité, des CHU de référence et des laboratoires privés en un réseau diagnostique unifié, avec routage automatique des cas.' },
  { n: '04', title: 'Fonctionnement hors-ligne & faible débit', desc: 'Architecture optimisée pour les connexions intermittentes — adapté aux wilayas de l\'intérieur et du Grand Sud.' },
  { n: '05', title: 'Trilingue · Français · Arabe · Anglais', desc: 'Interface complète en français, arabe et anglais, avec comptes-rendus normalisés compatibles HL7/FHIR.' },
]

const MODULES = [
  { icon: '🔬', name: 'Visionneuse WSI', desc: 'Lames entières haute résolution' },
  { icon: '📡', name: 'Téléexpertise', desc: 'Consultation à distance sécurisée' },
  { icon: '🤖', name: 'IA Clinique', desc: 'Détection et triage automatisés' },
  { icon: '🎓', name: 'Centre de formation', desc: 'Bibliothèque de cas & résidanat' },
  { icon: '📋', name: 'Intégration SIL', desc: 'Compatible HL7 / FHIR' },
  { icon: '📊', name: 'Tableaux de bord', desc: 'Indicateurs & registre national' },
]

export default function Solution() {
  return (
    <section id="solution" className="section-white py-32 px-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="reveal">
          <SectionHeader
            eyebrow="La plateforme PathoMind"
            title="Un écosystème intégré, conçu pour le terrain algérien et africain"
            subtitle="PathoMind n'est pas une solution occidentale adaptée à l'Afrique. C'est une plateforme pensée dès l'origine pour des environnements à connectivité variable, des infrastructures hétérogènes, et des exigences réglementaires propres à la région."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Pillars */}
          <div className="reveal delay-1">
            <div className="flex flex-col">
              {PILLARS.map((p) => (
                <div
                  key={p.n}
                  className="flex gap-5 py-6 border-b border-border last:border-0 group transition-transform duration-300 hover:translate-x-1"
                >
                  <div
                    className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-md border border-border font-mono text-blue-2 font-medium mt-0.5 transition-colors duration-200 group-hover:border-blue-2/40"
                    style={{ fontSize: '.62rem' }}
                  >
                    {p.n}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink mb-1">{p.title}</div>
                    <div className="font-light text-muted leading-relaxed" style={{ fontSize: '.79rem' }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform card */}
          <div className="reveal delay-2">
            <div className="bg-ink rounded-2xl overflow-hidden" style={{ boxShadow: '0 40px 80px rgba(6,13,26,.35)' }}>
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: 'rgba(255,255,255,.07)' }}
              >
                <span className="font-mono text-white/28 tracking-widest uppercase" style={{ fontSize: '.62rem' }}>
                  PathoMind · v2.4 · CHU Mustapha, Alger
                </span>
                <div className="flex items-center gap-1.5 font-mono text-green-400" style={{ fontSize: '.58rem' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Tous les services opérationnels
                </div>
              </div>
              <div className="grid grid-cols-2" style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
                {MODULES.map((m, i) => (
                  <div
                    key={m.name}
                    className="p-6 transition-colors duration-200 hover:bg-white/4 cursor-default"
                    style={{
                      borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,.05)' : undefined,
                      borderBottom: i < 4 ? '1px solid rgba(255,255,255,.05)' : undefined,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 text-base"
                      style={{ background: 'rgba(26,92,212,.2)', border: '1px solid rgba(58,127,245,.14)' }}
                    >
                      {m.icon}
                    </div>
                    <div className="text-sm font-medium text-white/82 mb-1">{m.name}</div>
                    <div className="text-white/28 leading-snug" style={{ fontSize: '.7rem' }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
