import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import SelectBase from './SelectBase'
import { useFormContext } from 'react-hook-form'
import { useStateData } from '@/hooks/Directory/useStateData'

interface SelectStateProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode
  loading?: boolean
  name: string
  handleSearchOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectState({
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
            <option key={state.code} value={state.name}>
              {state.name}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
