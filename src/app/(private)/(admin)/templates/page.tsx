'use client'
import { Templates } from '@/components/pages/Template'
import { User } from '@/lib/auth'
import { queryClient } from '@/provider/query.provider'
import { redirect } from 'next/navigation'

export default function TemplatePage() {
  const user: User = queryClient.getQueryData('authUser') as User

  if (user?.role === 'CLIENT') {
    return redirect('/painel')
  }

  return <Templates />
}
