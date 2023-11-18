'use client'

import Header from '@/components/Menu/Header'
import { useAuth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  const user = useAuth()

  if (user === undefined) {
    return redirect('/login')
  }

  return (
    <div className="flex flex-col">
      <Header />

      <main className="h-screen w-full overflow-y-auto px-32 py-14">
        {children}
      </main>
    </div>
  )
}
