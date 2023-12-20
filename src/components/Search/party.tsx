import { Page } from '@/@types/page'
import { PartyService } from '@/services/party.service'
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
  const partyService = new PartyService()

  const { data, isLoading } = useQuery<Page<PartyProps>>(
    'party',
    () => partyService.getAll(),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60,
      retry: false,
    },
  )

  if (isLoading) return null

  return (
    <div className="w-full min-w-[90px]">
      <label htmlFor="party" className="text-xs">
        Partido
      </label>
      <select name="party" onChange={handleSearchOnChange}>
        <option value="">Todos</option>
        {data !== undefined && data.results !== null
          ? data?.results.map((party) => (
              <option key={party.code} value={party.abbreviation}>
                {party.abbreviation}
              </option>
            ))
          : null}
      </select>
    </div>
  )
}
