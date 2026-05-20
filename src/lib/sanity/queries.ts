import { sanityClient } from './client'
import type { Insight } from '@/types'

export async function getInsights(): Promise<Insight[]> {
  if (!sanityClient) return []
  try {
    return await sanityClient.fetch(`
      *[_type == "insight" && is_published == true] | order(publishedAt desc) {
        _id, slug, title, excerpt,
        coverImage { asset->{ url } },
        author, tags, publishedAt
      }
    `)
  } catch {
    return []
  }
}

export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  if (!sanityClient) return null
  try {
    return await sanityClient.fetch(`
      *[_type == "insight" && slug.current == $slug && is_published == true][0] {
        _id, slug, title, excerpt,
        coverImage { asset->{ url } },
        author, tags, publishedAt, body
      }
    `, { slug })
  } catch {
    return null
  }
}
