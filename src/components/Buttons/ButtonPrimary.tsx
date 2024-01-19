'use client'
import { forwardRef } from 'react'
import ButtonBase, { ButtonBaseProps } from './ButtonBase'

interface ButtonPrimaryProps extends ButtonBaseProps {
  variant: 'outline' | 'container'
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
        variant === 'container' &&
        'bg-primary font-semibold text-zinc-900 hover:bg-primaryHover disabled:cursor-not-allowed disabled:opacity-30'
      } 
      ${
        variant === 'outline' &&
        'border-[1px] border-slate-200 bg-white text-slate-800 hover:border-transparent hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400'
      }
      
      ${className}`}
      {...atr}
    />
  )
})

export default ButtonPrimary
