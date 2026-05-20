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

export const revalidate = 3600 // ISR: regenerate every hour

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
