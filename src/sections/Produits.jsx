export default function Produits() {
  return (
    <section id="produits" className="py-28 px-6 lg:px-16" style={{ background: '#06080f' }}>
      <div className="max-w-[1200px] mx-auto">

        {/* Eyebrow */}
        <div className="reveal flex items-center gap-2 mb-5 font-mono uppercase tracking-widest" style={{ fontSize: '.68rem', color: '#a78bfa' }}>
          <span className="block w-5 h-px" style={{ background: '#a78bfa' }}/>
          Nos produits
        </div>

        <h2 className="reveal font-serif font-medium text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', letterSpacing: '-.025em', maxWidth: 640 }}>
          Deux produits. Une vision.<br/>
          <em className="italic" style={{ color: '#a78bfa' }}>L'écosystème médical algérien digitalisé.</em>
        </h2>

        <p className="reveal font-light leading-relaxed mb-16"
          style={{ fontSize: '.92rem', color: 'rgba(255,255,255,.5)', maxWidth: 560 }}>
          PathoMind développe une suite de logiciels médicaux conçus pour les laboratoires et hôpitaux algériens — simples à déployer, adaptés au terrain, souverains.
        </p>

        {/* ── DEUX PRODUITS PHARES ── */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* ── PathoMind Lab ── */}
          <div className="rounded-2xl overflow-hidden flex flex-col"
            style={{ background: '#0d1120', border: '1px solid rgba(167,139,250,.2)', boxShadow: '0 20px 60px rgba(0,0,0,.4)' }}>

            {/* Header */}
            <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: 'rgba(124,58,237,.2)', border: '1px solid rgba(167,139,250,.25)' }}>
                  🗂️
                </div>
                <div className="flex items-center gap-1.5 font-mono px-2.5 py-1 rounded-full"
                  style={{ fontSize: '.58rem', color: '#4ade80', background: 'rgba(74,222,128,.1)', border: '1px solid rgba(74,222,128,.2)' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"/>
                  Produit disponible
                </div>
              </div>

              <div className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: '.6rem', color: '#8b5cf6' }}>Produit 01</div>
              <h3 className="font-serif text-white font-medium mb-2" style={{ fontSize: '1.5rem', letterSpacing: '-.02em' }}>PathoMind Lab</h3>
              <p className="font-light leading-relaxed" style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.5)' }}>
                Le système d'information de laboratoire d'anatomopathologie conçu pour les laboratoires privés algériens — simple, complet et opérationnel immédiatement.
              </p>
            </div>

            {/* Workflow visuel */}
            <div className="px-8 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
              <div className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: '.58rem', color: 'rgba(255,255,255,.25)' }}>
                Workflow complet
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                {['Dossier', 'Prélèvement', 'Macroscopie', 'Blocs', 'Lames', 'Worklist', 'Compte-rendu', 'PDF'].map((step, i, arr) => (
                  <div key={step} className="flex items-center gap-1">
                    <div className="font-mono px-2.5 py-1 rounded"
                      style={{ fontSize: '.6rem', color: '#c4b5fd', background: 'rgba(124,58,237,.15)', border: '1px solid rgba(167,139,250,.15)' }}>
                      {step}
                    </div>
                    {i < arr.length - 1 && (
                      <span style={{ color: 'rgba(167,139,250,.3)', fontSize: '.7rem' }}>→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="px-8 py-6 flex-1">
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { icon: '👤', text: 'Gestion patients & prescripteurs' },
                  { icon: '🧫', text: 'Suivi prélèvements → blocs → lames' },
                  { icon: '📝', text: 'Éditeur de CR avec modèles' },
                  { icon: '📄', text: 'Export PDF automatique' },
                  { icon: '📋', text: 'Worklist pathologiste' },
                  { icon: '☁️', text: 'Hébergé en Algérie — données souveraines' },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-2.5">
                    <span style={{ fontSize: '.85rem' }}>{f.icon}</span>
                    <span className="font-light" style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.55)' }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="px-8 pb-8">
              <a href="#contact"
                className="flex items-center justify-center gap-2 w-full font-mono font-semibold uppercase tracking-wider text-white rounded-lg transition-all duration-200"
                style={{ fontSize: '.75rem', background: '#7c3aed', padding: '.9rem', letterSpacing: '.08em', boxShadow: '0 4px 20px rgba(124,58,237,.35)' }}
                onMouseEnter={e => e.currentTarget.style.background='#6d28d9'}
                onMouseLeave={e => e.currentTarget.style.background='#7c3aed'}>
                Demander une démo PathoMind Lab
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </a>
            </div>
          </div>

          {/* ── PathoMind WSI ── */}
          <div className="rounded-2xl overflow-hidden flex flex-col"
            style={{ background: '#0a0d18', border: '1px solid rgba(255,255,255,.08)' }}>

            {/* Header */}
            <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: 'rgba(26,92,212,.2)', border: '1px solid rgba(107,174,248,.2)' }}>
                  🔬
                </div>
                <div className="flex items-center gap-1.5 font-mono px-2.5 py-1 rounded-full"
                  style={{ fontSize: '.58rem', color: '#a78bfa', background: 'rgba(124,58,237,.1)', border: '1px solid rgba(167,139,250,.2)' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400"/>
                  En déploiement
                </div>
              </div>

              <div className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: '.6rem', color: '#8b5cf6' }}>Produit 02</div>
              <h3 className="font-serif text-white font-medium mb-2" style={{ fontSize: '1.5rem', letterSpacing: '-.02em' }}>PathoMind WSI</h3>
              <p className="font-light leading-relaxed" style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.5)' }}>
                La plateforme de pathologie digitale — visionneuse de lames entières, téléexpertise sécurisée et intelligence artificielle clinique pour l'oncologie.
              </p>
            </div>

            {/* Modules */}
            <div className="px-8 py-6 flex-1">
              <div className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: '.58rem', color: 'rgba(255,255,255,.25)' }}>
                Modules
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { icon: '🖥️', text: 'Visionneuse WSI haute résolution' },
                  { icon: '📡', text: 'Téléexpertise inter-établissements' },
                  { icon: '✍️', text: 'Annotations collaboratives' },
                  { icon: '🤖', text: 'IA — segmentation tumorale (oncologie)' },
                  { icon: '🎓', text: 'Formation médicale & résidanat digital' },
                  { icon: '🏥', text: 'Réseau multi-sites & CHU' },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-2.5">
                    <span style={{ fontSize: '.85rem' }}>{f.icon}</span>
                    <span className="font-light" style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.55)' }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="px-8 pb-8">
              <a href="#contact"
                className="flex items-center justify-center gap-2 w-full font-mono font-semibold uppercase tracking-wider rounded-lg transition-all duration-200"
                style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.6)', padding: '.9rem', letterSpacing: '.08em', border: '1px solid rgba(255,255,255,.15)', background: 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='rgba(255,255,255,.4)' }}
                onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,.6)'; e.currentTarget.style.borderColor='rgba(255,255,255,.15)' }}>
                En savoir plus sur PathoMind WSI
              </a>
            </div>
          </div>
        </div>

        {/* ── BANDE SERVICES ── */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            { icon: '🔧', title: 'Intégration & déploiement', desc: 'Installation sur site, configuration sur mesure et formation des équipes médicales.' },
            { icon: '🛟', title: 'Support technique local', desc: 'Équipe basée en Algérie — réponse rapide, assistance en français et en arabe.' },
            { icon: '📋', title: 'Conformité & souveraineté', desc: 'Données hébergées en Algérie, conformes aux exigences du Ministère de la Santé.' },
          ].map((s) => (
            <div key={s.title} className="rounded-xl p-6 flex gap-4 items-start"
              style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)' }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{s.icon}</span>
              <div>
                <div className="font-semibold text-white mb-1" style={{ fontSize: '.85rem' }}>{s.title}</div>
                <div className="font-light leading-relaxed" style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.38)' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
