import { ChangeEvent } from 'react'
import { LoadingSecond } from '../Loading/second'
import { useStateData } from '@/hooks/useStateData'

interface SearchPartyProps {
  party?: number
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SearchState({
  handleSearchOnChange,
}: SearchPartyProps) {
  const { data, isLoading } = useStateData()

  return (
    <div className="flex w-full min-w-[90px] flex-col justify-between gap-1">
      <div className="flex gap-1">
        <label htmlFor="state" className="text-xs">
          Estado
        </label>
        {isLoading && <LoadingSecond />}
      </div>
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
