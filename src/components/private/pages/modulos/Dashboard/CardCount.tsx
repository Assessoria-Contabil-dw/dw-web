'use client'

import { AccessProps } from '@/interfaces/access.interface'
import { queryClient } from '@/provider/query.provider'

export default function CardCount() {
  const data = queryClient.getQueryData<AccessProps>('accessData')

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <div className="flex flex-col items-center justify-center rounded-md border-[1px] bg-white p-4">
        <h3 className="font-lexend text-lg font-bold text-slate-800">
          {data?.acessDistrict == null ? 0 : data.acessDistrict.length}
        </h3>
        <p className="font-lexend text-xs text-slate-500">Distrital</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-md border-[1px] bg-white p-4">
        <h3 className="font-lexend text-lg font-bold text-slate-800">
          {data?.acessParty == null ? 0 : data.acessParty.length}
        </h3>
        <p className="font-lexend text-xs text-slate-500">Nacional</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-md border-[1px] bg-white p-4">
        <h3 className="font-lexend text-lg font-bold text-slate-800">
          {data?.acessState == null ? 0 : data.acessState.length}
        </h3>
        <p className="font-lexend text-xs text-slate-500">Estadual</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-md border-[1px] bg-white p-4">
        <h3 className="font-lexend text-lg font-bold text-slate-800">
          {data?.acessCity == null ? 0 : data.acessCity.length}
        </h3>
        <p className="font-lexend text-xs text-slate-500">Municipal</p>
      </div>
    </div>
  )
}
