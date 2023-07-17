import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  type: string
  value: string
}

export function RadioInput({
  label,
  value,
  type,
  name,
  ...props
}: TextInputProps) {
  const { register } = useFormContext()

  return (
    <div className="flex items-center justify-start gap-1 whitespace-nowrap text-center text-xs uppercase">
      <input
        type={type}
        id={name}
        value={value}
        {...register(name)}
        {...props}
      />
      <p>{label}</p>
    </div>
  )
}
