import type { Metadata } from 'next'
import { Briefcase, MapPin, Clock, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join the Axis Concept team. We are always looking for talented architects, engineers, and construction professionals in Bangalore.',
}

const openings: {
  title: string
  department: string
  location: string
  type: string
  description: string
}[] = [
  // Add live openings here or fetch from Sanity
]

const perks = [
  { emoji: '🏗️', title: 'Landmark Projects',    body: 'Work on some of Bangalore\'s most iconic residential and commercial developments.' },
  { emoji: '🌿', title: 'Biophilic Culture',     body: 'Our offices and project sites embody the same nature-first philosophy we build.' },
  { emoji: '📈', title: 'Growth Trajectory',    body: 'A 20% year-on-year growth company means fast career progression for high performers.' },
  { emoji: '🤝', title: 'Collaborative Team',  body: 'A tight-knit team of architects, engineers, and sales professionals who support each other.' },
]

export default function CareersPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-16">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-3">Join Us</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F5F0E8] mb-4">Careers at Axis Concept</h1>
          <p className="font-sans text-base text-[#A89F94] max-w-xl">
            We are always looking for talented architects, civil engineers, project managers, and sales professionals
            who share our passion for building spaces that last.
          </p>
        </div>

        {/* Perks */}
        <section className="mb-16" aria-labelledby="perks-heading">
          <h2 id="perks-heading" className="font-serif text-3xl text-[#F5F0E8] mb-8">Why Axis Concept?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map(({ title, body }) => (
              <div key={title} className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] p-6">
                <h3 className="font-sans text-sm font-semibold text-[#F5F0E8] mb-2">{title}</h3>
                <p className="font-sans text-sm text-[#A89F94] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Openings */}
        <section aria-labelledby="openings-heading">
          <h2 id="openings-heading" className="font-serif text-3xl text-[#F5F0E8] mb-8">Open Positions</h2>

          {openings.length > 0 ? (
            <div className="space-y-4">
              {openings.map(job => (
                <div key={job.title} className="rounded-xl border border-[#2E3447] bg-[#1A1F2E] p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-sans text-base font-semibold text-[#F5F0E8]">{job.title}</h3>
                      <p className="font-sans text-sm text-[#C9A96E]">{job.department}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 font-sans text-xs text-[#A89F94]">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} aria-hidden="true" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} aria-hidden="true" /> {job.type}
                      </span>
                    </div>
                  </div>
                  <p className="font-sans text-sm text-[#A89F94] leading-relaxed mb-4">{job.description}</p>
                  <a
                    href={`mailto:careers@axisconcept.in?subject=Application for ${job.title}`}
                    className="inline-flex items-center gap-2 font-sans text-sm font-medium px-5 py-2.5 rounded bg-[#C9A96E] text-[#0F1117] hover:bg-[#B8935A] transition-colors"
                  >
                    <Mail size={15} aria-hidden="true" />
                    Apply Now
                  </a>
                </div>
              ))}
            </div>
          ) : (
            /* No openings CTA */
            <div className="rounded-2xl border border-dashed border-[#2E3447] p-12 text-center">
              <div className="w-14 h-14 rounded-full bg-[#C9A96E]/10 flex items-center justify-center mx-auto mb-5">
                <Briefcase size={24} className="text-[#C9A96E]" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl text-[#F5F0E8] mb-3">No Open Positions Right Now</h3>
              <p className="font-sans text-sm text-[#A89F94] max-w-md mx-auto mb-6">
                We don&apos;t have any active openings at the moment, but we&apos;re always happy
                to hear from talented professionals. Send us your CV and we&apos;ll keep you in mind
                for future opportunities.
              </p>
              <a
                href="mailto:careers@axisconcept.in?subject=General Application — Axis Concept"
                className="inline-flex items-center gap-2 font-sans text-sm font-medium px-6 py-3 rounded-lg bg-[#C9A96E] text-[#0F1117] hover:bg-[#B8935A] transition-colors"
              >
                <Mail size={16} aria-hidden="true" />
                Send Your CV
              </a>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
