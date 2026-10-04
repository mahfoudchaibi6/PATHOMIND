import { motion } from 'framer-motion'
import { fadeInUp, inView, staggerContainer } from '../lib/animations'

export function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4"/>
    </svg>
  )
}

// Élément qui apparaît au scroll (fadeInUp par défaut)
export function Reveal({ as = 'div', variants = fadeInUp, delay = 0, className, style, children, ...rest }) {
  const Comp = motion[as]
  const v = delay ? { ...variants, show: { ...variants.show, transition: { ...variants.show.transition, delay } } } : variants
  return (
    <Comp
      {...inView}
      variants={v}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Comp>
  )
}

// Conteneur qui déclenche ses enfants en cascade (enfants : motion.* avec variants)
export function Stagger({ as = 'div', stagger = 0.1, delay = 0, className, style, children, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp {...inView} variants={staggerContainer(stagger, delay)} className={className} style={style} {...rest}>
      {children}
    </Comp>
  )
}

// En-tête de section standard : eyebrow + titre + intro
export function SectionHeading({ eyebrow, title, lead, dark = false, center = false, className = '' }) {
  return (
    <Stagger className={`${center ? 'text-center mx-auto' : ''} max-w-[680px] ${className}`}>
      <motion.div variants={fadeInUp} className={center ? 'flex justify-center' : ''}>
        <span className={`pm-eyebrow ${dark ? 'pm-eyebrow-light' : ''}`}>{eyebrow}</span>
      </motion.div>
      <motion.h2 variants={fadeInUp} className="pm-h2 mt-6" style={{ color: dark ? 'rgba(255,255,255,.95)' : '#0a0f1e' }}>
        {title}
      </motion.h2>
      {lead && (
        <motion.p variants={fadeInUp} className={`pm-lead mt-7 ${center ? 'mx-auto' : ''}`}
          style={{ color: dark ? 'rgba(255,255,255,.55)' : '#5a6478', maxWidth: 560 }}>
          {lead}
        </motion.p>
      )}
    </Stagger>
  )
}
