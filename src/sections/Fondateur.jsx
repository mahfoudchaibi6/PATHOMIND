export default function Fondateur() {
  return (
    <section id="fondateur" className="section-white py-28 px-16 border-t border-border">
      <div className="max-w-[1200px] mx-auto">

        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-16 reveal" style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a8fae' }}>
          <span className="block w-5 h-px bg-border flex-shrink-0" />
          <span className="font-mono text-muted">Le fondateur</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-24 items-start">

          {/* Left */}
          <div className="reveal delay-1">
            {/* Photo */}
            <div className="relative w-36 h-36 mb-8">
              <img
                src="/photo.jpg"
                alt="Dr. Mahfoud Chaibi"
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute inset-[-4px] rounded-full border border-border" />
            </div>

            <h3 className="font-serif text-ink leading-snug mb-1" style={{ fontSize: '1.5rem', letterSpacing: '-.02em' }}>
              Dr. Mahfoud<br />Chaibi
            </h3>
            <div className="text-blue-2 font-medium leading-relaxed mb-6" style={{ fontSize: '.8rem' }}>
              Anatomopathologiste<br />
              Pathologie digitale & IA appliquée à l'histologie
            </div>

            <div className="flex flex-col gap-2 mb-8">
              {[
                'Pathologie digitale',
                "IA appliquée à l'histologie",
                'Classification des lymphomes',
                'Prédiction de rechute DLBCL',
                'Modernisation diagnostique en Afrique',
              ].map((tag) => (
                <div key={tag} className="flex items-center gap-2 text-muted" style={{ fontSize: '.75rem' }}>
                  <div className="w-1 h-1 rounded-full bg-blue-2 flex-shrink-0" />
                  {tag}
                </div>
              ))}
            </div>

            <div className="h-px bg-border mb-6" />

            <p className="font-mono uppercase tracking-widest text-muted mb-3" style={{ fontSize: '.6rem' }}>Travaux publiés</p>
            <div className="flex flex-col gap-2">
              {[
                'Classification IA des DLBCL sur lames WSI',
                'Prédiction de rechute DLBCL par deep learning',
              ].map((pub) => (
                <div
                  key={pub}
                  className="flex items-start gap-2 px-3 py-2.5 bg-offwhite border border-border rounded-md font-mono transition-all duration-200 hover:bg-frost hover:border-blue-2/20 cursor-default"
                  style={{ fontSize: '.6rem' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-2 flex-shrink-0 mt-1" />
                  <span className="text-text leading-snug">{pub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Bio */}
          <div className="reveal delay-2">
            <p
              className="font-serif font-medium italic text-ink leading-relaxed mb-10 pb-10 border-b border-border"
              style={{ fontSize: '1.35rem', letterSpacing: '-.01em' }}
            >
              PathoMind ne naît pas d'une idée de startup —
              il naît d'une <span className="not-italic text-blue-2">frustration clinique</span> et d'une conviction :
              l'anatomopathologie africaine mérite les mêmes outils
              que celle pratiquée à Paris ou à Boston.
            </p>

            <div className="flex flex-col gap-8 mb-8">
              <BioBlock label="Expertise médicale">
                Le Dr. Mahfoud Chaibi est anatomopathologiste, spécialisé dans la pathologie digitale et l'application de l'intelligence artificielle à l'analyse des lames histologiques. Sa pratique clinique quotidienne lui a permis de mesurer avec précision les lacunes de l'infrastructure diagnostique actuelle — délais de rendu, absence d'outils de téléexpertise structurée, formations sans support numérique — et d'y répondre par une solution conçue de l'intérieur, par un praticien, pour des praticiens.
              </BioBlock>

              <BioBlock label="Crédibilité scientifique">
                Ses travaux de recherche portent sur l'une des questions les plus difficiles de la lymphopathologie moderne :{' '}
                <strong className="text-text font-medium">peut-on prédire, dès l'analyse histologique initiale, le comportement clinique d'un lymphome B diffus à grandes cellules ?</strong>{' '}
                Ses deux algorithmes d'IA ont démontré des résultats prometteurs pour la classification moléculaire et la prédiction de rechute. Ces travaux ont fait l'objet de{' '}
                <strong className="text-text font-medium">publications scientifiques</strong>{' '}
                et positionnent PathoMind dans une démarche rigoureusement fondée sur la preuve clinique.
              </BioBlock>
            </div>

            {/* AI algorithms */}
            <div
              className="mb-8 rounded-r-xl"
              style={{ borderLeft: '3px solid #1a5cd4', paddingLeft: '1.8rem', background: 'var(--offwhite)' }}
            >
              <div className="py-7 pr-7">
                <p className="font-mono uppercase tracking-widest text-blue-2 mb-5" style={{ fontSize: '.6rem' }}>
                  Algorithmes IA développés · DLBCL
                </p>
                <div className="flex flex-col gap-5">
                  {[
                    {
                      num: 'Algo. I',
                      title: 'Classification morphologique des DLBCL par deep learning',
                      desc: "Modèle entraîné sur lames WSI pour classifier automatiquement les sous-types morphologiques de lymphome B diffus à grandes cellules — une tâche traditionnellement réservée à des centres experts disposant d'un panel immunohistochimique complet.",
                    },
                    {
                      num: 'Algo. II',
                      title: 'Prédiction de rechute chez les patients DLBCL',
                      desc: "Algorithme de prédiction du risque de rechute à partir des caractéristiques histologiques numériques, permettant d'identifier dès le diagnostic initial les patients nécessitant une intensification thérapeutique — sans recourir à des examens génomiques coûteux.",
                    },
                  ].map((algo) => (
                    <div key={algo.num} className="flex gap-5 pb-5 border-b border-border last:border-0 last:pb-0">
                      <span className="font-mono text-blue-2 font-medium flex-shrink-0 pt-0.5" style={{ fontSize: '.65rem' }}>
                        {algo.num}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-ink mb-1.5">{algo.title}</div>
                        <div className="font-light text-muted leading-relaxed mb-2" style={{ fontSize: '.78rem' }}>{algo.desc}</div>
                        <div
                          className="inline-flex items-center gap-1.5 font-mono text-blue-2 bg-frost border border-ice px-2 py-0.5 rounded-sm"
                          style={{ fontSize: '.6rem', letterSpacing: '.05em' }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-2" />
                          Résultats prometteurs · Publié
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="rounded-xl p-8 relative overflow-hidden" style={{ background: '#060d1a' }}>
              <div
                className="absolute top-2 left-6 font-serif leading-none select-none pointer-events-none"
                style={{ fontSize: '5rem', lineHeight: '.8', color: 'rgba(26,92,212,.25)' }}
              >
                "
              </div>
              <p
                className="font-serif italic text-white/80 leading-relaxed relative z-10 mb-5"
                style={{ fontSize: '1.05rem' }}
              >
                J'ai développé ces algorithmes en me posant une question simple : si un patient DLBCL est suivi dans un hôpital de wilaya, sans accès à la biologie moléculaire ni à un hématopathologiste expert, comment peut-on l'aider à recevoir le bon traitement dès le départ ? La réponse est dans la lame — et l'IA peut l'y trouver.
              </p>
              <div
                className="pt-5 border-t font-mono text-white/28"
                style={{ borderColor: 'rgba(255,255,255,.07)', fontSize: '.6rem', letterSpacing: '.06em' }}
              >
                Dr. Mahfoud Chaibi · Fondateur, PathoMind
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

function BioBlock({ label, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="block w-4 h-px bg-sky" />
        <span className="font-mono text-sky uppercase tracking-widest" style={{ fontSize: '.62rem', letterSpacing: '.14em' }}>
          {label}
        </span>
      </div>
      <p className="font-light text-muted leading-relaxed" style={{ fontSize: '.9rem' }}>{children}</p>
    </div>
  )
}
