import { ColorProps } from '@/@types/types'
import { api } from '@/lib/api'
import { ChangeEvent } from 'react'
import { useQuery } from 'react-query'

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

  if (isLoading) return null

  return (
    <div className="w-full">
      <label htmlFor="state" className="text-xs">
        Status
      </label>
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
