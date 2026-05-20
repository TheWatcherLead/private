import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import type { Property, PropertyStatus, PropertyType } from '@/types'

interface RelatedPropertiesProps {
  properties: Property[]
}

export function RelatedProperties({ properties }: RelatedPropertiesProps) {
  if (properties.length === 0) return null

  return (
    <section aria-labelledby="related-heading" className="py-16 border-t border-[#2E3447]">
      <div className="mb-8">
        <h2 id="related-heading" className="font-serif text-3xl text-[#F5F0E8]">
          Similar Properties
        </h2>
      </div>

      <div
        className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory"
        role="list"
        aria-label="Similar properties"
      >
        {properties.map(property => (
          <Link
            key={property.id}
            href={`/properties/${property.slug}`}
            role="listitem"
            className="group shrink-0 w-72 snap-start rounded-xl border border-[#2E3447] bg-[#1A1F2E] overflow-hidden hover:border-[#C9A96E]/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
            aria-label={`View ${property.title}`}
          >
            <div className="relative aspect-video overflow-hidden bg-[#242938]">
              {property.thumbnail_url ? (
                <Image
                  src={property.thumbnail_url}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="288px"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-3xl text-[#C9A96E]/20">A</span>
                </div>
              )}
              <div className="absolute top-2 left-2 flex gap-1.5">
                <Badge variant={property.status as PropertyStatus} />
              </div>
            </div>

            <div className="p-4 space-y-2">
              <Badge variant={property.type as PropertyType} />
              <h3 className="font-serif text-base text-[#F5F0E8] leading-snug line-clamp-2 group-hover:text-[#C9A96E] transition-colors">
                {property.title}
              </h3>
              {property.location && (
                <p className="flex items-center gap-1 font-sans text-xs text-[#A89F94]">
                  <MapPin size={12} aria-hidden="true" className="text-[#C9A96E] shrink-0" />
                  {property.location}
                </p>
              )}
              <p className="font-sans text-sm font-semibold text-[#C9A96E]">
                {formatPrice(property.price_from)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
