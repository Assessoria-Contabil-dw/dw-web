import { LoadingSecond } from '@/components/Loading/second'
import React, { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonIconProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  title: string
  loading?: boolean
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
      className={` button-icon ${className}`}
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
