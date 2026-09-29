import SectionHeader from '../components/SectionHeader'

const FEATURES = [
  {
    n: '01', icon: '🔬',
    title: "Un viewer de lames qui ne trahit pas la microscopie",
    desc: "La visionneuse PathoMind restitue fidèlement ce que vous voyez au microscope : résolution sub-micronique, navigation fluide à toutes les échelles de grossissement, comparaison multi-colorations (H&E, PAS, Masson, immunohistochimie), mesure des structures tissulaires et synchronisation de vue entre collaborateurs.",
    quote: "Fini le « tu peux m'envoyer la lame ? » — vous travaillez ensemble sur la même image, en temps réel, depuis deux bureaux différents.",
    tag: 'WSI · Multi-résolution · IHC',
  },
  {
    n: '02', icon: '✍️',
    title: "Des annotations comme sur papier — en mieux",
    desc: "Dessinez sur la lame, délimitez une zone suspecte au polygone, posez un commentaire ancré à une coordonnée précise. Chaque annotation est horodatée, signée et associée à votre identifiant — elle fait partie du dossier histologique. Vos annotations sont visibles par vos co-lecteurs en temps réel.",
    quote: "Ce que je dessinais autrefois au marqueur sur la lamelle, je le fais maintenant directement sur le fichier numérique, avec une précision que le verre ne permettait pas.",
    tag: 'Annotation · Collaboration · Audit trail',
  },
  {
    n: '03', icon: '🔐',
    title: "Partage sécurisé — sans compromettre la confidentialité",
    desc: "Partagez une lame par lien sécurisé à durée limitée, avec contrôle granulaire des droits. Toutes les données restent chiffrées de bout en bout et hébergées sur territoire algérien. Le partage est journalisé : vous savez qui a consulté la lame, à quelle heure, et depuis quel poste.",
    quote: "Je peux partager un cas difficile avec un collègue à l'étranger sans jamais trahir l'identité du patient ni le cadre légal algérien.",
    tag: 'Chiffrement · Hébergement local · RGPD',
  },
  {
    n: '04', icon: '📡',
    title: "La téléexpertise telle qu'elle devrait toujours avoir existé",
    desc: "Sollicitez un second avis sur un cas difficile directement depuis la visionneuse. L'expert consulté accède à la lame entière, annote sa réponse, et vous retourne un avis structuré avec sa signature électronique. Le tout en quelques heures, sans déplacement. Le dossier est complet, traçable, opposable.",
    quote: "J'exerce en wilaya. Avant, un cas difficile pouvait attendre trois semaines pour un avis d'Alger. Maintenant, j'ai une réponse annotée le lendemain matin.",
    tag: 'Téléexpertise · Signature électronique · Réseau national',
  },
  {
    n: '05', icon: '🎓',
    title: "Enseigner sans s'épuiser à sortir les lames",
    desc: "Constituez une bibliothèque de cas annotés en un clic. Attribuez des cas à vos résidents, recevez leurs lectures, corrigez-les directement sur la lame, suivez leur progression cas par cas. Construisez des modules adaptés aux pathologies prévalentes en Algérie.",
    quote: "Je peux superviser mes résidents de Constantine depuis Alger. Ils voient mes corrections sur leur propre lecture — c'est pédagogiquement incomparable.",
    tag: 'Résidanat · Bibliothèque de cas · Supervision à distance',
  },
  {
    n: '06', icon: '🤖',
    title: "L'IA comme second regard — pas comme oracle",
    desc: "Dans un premier temps : triage des cas urgents, contrôle de qualité, détection des zones mitotiques. À terme : aide quantitative au scoring IHC, estimation de l'index Ki-67, détection des emboles vasculaires — chaque modèle validé cliniquement, chaque résultat présenté avec son niveau de confiance, toujours sous votre autorité diagnostique finale.",
    quote: "Je ne veux pas d'une IA qui me dit quoi penser. Je veux une IA qui me dit où regarder d'abord — et pourquoi.",
    tag: 'IA · Ki-67 · Mitoses · Validation clinique',
  },
]

export default function PourPathologistes() {
  return (
    <section id="pathologistes" className="section-off py-32 px-16">
      <div className="max-w-[1200px] mx-auto">

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-20">
          <div className="reveal">
            <SectionHeader
              eyebrow="Conçu pour les anatomopathologistes"
              title={<>Pensé par un praticien.<br />Construit pour le <em className="italic text-blue-2">quotidien du terrain.</em></>}
            />
            {/* Signature */}
            <div className="inline-flex items-center gap-4 bg-white border border-border rounded-xl px-5 py-4 mt-2">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-serif text-white font-medium flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#060d1a,#1a5cd4)', fontSize: '1rem' }}
              >
                AP
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">Fondé par un anatomopathologiste</div>
                <div className="text-muted" style={{ fontSize: '.73rem' }}>PathoMind est né d'une conviction clinique — pas d'un cahier des charges informatique</div>
              </div>
            </div>
          </div>
          <div className="reveal delay-2">
            <p className="font-light text-muted leading-relaxed mb-5" style={{ fontSize: '.95rem' }}>
              PathoMind a été conçu par quelqu'un qui a vécu de l'intérieur ce que signifie exercer l'anatomopathologie dans nos établissements :{' '}
              <strong className="text-text font-medium">des lames qui transitent par voie postale, des délais impossibles à tenir, des avis demandés par téléphone sur une photo floue prise au smartphone</strong>, et des résidents formés sans bibliothèque de cas numérique.
            </p>
            <p className="font-light text-muted leading-relaxed" style={{ fontSize: '.95rem' }}>
              Chaque fonctionnalité répond à un besoin réel, formulé par des pathologistes en exercice. Pas plus de fonctions qu'il n'en faut. Pas moins qu'il n'en faut pour bien travailler.
            </p>
          </div>
        </div>

        {/* Feature rows */}
        <div
          className="flex flex-col"
          style={{ border: '1px solid #dce4f0', borderRadius: 14, overflow: 'hidden', gap: '1px', background: '#dce4f0' }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.n}
              className="bg-white grid group hover:bg-frost transition-colors duration-200 cursor-default reveal"
              style={{ gridTemplateColumns: '64px 1fr', transitionDelay: `${i * 0.05}s` }}
            >
              {/* Left icon column */}
              <div
                className="flex flex-col items-center justify-center gap-2 py-8 px-3 border-r border-border group-hover:bg-frost/50 transition-colors"
              >
                <span className="text-2xl">{f.icon}</span>
                <span className="font-mono font-medium text-border group-hover:text-sky transition-colors" style={{ fontSize: '.58rem' }}>{f.n}</span>
              </div>

              {/* Body */}
              <div className="py-8 px-10">
                <div className="text-sm font-semibold text-ink mb-2">{f.title}</div>
                <div className="font-light text-muted leading-relaxed mb-4" style={{ fontSize: '.8rem' }}>{f.desc}</div>

                {/* Quote */}
                <div className="flex items-start gap-2 pt-4 border-t border-border" style={{ fontSize: '.77rem' }}>
                  <span className="font-serif text-sky leading-none flex-shrink-0" style={{ fontSize: '1.3rem', lineHeight: '.9' }}>"</span>
                  <p className="italic text-text leading-relaxed">{f.quote}</p>
                </div>

                <div className="inline-block mt-3 font-mono text-blue-2 bg-frost border border-ice px-2 py-0.5 rounded-sm" style={{ fontSize: '.58rem', letterSpacing: '.05em' }}>
                  {f.tag}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div
          className="mt-12 rounded-2xl px-14 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center reveal"
          style={{ background: '#060d1a' }}
        >
          <div>
            <div className="font-mono text-sky uppercase tracking-widest mb-4" style={{ fontSize: '.65rem' }}>Notre engagement</div>
            <h3 className="font-serif text-white leading-snug mb-4" style={{ fontSize: '1.6rem', letterSpacing: '-.02em' }}>
              PathoMind évolue avec vous — et avec vos retours.
            </h3>
            <p className="font-light text-white/45 leading-relaxed mb-6" style={{ fontSize: '.84rem' }}>
              Nous travaillons en partenariat étroit avec des anatomopathologistes algériens en exercice pour affiner chaque fonctionnalité. Votre pratique guide notre développement — pas l'inverse.
            </p>
            <a href="#contact" className="btn-primary">
              Demander une démonstration
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
            </a>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: '🗓️', title: 'Mises à jour co-construites', desc: 'Chaque nouvelle fonctionnalité est validée par le comité médical PathoMind avant déploiement' },
              { icon: '🎯', title: 'Pas de surcharge fonctionnelle', desc: 'Chaque outil doit répondre à un cas d\'usage clinique réel, documenté' },
              { icon: '📞', title: 'Support médical dédié', desc: 'Une équipe joignable par les pathologistes — nous parlons histologie, pas seulement informatique' },
              { icon: '🔬', title: 'Validation clinique continue', desc: 'Tous les modules IA sont évalués sur des cohortes algériennes avant toute mise en production' },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 p-4 rounded-lg border transition-colors duration-200 hover:bg-white/7"
                style={{ background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.07)' }}
              >
                <span className="text-base mt-0.5 flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-sm font-medium text-white/82 mb-1">{item.title}</div>
                  <div className="text-white/35 leading-relaxed" style={{ fontSize: '.74rem' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
