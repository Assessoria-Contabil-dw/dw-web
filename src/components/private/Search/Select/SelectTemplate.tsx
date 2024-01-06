import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import { useTemplateData } from '@/hooks/useTemplate'
import SelectBase from './SelectBase'

interface SelectTemplateProps extends SelectHTMLAttributes<HTMLSelectElement> {
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
  children?: ReactNode
  loading?: boolean
}

export default function SelectTemplate({
  handleSearchOnChange,
  children,
  loading,
  ...atr
}: SelectTemplateProps) {
  const { data, isLoading } = useTemplateData()

  return (
    <SelectBase
      name="template"
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
