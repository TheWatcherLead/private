import { Suspense } from 'react'
import { Hero } from '@/components/home/hero'
import { StatsBar } from '@/components/home/stats-bar'
import { FeaturedProperties } from '@/components/home/featured-properties'
import { PhilosophySection } from '@/components/home/philosophy-section'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { Testimonials } from '@/components/home/testimonials'
import { CtaBanner } from '@/components/home/cta-banner'
import { PropertyCardSkeleton } from '@/components/ui/skeleton'
import {
  getFeaturedProperties,
  getFeaturedProjects,
} from '@/lib/supabase/queries'

export const revalidate = 3600

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Axis Concept',
  description: 'Luxury residential and commercial real estate developer in Bangalore, rooted in biophilic design philosophy.',
  url: 'https://www.axisconcept.in',
  telephone: '+91-96061-16110',
  email: 'sales@axisconcept.in',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.9716,
    longitude: 77.5946,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
  sameAs: [
    'https://instagram.com/axisconcept',
    'https://linkedin.com/company/axisconcept',
  ],
  areaServed: {
    '@type': 'City',
    name: 'Bangalore',
  },
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 50 },
  foundingDate: '1999',
}

async function FeaturedPropertiesSection() {
  const properties = await getFeaturedProperties()
  return <FeaturedProperties properties={properties} />
}

async function FeaturedProjectsSection() {
  const projects = await getFeaturedProjects()
  return <FeaturedProjects projects={projects} />
}

function FeaturedPropertiesFallback() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="h-8 w-48 rounded bg-[#2E3447] animate-pulse mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map(i => <PropertyCardSkeleton key={i} />)}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Hero />
      <StatsBar />
      <Suspense fallback={<FeaturedPropertiesFallback />}>
        <FeaturedPropertiesSection />
      </Suspense>
      <PhilosophySection />
      <Suspense fallback={null}>
        <FeaturedProjectsSection />
      </Suspense>
      <Testimonials />
      <CtaBanner />
    </>
  )
}
