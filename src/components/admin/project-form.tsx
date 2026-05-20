'use client'

import { useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Modal } from '@/components/ui/modal'
import { upsertProject, deleteProject } from '@/app/admin/(protected)/projects/actions'
import { slugify } from '@/lib/utils'
import type { Project } from '@/types'

const typeOptions = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial',  label: 'Commercial'  },
  { value: 'academic',    label: 'Academic'    },
  { value: 'warehouse',   label: 'Warehouse'   },
]

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [showDelete, setShowDelete] = useState(false)
  const [title, setTitle] = useState(project?.title ?? '')
  const [slug,  setSlug ] = useState(project?.slug  ?? '')
  const formRef = useRef<HTMLFormElement>(null)

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!project) setSlug(slugify(val))
  }

  const handleSave = () => {
    if (!formRef.current) return
    const fd = new FormData(formRef.current)
    fd.set('title', title)
    fd.set('slug', slug)
    startTransition(async () => {
      await upsertProject(project?.id ?? null, fd)
      router.refresh()
    })
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#F5F0E8]">{project ? 'Edit Project' : 'New Project'}</h1>
          {project && <p className="font-sans text-sm text-[#A89F94] mt-1">{project.title}</p>}
        </div>
        <div className="flex gap-3">
          {project && (
            <Button variant="danger" size="sm" onClick={() => setShowDelete(true)}>
              <Trash2 size={14} className="mr-1.5" aria-hidden="true" /> Delete
            </Button>
          )}
          <Button onClick={handleSave} loading={isPending}>
            <Save size={14} className="mr-1.5" aria-hidden="true" /> Save Project
          </Button>
        </div>
      </div>

      <form ref={formRef} className="space-y-8">
        <section className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] p-6 space-y-5">
          <h2 className="font-sans text-sm font-semibold text-[#F5F0E8]">Basic Information</h2>
          <div>
            <label className="font-sans text-sm font-medium text-[#F5F0E8] block mb-1.5">
              Title <span className="text-[#E05252]" aria-hidden>*</span>
            </label>
            <input
              name="title"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              required
              className="w-full font-sans text-sm bg-[#0F1117] text-[#F5F0E8] border border-[#2E3447] rounded px-4 py-3 focus:border-[#C9A96E] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="font-sans text-sm font-medium text-[#F5F0E8] block mb-1.5">URL Slug</label>
            <div className="flex items-center gap-2">
              <span className="font-sans text-sm text-[#A89F94]">/projects/</span>
              <input
                name="slug"
                value={slug}
                onChange={e => setSlug(e.target.value)}
                className="flex-1 font-sans text-sm bg-[#0F1117] text-[#F5F0E8] border border-[#2E3447] rounded px-4 py-3 focus:border-[#C9A96E] outline-none transition-colors"
              />
            </div>
          </div>
          <Select name="type" label="Type" required options={typeOptions} defaultValue={project?.type ?? 'residential'} />
          <Textarea name="description" label="Description" rows={4} defaultValue={project?.description ?? ''} />
        </section>

        <section className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] p-6 space-y-5">
          <h2 className="font-sans text-sm font-semibold text-[#F5F0E8]">Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input name="location"       label="Location"       placeholder="Whitefield" defaultValue={project?.location ?? ''} />
            <Input name="year_completed" label="Year Completed" type="number" min="1990" max="2030" defaultValue={project?.year_completed?.toString() ?? ''} />
            <Input name="area_sqft"      label="Area (sq.ft)"   type="number" defaultValue={project?.area_sqft?.toString() ?? ''} />
          </div>
        </section>

        <section className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] p-6 space-y-5">
          <h2 className="font-sans text-sm font-semibold text-[#F5F0E8]">Media</h2>
          <Input name="thumbnail_url" label="Thumbnail URL" type="url" placeholder="https://..." defaultValue={project?.thumbnail_url ?? ''} />
          <Textarea
            name="gallery_urls"
            label="Gallery URLs (one per line)"
            rows={4}
            placeholder="https://example.com/image1.jpg"
            defaultValue={project?.gallery_urls?.join('\n') ?? ''}
          />
        </section>

        <section className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] p-6 space-y-5">
          <h2 className="font-sans text-sm font-semibold text-[#F5F0E8]">Highlights</h2>
          <Textarea
            name="highlights"
            label="Highlights (one per line)"
            rows={4}
            placeholder={'LEED Platinum certified\n200+ residential units\nCompleted ahead of schedule'}
            defaultValue={project?.highlights?.join('\n') ?? ''}
          />
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              value="true"
              defaultChecked={project?.is_featured ?? false}
              className="w-4 h-4 accent-[#C9A96E] cursor-pointer"
            />
            <label htmlFor="is_featured" className="font-sans text-sm text-[#F5F0E8] cursor-pointer">
              Show on homepage (Featured)
            </label>
          </div>
        </section>
      </form>

      <Modal open={showDelete} onClose={() => setShowDelete(false)} title="Delete Project" size="sm">
        <p className="font-sans text-sm text-[#A89F94] mb-6">
          Delete <strong className="text-[#F5F0E8]">{project?.title}</strong>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setShowDelete(false)} fullWidth>Cancel</Button>
          <Button variant="danger" loading={isPending} onClick={() => {
            if (!project) return
            startTransition(async () => { await deleteProject(project.id) })
          }} fullWidth>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
