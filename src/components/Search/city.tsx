import { api } from '@/lib/api'
import { ChangeEvent } from 'react'
import { useQuery } from 'react-query'
import { LoadingSecond } from '../Loading/second'

interface CityProps {
  code: string

  name: string
  ibge7: number
  ibge6: number
  codeRf: number

  stateId: string
}

interface SearchPartyProps {
  stateId: string | undefined
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

  return (
    <div className="flex w-full min-w-[90px] flex-col justify-between gap-1">
      <div className="flex gap-1">
        <label htmlFor="city" className="text-xs">
          Cidade
        </label>
        {isLoading && <LoadingSecond />}
      </div>
      <select name="city" onChange={handleSearchOnChange}>
        <option value="" selected>
          Todos
        </option>
        {data !== undefined
          ? data.map((city) => (
              <option key={city.code} value={city.name}>
                {city.name}
              </option>
            ))
          : null}
      </select>
    </div>
  )
}
