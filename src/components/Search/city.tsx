import { ChangeEvent } from 'react'
import { LoadingSecond } from '../Loading/second'
import { useCityData } from '@/hooks/useCityData'

interface SearchPartyProps {
  stateId: string | undefined
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SearchCity({
  handleSearchOnChange,
  stateId,
}: SearchPartyProps) {
  const { data, isLoading } = useCityData(stateId)

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
