import { api } from '@/lib/api'
import { AccessContext } from '@/provider/context.provider'
import { ChangeEvent, useContext } from 'react'
import { useQuery } from 'react-query'
import { LoadingSecond } from '../Loading/second'

interface SearchVigencyProps {
  directoryId: number | undefined
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

interface Leader {
  id: number
  name: string
  signatureUrl: string
}
interface Vigency {
  id: number
  dateFirst: string
  dateLast: string
  status: boolean
  president: Leader
  vicePresident: Leader
  treasurer: Leader
  advocate: Leader
}

interface VProps {
  directoryId: string
  status: boolean
  surname: string
  vigencyActive: Vigency[]
  vigencyInactive: Vigency[]
}

export default function SearchVigency({
  handleSearchOnChange,
  directoryId,
}: SearchVigencyProps) {
  const { partyCode, cityCode, stateId } = useContext(AccessContext)

  const { data, isLoading } = useQuery<VProps>(
    ['vigencies', directoryId],
    async () => {
      if (directoryId === undefined) return []
      const response = await api.get(`/vigencies/directory/${directoryId}`, {
        params: {
          partyCode: partyCode === 0 ? null : partyCode,
          cityCode,
          stateId,
        },
      })
      return response.data
    },
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
    },
  )

  return (
    <div className="flex w-full min-w-[90px] flex-col justify-between gap-1">
      <div className="flex gap-1">
        <label htmlFor="vigency" className="text-xs">
          Vigência
        </label>
        {isLoading && <LoadingSecond />}
      </div>

      <select name="vigency" onChange={handleSearchOnChange}>
        <option value="">Selecione</option>
        {data !== undefined && data.vigencyActive
          ? data.vigencyActive.map((vA) => (
              <option key={vA.id} value={vA.id}>
                {vA.dateFirst} - {vA.dateLast}
              </option>
            ))
          : null}
        {data !== undefined && data.vigencyInactive
          ? data.vigencyInactive.map((vI) => (
              <option className="text-slate-600" key={vI.id} value={vI.id}>
                {vI.dateFirst} - {vI.dateLast}
              </option>
            ))
          : null}
      </select>
    </div>
  )
}
