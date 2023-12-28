'use client'
import { useContext } from 'react'
import PermitSelect from './PermitSelect'

import { AccessContext } from '@/provider/context.provider'

export default function Menu() {
  const { openMenu } = useContext(AccessContext)

  return (
    <aside
      className={`sticky flex h-full min-w-[200px] flex-col justify-between overflow-x-auto bg-white p-4 
      max-md:absolute max-md:z-10 max-md:w-full
      md:block md:border-r-[1px] md:border-zinc-300
    ${openMenu ? 'block' : 'hidden'}`}
    >
      <PermitSelect />
    </aside>
  )
}
