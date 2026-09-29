import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { MotionProvider } from '@/components/motion/motion-provider'
import { SITE } from '@/lib/content'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

const title = 'PathoMind · Logiciel de laboratoire d’anatomopathologie (ACP)'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: '%s · PathoMind' },
  description: SITE.description,
  keywords: [
    'anatomopathologie',
    'anatomie et cytologie pathologiques',
    'ACP',
    'logiciel laboratoire anatomopathologie',
    'LIS anatomopathologie',
    'pathologie numérique',
    'lames numériques',
    'télépathologie',
    'second avis',
    'Algérie',
  ],
  authors: [{ name: 'PathoMind' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_DZ',
    url: SITE.url,
    siteName: 'PathoMind',
    title,
    description: SITE.description,
  },
  twitter: { card: 'summary_large_image', title, description: SITE.description },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#070B16',
  colorScheme: 'dark',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'PathoMind',
      url: SITE.url,
      logo: `${SITE.url}/icon.png`,
      email: SITE.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Dély Ibrahim, Alger', addressCountry: 'DZ' },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'PathoMind Lab',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'Système de gestion de laboratoire d’anatomie et cytologie pathologiques.',
      publisher: { '@type': 'Organization', name: 'PathoMind' },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu
        </a>
        <MotionProvider>{children}</MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  )
}
