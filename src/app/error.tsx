'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#0F1117] px-4">
        <div className="text-center max-w-md">
          <p className="font-serif text-[100px] leading-none text-[#E05252]/20 select-none" aria-hidden="true">
            Error
          </p>
          <h1 className="font-serif text-3xl text-[#F5F0E8] -mt-2 mb-4">
            Something Went Wrong
          </h1>
          <p className="font-sans text-base text-[#A89F94] leading-relaxed mb-10">
            An unexpected error occurred. Please try again or return to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#C9A96E] text-[#0F1117] font-sans text-sm font-medium hover:bg-[#B8935A] transition-colors"
            >
              <RefreshCw size={16} aria-hidden="true" />
              Try Again
            </button>
            <Link
              href="/"
              className="flex items-center justify-center px-6 py-3 rounded-lg border border-[#2E3447] text-[#A89F94] font-sans text-sm hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
            >
              Go Home
            </Link>
          </div>
          {error.digest && (
            <p className="font-sans text-xs text-[#A89F94]/40 mt-8">Error ID: {error.digest}</p>
          )}
        </div>
      </body>
    </html>
  )
}
