import { api } from '@/lib/api'
import { ChangeEvent } from 'react'
import { useQuery } from 'react-query'

interface CityProps {
  code: string

  name: string
  ibge7: number
  ibge6: number
  codeRf: number

  stateId: string
}

interface SearchPartyProps {
  stateId: string | null
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SearchCity({
  handleSearchOnChange,
  stateId,
}: SearchPartyProps) {
  const { data, isLoading } = useQuery<CityProps[]>(
    ['city', stateId],
    async () => {
      if (stateId === undefined) return []
      const response = await api
        .get('/cities', {
          params: {
            stateId,
          },
        })
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
      <label htmlFor="city" className="text-xs">
        Cidade
      </label>
      <select name="city" onChange={handleSearchOnChange}>
        <option value="">Todos</option>
        {data !== undefined
          ? data.map((city) => (
              <option key={city.code} value={city.code}>
                {city.name}
              </option>
            ))
          : null}
      </select>
    </div>
  )
}
