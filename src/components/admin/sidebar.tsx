'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Building2, MessageSquare,
  FolderOpen, Users, LogOut,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin',            label: 'Dashboard',  icon: LayoutDashboard, exact: true  },
  { href: '/admin/properties', label: 'Properties', icon: Building2,        exact: false },
  { href: '/admin/enquiries',  label: 'Enquiries',  icon: MessageSquare,    exact: false },
  { href: '/admin/projects',   label: 'Projects',   icon: FolderOpen,       exact: false },
  { href: '/admin/team',       label: 'Team',       icon: Users,            exact: false },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router   = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="flex flex-col h-full bg-[#1A1F2E] border-r border-[#2E3447] w-56 shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#2E3447]">
        <Link href="/admin" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded">
          <span className="font-serif text-xl font-semibold text-[#F5F0E8]">
            AXIS<span className="text-[#C9A96E]">.</span>
          </span>
          <span className="font-sans text-xs text-[#A89F94] tracking-widest">Admin</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Admin navigation">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg font-sans text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
                isActive
                  ? 'bg-[#C9A96E]/10 text-[#C9A96E] font-medium'
                  : 'text-[#A89F94] hover:text-[#F5F0E8] hover:bg-[#2E3447]/60'
              )}
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[#2E3447] space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-sans text-xs text-[#A89F94] hover:text-[#F5F0E8] transition-colors"
        >
          View Website ↗
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-sans text-sm text-[#A89F94] hover:text-[#E05252] hover:bg-[#E05252]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05252]"
        >
          <LogOut size={16} aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
