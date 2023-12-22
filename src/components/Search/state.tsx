import { api } from '@/lib/api'
import { ChangeEvent } from 'react'
import { useQuery } from 'react-query'
import { LoadingSecond } from '../Loading/second'

interface StateProps {
  uf: string

  code: number
  name: string
}

interface SearchPartyProps {
  party?: number
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SearchState({
  handleSearchOnChange,
}: SearchPartyProps) {
  const { data, isLoading } = useQuery<StateProps[]>(
    'state',
    async () => {
      const response = await api
        .get('/states')
        .then((response) => response.data)
      return response
    },
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60,
      retry: false,
    },
  )

  return (
    <div className="flex w-full min-w-[90px] flex-col justify-between gap-1">
      <div className="flex gap-1">
        <label htmlFor="state" className="text-xs">
          Estado
        </label>
        {isLoading && <LoadingSecond />}
      </div>
      <select name="state" onChange={handleSearchOnChange}>
        <option value="">Todos</option>
        {data !== undefined
          ? data.map((state) => (
              <option key={state.code} value={state.uf}>
                {state.name}
              </option>
            ))
          : null}
      </select>
    </div>
  )
}
