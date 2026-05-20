import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const isConfigured = supabaseUrl.startsWith('http') && serviceKey.length > 10

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function noop(): any {
  const chain: Record<string, unknown> = {}
  const methods = ['select', 'insert', 'update', 'delete', 'upsert',
                   'eq', 'neq', 'gt', 'lt', 'gte', 'lte', 'order',
                   'limit', 'range', 'single', 'maybeSingle', 'head']
  methods.forEach(m => { chain[m] = () => chain })
  chain.then = (resolve: (v: unknown) => unknown) =>
    Promise.resolve(resolve({ data: null, error: null, count: 0 }))
  return chain
}

export function createAdminClient() {
  if (!isConfigured) {
    return {
      from: () => noop(),
      auth: { getUser: async () => ({ data: { user: null }, error: null }) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any
  }
  return createClient(supabaseUrl, serviceKey)
}
