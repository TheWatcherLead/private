'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, LogIn } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email,    setEmail   ] = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw  ] = useState(false)
  const [error,    setError   ] = useState<string | null>(null)
  const [loading,  setLoading ] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1117] px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-serif text-3xl font-semibold text-[#F5F0E8]">
            AXIS<span className="text-[#C9A96E]">.</span>
          </span>
          <p className="font-sans text-xs text-[#A89F94] tracking-widest uppercase mt-1">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#2E3447] bg-[#1A1F2E] p-8">
          <h1 className="font-serif text-2xl text-[#F5F0E8] mb-1">Sign In</h1>
          <p className="font-sans text-sm text-[#A89F94] mb-7">Enter your credentials to access the admin panel.</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-sans text-sm font-medium text-[#F5F0E8]">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full font-sans text-sm bg-[#0F1117] text-[#F5F0E8] border border-[#2E3447] rounded px-4 py-3 min-h-[44px] focus:border-[#C9A96E] outline-none transition-colors placeholder:text-[#A89F94]"
                placeholder="admin@axisconcept.in"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="font-sans text-sm font-medium text-[#F5F0E8]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full font-sans text-sm bg-[#0F1117] text-[#F5F0E8] border border-[#2E3447] rounded px-4 py-3 pr-11 min-h-[44px] focus:border-[#C9A96E] outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A89F94] hover:text-[#F5F0E8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="font-sans text-sm text-[#E05252]">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 font-sans text-sm font-medium px-5 py-3 rounded bg-[#C9A96E] text-[#0F1117] hover:bg-[#B8935A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1F2E]"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <LogIn size={16} aria-hidden="true" />
              )}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
