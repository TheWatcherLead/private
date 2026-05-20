import { Suspense } from 'react'
import type { Metadata } from 'next'
import { PropertiesFilterShell } from '@/components/properties/properties-filter'
import { PropertyCard, PropertyCardPlaceholder } from '@/components/properties/property-card'
import { getProperties } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: 'Properties',
  description: 'Browse residential, commercial, and warehouse properties by Axis Concept in Bangalore.',
}

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function PropertiesPage({ searchParams }: Props) {
  const sp   = await searchParams
  const page = Number(sp.page ?? 1)
  const limit = 12

  const { data: properties, count } = await getProperties({
    type:   sp.type,
    status: sp.status,
    search: sp.search,
    sort:   sp.sort,
    page,
    limit,
  })

  const totalPages = Math.ceil(count / limit)

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Page header */}
        <div className="mb-10">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-3">
            Active Listings
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F5F0E8]">Properties</h1>
        </div>

        {/* Filter bar */}
        <div className="mb-8">
          <Suspense fallback={<div className="h-32 rounded-2xl bg-[#1A1F2E] border border-[#2E3447] animate-pulse" />}>
            <PropertiesFilterShell total={count} />
          </Suspense>
        </div>

        {/* Results */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-[#F5F0E8] mb-3">No properties found</p>
            <p className="font-sans text-sm text-[#A89F94]">
              Try adjusting your filters or{' '}
              <a href="/properties" className="text-[#C9A96E] hover:underline">clear all filters</a>.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex justify-center gap-2 mt-12" aria-label="Pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
              const sp2 = new URLSearchParams()
              if (sp.type)   sp2.set('type', sp.type)
              if (sp.status) sp2.set('status', sp.status)
              if (sp.search) sp2.set('search', sp.search)
              if (sp.sort)   sp2.set('sort', sp.sort)
              sp2.set('page', String(p))

              return (
                <a
                  key={p}
                  href={`/properties?${sp2.toString()}`}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? 'page' : undefined}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-sans text-sm transition-colors
                    ${p === page
                      ? 'bg-[#C9A96E] text-[#0F1117] font-semibold'
                      : 'bg-[#1A1F2E] text-[#A89F94] border border-[#2E3447] hover:border-[#C9A96E] hover:text-[#C9A96E]'
                    }`}
                >
                  {p}
                </a>
              )
            })}
          </nav>
        )}
      </div>
    </div>
  )
}
