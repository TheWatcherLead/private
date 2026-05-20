import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const schema = z.object({
  name:        z.string().min(2, 'Name must be at least 2 characters'),
  phone:       z.string().min(10, 'Enter a valid phone number'),
  email:       z.string().email('Enter a valid email').optional().or(z.literal('')),
  message:     z.string().optional(),
  property_id: z.string().uuid().optional(),
  source_page: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = schema.safeParse(body)

    if (!result.success) {
      return Response.json(
        { error: result.error.issues[0]?.message ?? 'Invalid data' },
        { status: 400 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase.from('enquiries').insert({
      name:        result.data.name,
      phone:       result.data.phone,
      email:       result.data.email || null,
      message:     result.data.message || null,
      property_id: result.data.property_id || null,
      source_page: result.data.source_page || null,
    })

    if (error) throw error

    return Response.json({ success: true }, { status: 201 })
  } catch {
    return Response.json({ error: 'Failed to submit enquiry. Please try again.' }, { status: 500 })
  }
}
