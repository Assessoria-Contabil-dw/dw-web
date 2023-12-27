import Menu from '@/components/Menu'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex h-[calc(100vh-3rem)]">
      <Menu />
      <div className="flex-1 overflow-y-auto px-4 py-8">{children}</div>
    </main>
  )
}
