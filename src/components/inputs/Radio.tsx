import { InputHTMLAttributes } from 'react'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  type: string
}

export function RadioInput({ label, type, name, ...props }: TextInputProps) {
  return (
    <label className="flex items-center justify-start gap-1 whitespace-nowrap text-center text-xs uppercase">
      <input type={type} name={name} {...props} />
      <p>{label}</p>
    </label>
  )
}
