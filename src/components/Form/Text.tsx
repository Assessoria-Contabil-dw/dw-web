import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import InputMask from 'react-input-mask'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  type: string
  name: string
  mask?: string
}

export function TextInput({
  placeholder,
  type,
  name,
  mask,
  ...props
}: TextInputProps) {
  const { register } = useFormContext()

  if (mask) {
    return (
      <InputMask
        id={name}
        type={type}
        mask={mask || ''}
        alwaysShowMask={false}
        className="input-style"
        maskChar=""
        {...props}
        placeholder={placeholder}
        {...register(name)}
      />
    )
  }
  return (
    <input
      className="input-style"
      id={name}
      type={type}
      {...props}
      placeholder={placeholder}
      {...register(name)}
    />
  )
}
