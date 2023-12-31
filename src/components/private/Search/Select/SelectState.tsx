import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import { useStateData } from '@/hooks/useStateData'
import SelectBase from './SelectBase'

interface SelectStateProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode
  loading?: boolean
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectState({
  handleSearchOnChange,
  children,
  loading,
  ...atr
}: SelectStateProps) {
  const { data, isLoading } = useStateData()

  return (
    <SelectBase
      name="state"
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
