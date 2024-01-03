'use client'
import { NavigationItem } from '@/interfaces/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function ActiveLink({ name, href }: NavigationItem) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={` ${pathname === href && 'font-extrabold'} px-2`}
    >
      {name}
    </Link>
  )
}
