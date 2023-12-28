import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, forwardRef } from "react";


export type LinkBaseProps = {
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    loading?: boolean
    children?: React.ReactNode
} & LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export type Ref = HTMLAnchorElement

const LinkBase = forwardRef<Ref, LinkBaseProps>(function LinkBase({ startIcon, loading, className, children, ...atr }, ref) {
    return (
        <Link
            {...atr}
            ref={ref}
            className={`flex gap-2 text-base justify-center items-center rounded-lg  h-[45px] px-6 transition ${className}`}
        >
            <>

                {startIcon &&
                    <span className="h-full flex justify-center items-center">
                        {startIcon}
                    </span>
                }
                <span>
                    {children}
                </span>
            </>
        </Link >
    )
})

export default LinkBase;
