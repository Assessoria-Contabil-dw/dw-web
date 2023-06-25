import { TextareaHTMLAttributes } from 'react'

type TextInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  placeholder: string
}

export function TextareaInput({
  label,
  placeholder,
  ...props
}: TextInputProps) {
  return (
    <label className="flex w-full flex-col gap-1 text-sm font-semibold ">
      {label}
      <textarea
        {...props}
        className="h-20 w-full resize-none rounded-lg border border-gray-300 p-2"
        placeholder={placeholder}
      />
    </label>
  )
}
