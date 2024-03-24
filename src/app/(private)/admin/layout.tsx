'use client'
import MenuData from '@/components/private/pages/admin/Menu'
import { User } from '@/hooks/Access/User/useAuth'
import { queryClient } from '@/provider/query.provider'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  const user: User = queryClient.getQueryData('authUser') as User
  const router = useRouter()
  if (user?.role !== 'ADMIN') {
    router.push('')
    return null
  }

  return (
    <section className="relative flex h-full w-full">
    <MenuData />
    <div className="relative flex-1 overflow-y-auto px-4 py-6">
      {children}
    </div>
  </section>
  )
}
