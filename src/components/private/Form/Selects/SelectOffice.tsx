import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import SelectBase from './SelectBase'
import { useFormContext } from 'react-hook-form'
import { useOfficeData } from '@/hooks/Leader/useOffice'

interface SelectOfficeProps extends SelectHTMLAttributes<HTMLSelectElement> {
  handleSearchOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  children?: ReactNode
  loading?: boolean
  name: string
}

export default function SelectOffice({
  handleSearchOnChange,
  children,
  loading,
  name,
  ...atr
}: SelectOfficeProps) {
  const { data, isLoading } = useOfficeData()
  const { register } = useFormContext()
  
  return (
    <SelectBase
      {...register(name)}
      name={name}
      label="Representante"
      loading={isLoading || loading}
      onChange={handleSearchOnChange}
      {...atr}
    >
      {children}
      {data
        ? data?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
