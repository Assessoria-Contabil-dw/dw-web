import { api } from '@/lib/api'
import { ChangeEvent } from 'react'
import { useQuery } from 'react-query'

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

  if (isLoading) return null

  return (
    <div className="w-full">
      <label htmlFor="state" className="text-xs">
        Estado
      </label>
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
