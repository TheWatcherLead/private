import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Award, Users, Building2, Calendar } from 'lucide-react'
import { getTeam } from '@/lib/supabase/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Axis Concept has been building landmark residential and commercial properties in Bangalore for 25+ years, rooted in biophilic design philosophy.',
}

const milestones = [
  { year: '1999', event: 'Axis Concept founded in Bangalore with a vision to build differently.' },
  { year: '2005', event: 'Completed our first landmark commercial project in Whitefield.' },
  { year: '2010', event: 'Launched our biophilic design philosophy across all residential developments.' },
  { year: '2015', event: 'Expanded into academic and warehouse construction segments.' },
  { year: '2020', event: 'Crossed 500 satisfied clients and 150 completed projects.' },
  { year: '2024', event: '25th anniversary — 200+ projects, 20% year-over-year growth.' },
]

const awards = [
  { title: 'Best Residential Developer', body: 'Bangalore Real Estate Awards', year: '2023' },
  { title: 'Biophilic Design Excellence', body: 'India Green Building Council', year: '2022' },
  { title: 'Quality Construction Award', body: 'CREDAI Karnataka', year: '2021' },
  { title: 'Customer Satisfaction Gold', body: 'Track2Realty', year: '2020' },
]

const values = [
  { icon: Building2, title: 'Biophilic Design',       body: 'Every space integrates nature — light, air, greenery, and organic form — to foster wellbeing.' },
  { icon: Users,     title: 'Community First',         body: 'We design neighbourhoods, not just buildings. Shared spaces and walkable streets bring people together.' },
  { icon: Award,     title: 'Uncompromising Quality',  body: '25+ years of engineering excellence means every structure meets the highest safety and quality standards.' },
  { icon: Calendar,  title: 'On-Time Delivery',        body: 'We honour our commitments. Possession on the promised date is a non-negotiable at Axis Concept.' },
]

export default async function AboutPage() {
  const team = await getTeam()

  return (
    <div className="pt-20 min-h-screen">

      {/* Hero */}
      <section className="relative py-24 md:py-36 overflow-hidden" aria-label="About Axis Concept">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1117] via-[#1A1F2E] to-[#0F1117]" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, #3D6B35 0%, transparent 50%), radial-gradient(circle at 70% 40%, #C9A96E 0%, transparent 50%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A96E] mb-4">Since 1999</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#F5F0E8] leading-tight mb-6">
            Building Bangalore&apos;s Future,<br />
            <em className="not-italic text-[#3D6B35]">One Space at a Time</em>
          </h1>
          <p className="font-sans text-base md:text-lg text-[#A89F94] max-w-2xl mx-auto leading-relaxed">
            Axis Concept is a benchmark real estate and construction company headquartered in Bangalore.
            For 25+ years we have been shaping the city&apos;s residential, commercial, academic, and
            industrial landscape — guided by our biophilic design philosophy.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1A1F2E] border-y border-[#2E3447] py-12" aria-label="Company statistics">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '25+',   label: 'Years of Excellence'          },
              { value: '3000+', label: 'Families & Businesses Served' },
              { value: '20%',   label: 'Year-on-Year Growth'          },
              { value: '15+',   label: 'Awards Won'                   },
            ].map(({ value, label }) => (
              <div key={label}>
                <dt className="font-sans text-xs tracking-[0.2em] uppercase text-[#A89F94] mb-2">{label}</dt>
                <dd className="font-serif text-4xl md:text-5xl text-[#C9A96E]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28" aria-labelledby="story-heading">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-4">Our Story</p>
              <h2 id="story-heading" className="font-serif text-4xl md:text-5xl text-[#F5F0E8] mb-6">
                Built on a Mission of Excellence
              </h2>
              <div className="space-y-4 font-sans text-base text-[#A89F94] leading-relaxed">
                <p>
                  Axis Concept was founded in 1999 with a single conviction: the built environment should
                  enrich the lives of everyone who inhabits it. Not just structurally, but emotionally and
                  physically — spaces that breathe, connect, and endure.
                </p>
                <p>
                  Over 25 years we have evolved from a boutique construction firm into one of Bangalore&apos;s
                  most respected real estate developers, with a portfolio spanning luxury residences,
                  commercial landmarks, academic campuses, and industrial parks.
                </p>
                <p>
                  Our biophilic design philosophy — integrating nature into every space — has become our
                  signature and our promise to every client.
                </p>
              </div>
            </div>

            {/* Visual */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#3D6B35]/20 to-[#1A1F2E]">
              <div className="absolute left-0 top-8 bottom-8 w-1 bg-[#3D6B35] rounded-r-full" aria-hidden="true" />
              <div className="absolute inset-0 flex items-center justify-center">
                <blockquote className="text-center px-10">
                  <p className="font-serif text-2xl md:text-3xl text-[#F5F0E8] italic leading-relaxed mb-4">
                    &ldquo;To be a benchmark of excellence and creativity in construction.&rdquo;
                  </p>
                  <footer>
                    <cite className="font-sans text-sm text-[#C9A96E] not-italic tracking-widest uppercase">
                      — Axis Concept Mission
                    </cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#1A1F2E]" aria-labelledby="values-heading">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-3">What We Stand For</p>
            <h2 id="values-heading" className="font-serif text-4xl md:text-5xl text-[#F5F0E8]">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-[#2E3447] bg-[#0F1117] p-6">
                <div className="w-10 h-10 rounded-lg bg-[#C9A96E]/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#C9A96E]" aria-hidden="true" />
                </div>
                <h3 className="font-sans text-sm font-semibold text-[#F5F0E8] mb-2">{title}</h3>
                <p className="font-sans text-sm text-[#A89F94] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28" aria-labelledby="team-heading">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-3">The People</p>
            <h2 id="team-heading" className="font-serif text-4xl md:text-5xl text-[#F5F0E8]">Meet Our Team</h2>
          </div>

          {team.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list">
              {team.map(member => (
                <li key={member.id} className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] overflow-hidden">
                  <div className="relative aspect-square bg-[#242938]">
                    {member.photo_url ? (
                      <Image
                        src={member.photo_url}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1A1F2E] to-[#242938]">
                        <span className="font-serif text-5xl text-[#C9A96E]/40">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-sans text-sm font-semibold text-[#F5F0E8]">{member.name}</h3>
                    {member.role && (
                      <p className="font-sans text-xs text-[#C9A96E] mt-1">{member.role}</p>
                    )}
                    {member.bio && (
                      <p className="font-sans text-xs text-[#A89F94] leading-relaxed mt-3 line-clamp-3">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center font-sans text-sm text-[#A89F94]">
              Team profiles coming soon. Add members via the{' '}
              <a href="/admin/team" className="text-[#C9A96E] hover:underline">admin panel</a>.
            </p>
          )}
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-[#1A1F2E]" aria-labelledby="awards-heading">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-3">Recognition</p>
            <h2 id="awards-heading" className="font-serif text-4xl md:text-5xl text-[#F5F0E8]">Awards & Accolades</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map(({ title, body, year }) => (
              <div key={title} className="rounded-xl border border-[#2E3447] bg-[#0F1117] p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center mx-auto mb-4">
                  <Award size={20} className="text-[#C9A96E]" aria-hidden="true" />
                </div>
                <p className="font-sans text-xs text-[#C9A96E] mb-1">{year}</p>
                <h3 className="font-sans text-sm font-semibold text-[#F5F0E8] mb-1">{title}</h3>
                <p className="font-sans text-xs text-[#A89F94]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28" aria-labelledby="timeline-heading">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-3">Milestones</p>
            <h2 id="timeline-heading" className="font-serif text-4xl md:text-5xl text-[#F5F0E8]">Our Journey</h2>
          </div>
          <ol className="relative border-l border-[#2E3447] ml-4 md:ml-8 space-y-10" aria-label="Company milestones">
            {milestones.map(({ year, event }) => (
              <li key={year} className="pl-8 relative">
                <div className="absolute -left-2.5 top-1 w-5 h-5 rounded-full border-2 border-[#C9A96E] bg-[#0F1117]" aria-hidden="true" />
                <time className="font-sans text-xs font-semibold text-[#C9A96E] tracking-widest block mb-1">
                  {year}
                </time>
                <p className="font-sans text-sm text-[#A89F94] leading-relaxed">{event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1A1F2E] border-t border-[#2E3447]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-3xl text-[#F5F0E8] mb-4">Ready to Build With Us?</h2>
          <p className="font-sans text-sm text-[#A89F94] mb-8">
            Explore our active listings or get in touch with our team today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/properties" className="px-6 py-3 rounded-lg bg-[#C9A96E] text-[#0F1117] font-sans text-sm font-medium hover:bg-[#B8935A] transition-colors">
              View Properties
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-lg border border-[#C9A96E] text-[#C9A96E] font-sans text-sm font-medium hover:bg-[#C9A96E] hover:text-[#0F1117] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
