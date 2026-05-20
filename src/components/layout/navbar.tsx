'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/properties', label: 'Properties' },
  { href: '/projects',   label: 'Projects'   },
  { href: '/about',      label: 'About'       },
  { href: '/insights',   label: 'Insights'   },
  { href: '/contact',    label: 'Contact'     },
]

export function Navbar() {
  const [isScrolled, setIsScrolled]     = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setIsMobileOpen(false) }, [pathname])

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  const isTransparent = isHomepage && !isScrolled && !isMobileOpen

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isTransparent
            ? 'bg-transparent'
            : 'bg-[#0F1117]/95 backdrop-blur-md border-b border-[#2E3447]'
        )}
      >
        <nav
          className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
            aria-label="Axis Concept — home"
          >
            <span className="font-serif text-xl md:text-2xl font-semibold text-[#F5F0E8] tracking-wide">
              AXIS<span className="text-[#C9A96E]">.</span>
            </span>
            <span className="hidden sm:block font-sans text-xs text-[#A89F94] tracking-[0.2em] uppercase">
              Concept
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname.startsWith(href) ? 'page' : undefined}
                  className={cn(
                    'font-sans text-sm tracking-wide transition-colors duration-200',
                    pathname.startsWith(href)
                      ? 'text-[#C9A96E]'
                      : 'text-[#A89F94] hover:text-[#F5F0E8]'
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="font-sans text-sm font-medium px-5 py-2.5 rounded bg-[#C9A96E] text-[#0F1117] hover:bg-[#B8935A] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1117]"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(v => !v)}
            className="md:hidden p-2 rounded text-[#F5F0E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
            aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
          >
            {isMobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 top-16 z-40 bg-[#0F1117] flex flex-col px-6 py-8 gap-8 md:hidden',
          'transition-all duration-300',
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden={!isMobileOpen}
      >
        <ul className="flex flex-col gap-6" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                tabIndex={isMobileOpen ? 0 : -1}
                aria-current={pathname.startsWith(href) ? 'page' : undefined}
                className={cn(
                  'font-serif text-3xl transition-colors',
                  pathname.startsWith(href) ? 'text-[#C9A96E]' : 'text-[#F5F0E8]'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-4">
          <Link
            href="/contact"
            tabIndex={isMobileOpen ? 0 : -1}
            className="block font-sans text-sm font-medium px-6 py-3.5 rounded bg-[#C9A96E] text-[#0F1117] text-center"
          >
            Enquire Now
          </Link>
          <div className="text-center">
            <a
              href="tel:+919606116110"
              tabIndex={isMobileOpen ? 0 : -1}
              className="font-sans text-sm text-[#A89F94] hover:text-[#F5F0E8]"
            >
              +91 96061 16110
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
