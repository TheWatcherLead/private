import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/admin/sidebar'
import { ToastProvider } from '@/components/ui/toast'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  return (
    <ToastProvider>
      <div className="flex h-screen bg-[#0F1117] overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto" id="admin-main">
          {children}
        </main>
      </div>
    </ToastProvider>
  )
}
