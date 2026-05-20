import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { getInsightBySlug, getInsights } from '@/lib/sanity/queries'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getInsightBySlug(slug)
  if (!post) return { title: 'Article Not Found' }

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.coverImage?.asset?.url ? [post.coverImage.asset.url] : [],
    },
  }
}

/* Portable Text component overrides for dark theme */
const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-sans text-base text-[#A89F94] leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-2xl text-[#F5F0E8] mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-xl text-[#F5F0E8] mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[#C9A96E] pl-5 my-6 font-serif text-lg italic text-[#F5F0E8]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-none space-y-2 mb-4 pl-0">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-[#A89F94] font-sans text-base leading-relaxed">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-3 font-sans text-sm text-[#A89F94] leading-relaxed">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9A96E] shrink-0" aria-hidden="true" />
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-[#F5F0E8]">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-[#F5F0E8]">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="font-mono text-sm bg-[#242938] text-[#C9A96E] px-2 py-0.5 rounded">{children}</code>
    ),
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#C9A96E] underline hover:text-[#B8935A] transition-colors"
      >
        {children}
      </a>
    ),
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([
    getInsightBySlug(slug),
    getInsights(),
  ])

  if (!post) notFound()

  const related = allPosts.filter(p => p._id !== post._id).slice(0, 3)

  return (
    <div className="pt-20 pb-20 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-sans text-xs text-[#A89F94] mb-8" aria-label="Breadcrumb">
          <a href="/" className="hover:text-[#F5F0E8] transition-colors">Home</a>
          <span aria-hidden="true">/</span>
          <a href="/insights" className="hover:text-[#F5F0E8] transition-colors">Insights</a>
          <span aria-hidden="true">/</span>
          <span className="text-[#F5F0E8] truncate max-w-[200px]" aria-current="page">{post.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

          {/* Article */}
          <article>
            {/* Cover image */}
            {post.coverImage?.asset?.url && (
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 bg-[#1A1F2E]">
                <Image
                  src={post.coverImage.asset.url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 720px"
                  priority
                />
              </div>
            )}

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 font-sans text-xs px-2.5 py-1 rounded-full bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/20">
                    <Tag size={10} aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-serif text-3xl md:text-4xl text-[#F5F0E8] leading-tight mb-5">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-[#2E3447]">
              {post.author && (
                <span className="flex items-center gap-1.5 font-sans text-sm text-[#A89F94]">
                  <User size={14} className="text-[#C9A96E]" aria-hidden="true" />
                  {post.author}
                </span>
              )}
              <time
                dateTime={post.publishedAt}
                className="flex items-center gap-1.5 font-sans text-sm text-[#A89F94]"
              >
                <Calendar size={14} className="text-[#C9A96E]" aria-hidden="true" />
                {formatDate(post.publishedAt)}
              </time>
            </div>

            {/* Body */}
            {post.body ? (
              <div className="prose-custom">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <PortableText value={post.body as any} components={ptComponents} />
              </div>
            ) : post.excerpt ? (
              <p className="font-sans text-base text-[#A89F94] leading-relaxed">{post.excerpt}</p>
            ) : null}

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-[#2E3447]">
              <Link href="/insights" className="flex items-center gap-2 font-sans text-sm text-[#A89F94] hover:text-[#F5F0E8] transition-colors">
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Insights
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start space-y-8">
            {related.length > 0 && (
              <div>
                <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-5">More Articles</h2>
                <ul className="space-y-5" role="list">
                  {related.map(p => (
                    <li key={p._id} className="group">
                      <Link href={`/insights/${p.slug.current}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded block">
                        <p className="font-serif text-sm text-[#F5F0E8] group-hover:text-[#C9A96E] transition-colors leading-snug mb-1">
                          {p.title}
                        </p>
                        <time dateTime={p.publishedAt} className="font-sans text-xs text-[#A89F94]">
                          {formatDate(p.publishedAt)}
                        </time>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Subscribe placeholder */}
            <div className="rounded-2xl border border-[#2E3447] bg-[#1A1F2E] p-6 text-center">
              <p className="font-serif text-base text-[#F5F0E8] mb-2">Interested in a property?</p>
              <p className="font-sans text-xs text-[#A89F94] mb-4">Browse our active listings or get in touch.</p>
              <Link href="/properties" className="block py-2.5 px-4 rounded-lg bg-[#C9A96E] text-[#0F1117] font-sans text-sm font-medium hover:bg-[#B8935A] transition-colors">
                View Properties
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
