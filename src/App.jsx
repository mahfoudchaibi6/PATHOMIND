import { useEffect, useState } from 'react'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import ChiffresCles from './sections/ChiffresCles'
import Probleme from './sections/Probleme'
import Solution from './sections/Solution'
import Hopitaux from './sections/Hopitaux'
import PourPathologistes from './sections/PourPathologistes'
import IASection from './sections/IASection'
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
      { threshold: 0.09 }
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
          <ChiffresCles />
          <Probleme />
          <Solution />
          <Hopitaux />
          <PourPathologistes />
          <IASection />
          <Fondateur />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  )
}