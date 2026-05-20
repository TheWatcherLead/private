// Admin user creation script
// Usage: SERVICE_KEY=eyJ... node scripts/create-admin.mjs
const SERVICE = process.env.SERVICE_KEY
if (!SERVICE) { console.error('Set SERVICE_KEY env var'); process.exit(1) }

const res = await fetch('https://nzgdevbxegjqowjqgjsk.supabase.co/auth/v1/admin/users', {
  method: 'POST',
  headers: { apikey: SERVICE, Authorization: `Bearer ${SERVICE}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: process.env.EMAIL, password: process.env.PASSWORD, email_confirm: true }),
})
const data = await res.json()
console.log(res.ok ? `Created: ${data.email}` : `Error: ${data.message}`)
