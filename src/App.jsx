import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Starfield from './components/Starfield'
import WhatsAppFloat from './components/WhatsAppFloat'
import Hero from './sections/Hero'
import ChiffresCles from './sections/ChiffresCles'
import Produits from './sections/Produits'
import Boitier from './sections/Boitier'
import ScreenshotsLab from './sections/ScreenshotsLab'
import Tarifs from './sections/Tarifs'
import Consulting from './sections/Consulting'
import Partenaires, { Pilotes } from './sections/Partenaires'
import Fondateur from './sections/Fondateur'
import FAQ from './sections/FAQ'
import CTA from './sections/CTA'
import Footer from './sections/Footer'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <Starfield />
      <div className="relative" style={{ zIndex: 1, opacity: splashDone ? 1 : 0, transition: 'opacity .8s ease' }}>
        <Navbar ready={splashDone} />
        <main>
          <Hero ready={splashDone} />
          <Produits />
          <Boitier />
          <ScreenshotsLab />
          <Tarifs />
          <Consulting />
          <ChiffresCles />
          <Partenaires />
          <Pilotes />
          <Fondateur />
          <FAQ />
          <CTA />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </MotionConfig>
  )
}
