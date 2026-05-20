import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { getInsights } from '@/lib/sanity/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Real estate market insights, design inspiration, and construction expertise from the Axis Concept team.',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default async function InsightsPage() {
  const insights = await getInsights()

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-3">
            Axis Insights
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F5F0E8] mb-4">
            Insights & Perspectives
          </h1>
          <p className="font-sans text-base text-[#A89F94] max-w-xl">
            Market trends, design inspiration, and expert perspectives from the Axis Concept team.
          </p>
        </div>

        {/* Articles grid */}
        {insights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map(post => (
              <article key={post._id} className="group flex flex-col rounded-xl border border-[#2E3447] bg-[#1A1F2E] overflow-hidden hover:border-[#C9A96E]/40 transition-all duration-300">
                {/* Cover image */}
                <Link href={`/insights/${post.slug.current}`} className="block" tabIndex={-1} aria-hidden="true">
                  <div className="relative aspect-video overflow-hidden bg-[#242938]">
                    {post.coverImage?.asset?.url ? (
                      <Image
                        src={post.coverImage.asset.url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2E] to-[#242938] flex items-center justify-center">
                        <span className="font-serif text-5xl text-[#C9A96E]/20">A</span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 gap-3">
                  {/* Tags */}
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="font-sans text-xs px-2.5 py-1 rounded-full bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2 className="font-serif text-xl text-[#F5F0E8] leading-snug group-hover:text-[#C9A96E] transition-colors">
                    <Link href={`/insights/${post.slug.current}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {post.excerpt && (
                    <p className="font-sans text-sm text-[#A89F94] leading-relaxed line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#2E3447]">
                    <div className="flex items-center gap-1.5 font-sans text-xs text-[#A89F94]">
                      <Calendar size={12} aria-hidden="true" />
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    </div>
                    <Link
                      href={`/insights/${post.slug.current}`}
                      className="flex items-center gap-1 font-sans text-xs text-[#C9A96E] hover:gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded"
                      aria-label={`Read ${post.title}`}
                    >
                      Read <ArrowRight size={12} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-24 border border-dashed border-[#2E3447] rounded-2xl">
            <p className="font-serif text-2xl text-[#F5F0E8] mb-3">No articles yet</p>
            <p className="font-sans text-sm text-[#A89F94] max-w-sm mx-auto">
              Articles are published via Sanity Studio. Once Sanity is configured, posts will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
