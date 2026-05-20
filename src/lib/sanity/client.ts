import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

// Valid Sanity project IDs are lowercase alphanumeric + hyphens only
const isConfigured = /^[a-z0-9-]+$/.test(projectId)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let sanityClient: any = null

if (isConfigured) {
  sanityClient = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: true,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!sanityClient) return { url: () => '' }
  return imageUrlBuilder(sanityClient).image(source)
}
