'use client'
import { LoadingPrimary } from '@/components/Loading/primary'
import { useAuth } from '@/lib/auth'
import { AccessProvider } from '@/provider/context.provider'
import ToastProvider from '@/provider/toast.provider'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import HeaderPrivate from '@/components/private/Header'
import { useAccessData } from '@/hooks/useAccessData'
import Fab from '@/components/private/Fab'

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const user = useAuth()

  const { isLoading } = useAccessData()

  if (user === undefined || isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoadingPrimary />
      </div>
    )
  }

  if (user === null) {
    return redirect('/login')
  }

  return (
    <ToastProvider>
      <AccessProvider>
        <div className="relative flex h-screen flex-col">
          <HeaderPrivate />
          {children}
          <Fab />
        </div>
      </AccessProvider>
    </ToastProvider>
  )
}
