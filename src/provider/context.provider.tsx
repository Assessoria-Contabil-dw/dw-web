'use client'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { createContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

export interface Modules {
  acessId: number
  module: string
  moduleId: number
  path: string
}

export interface ModulesData {
  acessName: string | null
  modules: Modules[]
}

type ContextType = {
  modulesArray: ModulesData
  partyCode: number
  stateId: string | undefined
  cityCode: string | undefined
  openMenu: boolean
  setModulesArray: (modules: ModulesData) => void
  setPartyCode: (partyCode: number) => void
  setStateId: (stateId: string) => void
  setCityCode: (cityCode: string) => void
  setOpenMenu: (openMenu: boolean) => void
  handleSetRouter: (path: string) => void
}

export const AccessContext = createContext<ContextType>({} as ContextType)

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const user = useAuth()
  const path = usePathname()

  const [modulesArray, setModulesArray] = useState<ModulesData>(
    {} as ModulesData,
  )

  const [partyCode, setPartyCode] = useState(
    Number(searchParams.get('partido')),
  )
  const [stateId, setStateId] = useState(searchParams.get('estado') as string)
  const [cityCode, setCityCode] = useState(searchParams.get('cidade') as string)
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  useQuery<ModulesData>(
    'modules',
    async () => {
      const response = await api.get(`/access/modules`, {
        params: {
          partyCode: partyCode === 0 ? undefined : partyCode,
          stateId,
          cityCode,
        },
      })
      return response.data
    },
    {
      staleTime: 1000 * 60 * 60 * 10,
      onError: (error) => {
        console.log(error)
      },
      onSuccess: (data) => {
        setModulesArray(data)
      },
    },
  )

  function handleSetRouter(path: string) {
    if (user?.role === 'ADMIN') {
      router.push(path)
      return
    }
    if (partyCode && !stateId && !cityCode) {
      router.push(`${path}?partido=${partyCode}`)
      return
    }

    if (partyCode && stateId && !cityCode) {
      router.push(`${path}?partido=${partyCode}&estado=${stateId}`)
      return
    }
    if (partyCode && !stateId && cityCode) {
      router.push(`${path}?partido=${partyCode}&cidade=${cityCode}`)
    }
  }

  useEffect(() => {
    handleSetRouter(path)
  }, [partyCode, stateId, cityCode])

  return (
    <AccessContext.Provider
      value={{
        modulesArray,
        partyCode,
        stateId,
        cityCode,
        openMenu,
        setOpenMenu,
        setModulesArray,
        setPartyCode,
        setStateId,
        setCityCode,
        handleSetRouter,
      }}
    >
      {children}
    </AccessContext.Provider>
  )
}
