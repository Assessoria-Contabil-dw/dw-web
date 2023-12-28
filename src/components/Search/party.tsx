import { ChangeEvent } from 'react'
import { LoadingSecond } from '../Loading/second'
import { usePartyData } from '@/hooks/usePartyData'

interface SearchPartyProps {
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SearchParty({
  handleSearchOnChange,
}: SearchPartyProps) {
  const { data, isLoading } = usePartyData()

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
