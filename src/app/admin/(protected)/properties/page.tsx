export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase/admin'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import type { PropertyStatus, PropertyType } from '@/types'

export default async function AdminPropertiesPage() {
  const db = createAdminClient()
  const { data: properties } = await db
    .from('properties')
    .select('id, title, type, status, price_from, is_featured, location, created_at')
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-serif text-3xl text-[#F5F0E8]">Properties</h1>
        <Link
          href="/admin/properties/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C9A96E] text-[#0F1117] font-sans text-sm font-medium hover:bg-[#B8935A] transition-colors"
        >
          <Plus size={16} aria-hidden="true" /> Add Property
        </Link>
      </div>

      <div className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] overflow-hidden">
        {properties && properties.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]" aria-label="Properties list">
              <thead>
                <tr className="border-b border-[#2E3447] bg-[#242938]">
                  {['Title', 'Type', 'Status', 'Price From', 'Featured', 'Actions'].map(h => (
                    <th key={h} scope="col" className="px-5 py-3 text-left font-sans text-xs font-semibold text-[#A89F94] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(properties as Array<{ id: string; title: string; type: string; status: string; price_from: number | null; is_featured: boolean; location: string | null }>).map(p => (
                  <tr key={p.id} className="border-b border-[#2E3447] last:border-0 hover:bg-[#242938]/50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-sans text-sm text-[#F5F0E8]">{p.title}</p>
                      {p.location && <p className="font-sans text-xs text-[#A89F94]">{p.location}</p>}
                    </td>
                    <td className="px-5 py-3"><Badge variant={p.type as PropertyType} /></td>
                    <td className="px-5 py-3"><Badge variant={p.status as PropertyStatus} /></td>
                    <td className="px-5 py-3 font-sans text-sm text-[#C9A96E]">{formatPrice(p.price_from)}</td>
                    <td className="px-5 py-3">
                      <span className={`font-sans text-xs ${p.is_featured ? 'text-[#4CAF7D]' : 'text-[#A89F94]'}`}>
                        {p.is_featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/properties/${p.id}`}
                        className="flex items-center gap-1.5 font-sans text-xs text-[#A89F94] hover:text-[#C9A96E] transition-colors"
                        aria-label={`Edit ${p.title}`}
                      >
                        <Pencil size={13} aria-hidden="true" /> Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-14 text-center">
            <p className="font-sans text-sm text-[#A89F94] mb-4">No properties yet.</p>
            <Link href="/admin/properties/new" className="font-sans text-sm text-[#C9A96E] hover:underline">
              Add your first property →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
