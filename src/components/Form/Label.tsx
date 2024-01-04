import { LabelHTMLAttributes } from 'react'

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className="flex items-center justify-between font-lexend text-sm font-medium text-slate-600"
      {...props}
    />
  )
}
