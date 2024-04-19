import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { usePartyData } from '@/hooks/Directory/usePartyData'
import SelectBase from '../Selects/SelectBase'

interface SelectPartyProps extends SelectHTMLAttributes<HTMLSelectElement> {
  handleSearchOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  children?: ReactNode
  loading?: boolean
  onSelected?: number
  name: string

}

export default function SelectPartyCode({
  handleSearchOnChange,
  children,
  loading,
  name,
  onSelected,
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
      {data !== undefined && data.results !== null
        ? data?.results.map((party) => (
            <option key={party.code} value={party.code} selected={onSelected === party.code ? true : false}>
              {party.abbreviation}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
