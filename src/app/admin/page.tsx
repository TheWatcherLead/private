import Link from 'next/link'
import { Building2, MessageSquare, FolderOpen, Users, Plus } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase/admin'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import type { EnquiryStatus } from '@/types'

async function getStats() {
  const db = createAdminClient()
  const [props, enqs, projects, team] = await Promise.all([
    db.from('properties').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    db.from('enquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    db.from('projects').select('id', { count: 'exact', head: true }),
    db.from('team').select('id', { count: 'exact', head: true }).eq('is_active', true),
  ])
  return {
    activeListings: props.count ?? 0,
    newEnquiries:   enqs.count  ?? 0,
    projects:       projects.count ?? 0,
    teamMembers:    team.count  ?? 0,
  }
}

async function getRecentEnquiries() {
  const db = createAdminClient()
  const { data } = await db
    .from('enquiries')
    .select('*, properties(title)')
    .order('created_at', { ascending: false })
    .limit(8)
  return data ?? []
}

const statCards = [
  { key: 'activeListings', label: 'Active Listings', icon: Building2,    href: '/admin/properties', color: 'text-[#C9A96E]' },
  { key: 'newEnquiries',   label: 'New Enquiries',   icon: MessageSquare, href: '/admin/enquiries',  color: 'text-[#4CAF7D]' },
  { key: 'projects',       label: 'Projects',         icon: FolderOpen,    href: '/admin/projects',   color: 'text-[#60A5FA]' },
  { key: 'teamMembers',    label: 'Team Members',     icon: Users,         href: '/admin/team',       color: 'text-[#A78BFA]' },
] as const

export default async function AdminDashboard() {
  const [stats, enquiries] = await Promise.all([getStats(), getRecentEnquiries()])

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-[#F5F0E8]">Dashboard</h1>
        <p className="font-sans text-sm text-[#A89F94] mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map(({ key, label, icon: Icon, href, color }) => (
          <Link
            key={key}
            href={href}
            className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] p-5 hover:border-[#C9A96E]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-xs text-[#A89F94] uppercase tracking-wide">{label}</span>
              <Icon size={16} className={color} aria-hidden="true" />
            </div>
            <p className={`font-serif text-4xl ${color}`}>{stats[key]}</p>
          </Link>
        ))}
      </div>

      {/* Recent enquiries */}
      <div className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2E3447]">
          <h2 className="font-sans text-sm font-semibold text-[#F5F0E8]">Recent Enquiries</h2>
          <Link href="/admin/enquiries" className="font-sans text-xs text-[#C9A96E] hover:text-[#B8935A] transition-colors">
            View all →
          </Link>
        </div>

        {enquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]" aria-label="Recent enquiries">
              <thead>
                <tr className="border-b border-[#2E3447] bg-[#242938]">
                  {['Name', 'Phone', 'Property', 'Date', 'Status'].map(col => (
                    <th key={col} scope="col" className="px-5 py-3 text-left font-sans text-xs font-semibold text-[#A89F94] uppercase tracking-wide">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e: { id: string; name: string; phone: string; status: string; created_at: string; properties?: { title: string } | null }) => (
                  <tr key={e.id} className="border-b border-[#2E3447] last:border-0 hover:bg-[#242938]/50 transition-colors">
                    <td className="px-5 py-3 font-sans text-sm text-[#F5F0E8]">{e.name}</td>
                    <td className="px-5 py-3 font-sans text-sm text-[#A89F94]">
                      <a href={`tel:${e.phone}`} className="hover:text-[#F5F0E8] transition-colors">{e.phone}</a>
                    </td>
                    <td className="px-5 py-3 font-sans text-sm text-[#A89F94]">
                      {(e.properties as { title: string } | null)?.title ?? '—'}
                    </td>
                    <td className="px-5 py-3 font-sans text-xs text-[#A89F94]">
                      {new Date(e.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={e.status as EnquiryStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-10 text-center">
            <p className="font-sans text-sm text-[#A89F94]">No enquiries yet.</p>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/properties/new" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C9A96E] text-[#0F1117] font-sans text-sm font-medium hover:bg-[#B8935A] transition-colors">
          <Plus size={16} aria-hidden="true" /> Add Property
        </Link>
        <Link href="/admin/projects/new" className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2E3447] text-[#A89F94] font-sans text-sm hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors">
          <Plus size={16} aria-hidden="true" /> Add Project
        </Link>
      </div>
    </div>
  )
}
