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
      ${variant === 'container' && 'button-primary'} 
      ${variant === 'outline' && 'button-primary-outline'}
      
      ${className}`}
      {...atr}
    />
  )
})

export default ButtonPrimary
