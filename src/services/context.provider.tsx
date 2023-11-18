'use client'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { createContext, useState } from 'react'
import { useQuery } from 'react-query'
import { queryClient } from './query.provider'

export interface Modules {
  acessId: number
  module: string
  moduleId: number
  path: string
}

export interface ModulesData {
  acessName: string
  modules: Modules[]
}

type ContextType = {
  modulesArray: ModulesData
  partyCode: number
  stateId: string | null
  cityCode: string | null
  setModulesArray: (modules: ModulesData) => void
  setPartyCode: (partyCode: number) => void
  setStateId: (stateId: string) => void
  setCityCode: (cityCode: string) => void
  handleSetRouter: (path: string) => void
}

export const AccessContext = createContext<ContextType>({} as ContextType)

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const user = useAuth()

  const [modulesArray, setModulesArray] = useState<ModulesData>(
    {} as ModulesData,
  )

  const [partyCode, setPartyCode] = useState(
    Number(searchParams.get('partido')),
  )
  const [stateId, setStateId] = useState(searchParams.get('estado'))
  const [cityCode, setCityCode] = useState(searchParams.get('cidade'))

  console.log(partyCode, stateId, cityCode)
  const permissions = queryClient.getQueryData('permitions')

  useQuery<ModulesData>(
    'modules',
    async () => {
      const response = await api.get(`/user/${user?.sub}/modules`, {
        params: {
          partyCode,
          stateId,
          cityCode,
        },
      })
      return response.data
    },
    {
      enabled: permissions !== undefined,
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

  return (
    <AccessContext.Provider
      value={{
        modulesArray,
        partyCode,
        stateId,
        cityCode,
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
