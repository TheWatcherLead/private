'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'

export async function updateEnquiryStatus(id: string, status: string) {
  const db = createAdminClient()
  await db.from('enquiries').update({ status }).eq('id', id)
  revalidatePath('/admin/enquiries')
  revalidatePath('/admin')
}
