'use client'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
// import { AiOutlineLoading3Quarters } from 'react-icons/ai'
export interface ButtonBaseProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: ReactNode
  loading?: boolean
  children?: ReactNode
}

export type Ref = HTMLButtonElement
const ButtonBase = forwardRef<Ref, ButtonBaseProps>(function ButtonBase(
  { startIcon, loading, className, children, disabled, ...atr },
  ref,
) {
  return (
    <button
      {...atr}
      ref={ref}
      disabled={disabled || loading}
      className={`flex h-[40px] items-center justify-center gap-2 rounded-sm  px-5 disabled:bg-opacity-70 ${className}`}
    >
      <>
        {!loading ? (
          <>
            {startIcon && (
              <span className="flex h-full items-center justify-center">
                {startIcon}
              </span>
            )}
          </>
        ) : (
          <span className="animate-spin">
            <Loader2 size={20} />
          </span>
        )}
        <span>{children}</span>
      </>
    </button>
  )
})

export default ButtonBase
