'use client'
import Menu from '@/components/Menu'
import { ReactNode } from 'react'
import { useAuth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import '../globals.css'
import Header from '@/components/Menu/Header'

export default function RootLayout({ children }: { children: ReactNode }) {
  console.log('RootPainel')
  const user = useAuth()

  if (user === undefined) {
    return <div>Carregando...</div>
  }
  if (user === null) {
    return redirect('/signIn')
  }

  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="relative flex">
          <Menu />
          <div className="h-[calc(100vh-2.6rem)] flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
