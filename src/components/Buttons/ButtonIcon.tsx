import { LoadingSecond } from '@/components/Loading/second'
import React, { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonIconProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  title: string
  loading?: boolean
  disabled?: boolean
  className?: string
}

export default function ButtonIcon({
  icon,
  className,
  title,
  disabled,
  loading,
  ...atr
}: ButtonIconProps) {
  return (
    <button
      {...atr}
      disabled={disabled || loading}
      className={`h-9 w-9 rounded-md border-[1px] border-solid border-slate-200 p-2 text-slate-700 hover:border-primary hover:bg-primary hover:text-slate-800 
      disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      title={title}
    >
      {!loading ? (
        <>
          {icon && (
            <span className="flex items-center justify-center">{icon}</span>
          )}
        </>
      ) : (
        <LoadingSecond />
      )}
    </button>
  )
}
