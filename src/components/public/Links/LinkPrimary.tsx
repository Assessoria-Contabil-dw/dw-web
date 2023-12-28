"use client"
import { forwardRef } from "react";
import LinkBase, { LinkBaseProps } from "./LinkBase";


interface ButtonPrimaryProps extends LinkBaseProps {
    variant?: "outline" | "container"
}
export type Ref = HTMLAnchorElement;
const LinkPrimary = forwardRef<Ref, ButtonPrimaryProps>(function ({ className, variant = "container", ...att }, ref) {
    return (
        <LinkBase
            ref={ref}
            className={
                `
                ${variant === "container" && "bg-primary hover:bg-primaryHover text-slate-900"} 
                ${variant === "outline" && "border-2 border-transparent  hover:border-slate-900 text-slate-900 bg-transparent "}
                ${className}
                `
            }
            {...att}
        />
    )
})

export default LinkPrimary;
