'use client'

import { useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Trash2, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { upsertProperty, deleteProperty, upsertUnit, deleteUnit } from '@/app/admin/(protected)/properties/actions'
import { slugify, formatPrice, formatArea } from '@/lib/utils'
import type { Property, Unit, UnitStatus } from '@/types'

interface Props {
  property?: Property
}

const typeOptions   = [{ value: 'residential', label: 'Residential' }, { value: 'commercial', label: 'Commercial' }, { value: 'warehouse', label: 'Warehouse' }]
const statusOptions = [{ value: 'active', label: 'Active' }, { value: 'coming_soon', label: 'Coming Soon' }, { value: 'sold', label: 'Sold' }]
const unitStatusOpts = [{ value: 'available', label: 'Available' }, { value: 'reserved', label: 'Reserved' }, { value: 'sold', label: 'Sold' }]

export function PropertyForm({ property }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [showDeleteModal, setDeleteModal] = useState(false)
  const [showUnitModal, setUnitModal] = useState(false)
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null)
  const [title, setTitle] = useState(property?.title ?? '')
  const [slug, setSlug]   = useState(property?.slug ?? '')
  const formRef = useRef<HTMLFormElement>(null)

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!property) setSlug(slugify(val))
  }

  const handleSave = () => {
    if (!formRef.current) return
    const fd = new FormData(formRef.current)
    fd.set('title', title)
    fd.set('slug', slug)
    startTransition(async () => {
      await upsertProperty(property?.id ?? null, fd)
      router.refresh()
    })
  }

  const handleDelete = () => {
    if (!property) return
    startTransition(async () => {
      await deleteProperty(property.id)
    })
  }

  const handleUnitSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      await upsertUnit(property!.id, editingUnit?.id ?? null, fd)
      setUnitModal(false)
      setEditingUnit(null)
      router.refresh()
    })
  }

  const handleUnitDelete = (unitId: string) => {
    startTransition(async () => {
      await deleteUnit(unitId, property!.id)
      router.refresh()
    })
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#F5F0E8]">
            {property ? 'Edit Property' : 'New Property'}
          </h1>
          {property && <p className="font-sans text-sm text-[#A89F94] mt-1">{property.title}</p>}
        </div>
        <div className="flex gap-3">
          {property && (
            <Button variant="danger" size="sm" onClick={() => setDeleteModal(true)}>
              <Trash2 size={14} className="mr-1.5" aria-hidden="true" /> Delete
            </Button>
          )}
          <Button onClick={handleSave} loading={isPending}>
            <Save size={14} className="mr-1.5" aria-hidden="true" /> Save Property
          </Button>
        </div>
      </div>

      <form ref={formRef} className="space-y-8">
        {/* Basic info */}
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
              <span className="font-sans text-sm text-[#A89F94]">/properties/</span>
              <input
                name="slug"
                value={slug}
                onChange={e => setSlug(e.target.value)}
                className="flex-1 font-sans text-sm bg-[#0F1117] text-[#F5F0E8] border border-[#2E3447] rounded px-4 py-3 focus:border-[#C9A96E] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select name="type" label="Type" required options={typeOptions} defaultValue={property?.type ?? 'residential'} />
            <Select name="status" label="Status" required options={statusOptions} defaultValue={property?.status ?? 'active'} />
          </div>

          <Textarea name="description" label="Description" rows={4} defaultValue={property?.description ?? ''} />
        </section>

        {/* Location & Details */}
        <section className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] p-6 space-y-5">
          <h2 className="font-sans text-sm font-semibold text-[#F5F0E8]">Location & Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input name="location" label="Location / Area" placeholder="e.g. Whitefield" defaultValue={property?.location ?? ''} />
            <Input name="city" label="City" defaultValue={property?.city ?? 'Bangalore'} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input name="area_sqft" label="Area (sq.ft)" type="number" defaultValue={property?.area_sqft?.toString() ?? ''} />
            <Input name="price_from" label="Price From (₹)" type="number" defaultValue={property?.price_from?.toString() ?? ''} />
            <Input name="price_to" label="Price To (₹)" type="number" defaultValue={property?.price_to?.toString() ?? ''} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input name="possession_date" label="Possession Date" type="date" defaultValue={property?.possession_date ?? ''} />
            <Input name="rera_number" label="RERA Number" placeholder="KA/REA/..." defaultValue={property?.rera_number ?? ''} />
          </div>
        </section>

        {/* Media */}
        <section className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] p-6 space-y-5">
          <h2 className="font-sans text-sm font-semibold text-[#F5F0E8]">Media</h2>
          <Input name="thumbnail_url" label="Thumbnail URL" type="url" placeholder="https://..." defaultValue={property?.thumbnail_url ?? ''} />
          <Textarea
            name="gallery_urls"
            label="Gallery URLs (one per line)"
            rows={4}
            placeholder={'https://example.com/image1.jpg\nhttps://example.com/image2.jpg'}
            defaultValue={property?.gallery_urls?.join('\n') ?? ''}
          />
        </section>

        {/* Features */}
        <section className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] p-6 space-y-5">
          <h2 className="font-sans text-sm font-semibold text-[#F5F0E8]">Features</h2>
          <Textarea
            name="amenities"
            label="Amenities (one per line)"
            rows={4}
            placeholder={'Swimming Pool\nGym\nParking\nSecurity'}
            defaultValue={property?.amenities?.join('\n') ?? ''}
          />
          <Textarea
            name="highlights"
            label="Highlights (one per line)"
            rows={3}
            placeholder={'Corner unit with dual aspect\nPrivate terrace\nPremium finishes'}
            defaultValue={property?.highlights?.join('\n') ?? ''}
          />
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              value="true"
              defaultChecked={property?.is_featured ?? false}
              className="w-4 h-4 accent-[#C9A96E] cursor-pointer"
            />
            <label htmlFor="is_featured" className="font-sans text-sm text-[#F5F0E8] cursor-pointer">
              Show on homepage (Featured)
            </label>
          </div>
        </section>
      </form>

      {/* Units — only shown on edit */}
      {property && (
        <section className="mt-8 rounded-xl border border-[#2E3447] bg-[#1A1F2E] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2E3447]">
            <h2 className="font-sans text-sm font-semibold text-[#F5F0E8]">Unit Types</h2>
            <Button size="sm" onClick={() => { setEditingUnit(null); setUnitModal(true) }}>
              <Plus size={14} className="mr-1.5" aria-hidden="true" /> Add Unit
            </Button>
          </div>

          {property.units && property.units.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]" aria-label="Unit types">
                <thead>
                  <tr className="border-b border-[#2E3447] bg-[#242938]">
                    {['Type', 'Floor', 'Area', 'Price', 'Status', ''].map(h => (
                      <th key={h} scope="col" className="px-5 py-3 text-left font-sans text-xs font-semibold text-[#A89F94] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {property.units.map(unit => (
                    <tr key={unit.id} className="border-b border-[#2E3447] last:border-0 hover:bg-[#242938]/40">
                      <td className="px-5 py-3 font-sans text-sm text-[#F5F0E8]">{unit.unit_type}</td>
                      <td className="px-5 py-3 font-sans text-sm text-[#A89F94]">{unit.floor ?? '—'}</td>
                      <td className="px-5 py-3 font-sans text-sm text-[#A89F94]">{formatArea(unit.area_sqft)}</td>
                      <td className="px-5 py-3 font-sans text-sm text-[#C9A96E]">{formatPrice(unit.price)}</td>
                      <td className="px-5 py-3"><Badge variant={unit.status as UnitStatus} /></td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingUnit(unit); setUnitModal(true) }} className="font-sans text-xs text-[#A89F94] hover:text-[#C9A96E] transition-colors">Edit</button>
                          <button onClick={() => handleUnitDelete(unit.id)} className="font-sans text-xs text-[#A89F94] hover:text-[#E05252] transition-colors">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="px-6 py-8 text-center font-sans text-sm text-[#A89F94]">No units yet. Click "Add Unit" to begin.</p>
          )}
        </section>
      )}

      {/* Delete confirmation */}
      <Modal open={showDeleteModal} onClose={() => setDeleteModal(false)} title="Delete Property" size="sm">
        <p className="font-sans text-sm text-[#A89F94] mb-6">
          Are you sure you want to delete <strong className="text-[#F5F0E8]">{property?.title}</strong>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setDeleteModal(false)} fullWidth>Cancel</Button>
          <Button variant="danger" onClick={handleDelete} loading={isPending} fullWidth>Delete</Button>
        </div>
      </Modal>

      {/* Unit modal */}
      <Modal open={showUnitModal} onClose={() => { setUnitModal(false); setEditingUnit(null) }} title={editingUnit ? 'Edit Unit' : 'Add Unit'}>
        <form onSubmit={handleUnitSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input name="unit_type" label="Type" required placeholder="2BHK" defaultValue={editingUnit?.unit_type ?? ''} />
            <Input name="floor" label="Floor" type="number" defaultValue={editingUnit?.floor?.toString() ?? ''} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input name="area_sqft" label="Area (sq.ft)" type="number" defaultValue={editingUnit?.area_sqft?.toString() ?? ''} />
            <Input name="price" label="Price (₹)" type="number" defaultValue={editingUnit?.price?.toString() ?? ''} />
          </div>
          <Select name="status" label="Status" options={unitStatusOpts} defaultValue={editingUnit?.status ?? 'available'} />
          <Input name="floor_plan_url" label="Floor Plan URL" type="url" placeholder="https://..." defaultValue={editingUnit?.floor_plan_url ?? ''} />
          <Button type="submit" fullWidth loading={isPending}>
            {editingUnit ? 'Save Changes' : 'Add Unit'}
          </Button>
        </form>
      </Modal>
    </div>
  )
}
