import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import SelectBase from './SelectBase'
import { useFormContext } from 'react-hook-form'
import { usePartyData } from '@/hooks/Directory/usePartyData'

interface SelectPartyProps extends SelectHTMLAttributes<HTMLSelectElement> {
  handleSearchOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  children?: ReactNode
  loading?: boolean
  name: string,
}

export default function SelectParty({
  handleSearchOnChange,
  children,
  loading,
  name,
  ...atr
}: SelectPartyProps) {
  const { data, isLoading } = usePartyData()
  const { register } = useFormContext();
  

  return (
    <SelectBase
      {...register(name)}
      name={name}
      label="Partido"
      loading={isLoading || loading}
      onChange={handleSearchOnChange}
      {...atr}
    >
      {children}
      {data !== undefined && data.results !== null && data.results
        ? data?.results.map((party) => (
            <option key={party.code} value={party.abbreviation}>
              {party.abbreviation}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
