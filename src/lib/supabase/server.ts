import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export async function createClient() {
  // Return a no-op stub when Supabase is not configured
  if (!supabaseUrl.startsWith('http')) {
    return {
      from: () => ({
        select: () => ({ data: null, error: null, count: 0 }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null, eq: () => ({ data: null, error: null }) }),
        delete: () => ({ data: null, error: null }),
        eq: () => ({ data: null, error: null, single: () => ({ data: null, error: null }) }),
        single: () => ({ data: null, error: null }),
      }),
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any
  }

  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Server component — cookies can't be set, middleware handles refresh
        }
      },
    },
  })
}
