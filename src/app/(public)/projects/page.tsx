import type { Metadata } from 'next'
import { ProjectCard } from '@/components/projects/project-card'
import { ProjectTypeFilter } from '@/components/projects/project-type-filter'
import { getProjects } from '@/lib/supabase/queries'
import type { ProjectType } from '@/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Browse Axis Concept\'s portfolio of completed residential, commercial, academic, and warehouse projects across Bangalore.',
}

interface Props {
  searchParams: Promise<{ type?: string }>
}

export default async function ProjectsPage({ searchParams }: Props) {
  const { type } = await searchParams

  const allProjects = await getProjects()

  // Count per type for filter badges
  const counts = allProjects.reduce<Record<string, number>>((acc, p) => {
    acc[p.type] = (acc[p.type] ?? 0) + 1
    return acc
  }, {})

  const projects = type
    ? allProjects.filter(p => p.type === (type as ProjectType))
    : allProjects

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Page header */}
        <div className="mb-10">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-3">
            Portfolio
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F5F0E8] mb-6">
            Our Projects
          </h1>
          <p className="font-sans text-base text-[#A89F94] max-w-xl">
            25+ years of building excellence across Bangalore — residential communities,
            commercial landmarks, academic institutions, and industrial spaces.
          </p>
        </div>

        {/* Type filter */}
        <div className="mb-10">
          <ProjectTypeFilter
            activeType={type}
            counts={counts}
            total={allProjects.length}
          />
        </div>

        {/* Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-[#F5F0E8] mb-3">No projects found</p>
            <p className="font-sans text-sm text-[#A89F94]">
              Try a different category or{' '}
              <a href="/projects" className="text-[#C9A96E] hover:underline">view all projects</a>.
            </p>
          </div>
        )}

        {/* Empty state hint for admins */}
        {allProjects.length === 0 && (
          <div className="text-center py-24 border border-dashed border-[#2E3447] rounded-2xl">
            <p className="font-serif text-2xl text-[#F5F0E8] mb-3">No projects yet</p>
            <p className="font-sans text-sm text-[#A89F94]">
              Add completed projects via the{' '}
              <a href="/admin/projects" className="text-[#C9A96E] hover:underline">admin panel</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
