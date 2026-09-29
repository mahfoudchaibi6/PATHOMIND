import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { TrustBar } from '@/components/sections/trust-bar'
import { Products } from '@/components/sections/products'
import { Workflow } from '@/components/sections/workflow'
import { LocalFirst } from '@/components/sections/local-first'
import { LabDemo } from '@/components/sections/lab-demo'
import { Why } from '@/components/sections/why'
import { Founder } from '@/components/sections/founder'
import { Faq } from '@/components/sections/faq'
import { DemoForm } from '@/components/sections/demo-form'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="overflow-x-clip">
        <Hero />
        <TrustBar />
        <Products />
        <Workflow />
        <LocalFirst />
        <LabDemo />
        <Why />
        <Founder />
        <Faq />
        <DemoForm />
      </main>
      <Footer />
    </>
  )
}
