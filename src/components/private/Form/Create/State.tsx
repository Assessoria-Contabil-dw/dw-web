import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { useStateData } from '@/hooks/Directory/useStateData'
import SelectBase from '../Selects/SelectBase'

interface SelectStateProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode
  loading?: boolean
  name: string
  handleSearchOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectStateCode({
  handleSearchOnChange,
  children,
  loading,
  name,
  ...atr
}: SelectStateProps) {
  const { data, isLoading } = useStateData()
  const { register } = useFormContext()

  return (
    <SelectBase
      {...register(name)}
      name={name}
      label="Estado"
      loading={isLoading || loading}
      onChange={handleSearchOnChange}
      {...atr}
    >
      {children}
      {data !== undefined
        ? data.map((state) => (
            <option key={state.code} value={state.uf}>
              {state.name}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
