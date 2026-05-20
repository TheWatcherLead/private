import type { MetadataRoute } from 'next'
import { getInsights } from '@/lib/sanity/queries'

const BASE = 'https://www.axisconcept.in'

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE,                   lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE}/properties`,   lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
  { url: `${BASE}/projects`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE}/about`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/insights`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE}/contact`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/faqs`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE}/careers`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
]

async function getDynamicRoutes(): Promise<MetadataRoute.Sitemap> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  if (!supabaseUrl.startsWith('http')) return []
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const db = createAdminClient()
    const [{ data: props }, { data: projs }] = await Promise.all([
      db.from('properties').select('slug, updated_at').eq('status', 'active'),
      db.from('projects').select('slug, created_at'),
    ])
    const propUrls: MetadataRoute.Sitemap = ((props ?? []) as Array<{ slug: string; updated_at: string }>).map(p => ({
      url: `${BASE}/properties/${p.slug}`, lastModified: new Date(p.updated_at), changeFrequency: 'weekly', priority: 0.8,
    }))
    const projUrls: MetadataRoute.Sitemap = ((projs ?? []) as Array<{ slug: string; created_at: string }>).map(p => ({
      url: `${BASE}/projects/${p.slug}`, lastModified: new Date(p.created_at), changeFrequency: 'monthly', priority: 0.6,
    }))
    return [...propUrls, ...projUrls]
  } catch { return [] }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [dynamic, insights] = await Promise.all([getDynamicRoutes(), getInsights()])
  const insightUrls: MetadataRoute.Sitemap = insights.map(post => ({
    url: `${BASE}/insights/${post.slug.current}`, lastModified: new Date(post.publishedAt), changeFrequency: 'monthly', priority: 0.5,
  }))
  return [...staticRoutes, ...dynamic, ...insightUrls]
}
