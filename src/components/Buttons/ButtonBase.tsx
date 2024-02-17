import { LoadingSecond } from "@/components/Loading/second";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
export interface ButtonBaseProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  children?: ReactNode;
}

export type Ref = HTMLButtonElement;
const ButtonBase = forwardRef<Ref, ButtonBaseProps>(function ButtonBase(
  { startIcon, endIcon, loading, className, children, title, disabled, ...atr },
  ref
) {
  return (
    <button
      {...atr}
      ref={ref}
      title={title}
      disabled={disabled || loading}
      className={`flex h-10 items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 font-montserrat text-sm font-semibold transition-colors duration-150 
      focus:outline-none focus:ring-2  focus:ring-slate-800
      ${
        className || ""
      }`}
    >
      <>
        {!loading ? (
          <>
            {startIcon && (
              <span className="flex h-full items-center">{startIcon}</span>
            )}
          </>
        ) : (
          <LoadingSecond />
        )}
        <span>{children}</span>
        {endIcon && <span className="flex h-full items-center">{endIcon}</span>}
      </>
    </button>
  );
});

export default ButtonBase;
