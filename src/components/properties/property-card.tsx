import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Maximize2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice, formatArea } from '@/lib/utils'
import type { Property, PropertyStatus, PropertyType } from '@/types'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const {
    slug, title, location, thumbnail_url,
    type, status, price_from, area_sqft,
  } = property

  return (
    <article className="relative group rounded-xl border border-[#2E3447] bg-[#1A1F2E] overflow-hidden transition-all duration-300 hover:border-[#C9A96E]/40 hover:shadow-[0_8px_32px_rgba(201,169,110,0.08)]">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#242938]">
        {thumbnail_url ? (
          <Image
            src={thumbnail_url}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1A1F2E] to-[#242938]">
            <span className="font-serif text-4xl text-[#C9A96E]/30">A</span>
          </div>
        )}
        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={status as PropertyStatus} />
          <Badge variant={type as PropertyType} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="font-serif text-lg text-[#F5F0E8] leading-snug line-clamp-2 group-hover:text-[#C9A96E] transition-colors">
          {title}
        </h3>

        {location && (
          <p className="flex items-center gap-1.5 font-sans text-sm text-[#A89F94]">
            <MapPin size={14} className="shrink-0 text-[#C9A96E]" aria-hidden="true" />
            {location}
          </p>
        )}

        <div className="flex items-center justify-between">
          {price_from ? (
            <p className="font-sans text-sm font-semibold text-[#C9A96E]">
              From {formatPrice(price_from)}
            </p>
          ) : (
            <p className="font-sans text-sm text-[#A89F94]">Price on request</p>
          )}
          {area_sqft && (
            <p className="flex items-center gap-1 font-sans text-xs text-[#A89F94]">
              <Maximize2 size={12} aria-hidden="true" />
              {formatArea(area_sqft)}
            </p>
          )}
        </div>

        <Link href={`/properties/${slug}`} className="mt-1" tabIndex={-1} aria-hidden="true">
          <Button variant="secondary" size="sm" fullWidth>
            View Details
          </Button>
        </Link>
      </div>

      {/* Full-card link for accessibility */}
      <Link
        href={`/properties/${slug}`}
        className="absolute inset-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1117]"
        aria-label={`View details for ${title}`}
      />
    </article>
  )
}

export function PropertyCardPlaceholder() {
  return (
    <div className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-[#1A1F2E] to-[#242938] flex items-center justify-center">
        <span className="font-serif text-4xl text-[#C9A96E]/20">A</span>
      </div>
      <div className="p-5">
        <p className="font-sans text-sm text-[#A89F94] text-center py-4">
          No featured properties yet. Add some in the admin panel.
        </p>
      </div>
    </div>
  )
}
