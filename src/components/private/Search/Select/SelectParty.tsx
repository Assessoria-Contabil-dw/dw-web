import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import { usePartyData } from '@/hooks/usePartyData'
import SelectBase from './SelectBase'

interface SelectPartyProps extends SelectHTMLAttributes<HTMLSelectElement> {
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
  children?: ReactNode
  loading?: boolean
}

export default function SelectParty({
  handleSearchOnChange,
  children,
  loading,
  ...atr
}: SelectPartyProps) {
  const { data, isLoading } = usePartyData()

  return (
    <SelectBase
      name="party"
      label="Partido"
      loading={isLoading || loading}
      onChange={handleSearchOnChange}
      {...atr}
    >
      {children}
      {data !== undefined && data.results !== null
        ? data?.results.map((party) => (
            <option key={party.code} value={party.abbreviation}>
              {party.abbreviation}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
