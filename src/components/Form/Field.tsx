import { HTMLAttributes } from 'react'

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export function Field(props: FieldProps) {
  return <div className="flex w-full flex-col gap-1" {...props} />
}
