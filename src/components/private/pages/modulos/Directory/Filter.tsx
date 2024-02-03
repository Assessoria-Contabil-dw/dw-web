import { ChangeEvent } from 'react'
import SelectParty from '../../../Search/Select/SelectParty'
import SelectState from '../../../Search/Select/SelectState'
import SelectCity from '../../../Search/Select/SelectCity'
import SelectStatus from '../../../Search/Select/SelectStatus'

interface FilterDirectoryProps {
  partyCode?: string
  cityCode?: string
  stateId?: string
  stateSearch?: string
  onChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => void
}

export default function TableFilterDirectory({
  partyCode,
  cityCode,
  stateId,
  stateSearch,
  onChange,
}: FilterDirectoryProps) {
  return (
    <div className="flex gap-2">
      {!partyCode && (
        <SelectParty handleSearchOnChange={onChange}>
          <option value="">Todos</option>
        </SelectParty>
      )}

      {!stateId && (
        <SelectState handleSearchOnChange={onChange}>
          <option value="">Todos</option>
        </SelectState>
      )}

      {!cityCode && (
        <SelectCity stateId={stateSearch} handleSearchOnChange={onChange}>
          <option value="">Todos</option>
        </SelectCity>
      )}

      <SelectStatus name='status' label='Status' handleSearchOnChange={onChange} />
    </div>
  )
}
