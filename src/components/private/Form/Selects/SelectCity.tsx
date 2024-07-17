import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import SelectBase from './SelectBase'
import { useFormContext } from 'react-hook-form'
import { useCityData } from '@/hooks/Directory/useCityData'

interface SelectCityProps extends SelectHTMLAttributes<HTMLSelectElement> {
  stateName?: string
  stateId?: string
  cityName?: string
  children?: ReactNode
  loading?: boolean
  name: string
  handleSearchOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectCity({
  handleSearchOnChange,
  stateName,
  stateId,
  cityName,
  children,
  loading,
  name,
  ...atr
}: SelectCityProps) {
  const { register} = useFormContext()
  const { data, isLoading } = useCityData(stateId, stateName)

  console.log(stateId, stateName)
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
            <option key={city.code} data-code={city.code} value={city.name} selected={city.name === cityName}>
              {city.name}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
