import { ChangeEvent } from 'react'
import SelectBase from './SelectBase'

interface SelectStatusProps {
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectStatus({
  handleSearchOnChange,
}: SelectStatusProps) {
  return (
    <SelectBase name="status" label="Vigência" onChange={handleSearchOnChange}>
      <option value="">Todos</option>
      <option value="true">Ativo</option>
      <option value="false">Inativo</option>
    </SelectBase>
  )
}
