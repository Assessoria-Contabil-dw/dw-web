'use client'

import Menu from '@/components/Menu'
import { User } from '@/lib/auth'
import { queryClient } from '@/services/query.provider'
import { redirect, useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const user: User = queryClient.getQueryData('authUser') as User

  if (
    (searchParams.get('partido') === null ||
      searchParams.get('partido') === '') &&
    user?.role === 'CLIENT'
  ) {
    return redirect('/acessos')
  }

  return (
    <main className="relative flex">
      <Menu />
      <div className="h-[calc(100vh-2.6rem)] flex-1 overflow-y-auto px-4 py-8">
        {children}
      </div>
    </main>
  )
}
