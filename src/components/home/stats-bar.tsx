'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 3000, suffix: '+', label: 'Families & Businesses Served' },
  { value: 25,   suffix: '+', label: 'Years of Excellence'          },
  { value: 20,   suffix: '%', label: 'Year-on-Year Growth'          },
  { value: 15,   suffix: '+', label: 'Awards Won'                   },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1500
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current = Math.min(current + increment, target)
            setCount(Math.floor(current))
            if (current >= target) clearInterval(timer)
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} aria-label={`${target}${suffix}`}>
      {count}{suffix}
    </span>
  )
}

export function StatsBar() {
  return (
    <section
      className="bg-[#1A1F2E] border-y border-[#2E3447] py-12 md:py-16"
      aria-label="Company statistics"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="text-center">
              <dt className="font-sans text-xs tracking-[0.2em] uppercase text-[#A89F94] mb-2">
                {label}
              </dt>
              <dd className="font-serif text-4xl md:text-5xl text-[#C9A96E]">
                <Counter target={value} suffix={suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
