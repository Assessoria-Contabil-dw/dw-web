import { LoadingSecond } from '@/components/Loading/second'
import { ReactNode, SelectHTMLAttributes, forwardRef } from 'react'

export interface SelectBaseProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  name?: string
  label?: string
  loading?: boolean
  children?: ReactNode
}
export type Ref = HTMLSelectElement
const SelectBase = forwardRef<Ref, SelectBaseProps>(function SelectBase(
  { name, label, loading, children, className, ...atr },
  ref,
) {
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
        ref={ref}
        name={name}
        disabled={loading}
        className={`input-style ${className || ''}`}
      >
        {children}
      </select>
    </div>
  )
})

export default SelectBase
