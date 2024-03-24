'use client'
import { forwardRef } from 'react'
import ButtonBase, { ButtonBaseProps } from './ButtonBase'

interface ButtonSecondProps extends ButtonBaseProps {
  variant: 'cancel' | 'delete'
}
export type Ref = HTMLButtonElement
const ButtonTertiary = forwardRef<Ref, ButtonSecondProps>(function Button(
  { className, variant, ...atr },
  ref,
) {
  return (
    <ButtonBase
      ref={ref}
      className={`
      ${
        variant === 'cancel' &&
        'justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300'
      } 
      ${
        variant === 'delete' &&
        'justify-center rounded-full bg-red-500 text-white hover:bg-red-600 disabled:bg-red-400 disabled:text-white'
      }
      
      ${className}`}
      {...atr}
    />
  )
})

export default ButtonTertiary
