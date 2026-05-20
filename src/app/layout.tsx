import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Axis Concept — Luxury Real Estate, Bangalore',
    template: '%s | Axis Concept',
  },
  description:
    'Axis Concept builds benchmark residential and commercial properties in Bangalore, rooted in biophilic design philosophy. 25+ years of excellence.',
  keywords: [
    'real estate bangalore', 'luxury apartments bangalore', 'commercial property bangalore',
    'biophilic design', 'residential projects', 'axis concept', 'property developer bangalore',
    'new flats bangalore', 'RERA registered',
  ],
  authors:  [{ name: 'Axis Concept', url: 'https://www.axisconcept.in' }],
  creator:  'Axis Concept',
  publisher: 'Axis Concept',
  metadataBase: new URL('https://www.axisconcept.in'),
  alternates: { canonical: 'https://www.axisconcept.in' },
  openGraph: {
    type:        'website',
    locale:      'en_IN',
    url:         'https://www.axisconcept.in',
    siteName:    'Axis Concept',
    title:       'Axis Concept — Luxury Real Estate, Bangalore',
    description: 'Benchmark residential and commercial properties in Bangalore, rooted in biophilic design. 25+ years, 200+ projects.',
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@axisconcept',
    creator:     '@axisconcept',
    title:       'Axis Concept — Luxury Real Estate, Bangalore',
    description: 'Benchmark residential and commercial properties in Bangalore, rooted in biophilic design.',
  },
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    // google: 'your-google-search-console-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        {/* Skip to main content — screen readers and keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded focus:bg-[#C9A96E] focus:text-[#0F1117] focus:font-sans focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
