'use client'
import Permit from '@/components/pages/Permit'
import { User } from '@/lib/auth'
import { queryClient } from '@/services/query.provider'
import { redirect } from 'next/navigation'

export default function Acessos() {
  const user: User = queryClient.getQueryData('authUser') as User

  if (user?.role === 'ADMIN') {
    return redirect('/acessos/painel')
  }

  return (
    <main className="h-[calc(100vh-2.6rem)] overflow-y-auto px-32 py-14">
      <Permit />
    </main>
  )
}
