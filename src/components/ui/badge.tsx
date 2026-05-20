import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'available' | 'sold' | 'coming_soon' | 'active' | 'reserved' | 'residential' | 'commercial' | 'warehouse' | 'academic' | 'new' | 'default'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  available:    'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  active:       'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  sold:         'bg-red-500/15 text-red-400 border border-red-500/20',
  coming_soon:  'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  reserved:     'bg-blue-500/15 text-blue-400 border border-blue-500/20',
  residential:  'bg-[#3D6B35]/20 text-[#6BBF5E] border border-[#3D6B35]/30',
  commercial:   'bg-[#C9A96E]/15 text-[#C9A96E] border border-[#C9A96E]/20',
  warehouse:    'bg-slate-500/15 text-slate-400 border border-slate-500/20',
  academic:     'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20',
  new:          'bg-purple-500/15 text-purple-400 border border-purple-500/20',
  default:      'bg-[#2E3447] text-[#A89F94] border border-[#2E3447]',
}

const variantLabels: Partial<Record<BadgeVariant, string>> = {
  available:   'Available',
  active:      'Available',
  sold:        'Sold Out',
  coming_soon: 'Coming Soon',
  reserved:    'Reserved',
  residential: 'Residential',
  commercial:  'Commercial',
  warehouse:   'Warehouse',
  academic:    'Academic',
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-sans text-xs font-medium px-2.5 py-1 rounded-full',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children ?? variantLabels[variant] ?? variant}
    </span>
  )
}
