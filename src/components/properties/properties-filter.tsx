'use client'

import { useCallback, useState, useEffect, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Search, LayoutGrid, List, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

const typeOptions   = [
  { value: '',             label: 'All Types'        },
  { value: 'residential',  label: 'Residential'      },
  { value: 'commercial',   label: 'Commercial'       },
  { value: 'warehouse',    label: 'Warehouse'        },
]

const statusOptions = [
  { value: '',            label: 'Any Status'   },
  { value: 'active',      label: 'Available'    },
  { value: 'coming_soon', label: 'Coming Soon'  },
]

const sortOptions = [
  { value: 'created_at', label: 'Newest First'  },
  { value: 'price_asc',  label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
]

interface PropertiesFilterProps {
  total: number
  initialView?: 'grid' | 'list'
}

export function PropertiesFilter({ total, initialView = 'grid' }: PropertiesFilterProps) {
  const router      = useRouter()
  const pathname    = usePathname()
  const params      = useSearchParams()
  const [, startTransition] = useTransition()

  const [search, setSearch] = useState(params.get('search') ?? '')
  const [view,   setView  ] = useState<'grid' | 'list'>(initialView)

  const build = useCallback((updates: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString())
    Object.entries(updates).forEach(([k, v]) => {
      if (!v) next.delete(k)
      else next.set(k, v)
    })
    next.delete('page')
    return next.toString()
  }, [params])

  const push = useCallback((updates: Record<string, string | null>) => {
    startTransition(() => {
      router.push(`${pathname}?${build(updates)}`, { scroll: false })
    })
  }, [router, pathname, build])

  // Debounce search
  useEffect(() => {
    const id = setTimeout(() => push({ search: search || null }), 350)
    return () => clearTimeout(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <div className="space-y-4">
      {/* Filter row */}
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A89F94] pointer-events-none" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search properties..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 font-sans text-sm bg-[#1A1F2E] text-[#F5F0E8] border border-[#2E3447] rounded-lg focus:border-[#C9A96E] outline-none placeholder:text-[#A89F94] transition-colors min-h-[44px]"
            aria-label="Search properties by name or location"
          />
        </div>

        {/* Type */}
        <select
          value={params.get('type') ?? ''}
          onChange={e => push({ type: e.target.value || null })}
          className="font-sans text-sm bg-[#1A1F2E] text-[#F5F0E8] border border-[#2E3447] rounded-lg px-3 py-2.5 focus:border-[#C9A96E] outline-none cursor-pointer transition-colors min-h-[44px]"
          aria-label="Filter by type"
        >
          {typeOptions.map(o => (
            <option key={o.value} value={o.value} className="bg-[#1A1F2E]">{o.label}</option>
          ))}
        </select>

        {/* Status */}
        <select
          value={params.get('status') ?? ''}
          onChange={e => push({ status: e.target.value || null })}
          className="font-sans text-sm bg-[#1A1F2E] text-[#F5F0E8] border border-[#2E3447] rounded-lg px-3 py-2.5 focus:border-[#C9A96E] outline-none cursor-pointer transition-colors min-h-[44px]"
          aria-label="Filter by status"
        >
          {statusOptions.map(o => (
            <option key={o.value} value={o.value} className="bg-[#1A1F2E]">{o.label}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={params.get('sort') ?? 'created_at'}
          onChange={e => push({ sort: e.target.value })}
          className="font-sans text-sm bg-[#1A1F2E] text-[#F5F0E8] border border-[#2E3447] rounded-lg px-3 py-2.5 focus:border-[#C9A96E] outline-none cursor-pointer transition-colors min-h-[44px]"
          aria-label="Sort results"
        >
          {sortOptions.map(o => (
            <option key={o.value} value={o.value} className="bg-[#1A1F2E]">{o.label}</option>
          ))}
        </select>
      </div>

      {/* Results row */}
      <div className="flex items-center justify-between">
        <p className="font-sans text-sm text-[#A89F94]" aria-live="polite" aria-atomic="true">
          <span className="text-[#F5F0E8] font-medium">{total}</span>{' '}
          {total === 1 ? 'property' : 'properties'} found
        </p>

        {/* View toggle */}
        <div className="flex rounded-lg border border-[#2E3447] overflow-hidden" role="group" aria-label="View layout">
          <button
            onClick={() => setView('grid')}
            aria-label="Grid view"
            aria-pressed={view === 'grid'}
            className={cn(
              'p-2.5 transition-colors',
              view === 'grid' ? 'bg-[#C9A96E] text-[#0F1117]' : 'text-[#A89F94] hover:text-[#F5F0E8]'
            )}
          >
            <LayoutGrid size={16} aria-hidden="true" />
          </button>
          <button
            onClick={() => setView('list')}
            aria-label="List view"
            aria-pressed={view === 'list'}
            className={cn(
              'p-2.5 transition-colors',
              view === 'list' ? 'bg-[#C9A96E] text-[#0F1117]' : 'text-[#A89F94] hover:text-[#F5F0E8]'
            )}
          >
            <List size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Thin wrapper for Suspense boundary
export function PropertiesFilterShell({ total }: { total: number }) {
  return (
    <div className="rounded-2xl border border-[#2E3447] bg-[#1A1F2E] p-5">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal size={16} className="text-[#C9A96E]" aria-hidden="true" />
        <span className="font-sans text-sm font-medium text-[#F5F0E8]">Filters</span>
      </div>
      <PropertiesFilter total={total} />
    </div>
  )
}
