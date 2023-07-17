import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  type: string
  name: string
}

export function TextInput({
  placeholder,
  type,
  name,
  ...props
}: TextInputProps) {
  const { register } = useFormContext()

  return (
    <input
      id={name}
      type={type}
      {...props}
      placeholder={placeholder}
      {...register(name)}
    />
  )
}
