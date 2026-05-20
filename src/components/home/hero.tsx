'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
      {/* Background gradient — replace with Image/Video once assets are available */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0F1117] via-[#1A1F2E] to-[#0F1117]"
        aria-hidden="true"
      />

      {/* Biophilic texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3D6B35 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, #C9A96E 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* Vertical gold line accent */}
      <div
        className="absolute left-8 md:left-16 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#C9A96E]/40 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 pt-20 pb-32 text-center">
        {/* Eyebrow */}
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A96E] mb-6">
          Biophilic Design · Bangalore
        </p>

        {/* Headline */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-[#F5F0E8] leading-[1.05] mb-6 max-w-4xl mx-auto">
          Building Bangalore&apos;s Future,{' '}
          <em className="not-italic text-[#C9A96E]">Rooted in Nature</em>
        </h1>

        {/* Subheadline */}
        <p className="font-sans text-base md:text-lg text-[#A89F94] max-w-xl mx-auto leading-relaxed mb-10">
          Luxury residential and commercial properties crafted with biophilic design philosophy.
          25+ years of building excellence in Bangalore.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/properties">
            <Button size="lg">Explore Properties</Button>
          </Link>
          <Link href="/projects">
            <Button variant="ghost" size="lg">View Projects</Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#A89F94] hover:text-[#C9A96E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded"
        aria-label="Scroll down"
      >
        <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" aria-hidden="true" />
      </button>
    </section>
  )
}
