import MenuPrivate from '@/components/private/Menu'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-full w-full">
      <MenuPrivate />
      <div className="flex-1 overflow-y-auto px-4 py-8">{children}</div>
    </section>
  )
}
