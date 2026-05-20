import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectsLoading() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Skeleton className="h-3 w-20 mb-3" />
          <Skeleton className="h-12 w-40 mb-4" />
          <Skeleton className="h-5 w-80" />
        </div>
        <div className="flex gap-2 mb-10">
          {[80, 100, 110, 95, 105].map((w, i) => (
            <Skeleton key={i} className={`h-9 w-${w} rounded-full`} style={{ width: `${w}px` }} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
