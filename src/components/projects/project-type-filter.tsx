import { cn } from '@/lib/utils'

const types: { value: string; label: string }[] = [
  { value: '',            label: 'All'          },
  { value: 'residential', label: 'Residential'  },
  { value: 'commercial',  label: 'Commercial'   },
  { value: 'academic',    label: 'Academic'     },
  { value: 'warehouse',   label: 'Warehouse'    },
]

interface ProjectTypeFilterProps {
  activeType?: string
  counts?: Record<string, number>
  total?: number
}

export function ProjectTypeFilter({ activeType, counts = {}, total = 0 }: ProjectTypeFilterProps) {
  return (
    <nav aria-label="Filter projects by type" className="flex flex-wrap gap-2">
      {types.map(({ value, label }) => {
        const isActive = value === (activeType ?? '')
        const count = value === '' ? total : (counts[value] ?? 0)
        const href = value ? `/projects?type=${value}` : '/projects'

        return (
          <a
            key={value}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-sans text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
              isActive
                ? 'bg-[#C9A96E] text-[#0F1117] font-medium'
                : 'bg-[#1A1F2E] text-[#A89F94] border border-[#2E3447] hover:border-[#C9A96E]/50 hover:text-[#F5F0E8]'
            )}
          >
            {label}
            {count > 0 && (
              <span className={cn(
                'text-xs px-1.5 py-0.5 rounded-full',
                isActive ? 'bg-[#0F1117]/20' : 'bg-[#2E3447] text-[#A89F94]'
              )}>
                {count}
              </span>
            )}
          </a>
        )
      })}
    </nav>
  )
}
