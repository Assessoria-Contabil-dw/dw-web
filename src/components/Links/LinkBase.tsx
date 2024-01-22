import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactNode, forwardRef } from "react";

export type LinkBaseProps = {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  children?: ReactNode;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export type Ref = HTMLAnchorElement;

const LinkBase = forwardRef<Ref, LinkBaseProps>(function LinkBase(
  { startIcon, endIcon, loading, className, children, ...atr },
  ref
) {
  return (
    <Link
      {...atr}
      ref={ref}
      className={`flex h-[50px] items-center justify-center gap-2 rounded-lg px-6 text-base font-medium transition ${className}`}
    >
      <>
        {startIcon && (
          <span className="flex h-full items-center justify-center">
            {startIcon}
          </span>
        )}
        <span>{children}</span>

        {endIcon && (
          <span className="flex h-full items-center justify-center">
            {endIcon}
          </span>
        )}
      </>
    </Link>
  );
});

export default LinkBase;
