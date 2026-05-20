'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [active, setActive]       = useState(0)
  const [lightbox, setLightbox]   = useState(false)
  const [lightboxIdx, setLbIdx]   = useState(0)

  const all = images.length > 0 ? images : []

  const openLightbox = (idx: number) => { setLbIdx(idx); setLightbox(true) }
  const closeLightbox = useCallback(() => setLightbox(false), [])

  const prev = useCallback(() => setActive(i => (i - 1 + all.length) % all.length), [all.length])
  const next = useCallback(() => setActive(i => (i + 1) % all.length), [all.length])
  const lbPrev = useCallback(() => setLbIdx(i => (i - 1 + all.length) % all.length), [all.length])
  const lbNext = useCallback(() => setLbIdx(i => (i + 1) % all.length), [all.length])

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  lbPrev()
      if (e.key === 'ArrowRight') lbNext()
      if (e.key === 'Escape')     closeLightbox()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, lbPrev, lbNext, closeLightbox])

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  if (all.length === 0) {
    return (
      <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-[#1A1F2E] to-[#242938] flex items-center justify-center">
        <span className="font-serif text-6xl text-[#C9A96E]/20">A</span>
      </div>
    )
  }

  return (
    <>
      {/* Main gallery */}
      <div className="flex flex-col gap-3">
        {/* Main image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#1A1F2E] group cursor-zoom-in"
          onClick={() => openLightbox(active)}
          role="button"
          tabIndex={0}
          aria-label={`View image ${active + 1} of ${all.length} fullscreen`}
          onKeyDown={e => e.key === 'Enter' && openLightbox(active)}
        >
          <Image
            src={all[active]}
            alt={`${title} — image ${active + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority={active === 0}
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" aria-hidden="true" />
          <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={16} aria-hidden="true" />
          </div>
          {/* Nav arrows on main image */}
          {all.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prev() }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); next() }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </>
          )}
          {/* Counter */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/50 font-sans text-xs text-white">
            {active + 1} / {all.length}
          </div>
        </div>

        {/* Thumbnails */}
        {all.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 snap-x" role="list" aria-label="Image thumbnails">
            {all.map((src, i) => (
              <button
                key={i}
                role="listitem"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  'relative shrink-0 w-20 h-14 rounded-lg overflow-hidden snap-start transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
                  i === active
                    ? 'ring-2 ring-[#C9A96E] opacity-100'
                    : 'opacity-60 hover:opacity-90'
                )}
              >
                <Image src={src} alt={`${title} thumbnail ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${lightboxIdx + 1} of ${all.length}`}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close lightbox"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={20} aria-hidden="true" />
          </button>

          <button onClick={lbPrev} aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <ChevronLeft size={22} aria-hidden="true" />
          </button>

          <div className="relative w-full max-w-5xl mx-16 aspect-video">
            <Image
              src={all[lightboxIdx]}
              alt={`${title} — image ${lightboxIdx + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <button onClick={lbNext} aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <ChevronRight size={22} aria-hidden="true" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-sm text-white/60">
            {lightboxIdx + 1} / {all.length}
          </div>
        </div>
      )}
    </>
  )
}
