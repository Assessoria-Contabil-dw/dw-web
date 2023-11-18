import { ChangeEvent } from 'react'

interface SearchPartyProps {
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SearchVigency({
  handleSearchOnChange,
}: SearchPartyProps) {
  return (
    <div className="w-full">
      <label htmlFor="state" className="text-xs">
        Vigência
      </label>
      <select name="vigencyStatus" onChange={handleSearchOnChange}>
        <option value="">Todos</option>
        <option value="true">Ativo</option>
        <option value="false">Inativo</option>
      </select>
    </div>
  )
}
