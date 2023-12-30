'use client'
import { AccessContext } from '@/provider/context.provider'
import ActiveMenu from './ActiveMenu'
import { useContext } from 'react'
import PermitSelect from './PermitSelect'
import ActiveLinks from './ActiveLinks'

export default function MenuPrivate() {
  const { openMenu, setOpenMenu } = useContext(AccessContext)

  return (
    <aside className="flex flex-row max-md:absolute max-md:z-10 max-md:h-full">
      <div
        className={`sticky flex h-full min-w-[200px] flex-col justify-between gap-16 overflow-x-auto border-r-[1px] border-zinc-300 bg-white p-4
        ${openMenu ? 'block' : 'max-md:hidden'}`}
      >
        <PermitSelect />
        <ActiveLinks />
      </div>
      <div className="flex h-full items-center">
        <ActiveMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>
    </aside>
  )
}
