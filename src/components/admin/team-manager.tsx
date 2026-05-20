'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Modal } from '@/components/ui/modal'
import { upsertTeamMember, deleteTeamMember } from '@/app/admin/team/actions'
import type { TeamMember } from '@/types'

export function TeamManager({ team }: { team: TeamMember[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [editing, setEditing] = useState<TeamMember | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null)

  const openAdd  = () => { setEditing(null); setShowForm(true) }
  const openEdit = (m: TeamMember) => { setEditing(m); setShowForm(true) }
  const closeForm = () => { setShowForm(false); setEditing(null) }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      await upsertTeamMember(editing?.id ?? null, fd)
      closeForm()
      router.refresh()
    })
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    startTransition(async () => {
      await deleteTeamMember(deleteTarget.id)
      setDeleteTarget(null)
      router.refresh()
    })
  }

  return (
    <>
      {/* Add button */}
      <div className="flex justify-end mb-6">
        <Button onClick={openAdd}>
          <Plus size={14} className="mr-1.5" aria-hidden="true" /> Add Member
        </Button>
      </div>

      {/* Team grid */}
      {team.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map(m => (
            <div key={m.id} className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] overflow-hidden">
              {/* Photo */}
              <div className="relative aspect-square bg-[#242938]">
                {m.photo_url ? (
                  <Image src={m.photo_url} alt={m.name} fill className="object-cover" sizes="300px" loading="lazy" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-5xl text-[#C9A96E]/30">{m.name.charAt(0)}</span>
                  </div>
                )}
                {!m.is_active && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="font-sans text-xs text-white bg-black/50 px-2 py-1 rounded">Hidden</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-sans text-sm font-semibold text-[#F5F0E8]">{m.name}</p>
                {m.role && <p className="font-sans text-xs text-[#C9A96E] mt-0.5">{m.role}</p>}
                <div className="flex gap-3 mt-4">
                  <button onClick={() => openEdit(m)} className="flex items-center gap-1 font-sans text-xs text-[#A89F94] hover:text-[#C9A96E] transition-colors">
                    <Pencil size={12} aria-hidden="true" /> Edit
                  </button>
                  <button onClick={() => setDeleteTarget(m)} className="flex items-center gap-1 font-sans text-xs text-[#A89F94] hover:text-[#E05252] transition-colors">
                    <Trash2 size={12} aria-hidden="true" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-[#2E3447] rounded-2xl">
          <p className="font-sans text-sm text-[#A89F94] mb-4">No team members yet.</p>
          <Button onClick={openAdd}>Add First Member</Button>
        </div>
      )}

      {/* Add / Edit modal */}
      <Modal open={showForm} onClose={closeForm} title={editing ? 'Edit Member' : 'Add Team Member'}>
        <form onSubmit={handleSave} className="space-y-4">
          <Input name="name" label="Full Name" required defaultValue={editing?.name ?? ''} />
          <Input name="role" label="Role / Title" placeholder="Co-Founder & CEO" defaultValue={editing?.role ?? ''} />
          <Input name="photo_url" label="Photo URL" type="url" placeholder="https://..." defaultValue={editing?.photo_url ?? ''} />
          <Textarea name="bio" label="Bio" rows={3} defaultValue={editing?.bio ?? ''} />
          <Input name="display_order" label="Display Order" type="number" defaultValue={editing?.display_order?.toString() ?? '0'} helperText="Lower number = shown first" />
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              value="true"
              defaultChecked={editing?.is_active ?? true}
              className="w-4 h-4 accent-[#C9A96E] cursor-pointer"
            />
            <label htmlFor="is_active" className="font-sans text-sm text-[#F5F0E8] cursor-pointer">
              Visible on website
            </label>
          </div>
          <Button type="submit" fullWidth loading={isPending}>
            {editing ? 'Save Changes' : 'Add Member'}
          </Button>
        </form>
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Remove Team Member" size="sm">
        <p className="font-sans text-sm text-[#A89F94] mb-6">
          Remove <strong className="text-[#F5F0E8]">{deleteTarget?.name}</strong> from the team?
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)} fullWidth>Cancel</Button>
          <Button variant="danger" onClick={handleDelete} loading={isPending} fullWidth>Remove</Button>
        </div>
      </Modal>
    </>
  )
}
