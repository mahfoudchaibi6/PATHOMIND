'use client'

import { useEffect, useRef, useState } from 'react'
import { SITE } from '@/lib/content'

const SRC = '/videos/pathomind-lab.mp4'
const POSTER = '/products/pathomind-lab.png'

/**
 * Visite vidéo de PathoMind Lab.
 * - La source n'est attachée qu'à l'approche de la section : les 5 Mo ne pèsent pas sur le chargement initial.
 * - Lecture auto, muette, en boucle ; contrôles visibles au survol ou au focus (toujours sur écran tactile).
 * - Si l'utilisateur réduit les animations : pas de lecture automatique, contrôles affichés.
 */
export function LabVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [near, setNear] = useState(false)
  const [hover, setHover] = useState(false)
  const [touch, setTouch] = useState(false)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    setTouch(window.matchMedia('(hover: none)').matches)
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Source ajoutée à l'approche : il faut relancer le chargement
  useEffect(() => {
    if (near) ref.current?.load()
  }, [near])

  // Pause hors écran pour économiser batterie et CPU
  useEffect(() => {
    const el = ref.current
    if (!el || !near || reduce) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {})
      else el.pause()
    })
    io.observe(el)
    return () => io.disconnect()
  }, [near, reduce])

  return (
    <video
      ref={ref}
      className="block size-full bg-ink-950 object-cover"
      autoPlay={!reduce}
      muted
      loop
      playsInline
      preload="metadata"
      poster={POSTER}
      controls={hover || touch || reduce}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-label="Visite guidée de PathoMind Lab : connexion par rôle, dossier, macroscopie, blocs et lames, compte-rendu, PDF et facturation (données fictives)"
    >
      {near && <source src={SRC} type="video/mp4" />}
      Votre navigateur ne permet pas de lire cette vidéo.{' '}
      <a href={SRC}>Télécharger la visite de PathoMind Lab (MP4)</a> ou écrivez-nous à {SITE.email}.
    </video>
  )
}
