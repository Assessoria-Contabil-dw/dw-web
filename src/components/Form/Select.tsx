import { ChangeEvent, SelectHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface TextInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string
  type: string
  value: string
  name: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export function SelectInput({
  placeholder,
  value,
  onChange,
  type,
  name,
  ...props
}: TextInputProps) {
  const { register } = useFormContext()

  return (
    <select
      value={value}
      {...register(name)}
      onChange={onChange}
      name={name}
      {...props}
    >
      <option disabled value="">
        {placeholder}
      </option>
      {props.children}
    </select>
  )
}
