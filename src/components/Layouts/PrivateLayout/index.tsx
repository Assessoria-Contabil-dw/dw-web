"use client"
import LinksButton from "@/components/Buttons/links"
import ZapButton from "@/components/Buttons/zap"
import { LoadingPrimary } from "@/components/Loading/primary"
import Header from "@/components/Menu/Header"
import { api } from "@/lib/api"
import { useAuth } from "@/lib/auth"
import { AccessProvider } from "@/provider/context.provider"
import ToastProvider from "@/provider/toast.provider"
import { ChevronUp } from "lucide-react"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import { useQuery } from "react-query"
import { CityData } from '@/components/pages/Permit/CityTable'
import { PartyData } from '@/components/pages/Permit/PartyTable'
import { StateData } from '@/components/pages/Permit/StateTable'

export interface PermitProps {
  acessParty: PartyData[] | null
  acessCity: CityData[] | null
  acessState: StateData[] | null
}



export default function PrivateLayout({ children }: { children: ReactNode }) {
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
    <ToastProvider>
      <AccessProvider>
        <div className="relative flex h-screen flex-col">
          <Header />
          {children}
          <div
            className="z-1 group group fixed -bottom-28 right-4 flex cursor-pointer flex-col items-center gap-2 rounded-t-full  p-2 
               text-white transition-all duration-500 hover:bottom-0 hover:bg-slate-200"
          >
            <div className=" duration-400 flex w-full items-center justify-center rounded-t-full bg-slate-500 p-[2px] text-white transition-all group-hover:bg-transparent group-hover:text-slate-800">
              <i className="group-hover:rotate-180">
                <ChevronUp size={20} />
              </i>
            </div>
            <LinksButton />
            <ZapButton />
          </div>
        </div>
      </AccessProvider>
    </ToastProvider>
  )
}