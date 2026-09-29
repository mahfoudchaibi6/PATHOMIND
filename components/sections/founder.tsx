import Image from 'next/image'
import { FlaskConical, Quote } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'

const RESEARCH = [
  'Classification morphologique des lymphomes B diffus à grandes cellules (DLBCL) sur lames entières',
  'Prédiction du risque de rechute des DLBCL à partir de caractéristiques histologiques numériques',
]

export function Founder() {
  return (
    <section id="fondateur" className="section bg-white text-slate-700">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="mx-auto max-w-[320px] lg:mx-0">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-soft">
              <Image
                src="/images/founder.webp"
                alt="Dr Mahfoud Chaibi, anatomopathologiste, fondateur de PathoMind"
                width={640}
                height={696}
                sizes="320px"
                className="h-auto w-full"
              />
            </div>
            <div className="mt-6">
              <p className="text-lg font-semibold text-ink-950">Dr Mahfoud Chaibi</p>
              <p className="mt-1 text-sm text-slate-500">Anatomopathologiste · Fondateur de PathoMind</p>
              <p className="mt-4 inline-flex rounded-full border border-slate-200 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-slate-500">
                Incubé à Algeria Venture
              </p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="eyebrow eyebrow-dark">Le fondateur</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <blockquote className="relative mt-6">
              <Quote className="absolute -left-1 -top-2 size-8 text-brand-200" aria-hidden />
              <p className="text-balance pl-10 font-serif text-2xl leading-snug text-ink-950 md:text-[2rem]">
                PathoMind est né au microscope, d’une question simple : pourquoi nos laboratoires travaillent-ils
                encore avec des registres papier et des fichiers éparpillés ?
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 space-y-4 leading-relaxed text-slate-600 md:text-[1.05rem]">
              <p>
                Anatomopathologiste, le Dr Chaibi a vécu au quotidien ce qui ralentit un laboratoire ACP : les
                délais de rendu, les pertes d’information entre la réception et la lecture, le manque d’outils pour
                demander un second avis à distance.
              </p>
              <p>
                PathoMind répond à ces besoins avec des outils concrets, construits avec les équipes des
                laboratoires : secrétariat, techniciens et pathologistes.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-paper p-6 md:p-7">
              <div className="flex items-center gap-2.5">
                <FlaskConical className="size-4 text-brand-700" aria-hidden />
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brand-700">
                  Recherche en pathologie numérique
                </p>
              </div>
              <ul className="mt-4 space-y-3">
                {RESEARCH.map((r) => (
                  <li key={r} className="flex gap-3 text-[0.95rem] text-slate-700">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-slate-200 pt-4 text-sm text-slate-500">
                Travaux de recherche menés indépendamment des produits. Ils ne constituent pas des fonctionnalités
                de diagnostic de PathoMind.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
