import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import { useLegendData } from '@/hooks/useLegendData'
import { LoadingSecond } from '@/components/Loading/second'

interface SelectLegendProps extends SelectHTMLAttributes<HTMLSelectElement> {
  valueSelect?: number
  name: string

  label: string
  loading?: boolean
  children?: ReactNode
}

export default function SelectLegend({
  children,
  loading,
  valueSelect,
  name,
  label,
  className,
  ...atr
}: SelectLegendProps) {
  const { data, isLoading } = useLegendData()

  return (
    <div className="flex w-full min-w-[90px] flex-col gap-1">
      <div className="flex gap-1">
        <label htmlFor={name} className="text-label">
          {label}
        </label>
        {loading && <LoadingSecond />}
      </div>
      <select
        {...atr}
        name={name}
        disabled={loading || isLoading}
        defaultValue={String(valueSelect)}
        className={`input-style ${className || ''}`}
      >
        {children}
        {data !== undefined
        ? data.map((item) => (
            <option
              key={item.id}
              value={String(item.id)}
            >
              {item.name}
            </option>
          ))
        : null}
      </select>
    </div>
  )
}
