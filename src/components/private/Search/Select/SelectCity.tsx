import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import SelectBase from './SelectBase'
import { useCityData } from '@/hooks/Directory/useCityData'

interface SelectCityProps extends SelectHTMLAttributes<HTMLSelectElement> {
  stateId?: string
  children?: ReactNode
  loading?: boolean
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectCity({
  handleSearchOnChange,
  stateId,
  children,
  loading,
  ...atr
}: SelectCityProps) {
  const { data, isLoading } = useCityData(stateId)
  return (
    <SelectBase
      name="city"
      label="Cidade"
      loading={isLoading || loading}
      onChange={handleSearchOnChange}
      {...atr}
    >
      {children}
      {data !== undefined
        ? data.map((city) => (
            <option key={city.code} value={city.name}>
              {city.name}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
