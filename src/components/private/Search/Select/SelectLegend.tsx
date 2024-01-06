import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import SelectBase from './SelectBase'
import { useLegendData } from '@/hooks/useLegendData'

interface SelectLegendProps extends SelectHTMLAttributes<HTMLSelectElement> {
  handleSearchOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  children?: ReactNode
  loading?: boolean
  valueSelect?: string
}

export default function SelectLegend({
  handleSearchOnChange,
  children,
  loading,
  valueSelect,
  ...atr
}: SelectLegendProps) {
  const { data, isLoading } = useLegendData()

  return (
    <SelectBase
      name="legend"
      label="Status"
      loading={isLoading || loading}
      onChange={handleSearchOnChange}
      {...atr}
    >
      {children}
      {valueSelect && <option value="">Selecione</option>}
      {data !== undefined
        ? data.map((legend) => (
            <option
              key={legend.id}
              selected={valueSelect === legend.name}
              value={legend.id}
            >
              {legend.name}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
