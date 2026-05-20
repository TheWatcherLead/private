import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, Maximize2, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PropertyGallery } from '@/components/properties/property-gallery'
import { getProjectBySlug, getProjects } from '@/lib/supabase/queries'
import { formatArea } from '@/lib/utils'
import type { ProjectType } from '@/types'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }

  return {
    title: project.title,
    description:
      project.description ??
      `${project.title} — a completed ${project.type} project by Axis Concept in ${project.location ?? 'Bangalore'}.`,
    openGraph: {
      title: project.title,
      images: project.thumbnail_url ? [project.thumbnail_url] : [],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ])

  if (!project) notFound()

  const allImages = [project.thumbnail_url, ...project.gallery_urls].filter(Boolean) as string[]

  const related = allProjects
    .filter(p => p.slug !== slug && p.type === project.type)
    .slice(0, 3)

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: project.title,
    description: project.description,
    url: `https://www.axisconcept.in/projects/${project.slug}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: project.location,
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    ...(project.thumbnail_url && { image: project.thumbnail_url }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-20 pb-20 min-h-screen">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8">

          {/* Back link + breadcrumb */}
          <nav className="flex items-center gap-2 font-sans text-xs text-[#A89F94] mb-8" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[#F5F0E8] transition-colors">Home</a>
            <span aria-hidden="true">/</span>
            <a href="/projects" className="hover:text-[#F5F0E8] transition-colors">Projects</a>
            <span aria-hidden="true">/</span>
            <span className="text-[#F5F0E8]" aria-current="page">{project.title}</span>
          </nav>

          {/* Hero gallery */}
          <div className="mb-12">
            <PropertyGallery images={allImages} title={project.title} />
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

            {/* LEFT — main content */}
            <div className="space-y-10 min-w-0">

              {/* Header */}
              <div>
                <Badge variant={project.type as ProjectType} className="mb-4" />
                <h1 className="font-serif text-3xl md:text-4xl text-[#F5F0E8] leading-tight mb-6">
                  {project.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap gap-6">
                  {project.location && (
                    <div className="flex items-center gap-2 font-sans text-sm text-[#A89F94]">
                      <MapPin size={14} className="text-[#C9A96E] shrink-0" aria-hidden="true" />
                      {project.location}, Bangalore
                    </div>
                  )}
                  {project.year_completed && (
                    <div className="flex items-center gap-2 font-sans text-sm text-[#A89F94]">
                      <Calendar size={14} className="text-[#C9A96E] shrink-0" aria-hidden="true" />
                      Completed {project.year_completed}
                    </div>
                  )}
                  {project.area_sqft && (
                    <div className="flex items-center gap-2 font-sans text-sm text-[#A89F94]">
                      <Maximize2 size={14} className="text-[#C9A96E] shrink-0" aria-hidden="true" />
                      {formatArea(project.area_sqft)}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {project.description && (
                <div>
                  <h2 className="font-serif text-2xl text-[#F5F0E8] mb-3">About This Project</h2>
                  <p className="font-sans text-base text-[#A89F94] leading-relaxed whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
              )}

              {/* Highlights */}
              {project.highlights.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl text-[#F5F0E8] mb-4">Highlights</h2>
                  <ul className="space-y-3" role="list">
                    {project.highlights.map(h => (
                      <li key={h} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9A96E] shrink-0" aria-hidden="true" />
                        <span className="font-sans text-sm text-[#A89F94] leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery grid — all images */}
              {project.gallery_urls.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl text-[#F5F0E8] mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.gallery_urls.map((url, i) => (
                      <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-[#1A1F2E]">
                        <Image
                          src={url}
                          alt={`${project.title} — image ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 33vw"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT — sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start space-y-6">

              {/* Quick facts */}
              <div className="rounded-2xl border border-[#2E3447] bg-[#1A1F2E] p-6 space-y-5">
                <h2 className="font-serif text-lg text-[#F5F0E8]">Project Details</h2>
                <dl className="space-y-4">
                  {[
                    { label: 'Type',      value: project.type.charAt(0).toUpperCase() + project.type.slice(1) },
                    { label: 'Location',  value: project.location },
                    { label: 'Completed', value: project.year_completed?.toString() },
                    { label: 'Area',      value: formatArea(project.area_sqft) || undefined },
                  ].filter(r => r.value).map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-4">
                      <dt className="font-sans text-xs text-[#A89F94] uppercase tracking-wide">{label}</dt>
                      <dd className="font-sans text-sm text-[#F5F0E8] text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-[#C9A96E]/30 bg-[#C9A96E]/5 p-6 text-center">
                <p className="font-serif text-base text-[#F5F0E8] mb-2">
                  Interested in our next project?
                </p>
                <p className="font-sans text-xs text-[#A89F94] mb-4">
                  Browse our active listings or get in touch with our team.
                </p>
                <Link
                  href="/properties"
                  className="block w-full py-3 rounded-lg bg-[#C9A96E] text-[#0F1117] font-sans text-sm font-medium text-center hover:bg-[#B8935A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                >
                  View Properties
                </Link>
              </div>

              {/* Back to projects */}
              <Link
                href="/projects"
                className="flex items-center gap-2 font-sans text-sm text-[#A89F94] hover:text-[#F5F0E8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Projects
              </Link>
            </aside>
          </div>

          {/* Related projects */}
          {related.length > 0 && (
            <section className="mt-20 pt-16 border-t border-[#2E3447]" aria-labelledby="related-projects-heading">
              <h2 id="related-projects-heading" className="font-serif text-3xl text-[#F5F0E8] mb-8">
                More {project.type.charAt(0).toUpperCase() + project.type.slice(1)} Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map(p => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.slug}`}
                    className="group relative block rounded-xl overflow-hidden bg-[#1A1F2E] border border-[#2E3447] hover:border-[#C9A96E]/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                    aria-label={`View project: ${p.title}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#242938]">
                      {p.thumbnail_url ? (
                        <Image
                          src={p.thumbnail_url}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="33vw"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-serif text-4xl text-[#C9A96E]/20">A</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117]/80 to-transparent" aria-hidden="true" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-serif text-base text-[#F5F0E8] group-hover:text-[#C9A96E] transition-colors">
                        {p.title}
                      </h3>
                      {p.year_completed && (
                        <p className="font-sans text-xs text-[#A89F94] mt-1">{p.year_completed}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
