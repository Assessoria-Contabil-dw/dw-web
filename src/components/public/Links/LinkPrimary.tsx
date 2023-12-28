'use client'
import { forwardRef } from 'react'
import LinkBase, { LinkBaseProps } from './LinkBase'

interface ButtonPrimaryProps extends LinkBaseProps {
  variant?: 'outline' | 'container'
}
export type Ref = HTMLAnchorElement
const LinkPrimary = forwardRef<Ref, ButtonPrimaryProps>(function (
  { className, variant = 'container', ...att },
  ref,
) {
  return (
    <LinkBase
      ref={ref}
      className={`
                ${
                  variant === 'container' &&
                  'bg-primary text-slate-900 hover:bg-primaryHover'
                } 
                ${
                  variant === 'outline' &&
                  'border-2 border-slate-900 border-transparent bg-transparent text-slate-900 hover:bg-gray-200 '
                }
                ${className}
                `}
      {...att}
    />
  )
})

LinkPrimary.displayName = 'LinkPrimary'

export default LinkPrimary
