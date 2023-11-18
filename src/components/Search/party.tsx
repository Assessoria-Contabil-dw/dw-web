import { Page } from '@/@types/page'
import { api } from '@/lib/api'
import { ChangeEvent } from 'react'
import { useQuery } from 'react-query'

interface PartyProps {
  code: string

  name: string
  abbreviation: string
  logoUrl: string

  hex: string
}

interface SearchPartyProps {
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SearchParty({
  handleSearchOnChange,
}: SearchPartyProps) {
  const { data, isLoading } = useQuery<Page<PartyProps>>(
    'party',
    async () => {
      const response = await api
        .get('/parties')
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
      <label htmlFor="party" className="text-xs">
        Partido
      </label>
      <select name="party" onChange={handleSearchOnChange}>
        <option value="">Todos</option>
        {data !== undefined && data.results !== null
          ? data?.results.map((party) => (
              <option key={party.code} value={party.code}>
                {party.abbreviation}
              </option>
            ))
          : null}
      </select>
    </div>
  )
}
