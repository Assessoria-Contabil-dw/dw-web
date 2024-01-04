import Fab from '@/components/private/Fab'
import MenuPrivate from '@/components/private/Menu'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-full w-full">
      <MenuPrivate />
      <div className="relative flex-1 overflow-y-auto px-4 py-6">
        {children}
        <Fab />
      </div>
    </section>
  )
}
