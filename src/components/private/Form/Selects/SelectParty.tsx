import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import SelectBase from './SelectBase'
import { useFormContext } from 'react-hook-form'
import { usePartyData } from '@/hooks/Directory/usePartyData'
import { PartyProps } from '@/interfaces/types'

interface SelectPartyProps extends SelectHTMLAttributes<HTMLSelectElement> {
  handleSearchOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  children?: ReactNode
  loading?: boolean
  name: string,
  type?: 'abbreviation' | 'code'
}

export default function SelectParty({
  handleSearchOnChange,
  children,
  loading,
  name,
  type,
  ...atr
}: SelectPartyProps) {
  const { data, isLoading } = usePartyData()
  const { register } = useFormContext();

  function getValue(value: PartyProps) {
    if (type == 'code') {
      return value.code;
    }
    return value.abbreviation
  }

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
          <option key={party.code} value={getValue(party)}>
            {party.abbreviation}
          </option>
        ))
        : null}
    </SelectBase>
  )
}
