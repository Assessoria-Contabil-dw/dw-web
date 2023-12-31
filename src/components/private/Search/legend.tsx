import { ColorProps } from '@/interfaces/types'
import { api } from '@/lib/api'
import { ChangeEvent } from 'react'
import { useQuery } from 'react-query'
import { LoadingSecond } from '../../Loading/second'

interface SearchPartyProps {
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SearchLegend({
  handleSearchOnChange,
}: SearchPartyProps) {
  const { data, isLoading } = useQuery<ColorProps[]>(
    'legend',
    async () => {
      const response = await api
        .get('/colors/legend')
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
    <div className="flex w-full min-w-[90px] flex-col justify-between">
      <div className="flex gap-1">
        <label htmlFor="state" className="text-xs">
          Status
        </label>
        {isLoading && <LoadingSecond />}
      </div>
      <select name="state" onChange={handleSearchOnChange}>
        <option value="">Todos</option>
        {data !== undefined
          ? data.map((legend) => (
              <option key={legend.id} value={legend.id}>
                {legend.name}
              </option>
            ))
          : null}
      </select>
    </div>
  )
}
