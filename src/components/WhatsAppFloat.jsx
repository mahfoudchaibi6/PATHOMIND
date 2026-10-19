import { useEffect, useState } from 'react'
import { WhatsAppIcon } from '../sections/CTA'
import { WHATSAPP_HREF } from '../lib/site'

// Bouton WhatsApp flottant (mobile uniquement). Masqué tant que le numéro n'est pas renseigné
// et pendant que le formulaire de contact est à l'écran, pour ne jamais couvrir le bouton d'envoi.
export default function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const contact = document.querySelector('#contact')
    if (!contact) return
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { rootMargin: '0px 0px -10% 0px' })
    io.observe(contact)
    return () => io.disconnect()
  }, [])

  if (!WHATSAPP_HREF) return null

  return (
    <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" aria-label="Nous écrire sur WhatsApp"
      className="lg:hidden fixed z-40 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white transition-[opacity,transform] duration-300"
      style={{
        bottom: 'max(16px, env(safe-area-inset-bottom))',
        background: '#1f9d55',
        boxShadow: '0 10px 30px -8px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.12)',
        opacity: hidden ? 0 : 1,
        transform: hidden ? 'translateY(12px)' : 'none',
        pointerEvents: hidden ? 'none' : 'auto',
      }}>
      <WhatsAppIcon size={24}/>
    </a>
  )
}
