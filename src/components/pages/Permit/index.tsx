'use client'
// import { useAuth } from '@/lib/auth'
// import { useState } from 'react'
import PermitParty, { PartyData } from './PartyTable'
import PermitState, { StateData } from './StateTable'
import PermitCity, { CityData } from './CityTable'

// import { RefreshButton } from '@/components/Buttons/refresh'
import { useParams } from 'next/navigation'
import { ButtomBack } from '@/components/Buttons/back'
import { useQuery } from 'react-query'
import { api } from '@/lib/api'
import { RefreshButton } from '@/components/Buttons/ButtonRefresh'
import { useRef, useState } from 'react'
import { LoadingSecond } from '@/components/Loading/second'
import { Plus } from 'lucide-react'
import RegisterPermitModel, { RegisterUserRef } from './Register'

interface UserPermitProps {
  id: number
  name: string
  role: string
  acessParty: PartyData[] | null
  acessCity: CityData[] | null
  acessState: StateData[] | null
}

export default function Permit() {
  const [option, setOption] = useState(1)
  const params = useParams()
  const { id } = params

  const { data, isFetching, isLoading } = useQuery<UserPermitProps>(
    ['accessData', id],
    async () => {
      const response = await api.get(`/access/${id}`)
      return response.data
    },
    {
      retry: 1,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 60 * 24, // 24 hours
    },
  )

  const registerPermitRef = useRef<RegisterUserRef>(null)
  function handleRegisterModal(id: number) {
    registerPermitRef.current?.openModal(id)
  }

  return (
    <div className="flex flex-col gap-8">
      <RegisterPermitModel ref={registerPermitRef} />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-start gap-4">
          <ButtomBack />
          <div className="flex flex-col">
            <h2>
              Acessos <span>/ {data?.name}</span>
            </h2>
            <span>{data?.role.toUpperCase()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex h-fit w-fit gap-1 rounded bg-slate-100 p-1 text-slate-300">
              <button
                className={`h-fit cursor-pointer px-2 py-1 text-xs
           ${
             option === 1
               ? 'bg-white text-slate-700 shadow-sm'
               : 'bg-transparent text-slate-300 hover:text-slate-700'
           }`}
                onClick={() => setOption(1)}
              >
                Nacional
              </button>
              <button
                className={`h-fit cursor-pointer px-2 py-1 text-xs
           ${
             option === 2
               ? 'bg-white text-slate-700 shadow-sm'
               : 'bg-transparent text-slate-300 hover:text-slate-700'
           }`}
                onClick={() => setOption(2)}
              >
                Estadual
              </button>
              <button
                className={`h-fit cursor-pointer px-2 py-1 text-xs
           ${
             option === 3
               ? 'bg-white text-slate-700 shadow-sm'
               : 'bg-transparent text-slate-300 hover:text-slate-700'
           }`}
                onClick={() => setOption(3)}
              >
                Municipal
              </button>
            </div>

            <div className="flex gap-3">
              <RefreshButton isLoading={isFetching} queryName="accessData" />

              <button
                onClick={() => handleRegisterModal(data?.id as number)}
                className="button-primary"
              >
                <Plus className="w-4" />
                <h4 className="max-sm:hidden">Acesso</h4>
              </button>
            </div>
          </div>

          <section>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LoadingSecond />
              </div>
            ) : option === 1 ? (
              <PermitParty data={data === undefined ? null : data.acessParty} />
            ) : option === 2 ? (
              <PermitState data={data === undefined ? null : data.acessState} />
            ) : (
              <PermitCity data={data === undefined ? null : data.acessCity} />
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
