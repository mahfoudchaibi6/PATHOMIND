import { useEffect } from 'react'
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
  // Scroll reveal — runs once after mount
  useEffect(() => {
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
  }, [])

  return (
    <>
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
    </>
  )
}
