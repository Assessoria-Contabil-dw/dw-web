import { Page } from '@/@types/page'
import { PartyService } from '@/services/party.service'
import { ChangeEvent } from 'react'
import { useQuery } from 'react-query'
import { LoadingSecond } from '../Loading/second'

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

  return (
    <div className="flex w-full min-w-[90px] flex-col justify-between gap-1">
      <div className="flex gap-1">
        <label htmlFor="party" className="text-xs">
          Partido
        </label>
        {isLoading && <LoadingSecond />}
      </div>

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
