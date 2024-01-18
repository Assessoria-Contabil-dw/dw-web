import { InputHTMLAttributes, forwardRef } from 'react'

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string
  label?: string
  type?: string
}
export type Ref = HTMLInputElement
const InputBase = forwardRef<Ref, InputBaseProps>(function InputBase(
  { name, label, type, className, ...atr },
  ref,
) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <label htmlFor={name} className="text-label">
          {label}
        </label>
      </div>
      <input
        {...atr}
        ref={ref}
        name={name}
        type={type || 'text'}
        className={`input-style ${className || ''}`}
      />
    </div>
  )
})

export default InputBase
