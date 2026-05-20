'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'

export async function upsertTeamMember(id: string | null, formData: FormData) {
  const db = createAdminClient()
  const payload = {
    name:          formData.get('name') as string,
    role:          (formData.get('role') as string)      || null,
    bio:           (formData.get('bio') as string)       || null,
    photo_url:     (formData.get('photo_url') as string) || null,
    display_order: Number(formData.get('display_order')) || 0,
    is_active:     formData.get('is_active') !== 'false',
  }
  if (id) {
    await db.from('team').update(payload).eq('id', id)
  } else {
    await db.from('team').insert(payload)
  }
  revalidatePath('/admin/team')
  revalidatePath('/about')
}

export async function deleteTeamMember(id: string) {
  const db = createAdminClient()
  await db.from('team').delete().eq('id', id)
  revalidatePath('/admin/team')
  revalidatePath('/about')
}
