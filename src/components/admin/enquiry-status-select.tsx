'use client'

import { useTransition } from 'react'
import { updateEnquiryStatus } from '@/app/admin/enquiries/actions'
import type { EnquiryStatus } from '@/types'

const options: { value: EnquiryStatus; label: string }[] = [
  { value: 'new',       label: 'New'       },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'closed',    label: 'Closed'    },
]

const colors: Record<EnquiryStatus, string> = {
  new:       'text-[#4CAF7D]',
  contacted: 'text-[#C9A96E]',
  qualified: 'text-[#60A5FA]',
  closed:    'text-[#A89F94]',
}

export function EnquiryStatusSelect({ enquiryId, current }: { enquiryId: string; current: EnquiryStatus }) {
  const [isPending, startTransition] = useTransition()

  return (
    <select
      value={current}
      disabled={isPending}
      onChange={e => {
        startTransition(() => {
          updateEnquiryStatus(enquiryId, e.target.value)
        })
      }}
      aria-label="Update enquiry status"
      className={`font-sans text-xs bg-transparent border-0 outline-none cursor-pointer disabled:opacity-50 ${colors[current]}`}
    >
      {options.map(o => (
        <option key={o.value} value={o.value} className="bg-[#1A1F2E] text-[#F5F0E8]">
          {o.label}
        </option>
      ))}
    </select>
  )
}
