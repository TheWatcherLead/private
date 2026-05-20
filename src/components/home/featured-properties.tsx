import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PropertyCard, PropertyCardPlaceholder } from '@/components/properties/property-card'
import type { Property } from '@/types'

interface FeaturedPropertiesProps {
  properties: Property[]
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="py-20 md:py-28" aria-labelledby="featured-properties-heading">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-3">
              Active Listings
            </p>
            <h2 id="featured-properties-heading" className="font-serif text-4xl md:text-5xl text-[#F5F0E8]">
              Featured Properties
            </h2>
          </div>
          <Link
            href="/properties"
            className="hidden md:flex items-center gap-2 font-sans text-sm text-[#A89F94] hover:text-[#C9A96E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded"
          >
            View all
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map(i => <PropertyCardPlaceholder key={i} />)}
          </div>
        )}

        {/* Mobile "View all" */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 font-sans text-sm text-[#A89F94] hover:text-[#C9A96E] transition-colors"
          >
            View all properties <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
