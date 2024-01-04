'use client'
import { User } from '@/hooks/useAuth'
import { queryClient } from '@/provider/query.provider'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  const user: User = queryClient.getQueryData('authUser') as User
  const router = useRouter()
  if (user?.role !== 'ADMIN') {
    router.push('/painel')
    return <></>
  }

  return (
    <section className="relative flex h-full w-full justify-center px-5">
      <div className="flex max-w-7xl flex-1 justify-center py-10">
        {children}
      </div>
    </section>
  )
}
