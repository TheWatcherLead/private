'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { slugify } from '@/lib/utils'

function parseLines(val: string): string[] {
  return val.split('\n').map(s => s.trim()).filter(Boolean)
}

export async function upsertProject(id: string | null, formData: FormData) {
  const db = createAdminClient()

  const title       = formData.get('title') as string
  const slug        = (formData.get('slug') as string) || slugify(title)
  const description = formData.get('description') as string
  const type        = formData.get('type') as string
  const location    = formData.get('location') as string
  const year        = Number(formData.get('year_completed')) || null
  const area_sqft   = Number(formData.get('area_sqft')) || null
  const thumbnail   = formData.get('thumbnail_url') as string
  const gallery     = parseLines(formData.get('gallery_urls') as string)
  const highlights  = parseLines(formData.get('highlights') as string)
  const is_featured = formData.get('is_featured') === 'true'

  const payload = {
    title, slug,
    description: description || null,
    type,
    location: location || null,
    year_completed: year,
    area_sqft,
    thumbnail_url: thumbnail || null,
    gallery_urls: gallery,
    highlights,
    is_featured,
  }

  if (id) {
    await db.from('projects').update(payload).eq('id', id)
  } else {
    const { data, error } = await db.from('projects').insert(payload).select('id').single()
    if (error) throw error
    revalidatePath('/projects')
    revalidatePath('/admin/projects')
    redirect(`/admin/projects/${data.id}`)
  }

  revalidatePath('/projects')
  revalidatePath(`/projects/${slug}`)
  revalidatePath('/admin/projects')
}

export async function deleteProject(id: string) {
  const db = createAdminClient()
  await db.from('projects').delete().eq('id', id)
  revalidatePath('/projects')
  revalidatePath('/admin/projects')
  redirect('/admin/projects')
}
