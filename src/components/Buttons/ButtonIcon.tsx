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
      className={`h-10 w-10 rounded-md border-[1px] border-solid border-slate-200 px-2 text-slate-700 hover:border-primary hover:bg-primary hover:text-slate-800 
      focus-visible:ring-2  focus-visible:ring-slate-800 focus-visible:ring-offset-2 focus-visible:ring-offset-white
      disabled:cursor-not-allowed disabled:opacity-60 flex justify-center items-center text-center ${className}`}
      title={title}
    >
      {!loading ? (
        <>
          {icon && (
            <>
              <span>{icon}</span>
            </>
          )}
        </>
      ) : (
        <LoadingSecond />
      )}
    </button>
  )
}
