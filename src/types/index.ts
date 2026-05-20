export type PropertyType = 'residential' | 'commercial' | 'warehouse'
export type PropertyStatus = 'active' | 'sold' | 'coming_soon'
export type UnitStatus = 'available' | 'sold' | 'reserved'
export type EnquiryStatus = 'new' | 'contacted' | 'qualified' | 'closed'
export type ProjectType = 'residential' | 'commercial' | 'academic' | 'warehouse'

export interface Property {
  id: string
  slug: string
  title: string
  description: string | null
  type: PropertyType
  status: PropertyStatus
  location: string | null
  city: string
  area_sqft: number | null
  price_from: number | null
  price_to: number | null
  possession_date: string | null
  thumbnail_url: string | null
  gallery_urls: string[]
  amenities: string[]
  highlights: string[]
  rera_number: string | null
  is_featured: boolean
  created_at: string
  updated_at: string
  units?: Unit[]
}

export interface Unit {
  id: string
  property_id: string
  unit_type: string
  floor: number | null
  area_sqft: number | null
  price: number | null
  status: UnitStatus
  floor_plan_url: string | null
  created_at: string
}

export interface Project {
  id: string
  slug: string
  title: string
  description: string | null
  type: ProjectType
  location: string | null
  year_completed: number | null
  area_sqft: number | null
  gallery_urls: string[]
  highlights: string[]
  thumbnail_url: string | null
  is_featured: boolean
  created_at: string
}

export interface Enquiry {
  id: string
  name: string
  email: string | null
  phone: string
  message: string | null
  source_page: string | null
  property_id: string | null
  status: EnquiryStatus
  created_at: string
  property?: Pick<Property, 'title' | 'slug'>
}

export interface TeamMember {
  id: string
  name: string
  role: string | null
  bio: string | null
  photo_url: string | null
  display_order: number
  is_active: boolean
}

export interface Insight {
  _id: string
  slug: { current: string }
  title: string
  excerpt: string | null
  coverImage: { asset: { url: string } } | null
  author: string | null
  tags: string[]
  publishedAt: string
  body: unknown // Sanity Portable Text
}
