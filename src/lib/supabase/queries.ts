import { createClient } from './server'
import type { Property, Project } from '@/types'

export async function getFeaturedProperties(): Promise<Property[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('properties')
      .select('*, units(*)')
      .eq('is_featured', true)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(3)
    if (error) throw error
    return data ?? []
  } catch {
    return []
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_featured', true)
      .order('year_completed', { ascending: false })
      .limit(4)
    if (error) throw error
    return data ?? []
  } catch {
    return []
  }
}

export async function getProperties(filters: {
  type?: string
  status?: string
  search?: string
  sort?: string
  page?: number
  limit?: number
} = {}): Promise<{ data: Property[]; count: number }> {
  try {
    const supabase = await createClient()
    const { type, status, search, sort = 'created_at', page = 1, limit = 12 } = filters
    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' })

    if (type) query = query.eq('type', type)
    if (status) query = query.eq('status', status)
    if (search) query = query.ilike('title', `%${search}%`)

    if (sort === 'price_asc') query = query.order('price_from', { ascending: true })
    else if (sort === 'price_desc') query = query.order('price_from', { ascending: false })
    else query = query.order('created_at', { ascending: false })

    query = query.range(from, to)

    const { data, error, count } = await query
    if (error) throw error
    return { data: data ?? [], count: count ?? 0 }
  } catch {
    return { data: [], count: 0 }
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('properties')
      .select('*, units(*)')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data
  } catch {
    return null
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('year_completed', { ascending: false })
    if (error) throw error
    return data ?? []
  } catch {
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data
  } catch {
    return null
  }
}
