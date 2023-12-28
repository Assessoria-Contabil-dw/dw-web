'use client'

import { queryClient } from '@/provider/query.provider'
import { PermitProps } from '@/components/Layouts/PrivateLayout'

export default function Dashboard() {
  const data = queryClient.getQueryData<PermitProps>('permitions')

  return (
    <div className="space-y-2">
      <h2>
        Dashboard <span>/ Acessos</span>
      </h2>
      <div className="flex gap-2">
        <div className="flex flex-col items-center justify-center gap-1  rounded-md border-[1px] bg-white p-4">
          <h2 className="leading-3">
            {data?.acessDistrict == null ? 0 : data.acessDistrict.length}
          </h2>
          <span>Distrital</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1  rounded-md border-[1px] bg-white p-4">
          <h2 className="leading-3">
            {data?.acessParty == null ? 0 : data.acessParty.length}
          </h2>
          <span>Nacional</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1  rounded-md border-[1px] bg-white p-4">
          <h2 className="leading-3">
            {data?.acessState == null ? 0 : data.acessState.length}
          </h2>
          <span>Estadual</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1  rounded-md border-[1px] bg-white p-4">
          <h2 className="leading-3">
            {data?.acessCity == null ? 0 : data.acessCity.length}
          </h2>
          <span>Municipal</span>
        </div>
      </div>
    </div>
  )
}
