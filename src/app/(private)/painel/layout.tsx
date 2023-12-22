'use client'

import Menu from '@/components/Menu'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex">
      <Menu />
      <div className="h-[calc(100vh-3rem)] flex-1 overflow-y-auto px-4 py-8">
        {children}
      </div>
    </main>
  )
}
