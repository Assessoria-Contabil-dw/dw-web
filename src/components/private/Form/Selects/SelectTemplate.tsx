import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import { useTemplateData } from '@/hooks/useTemplate'
import SelectBase from './SelectBase'
import { useFormContext } from 'react-hook-form'

interface SelectTemplateProps extends SelectHTMLAttributes<HTMLSelectElement> {
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
  children?: ReactNode
  loading?: boolean
  name: string
}

export default function SelectTemplate({
  handleSearchOnChange,
  children,
  loading,
  name,
  ...atr
}: SelectTemplateProps) {
  const { data, isLoading } = useTemplateData()
  const { register } = useFormContext()

  return (
    <SelectBase
      {...register(name)}
      name={name}
      label="Template"
      loading={isLoading || loading}
      onChange={handleSearchOnChange}
      {...atr}
    >
      {children}
      {data !== undefined && data !== null
        ? data.map((item) => (
            <option
              key={item.id}
              value={JSON.stringify({
                id: item.id,
                name: item.name,
                content: item.content,
              })}
            >
              {item.name}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
