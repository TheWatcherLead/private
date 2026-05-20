import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { PropertyForm } from '@/components/admin/property-form'

interface Props { params: Promise<{ id: string }> }

export default async function EditPropertyPage({ params }: Props) {
  const { id } = await params
  const db = createAdminClient()
  const { data } = await db
    .from('properties')
    .select('*, units(*)')
    .eq('id', id)
    .single()

  if (!data) notFound()
  return <PropertyForm property={data} />
}
