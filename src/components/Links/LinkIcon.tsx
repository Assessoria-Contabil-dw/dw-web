import Link from 'next/link'
import React, { ReactNode } from 'react'

export interface LinkIconProps {
  icon: ReactNode
  href: string
  title: string
  className?: string
}

export default function LinkIcon({
  icon,
  href,
  title,
  className,
}: LinkIconProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center ${className}`}
      title={title}
    >
      <span className="flex items-center justify-center text-slate-400">
        {icon}
      </span>
    </Link>
  )
}
