import { InputHTMLAttributes } from 'react'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  placeholder?: string
  type: string
}

export function TextInput({
  label,
  placeholder,
  type,
  ...props
}: TextInputProps) {
  return (
    <label className="flex w-full flex-col gap-1 text-sm font-semibold ">
      {label}
      <input type={type} {...props} placeholder={placeholder} />
    </label>
  )
}
