import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SectionHeader } from '@/components/section-header'
import { Reveal } from '@/components/motion/reveal'
import { FAQ } from '@/lib/content'

export function Faq() {
  return (
    <section id="faq" className="section bg-paper text-slate-700">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeader
            light
            eyebrow="Questions fréquentes"
            title={
              <>
                Les réponses <span className="hl hl-dark">avant la démo.</span>
              </>
            }
          />
        </div>
        <Reveal delay={0.08} className="lg:col-span-8">
          <Accordion type="single" collapsible className="rounded-2xl border border-slate-200 bg-white px-5 shadow-soft md:px-7">
            {FAQ.map(({ q, a }, i) => (
              <AccordionItem key={q} value={`q-${i}`} className="border-slate-200">
                <AccordionTrigger className="py-5 text-[0.95rem] font-semibold text-ink-950 hover:text-brand-700 hover:no-underline focus-visible:ring-brand-400/40 [&>svg]:text-slate-400">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[0.95rem] leading-relaxed text-slate-600">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
