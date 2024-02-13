'use client'
import { forwardRef } from 'react'
import ButtonBase, { ButtonBaseProps } from './ButtonBase'

interface ButtonPrimaryProps extends ButtonBaseProps {
  variant: 'outline' | 'fill' | 'ghost'
}
export type Ref = HTMLButtonElement
const ButtonPrimary = forwardRef<Ref, ButtonPrimaryProps>(function Button(
  { className, variant, ...atr },
  ref,
) {
  return (
    <ButtonBase
      ref={ref}
      className={`
      ${
        variant === 'fill' &&
        'text-slate-800 hover:bg-primaryHover bg-primary disabled:opacity-50 disabled:cursor-not-allowed'
      } 
      ${
        variant === 'outline' &&
        'border-[1px] border-slate-200 bg-white text-slate-800 hover:border-transparent hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400'
      }
      ${
        variant === 'ghost' &&
        'hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed'
      }
      
      ${className}`}
      {...atr}
    />
  )
})

export default ButtonPrimary
