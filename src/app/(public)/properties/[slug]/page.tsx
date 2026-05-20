import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MapPin, Calendar, Maximize2, FileCheck, Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PropertyGallery } from '@/components/properties/property-gallery'
import { UnitTypesTable } from '@/components/properties/unit-types-table'
import { AmenitiesGrid } from '@/components/properties/amenities-grid'
import { PropertyMap } from '@/components/properties/property-map'
import { EnquiryForm } from '@/components/properties/enquiry-form'
import { RelatedProperties } from '@/components/properties/related-properties'
import { ToastProvider } from '@/components/ui/toast'
import { getPropertyBySlug, getProperties } from '@/lib/supabase/queries'
import { formatPrice, formatArea, getStatusLabel } from '@/lib/utils'
import type { PropertyStatus, PropertyType } from '@/types'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)
  if (!property) return { title: 'Property Not Found' }

  return {
    title: property.title,
    description:
      property.description ??
      `${property.title} in ${property.location ?? 'Bangalore'} — ${property.type} property by Axis Concept.`,
    openGraph: {
      title: property.title,
      images: property.thumbnail_url ? [property.thumbnail_url] : [],
    },
  }
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const [property, relatedResult] = await Promise.all([
    getPropertyBySlug(slug),
    getProperties({ limit: 4 }),
  ])

  if (!property) notFound()

  const related = relatedResult.data.filter(p => p.slug !== slug).slice(0, 3)
  const allImages = [property.thumbnail_url, ...property.gallery_urls].filter(Boolean) as string[]

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `https://www.axisconcept.in/properties/${property.slug}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.location,
      addressLocality: property.city,
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    ...(property.price_from && { price: property.price_from, priceCurrency: 'INR' }),
    ...(property.thumbnail_url && { image: property.thumbnail_url }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ToastProvider>
        <div className="pt-20 pb-0 min-h-screen">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-sans text-xs text-[#A89F94] mb-8" aria-label="Breadcrumb">
              <a href="/" className="hover:text-[#F5F0E8] transition-colors">Home</a>
              <span aria-hidden="true">/</span>
              <a href="/properties" className="hover:text-[#F5F0E8] transition-colors">Properties</a>
              <span aria-hidden="true">/</span>
              <span className="text-[#F5F0E8]" aria-current="page">{property.title}</span>
            </nav>

            {/* Gallery — full width */}
            <div className="mb-10">
              <PropertyGallery images={allImages} title={property.title} />
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 xl:gap-16">

              {/* LEFT — details */}
              <div className="space-y-10 min-w-0">

                {/* Header */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant={property.status as PropertyStatus} />
                    <Badge variant={property.type as PropertyType} />
                  </div>

                  <h1 className="font-serif text-3xl md:text-4xl text-[#F5F0E8] leading-tight mb-4">
                    {property.title}
                  </h1>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {property.location && (
                      <span className="flex items-center gap-1.5 font-sans text-sm text-[#A89F94]">
                        <MapPin size={14} className="text-[#C9A96E] shrink-0" aria-hidden="true" />
                        {property.location}, {property.city}
                      </span>
                    )}
                    {property.area_sqft && (
                      <span className="flex items-center gap-1.5 font-sans text-sm text-[#A89F94]">
                        <Maximize2 size={14} className="text-[#C9A96E] shrink-0" aria-hidden="true" />
                        {formatArea(property.area_sqft)}
                      </span>
                    )}
                    {property.possession_date && (
                      <span className="flex items-center gap-1.5 font-sans text-sm text-[#A89F94]">
                        <Calendar size={14} className="text-[#C9A96E] shrink-0" aria-hidden="true" />
                        Possession: {new Date(property.possession_date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price + RERA */}
                <div className="flex flex-wrap items-start gap-6 p-5 rounded-xl bg-[#1A1F2E] border border-[#2E3447]">
                  <div>
                    <p className="font-sans text-xs text-[#A89F94] mb-1 uppercase tracking-wide">Price</p>
                    <p className="font-serif text-2xl text-[#C9A96E]">
                      {property.price_from
                        ? `${formatPrice(property.price_from)}${property.price_to ? ` – ${formatPrice(property.price_to)}` : '+'}`
                        : 'Price on request'}
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-[#A89F94] mb-1 uppercase tracking-wide">Status</p>
                    <p className="font-sans text-sm font-medium text-[#F5F0E8]">{getStatusLabel(property.status)}</p>
                  </div>
                  {property.rera_number && (
                    <div>
                      <p className="font-sans text-xs text-[#A89F94] mb-1 uppercase tracking-wide">RERA No.</p>
                      <p className="flex items-center gap-1.5 font-sans text-sm text-[#F5F0E8]">
                        <FileCheck size={14} className="text-[#4CAF7D]" aria-hidden="true" />
                        {property.rera_number}
                      </p>
                    </div>
                  )}
                </div>

                {/* Description */}
                {property.description && (
                  <div>
                    <h2 className="font-serif text-2xl text-[#F5F0E8] mb-3">Overview</h2>
                    <p className="font-sans text-base text-[#A89F94] leading-relaxed whitespace-pre-line">
                      {property.description}
                    </p>
                  </div>
                )}

                {/* Units table */}
                {property.units && property.units.length > 0 && (
                  <UnitTypesTable units={property.units} />
                )}

                {/* Highlights */}
                {property.highlights.length > 0 && (
                  <div>
                    <h2 className="font-serif text-2xl text-[#F5F0E8] mb-4">Highlights</h2>
                    <ul className="space-y-2" role="list">
                      {property.highlights.map(h => (
                        <li key={h} className="flex items-start gap-3 font-sans text-sm text-[#A89F94]">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C9A96E] shrink-0" aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Amenities */}
                {property.amenities.length > 0 && (
                  <AmenitiesGrid amenities={property.amenities} />
                )}

                {/* Map */}
                {property.location && (
                  <PropertyMap location={property.location} title={property.title} />
                )}
              </div>

              {/* RIGHT — sticky enquiry form */}
              <aside className="lg:sticky lg:top-28 lg:self-start space-y-4">
                <EnquiryForm
                  propertyId={property.id}
                  propertyTitle={property.title}
                  sourcePage={`/properties/${property.slug}`}
                />

                {/* Brochure download placeholder */}
                <button
                  disabled
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-sans text-sm text-[#A89F94] border border-[#2E3447] cursor-not-allowed opacity-60"
                  title="Brochure not yet available"
                >
                  <Download size={16} aria-hidden="true" />
                  Download Brochure
                </button>
              </aside>
            </div>

            {/* Related properties */}
            {related.length > 0 && <RelatedProperties properties={related} />}
          </div>
        </div>
      </ToastProvider>
    </>
  )
}
