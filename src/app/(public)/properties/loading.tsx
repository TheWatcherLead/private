import { PropertyCardSkeleton } from '@/components/ui/skeleton'

export default function PropertiesLoading() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="mb-10">
          <div className="h-3 w-24 rounded bg-[#2E3447] animate-pulse mb-3" />
          <div className="h-12 w-48 rounded bg-[#2E3447] animate-pulse" />
        </div>
        <div className="h-36 rounded-2xl bg-[#1A1F2E] border border-[#2E3447] animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
