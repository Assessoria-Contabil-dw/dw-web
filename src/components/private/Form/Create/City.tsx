import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { useCityData } from '@/hooks/Directory/useCityData'
import SelectBase from '../Selects/SelectBase'

interface SelectCityProps extends SelectHTMLAttributes<HTMLSelectElement> {
  stateName?: string
  stateId?: string
  children?: ReactNode
  loading?: boolean
  name: string
  handleSearchOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectCityCode({
  handleSearchOnChange,
  stateName,
  stateId,
  children,
  loading,
  name,
  ...atr
}: SelectCityProps) {
  const { data, isLoading } = useCityData(stateId, stateName)
  const { register } = useFormContext()

  return (
    <SelectBase
      {...register(name)}
      name={name}
      label="Cidade"
      loading={isLoading || loading}
      onChange={handleSearchOnChange}
      {...atr}
    >
      {children}
      {data !== undefined
        ? data.map((city) => (
            <option key={city.code} value={city.code}>
              {city.name}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
