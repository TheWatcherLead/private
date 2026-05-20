import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { ProjectForm } from '@/components/admin/project-form'

interface Props { params: Promise<{ id: string }> }

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params
  const db = createAdminClient()
  const { data } = await db.from('projects').select('*').eq('id', id).single()
  if (!data) notFound()
  return <ProjectForm project={data} />
}
