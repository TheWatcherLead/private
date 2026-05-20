'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { slugify } from '@/lib/utils'

function parseLines(val: string): string[] {
  return val.split('\n').map(s => s.trim()).filter(Boolean)
}

export async function upsertProperty(id: string | null, formData: FormData) {
  const db = createAdminClient()

  const title       = formData.get('title') as string
  const slug        = (formData.get('slug') as string) || slugify(title)
  const description = formData.get('description') as string
  const type        = formData.get('type') as string
  const status      = formData.get('status') as string
  const location    = formData.get('location') as string
  const city        = (formData.get('city') as string) || 'Bangalore'
  const area_sqft   = Number(formData.get('area_sqft')) || null
  const price_from  = Number(formData.get('price_from')) || null
  const price_to    = Number(formData.get('price_to')) || null
  const possession  = formData.get('possession_date') as string
  const thumbnail   = formData.get('thumbnail_url') as string
  const gallery     = parseLines(formData.get('gallery_urls') as string)
  const amenities   = parseLines(formData.get('amenities') as string)
  const highlights  = parseLines(formData.get('highlights') as string)
  const rera        = formData.get('rera_number') as string
  const is_featured = formData.get('is_featured') === 'true'

  const payload = {
    title, slug, description: description || null,
    type, status,
    location: location || null, city,
    area_sqft, price_from, price_to,
    possession_date: possession || null,
    thumbnail_url: thumbnail || null,
    gallery_urls: gallery, amenities, highlights,
    rera_number: rera || null, is_featured,
  }

  if (id) {
    await db.from('properties').update(payload).eq('id', id)
  } else {
    const { data, error } = await db.from('properties').insert(payload).select('id').single()
    if (error) throw error
    revalidatePath('/properties')
    revalidatePath('/admin/properties')
    redirect(`/admin/properties/${data.id}`)
  }

  revalidatePath('/properties')
  revalidatePath(`/properties/${slug}`)
  revalidatePath('/admin/properties')
}

export async function deleteProperty(id: string) {
  const db = createAdminClient()
  await db.from('properties').delete().eq('id', id)
  revalidatePath('/properties')
  revalidatePath('/admin/properties')
  redirect('/admin/properties')
}

export async function upsertUnit(propertyId: string, unitId: string | null, formData: FormData) {
  const db = createAdminClient()
  const payload = {
    property_id:    propertyId,
    unit_type:      formData.get('unit_type') as string,
    floor:          Number(formData.get('floor')) || null,
    area_sqft:      Number(formData.get('area_sqft')) || null,
    price:          Number(formData.get('price')) || null,
    status:         formData.get('status') as string,
    floor_plan_url: (formData.get('floor_plan_url') as string) || null,
  }
  if (unitId) {
    await db.from('units').update(payload).eq('id', unitId)
  } else {
    await db.from('units').insert(payload)
  }
  revalidatePath(`/admin/properties/${propertyId}`)
}

export async function deleteUnit(unitId: string, propertyId: string) {
  const db = createAdminClient()
  await db.from('units').delete().eq('id', unitId)
  revalidatePath(`/admin/properties/${propertyId}`)
}
