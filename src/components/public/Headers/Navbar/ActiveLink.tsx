'use client'
import { NavigationItem } from '@/interfaces/types'
import { usePathname } from 'next/navigation'

export default function ActiveLink({ name, href }: NavigationItem) {
  const pathname = usePathname()
  return (
    <a href={href} className={` ${pathname === href && 'font-extrabold'} px-2`}>
      {name}
    </a>
  )
}
