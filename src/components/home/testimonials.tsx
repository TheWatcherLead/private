'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    quote: "You have shown people what quality in construction is. Axis is unbeatable in quality and design.",
    author: "G. Durai",
    role: "Homeowner",
    initial: "G",
  },
  {
    id: 2,
    quote: "The design allows air flow throughout the day. They've provided quite a range of amenities — truly a well-thought-out home.",
    author: "Sunil Kulkarni",
    role: "Homeowner, Axis Olivia",
    initial: "S",
  },
  {
    id: 3,
    quote: "Their efforts and responsiveness made my house buying experience truly memorable. I couldn't have asked for a better team.",
    author: "Jayanti Das",
    role: "Homeowner, Axis Citrino",
    initial: "J",
  },
  {
    id: 4,
    quote: "All issues were resolved to my satisfaction. The best thing I like is the location and landscaping — it's unlike anything else in Bangalore.",
    author: "Madhur Shenoy",
    role: "Homeowner, Axis Tuscan Terraces",
    initial: "M",
  },
  {
    id: 5,
    quote: "I've had the ultimate peaceful living experience for the past 3 years. Axis Concept truly delivers on their promise of quality living.",
    author: "Gopalakrishnan",
    role: "Homeowner",
    initial: "G",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const go = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((index + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 300)
  }, [isAnimating])

  // Auto-advance (pause if prefers-reduced-motion)
  useEffect(() => {
    if (prefersReducedMotion) return
    intervalRef.current = setInterval(() => {
      go(current + 1)
    }, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [current, go, prefersReducedMotion])

  const pause = () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  const resume = () => {
    if (prefersReducedMotion) return
    intervalRef.current = setInterval(() => go(current + 1), 5000)
  }

  const t = testimonials[current]

  return (
    <section
      className="py-20 md:py-28 bg-[#1A1F2E]"
      aria-label="Customer testimonials"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-3">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F5F0E8]">
            What Our Clients Say
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative max-w-3xl mx-auto text-center"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
        >
          <Quote
            size={48}
            className="mx-auto mb-6 text-[#C9A96E]/30"
            aria-hidden="true"
          />

          {/* Quote */}
          <div
            key={t.id}
            className={cn(
              'transition-opacity duration-300',
              isAnimating ? 'opacity-0' : 'opacity-100'
            )}
            aria-live="polite"
            aria-atomic="true"
          >
            <blockquote>
              <p className="font-serif text-xl md:text-2xl text-[#F5F0E8] leading-relaxed italic mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer>
                {/* Avatar */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/40 flex items-center justify-center">
                    <span className="font-serif text-lg text-[#C9A96E]">{t.initial}</span>
                  </div>
                  <div className="text-left">
                    <cite className="font-sans text-sm font-semibold text-[#F5F0E8] not-italic">
                      {t.author}
                    </cite>
                    <p className="font-sans text-xs text-[#A89F94]">{t.role}</p>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => go(current - 1)}
              aria-label="Previous testimonial"
              className="p-2 rounded-full border border-[#2E3447] text-[#A89F94] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => go(i)}
                  className={cn(
                    'rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
                    i === current
                      ? 'w-6 h-2 bg-[#C9A96E]'
                      : 'w-2 h-2 bg-[#2E3447] hover:bg-[#A89F94]'
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => go(current + 1)}
              aria-label="Next testimonial"
              className="p-2 rounded-full border border-[#2E3447] text-[#A89F94] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
