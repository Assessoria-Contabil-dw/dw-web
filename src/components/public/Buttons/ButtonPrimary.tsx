"use client"
import { forwardRef } from "react";
import ButtonBase, { ButtonBaseProps } from "./ButtonBase";

interface ButtonPrimaryProps extends ButtonBaseProps {
    variant: "outline" | "container"
}
export type Ref = HTMLButtonElement;
const ButtonPrimary = forwardRef<Ref, ButtonPrimaryProps>(function Button({ className, ...atr }, ref) {
    return (
        <ButtonBase
            ref={ref}
            className={`bg-jupiter-blue hover:bg-jupiter-blue-1000 text-white ${className}`}
            {...atr}
        />
    )
})

export default ButtonPrimary;
