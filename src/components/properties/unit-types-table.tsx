'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { formatPrice, formatArea } from '@/lib/utils'
import type { Unit, UnitStatus } from '@/types'
import Image from 'next/image'

interface UnitTypesTableProps {
  units: Unit[]
}

export function UnitTypesTable({ units }: UnitTypesTableProps) {
  const [floorPlan, setFloorPlan] = useState<string | null>(null)

  if (units.length === 0) return null

  return (
    <>
      <div>
        <h2 className="font-serif text-2xl text-[#F5F0E8] mb-4">Unit Types</h2>
        <div className="overflow-x-auto rounded-xl border border-[#2E3447]">
          <table className="w-full min-w-[540px]" aria-label="Available unit types">
            <thead>
              <tr className="border-b border-[#2E3447] bg-[#242938]">
                {['Type', 'Area', 'Price', 'Status', 'Floor Plan'].map(col => (
                  <th
                    key={col}
                    scope="col"
                    className="px-4 py-3 text-left font-sans text-xs font-semibold tracking-wide text-[#A89F94] uppercase"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {units.map((unit, idx) => (
                <tr
                  key={unit.id}
                  className={`border-b border-[#2E3447] last:border-0 transition-colors hover:bg-[#1A1F2E] ${idx % 2 === 0 ? 'bg-[#0F1117]/40' : ''}`}
                >
                  <td className="px-4 py-3 font-sans text-sm font-medium text-[#F5F0E8]">
                    {unit.unit_type}
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-[#A89F94]">
                    {formatArea(unit.area_sqft)}
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-[#C9A96E] font-medium">
                    {formatPrice(unit.price)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={unit.status as UnitStatus} />
                  </td>
                  <td className="px-4 py-3">
                    {unit.floor_plan_url ? (
                      <button
                        onClick={() => setFloorPlan(unit.floor_plan_url!)}
                        className="flex items-center gap-1.5 font-sans text-xs text-[#C9A96E] hover:text-[#B8935A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded"
                        aria-label={`View floor plan for ${unit.unit_type}`}
                      >
                        <FileText size={14} aria-hidden="true" />
                        View Plan
                      </button>
                    ) : (
                      <span className="font-sans text-xs text-[#A89F94]/50">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floor plan modal */}
      <Modal open={!!floorPlan} onClose={() => setFloorPlan(null)} title="Floor Plan" size="lg">
        {floorPlan && (
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={floorPlan}
              alt="Floor plan"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        )}
      </Modal>
    </>
  )
}
