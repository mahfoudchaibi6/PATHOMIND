import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import CountUp from '../components/CountUp'
import { Arrow } from '../components/ui'
import { EASE, fadeInUp, staggerContainer, wordReveal } from '../lib/animations'

// Titre : chaque ligne est une liste de mots ; `accent` = mot en dégradé violet
const LINES = [
  [{ w: 'Faire' }, { w: 'reculer' }, { w: 'le' }, { w: 'cancer,' }],
  [{ w: 'une', accent: true }, { w: 'lame', accent: true }, { w: 'à', accent: true }, { w: 'la', accent: true }, { w: 'fois.', accent: true }],
]

const METRICS = [
  { n: '3', l: 'Produits intégrés' },
  { n: '24h', l: 'Délai de réponse support' },
  { n: '100%', l: 'Données hébergées en Algérie' },
]

export default function Hero({ ready = true }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const state = ready ? 'show' : 'hidden'
  let idx = 0

  return (
    <section id="hero" ref={ref} className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ background: 'transparent' }}>

      {/* Nébuleuse violette depuis la droite (les étoiles viennent du fond global) */}
      <motion.div aria-hidden="true" className="absolute pointer-events-none"
        style={{
          right: '-18%', top: '-10%', width: '80%', height: '110%',
          background: 'radial-gradient(closest-side, rgba(124,58,237,.30), rgba(124,58,237,.08) 55%, transparent 75%)',
          filter: 'blur(20px)',
        }}
        animate={reduce ? undefined : { x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div aria-hidden="true" className="absolute pointer-events-none" style={{
        left: '-20%', bottom: '-30%', width: '60%', height: '70%',
        background: 'radial-gradient(closest-side, rgba(167,139,250,.08), transparent)',
      }}/>
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(5,8,16,.6))' }}/>

      <motion.div style={{ y, opacity: fade }} className="relative z-10 pm-container w-full text-center pt-32 pb-24 md:pt-36 md:pb-24">
        <motion.div initial="hidden" animate={state} variants={staggerContainer(0.1, 0.1)}>

          {/* Badge */}
          <motion.div variants={fadeInUp} className="flex justify-center">
            <span className="inline-flex items-center gap-3 rounded-full pl-3 pr-4 py-1.5"
              style={{ background: 'rgba(124,58,237,.1)', border: '1px solid rgba(167,139,250,.22)', boxShadow: '0 0 24px -6px rgba(124,58,237,.4) inset' }}>
              <span className="pm-pulse" aria-hidden="true"/>
              <span className="pm-mono uppercase" style={{ fontSize: '.7rem', letterSpacing: '.16em', color: '#c4b5fd' }}>
                Startup Medtech Algérienne
              </span>
            </span>
          </motion.div>

          {/* Titre — révélation mot par mot */}
          <motion.h1 variants={staggerContainer(0.07, 0.15)} className="pm-display mt-10 mx-auto"
            style={{ fontSize: 'clamp(2.6rem, 6.4vw, 5.6rem)', color: 'rgba(255,255,255,.95)' }}>
            {LINES.map((line, li) => (
              <span key={li} className="md:block md:whitespace-nowrap">
                {line.map((t) => {
                  const k = idx++
                  return (
                    <span key={k} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: '.08em', marginBottom: '-.08em' }}>
                      <motion.span variants={wordReveal}
                        className={`inline-block ${t.accent ? 'pm-gradient-text italic' : ''}`}
                        style={t.accent ? { paddingRight: '.06em' } : undefined}>
                        {t.w}
                      </motion.span>
                      {' '}
                    </span>
                  )
                })}
              </span>
            ))}
          </motion.h1>

          {/* Sous-titre */}
          <motion.p variants={fadeInUp} className="mx-auto mt-9"
            style={{ fontSize: 'clamp(1.0625rem, 1.4vw, 1.1875rem)', lineHeight: 1.75, color: 'rgba(255,255,255,.6)', maxWidth: 600 }}>
            Nous digitalisons l'anatomopathologie, là où commence chaque diagnostic de cancer, pour des résultats plus rapides, plus précis et accessibles dans chaque wilaya.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 sm:gap-4 mt-12 flex-wrap">
            <a href="#produits" className="pm-btn">
              Découvrir nos produits <Arrow/>
            </a>
            <a href="#contact" className="pm-btn-ghost">Demander une démo</a>
          </motion.div>

          {/* Métriques */}
          <motion.div variants={fadeInUp} className="mx-auto mt-20 md:mt-20" style={{ maxWidth: 820 }}>
            <div className="pm-divider-dark"/>
            <div className="grid grid-cols-3 gap-4 pt-10">
              {METRICS.map((m, i) => (
                <div key={m.l} className="relative">
                  {i > 0 && <span aria-hidden="true" className="absolute left-0 top-1 bottom-1 w-px" style={{ background: 'rgba(255,255,255,.08)' }}/>}
                  <div className="pm-display" style={{ fontSize: 'clamp(2rem, 3.6vw, 2.9rem)', color: '#fff', lineHeight: 1 }}>
                    <CountUp value={m.n} start={ready} delay={0.9 + i * 0.12}/>
                  </div>
                  <div className="pm-mono uppercase mt-4 px-2" style={{ fontSize: '.66rem', letterSpacing: '.16em', color: 'rgba(167,139,250,.7)', lineHeight: 1.6 }}>
                    {m.l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicateur de scroll */}
      <motion.a href="#produits" aria-label="Défiler vers les produits"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-6 h-10 rounded-full justify-center pt-2"
        style={{ border: '1px solid rgba(255,255,255,.18)' }}
        initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 1.6, duration: 0.8, ease: EASE }}>
        <motion.span className="block w-1 h-2 rounded-full" style={{ background: '#a78bfa' }}
          animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}/>
      </motion.a>
    </section>
  )
}
