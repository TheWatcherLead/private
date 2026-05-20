export const dynamic = 'force-dynamic'

import { createAdminClient } from '@/lib/supabase/admin'
import { Badge } from '@/components/ui/badge'
import { EnquiryStatusSelect } from '@/components/admin/enquiry-status-select'
import type { EnquiryStatus } from '@/types'

interface Props {
  searchParams: Promise<{ status?: string }>
}

export default async function AdminEnquiriesPage({ searchParams }: Props) {
  const { status } = await searchParams
  const db = createAdminClient()

  let query = db
    .from('enquiries')
    .select('*, properties(title, slug)')
    .order('created_at', { ascending: false })

  if (status) query = query.eq('status', status)

  const { data: enquiries } = await query

  const statusTabs = ['all', 'new', 'contacted', 'qualified', 'closed']

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-[#F5F0E8]">Enquiries</h1>
        <p className="font-sans text-sm text-[#A89F94] mt-1">
          {enquiries?.length ?? 0} enquiries {status ? `with status: ${status}` : 'total'}
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusTabs.map(s => {
          const isActive = (status ?? 'all') === s
          return (
            <a
              key={s}
              href={s === 'all' ? '/admin/enquiries' : `/admin/enquiries?status=${s}`}
              aria-current={isActive ? 'page' : undefined}
              className={`px-4 py-2 rounded-full font-sans text-sm transition-colors capitalize ${
                isActive
                  ? 'bg-[#C9A96E] text-[#0F1117] font-medium'
                  : 'bg-[#1A1F2E] text-[#A89F94] border border-[#2E3447] hover:border-[#C9A96E]/50 hover:text-[#F5F0E8]'
              }`}
            >
              {s}
            </a>
          )
        })}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] overflow-hidden">
        {enquiries && enquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]" aria-label="Enquiries">
              <thead>
                <tr className="border-b border-[#2E3447] bg-[#242938]">
                  {['Name', 'Phone', 'Email', 'Property', 'Date', 'Status', 'Message'].map(h => (
                    <th key={h} scope="col" className="px-5 py-3 text-left font-sans text-xs font-semibold text-[#A89F94] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e: {
                  id: string; name: string; phone: string; email: string | null;
                  message: string | null; status: string; created_at: string;
                  properties?: { title: string; slug: string } | null
                }) => (
                  <tr key={e.id} className="border-b border-[#2E3447] last:border-0 hover:bg-[#242938]/30">
                    <td className="px-5 py-3 font-sans text-sm text-[#F5F0E8] whitespace-nowrap">{e.name}</td>
                    <td className="px-5 py-3">
                      <a href={`tel:${e.phone}`} className="font-sans text-sm text-[#A89F94] hover:text-[#F5F0E8] transition-colors whitespace-nowrap">
                        {e.phone}
                      </a>
                    </td>
                    <td className="px-5 py-3 font-sans text-xs text-[#A89F94]">{e.email ?? '—'}</td>
                    <td className="px-5 py-3 font-sans text-xs text-[#A89F94]">
                      {e.properties ? (
                        <a href={`/properties/${e.properties.slug}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A96E] transition-colors">
                          {e.properties.title}
                        </a>
                      ) : '—'}
                    </td>
                    <td className="px-5 py-3 font-sans text-xs text-[#A89F94] whitespace-nowrap">
                      {new Date(e.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                    </td>
                    <td className="px-5 py-3">
                      <EnquiryStatusSelect enquiryId={e.id} current={e.status as EnquiryStatus} />
                    </td>
                    <td className="px-5 py-3 font-sans text-xs text-[#A89F94] max-w-[200px]">
                      <span className="line-clamp-2">{e.message ?? '—'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-14 text-center">
            <p className="font-sans text-sm text-[#A89F94]">
              {status ? `No ${status} enquiries.` : 'No enquiries yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
