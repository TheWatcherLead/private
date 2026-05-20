import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1117] px-4">
      <div className="text-center max-w-md">
        {/* 404 display */}
        <p className="font-serif text-[120px] md:text-[160px] leading-none text-[#C9A96E]/20 select-none" aria-hidden="true">
          404
        </p>

        <h1 className="font-serif text-3xl md:text-4xl text-[#F5F0E8] -mt-4 mb-4">
          Page Not Found
        </h1>
        <p className="font-sans text-base text-[#A89F94] leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist, may have moved, or is no longer available.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#C9A96E] text-[#0F1117] font-sans text-sm font-medium hover:bg-[#B8935A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Home
          </Link>
          <Link
            href="/properties"
            className="flex items-center justify-center px-6 py-3 rounded-lg border border-[#2E3447] text-[#A89F94] font-sans text-sm hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  )
}
