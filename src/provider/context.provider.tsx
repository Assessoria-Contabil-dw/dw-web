'use client'
import { useAccessModuleData } from '@/hooks/useAccessModules'
import { useSetRouter } from '@/hooks/useSetRouter'
import { AccessModuleData } from '@/interfaces/modules'
import { useSearchParams } from 'next/navigation'
import React, { createContext, useEffect, useState } from 'react'

type ContextType = {
  modulesArray: AccessModuleData | undefined
  partyCode: string | undefined
  stateId: string | undefined
  cityCode: string | undefined
  openMenu: boolean
  openHeader: boolean
  setModulesArray: (modules: AccessModuleData) => void
  setPartyCode: (partyCode: string) => void
  setStateId: (stateId: string) => void
  setCityCode: (cityCode: string) => void
  setOpenMenu: (openMenu: boolean) => void
  setOpenHeader: (openHeader: boolean) => void
}

export const AccessContext = createContext<ContextType>({} as ContextType)

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()

  const [partyCode, setPartyCode] = useState(
    searchParams.get('partido') as string,
  )
  const [stateId, setStateId] = useState(searchParams.get('estado') as string)
  const [cityCode, setCityCode] = useState(searchParams.get('cidade') as string)

  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [openHeader, setOpenHeader] = useState<boolean>(false)

  const [modulesArray, setModulesArray] = useState<AccessModuleData>()
  const { data } = useAccessModuleData(partyCode, stateId, cityCode)
  useEffect(() => {
    if (data) {
      setModulesArray(data)
    }
  }, [data])

  useSetRouter(partyCode, stateId, cityCode)

  return (
    <AccessContext.Provider
      value={{
        modulesArray,
        partyCode,
        stateId,
        cityCode,
        openMenu,
        openHeader,
        setOpenHeader,
        setOpenMenu,
        setModulesArray,
        setPartyCode,
        setStateId,
        setCityCode,
      }}
    >
      {children}
    </AccessContext.Provider>
  )
}
