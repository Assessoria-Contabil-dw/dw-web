'use client'
import { useSetRouter } from '@/hooks/useSetRouter'
import { useSearchParams } from 'next/navigation'
import React, { createContext, useState } from 'react'

type ContextType = {
  partyCode: string | undefined
  stateId: string | undefined
  cityCode: string | undefined
  openMenu: boolean
  openHeader: boolean
  setPartyCode: (partyCode: string) => void
  setStateId: (stateId: string) => void
  setCityCode: (cityCode: string) => void
  setOpenMenu: (openMenu: boolean) => void
  setOpenHeader: (openHeader: boolean) => void
  setRouter: (url: string) => void
}

export const AccessContext = createContext<ContextType>({} as ContextType)

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()

  const [partyCode, setPartyCode] = useState(searchParams.get('partido') as string)
  const [stateId, setStateId] = useState(searchParams.get('estado') as string)
  const [cityCode, setCityCode] = useState(searchParams.get('cidade') as string)

  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [openHeader, setOpenHeader] = useState<boolean>(false)

  const setRouter = useSetRouter(undefined, partyCode, stateId, cityCode)

  return (
    <AccessContext.Provider
      value={{
        partyCode,
        stateId,
        cityCode,
        openMenu,
        openHeader,
        setOpenHeader,
        setOpenMenu,
        setPartyCode,
        setStateId,
        setCityCode,
        setRouter,
      }}
    >
      {children}
    </AccessContext.Provider>
  )
}
