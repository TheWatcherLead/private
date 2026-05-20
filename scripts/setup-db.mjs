// Database setup script — run with your own PAT and project ref
// Usage: PAT=sbp_xxx REF=your-project-ref node scripts/setup-db.mjs
const PAT = process.env.PAT
const REF = process.env.REF ?? 'nzgdevbxegjqowjqgjsk'
if (!PAT) { console.error('Set PAT env var'); process.exit(1) }

const URL = `https://api.supabase.com/v1/projects/${REF}/database/query`

async function sql(query) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${PAT}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message ?? JSON.stringify(data))
  return data
}

// Run: PAT=your-pat node scripts/setup-db.mjs
console.log('See scripts/setup-db.mjs for usage instructions.')
