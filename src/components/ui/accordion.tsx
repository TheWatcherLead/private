'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  question: string
  answer:   string
}

interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3" role="list">
      {items.map((item, i) => {
        const isOpen = open === i
        const id     = `accordion-${i}`

        return (
          <div
            key={i}
            role="listitem"
            className={cn(
              'rounded-xl border transition-colors duration-200',
              isOpen ? 'border-[#C9A96E]/40 bg-[#1A1F2E]' : 'border-[#2E3447] bg-[#1A1F2E]'
            )}
          >
            <button
              id={`${id}-btn`}
              aria-expanded={isOpen}
              aria-controls={`${id}-panel`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:rounded-xl"
            >
              <span className="font-sans text-sm font-medium text-[#F5F0E8] leading-snug">
                {item.question}
              </span>
              <span className="shrink-0 text-[#C9A96E]" aria-hidden="true">
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>

            <div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-btn`}
              hidden={!isOpen}
              className="px-6 pb-5"
            >
              <p className="font-sans text-sm text-[#A89F94] leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
