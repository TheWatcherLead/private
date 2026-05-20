import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',  value: 'on'          },
  { key: 'X-Frame-Options',         value: 'SAMEORIGIN'  },
  { key: 'X-Content-Type-Options',  value: 'nosniff'     },
  { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',      value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage
      { protocol: 'https', hostname: '*.supabase.co',  pathname: '/storage/v1/object/public/**' },
      { protocol: 'https', hostname: '*.supabase.com', pathname: '/storage/v1/object/public/**' },
      // Sanity CDN
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Common image CDNs (Unsplash, Cloudinary, etc.)
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com'  },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Note: Next.js controls /_next/static caching internally
    ]
  },

  // Compress output
  compress: true,

  // Strict mode
  reactStrictMode: true,

  // Disable powered-by header
  poweredByHeader: false,
}

export default nextConfig
