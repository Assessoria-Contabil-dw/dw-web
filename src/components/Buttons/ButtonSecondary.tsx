'use client'
import { forwardRef } from 'react'
import ButtonBase, { ButtonBaseProps } from './ButtonBase'

interface ButtonPrimaryProps extends ButtonBaseProps {
  variant: 'outline' | 'fill' | 'ghost'
}
export type Ref = HTMLButtonElement
const ButtonSecondary = forwardRef<Ref, ButtonPrimaryProps>(function Button(
  { className, variant, ...atr },
  ref,
) {
  return (
    <ButtonBase
      ref={ref}
      className={`
      ${
        variant === 'fill' &&
        'text-white hover:bg-secondHover bg-second disabled:opacity-50 disabled:cursor-not-allowed  focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-slate-800'
      } 
      ${
        variant === 'outline' &&
        'border-2 border-second text-second hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-800'
      }
      ${
        variant === 'ghost' &&
        'hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed  focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-secondHover'
      }
      
      ${className}`}
      {...atr}
    />
  )
})

export default ButtonSecondary
