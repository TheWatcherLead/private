import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase/admin'
import { Badge } from '@/components/ui/badge'
import type { ProjectType } from '@/types'

export default async function AdminProjectsPage() {
  const db = createAdminClient()
  const { data: projects } = await db
    .from('projects')
    .select('id, title, type, location, year_completed, is_featured')
    .order('year_completed', { ascending: false })

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-serif text-3xl text-[#F5F0E8]">Projects</h1>
        <Link href="/admin/projects/new" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C9A96E] text-[#0F1117] font-sans text-sm font-medium hover:bg-[#B8935A] transition-colors">
          <Plus size={16} aria-hidden="true" /> Add Project
        </Link>
      </div>

      <div className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] overflow-hidden">
        {projects && projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]" aria-label="Projects list">
              <thead>
                <tr className="border-b border-[#2E3447] bg-[#242938]">
                  {['Title', 'Type', 'Location', 'Year', 'Featured', 'Actions'].map(h => (
                    <th key={h} scope="col" className="px-5 py-3 text-left font-sans text-xs font-semibold text-[#A89F94] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id} className="border-b border-[#2E3447] last:border-0 hover:bg-[#242938]/50">
                    <td className="px-5 py-3 font-sans text-sm text-[#F5F0E8]">{p.title}</td>
                    <td className="px-5 py-3"><Badge variant={p.type as ProjectType} /></td>
                    <td className="px-5 py-3 font-sans text-sm text-[#A89F94]">{p.location ?? '—'}</td>
                    <td className="px-5 py-3 font-sans text-sm text-[#A89F94]">{p.year_completed ?? '—'}</td>
                    <td className="px-5 py-3 font-sans text-xs" style={{ color: p.is_featured ? '#4CAF7D' : '#A89F94' }}>
                      {p.is_featured ? 'Yes' : 'No'}
                    </td>
                    <td className="px-5 py-3">
                      <Link href={`/admin/projects/${p.id}`} className="flex items-center gap-1.5 font-sans text-xs text-[#A89F94] hover:text-[#C9A96E] transition-colors" aria-label={`Edit ${p.title}`}>
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
            <p className="font-sans text-sm text-[#A89F94] mb-4">No projects yet.</p>
            <Link href="/admin/projects/new" className="font-sans text-sm text-[#C9A96E] hover:underline">Add your first project →</Link>
          </div>
        )}
      </div>
    </div>
  )
}
