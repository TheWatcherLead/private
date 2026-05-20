import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | null): string {
  if (!price) return 'Price on request'
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`
  return `₹${price.toLocaleString('en-IN')}`
}

export function formatArea(sqft: number | null): string {
  if (!sqft) return ''
  return `${sqft.toLocaleString('en-IN')} sq.ft`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    active: 'Available',
    sold: 'Sold Out',
    coming_soon: 'Coming Soon',
  }
  return labels[status] ?? status
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'bg-emerald-500/20 text-emerald-400',
    sold: 'bg-red-500/20 text-red-400',
    coming_soon: 'bg-amber-500/20 text-amber-400',
    available: 'bg-emerald-500/20 text-emerald-400',
    reserved: 'bg-blue-500/20 text-blue-400',
  }
  return colors[status] ?? 'bg-gray-500/20 text-gray-400'
}
