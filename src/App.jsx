import { useEffect, useState } from 'react'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import ChiffresCles from './sections/ChiffresCles'
import Produits from './sections/Produits'
import ScreenshotsLab from './sections/ScreenshotsLab'
import Consulting from './sections/Consulting'
import Fondateur from './sections/Fondateur'
import CTA from './sections/CTA'
import Footer from './sections/Footer'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  useEffect(() => {
    if (!splashDone) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in')
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    const els = document.querySelectorAll('.reveal')
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [splashDone])

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <div style={{ opacity: splashDone ? 1 : 0, transition: 'opacity .8s ease' }}>
        <Navbar />
        <main>
          <Hero />
          <Produits />
          <ScreenshotsLab />
          <Consulting />
          <ChiffresCles />
          <Fondateur />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
