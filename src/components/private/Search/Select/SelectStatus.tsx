import { LoadingSecond } from '@/components/Loading/second'
import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'

interface SelectStatusProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  loading?: boolean
  children?: ReactNode
  handleSearchOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectStatus({
  handleSearchOnChange, name, label, loading, children, className, ...atr
}: SelectStatusProps) {
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
      disabled={loading}
      className={`input-style ${className || ''}`}
      onChange={handleSearchOnChange}
    >
      {children}
      <option value="">Todos</option>
      <option value="true">Ativo</option>
      <option value="false">Inativo</option>
    </select>
  </div>
  )
}
