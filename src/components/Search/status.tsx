import { ChangeEvent } from 'react'

interface SearchPartyProps {
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SearchVigency({
  handleSearchOnChange,
}: SearchPartyProps) {
  return (
    <div className="w-full min-w-[90px] gap-1">
      <div>
        <label htmlFor="state" className="text-xs">
          Vigência
        </label>
      </div>
      <select name="vigencyStatus" onChange={handleSearchOnChange}>
        <option value="">Todos</option>
        <option value="true">Ativo</option>
        <option value="false">Inativo</option>
      </select>
    </div>
  )
}
