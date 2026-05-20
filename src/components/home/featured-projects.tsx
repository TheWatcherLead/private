import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Maximize2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatArea } from '@/lib/utils'
import type { Project, ProjectType } from '@/types'

interface FeaturedProjectsProps {
  projects: Project[]
}

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const { slug, title, location, thumbnail_url, type, year_completed, area_sqft } = project

  return (
    <Link
      href={`/projects/${slug}`}
      className={`group relative block rounded-xl overflow-hidden bg-[#1A1F2E] border border-[#2E3447] hover:border-[#C9A96E]/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] ${large ? 'aspect-[4/3]' : 'aspect-video'}`}
      aria-label={`View project: ${title}`}
    >
      {/* Image / placeholder */}
      {thumbnail_url ? (
        <Image
          src={thumbnail_url}
          alt={title}
          fill
          sizes={large ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2E] to-[#0F1117] flex items-center justify-center">
          <span className="font-serif text-6xl text-[#C9A96E]/20">A</span>
        </div>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-[#0F1117]/40 to-transparent" aria-hidden="true" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <Badge variant={type as ProjectType} className="mb-2" />
        <h3 className={`font-serif text-[#F5F0E8] leading-snug mb-1 ${large ? 'text-2xl' : 'text-lg'}`}>
          {title}
        </h3>
        <div className="flex items-center gap-4 font-sans text-xs text-[#A89F94]">
          {location && <span>{location}</span>}
          {year_completed && (
            <span className="flex items-center gap-1">
              <Calendar size={11} aria-hidden="true" />
              {year_completed}
            </span>
          )}
          {area_sqft && (
            <span className="flex items-center gap-1">
              <Maximize2 size={11} aria-hidden="true" />
              {formatArea(area_sqft)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null

  const [first, ...rest] = projects

  return (
    <section className="py-20 md:py-28" aria-labelledby="featured-projects-heading">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-3">
              Portfolio
            </p>
            <h2 id="featured-projects-heading" className="font-serif text-4xl md:text-5xl text-[#F5F0E8]">
              Our Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-2 font-sans text-sm text-[#A89F94] hover:text-[#C9A96E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded"
          >
            View all <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Large card */}
          {first && <ProjectCard project={first} large />}

          {/* Stack of smaller cards */}
          {rest.length > 0 && (
            <div className="flex flex-col gap-6">
              {rest.slice(0, 3).map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-sans text-sm text-[#A89F94] hover:text-[#C9A96E] transition-colors"
          >
            View all projects <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
