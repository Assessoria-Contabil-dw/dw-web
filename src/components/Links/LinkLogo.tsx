import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export interface LinkIconProps {
  img: string
  href: string
  title: string
  classname?: string
}

export default function LinkLogo({
  img,
  href,
  title,
  classname,
}: LinkIconProps) {
  return (
    <Link
      title={title}
      href={href}
      className={`flex h-fit w-fit cursor-pointer items-center justify-start gap-2 ${classname}`}
    >
      <Image src={img} alt={title} width={40} />
    </Link>
  )
}
