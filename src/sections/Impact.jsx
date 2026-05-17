export default function Impact() {
  const nodes = [
    { icon: '🏥', title: "Hôpital de wilaya", desc: "Numérisation locale des prélèvements" },
    { icon: '🔬', title: "Pathologiste", desc: "Lecture digitale depuis n'importe où" },
    { icon: '🤖', title: "IA PathoMind", desc: "Assistance, priorisation, analyse" },
    { icon: '👨‍⚕️', title: "Oncologue", desc: "Décision thérapeutique éclairée" },
    { icon: '🧑', title: "Patient", desc: "Diagnostic précis, traitement adapté" },
  ]

  return (
    <section
      id="impact"
      className="py-28 px-6 lg:px-16"
      style={{ background: '#06080f' }}
    >
      <div className="max-w-[1200px] mx-auto">

        <div className="reveal flex items-center gap-2 mb-5 font-mono uppercase tracking-widest"
          style={{ fontSize: '.68rem', color: '#a78bfa' }}>
          <span className="block w-5 h-px" style={{ background: '#a78bfa' }} />
          Impact humain
        </div>

        <h2
          className="reveal font-serif font-medium text-white leading-tight mb-6"
          style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', letterSpacing: '-.025em', maxWidth: 680 }}
        >
          Derrière chaque lame, il y a un patient qui attend.
        </h2>

        {/* Quote */}
        <blockquote
          className="reveal font-serif italic leading-relaxed mb-6"
          style={{
            fontSize: 'clamp(1.1rem,2vw,1.5rem)',
            color: 'rgba(255,255,255,.82)',
            maxWidth: 720,
            letterSpacing: '-.015em',
          }}
        >
          "Un patient dans une wilaya éloignée mérite le même accès à l'expertise oncologique qu'un patient dans un grand centre universitaire.{' '}
          <em style={{ color: '#c4b5fd', fontStyle: 'normal' }}>
            PathoMind construit ce pont.
          </em>"
        </blockquote>

        <p
          className="reveal font-light leading-relaxed mb-16"
          style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.45)', maxWidth: 580 }}
        >
          PathoMind connecte l'ensemble de l'écosystème oncologique algérien en un réseau diagnostique cohérent — du prélèvement au compte-rendu, de la périphérie au centre de référence.
        </p>

        {/* Connection chain */}
        <div
          className="reveal grid"
          style={{ gridTemplateColumns: 'repeat(5,1fr)', gap: 0 }}
        >
          {nodes.map((node, i) => (
            <div
              key={i}
              className="text-center px-4 py-8 relative"
              style={{
                borderRight: i < nodes.length - 1 ? '1px solid rgba(255,255,255,.06)' : undefined,
              }}
            >
              {/* Arrow */}
              {i < nodes.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%', right: -6,
                    transform: 'translateY(-50%)',
                    width: 10, height: 10,
                    borderTop: '1px solid rgba(139,92,246,.5)',
                    borderRight: '1px solid rgba(139,92,246,.5)',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 2,
                  }}
                />
              )}

              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                style={{
                  background: 'rgba(109,40,217,.15)',
                  border: '1px solid rgba(139,92,246,.25)',
                  boxShadow: '0 0 30px rgba(109,40,217,.1)',
                }}
              >
                {node.icon}
              </div>
              <div
                className="font-semibold mb-1"
                style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.82)' }}
              >
                {node.title}
              </div>
              <div
                className="font-light leading-snug"
                style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.32)' }}
              >
                {node.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
