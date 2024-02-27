import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import SelectBase from './SelectBase'
import { useFormContext } from 'react-hook-form'
import { useTypeOrg } from '@/hooks/Directory/useTypeOrg'

interface SelectStateProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode
  loading?: boolean
  name: string
  handleSearchOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectTypeOrg({
  handleSearchOnChange,
  children,
  loading,
  name,
  ...atr
}: SelectStateProps) {
  const { data, isLoading } = useTypeOrg()
  const { register } = useFormContext()

  return (
    <SelectBase
      {...register(name)}
      name={name}
      label="Tipo de Organização"
      loading={isLoading || loading}
      onChange={handleSearchOnChange}
      {...atr}
    >
      {children}
      {data !== undefined
        ? data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
