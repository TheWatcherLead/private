import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CtaBanner() {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Gold gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#C9A96E] to-[#A67E48]"
        aria-hidden="true"
      />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, #0F1117 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 text-center">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#0F1117]/60 mb-4">
          Take the Next Step
        </p>
        <h2
          id="cta-heading"
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0F1117] leading-tight mb-4"
        >
          Ready to Find Your Space?
        </h2>
        <p className="font-sans text-base md:text-lg text-[#0F1117]/70 max-w-xl mx-auto mb-10">
          Schedule a site visit and experience Axis Concept&apos;s biophilic spaces in person.
          Our team is ready to help you find the perfect property.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-[#0F1117] text-[#F5F0E8] hover:bg-[#1A1F2E] focus-visible:ring-[#0F1117]"
            >
              Request a Site Visit
              <ArrowRight size={18} className="ml-2" aria-hidden="true" />
            </Button>
          </Link>
          <a href="tel:+919606116110">
            <Button
              variant="ghost"
              size="lg"
              className="border-[#0F1117]/40 text-[#0F1117] hover:bg-[#0F1117] hover:text-[#F5F0E8] focus-visible:ring-[#0F1117]"
            >
              <Phone size={18} className="mr-2" aria-hidden="true" />
              Call Us Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
