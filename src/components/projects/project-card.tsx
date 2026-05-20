import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar, Maximize2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatArea } from '@/lib/utils'
import type { Project, ProjectType } from '@/types'

interface ProjectCardProps {
  project: Project
  priority?: boolean
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const { slug, title, location, thumbnail_url, type, year_completed, area_sqft } = project

  return (
    <Link
      href={`/projects/${slug}`}
      className="group relative block rounded-xl overflow-hidden bg-[#1A1F2E] border border-[#2E3447] hover:border-[#C9A96E]/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1117]"
      aria-label={`View project: ${title}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#242938]">
        {thumbnail_url ? (
          <Image
            src={thumbnail_url}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2E] to-[#0F1117] flex items-center justify-center">
            <span className="font-serif text-6xl text-[#C9A96E]/20">A</span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117]/90 via-[#0F1117]/20 to-transparent" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <Badge variant={type as ProjectType} className="mb-2" />
        <h3 className="font-serif text-lg md:text-xl text-[#F5F0E8] leading-snug mb-2 group-hover:text-[#C9A96E] transition-colors">
          {title}
        </h3>
        <div className="flex flex-wrap items-center gap-4 font-sans text-xs text-[#A89F94]">
          {location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} aria-hidden="true" className="text-[#C9A96E]" />
              {location}
            </span>
          )}
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
