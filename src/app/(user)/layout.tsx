'use client'
import { ReactNode } from 'react'
import { useAuth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import '../globals.css'
import Header from '@/components/Menu/Header'
import { LoadingPrimary } from '@/components/Loading/primary'
import { AccessProvider } from '@/services/context.provider'
import { useQuery } from 'react-query'
import { api } from '@/lib/api'
import { PartyData } from '@/components/pages/Permit/PartyTable'
import { CityData } from '@/components/pages/Permit/CityTable'
import { StateData } from '@/components/pages/Permit/StateTable'

export interface PermitProps {
  acessParty: PartyData[] | null
  acessCity: CityData[] | null
  acessState: StateData[] | null
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const user = useAuth()

  const { isLoading } = useQuery<PermitProps>(
    'permitions',
    async () => {
      const response = await api.get(`/modules/access`)
      return response.data
    },
    {
      retry: 4,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 60 * 24, // 24 hours
    },
  )

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
    <AccessProvider>
      <div className="relative flex min-h-screen flex-col">
        <Header />
        {children}
      </div>
    </AccessProvider>
  )
}
