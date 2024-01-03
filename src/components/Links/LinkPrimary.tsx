import { forwardRef } from 'react'
import LinkBase, { LinkBaseProps } from './LinkBase'

interface ButtonPrimaryProps extends LinkBaseProps {
  variant?: 'outline' | 'container' | 'line'
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
                  'rounded-lg bg-primary px-6 text-slate-800 hover:bg-primaryHover'
                } 
                ${
                  variant === 'outline' &&
                  ' rounded-lg border-[1px] border-slate-200 bg-transparent px-6 text-slate-800 hover:border-transparent hover:bg-slate-100 hover:text-slate-800'
                }
                ${
                  variant === 'line' &&
                  'h-full border-b-4 text-slate-400 hover:text-slate-800'
                }
                ${className}
                `}
      {...att}
    />
  )
})

LinkPrimary.displayName = 'LinkPrimary'

export default LinkPrimary
