"use client"
import { NavigationItem } from "@/@types/types"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export default function ActiveLink({ name, href }: NavigationItem) {

    const pathname = usePathname()
    console.log(pathname)
    return (
        <Link
            href={href}
            className={` ${(pathname === href) && "font-extrabold"} px-2`}
        >
            {name}
        </Link>
    )
}