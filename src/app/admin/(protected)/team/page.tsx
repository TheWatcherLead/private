export const dynamic = 'force-dynamic'

import { createAdminClient } from '@/lib/supabase/admin'
import { TeamManager } from '@/components/admin/team-manager'

export default async function AdminTeamPage() {
  const db = createAdminClient()
  const { data: team } = await db
    .from('team')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-[#F5F0E8]">Team</h1>
        <p className="font-sans text-sm text-[#A89F94] mt-1">
          Manage team members shown on the About page.
        </p>
      </div>
      <TeamManager team={team ?? []} />
    </div>
  )
}
