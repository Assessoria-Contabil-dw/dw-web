import { TextareaHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface TextInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  placholder?: string
}

export function TextAreaInput({ name, placeholder, ...props }: TextInputProps) {
  const { register } = useFormContext()
  return (
    <textarea
      placeholder={placeholder}
      {...props}
      className="h-20 w-full resize-none rounded-lg border border-gray-300 p-2"
      {...register(name)}
    />
  )
}
