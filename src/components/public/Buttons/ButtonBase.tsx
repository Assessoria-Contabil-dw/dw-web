"use client"
import { ButtonHTMLAttributes, forwardRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    startIcon?: React.ReactNode
    loading?: boolean
    children?: React.ReactNode
}

export type Ref = HTMLButtonElement;
const ButtonBase = forwardRef<Ref, ButtonBaseProps>(function ButtonBase({ startIcon, loading, className, children, disabled, ...atr }, ref) {
    return (
        <button
            {...atr}
            ref={ref}
            disabled={disabled || loading}
            className={`flex gap-2 justify-center items-center rounded-sm disabled:bg-opacity-70  h-[40px] px-5 ${className}`}
        >
            <>
                {!loading ?
                    <>
                        {startIcon &&
                            <span className="h-full flex justify-center items-center">
                                {startIcon}
                            </span>
                        }
                    </>
                    :
                    <span className="animate-spin">
                        <AiOutlineLoading3Quarters size={20} />
                    </span>
                }
                <span>
                    {children}
                </span>
            </>
        </button>
    )
})

export default ButtonBase;
