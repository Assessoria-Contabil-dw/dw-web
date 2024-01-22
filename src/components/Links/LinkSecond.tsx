import { forwardRef } from 'react'
import LinkBase, { LinkBaseProps } from './LinkBase'

interface ButtonPrimaryProps extends LinkBaseProps {
  variant?: 'outline' | 'fill' | 'ghost'
}
export type Ref = HTMLAnchorElement
const LinkPrimary = forwardRef<Ref, ButtonPrimaryProps>(function (
  { className, variant = 'fill', ...att },
  ref,
) {
  return (
    <LinkBase
      ref={ref}
      className={`
                ${
                  variant === 'fill' &&
                  'text-slate-800 hover:bg-primaryHover bg-primary'
                } 
                ${
                  variant === 'outline' &&
                  'text-slate-800 border-2 border-slate-200 hover:bg-slate-100'
                }
                ${
                  variant === 'ghost' &&
                  'hover:bg-slate-100'
                }
                ${className}
                `}
      {...att}
    />
  )
})

LinkPrimary.displayName = 'LinkPrimary'

export default LinkPrimary
