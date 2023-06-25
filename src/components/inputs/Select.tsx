import { SelectHTMLAttributes } from 'react'

type TextInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  placeholder: string
  type: string
}

export function SelectInput({
  label,
  placeholder,
  type,
  ...props
}: TextInputProps) {
  return (
    <label className="flex w-full flex-col gap-1 text-sm font-semibold ">
      {label}
      <select name={type} {...props} className="w-full">
        <option>{placeholder}</option>
      </select>
    </label>
  )
}
