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
    'Axis Concept builds benchmark residential and commercial properties in Bangalore, rooted in biophilic design philosophy.',
  keywords: ['real estate', 'bangalore', 'luxury apartments', 'commercial property', 'biophilic design'],
  authors: [{ name: 'Axis Concept' }],
  creator: 'Axis Concept',
  metadataBase: new URL('https://www.axisconcept.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.axisconcept.in',
    siteName: 'Axis Concept',
    title: 'Axis Concept — Luxury Real Estate, Bangalore',
    description:
      'Benchmark residential and commercial properties in Bangalore, rooted in biophilic design.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axis Concept — Luxury Real Estate, Bangalore',
    description:
      'Benchmark residential and commercial properties in Bangalore, rooted in biophilic design.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
        {children}
      </body>
    </html>
  )
}
