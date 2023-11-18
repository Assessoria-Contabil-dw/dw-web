'use client'
import { useAuth } from '@/lib/auth'
import { useState } from 'react'
import PermitParty from './PartyTable'
import PermitState from './StateTable'
import PermitCity from './CityTable'

import { queryClient } from '@/services/query.provider'
import { PermitProps } from '@/app/(user)/layout'
import { RefreshButton } from '@/components/Buttons/refresh'

export default function Permit() {
  const [option, setOption] = useState(1)
  const user = useAuth()

  const data: PermitProps = queryClient.getQueryData(
    'permitions',
  ) as PermitProps

  return (
    <div className="flex flex-col gap-4">
      <h2>Olá, {user?.name} 👋</h2>

      <div className="flex items-start justify-between">
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

        <RefreshButton queryName="permitions" />
      </div>

      <section>
        {option === 1 ? (
          <PermitParty data={data === undefined ? null : data.acessParty} />
        ) : option === 2 ? (
          <PermitState data={data === undefined ? null : data.acessState} />
        ) : (
          <PermitCity data={data === undefined ? null : data.acessCity} />
        )}
      </section>
    </div>
  )
}
