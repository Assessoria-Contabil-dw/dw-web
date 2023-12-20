import { useContext } from 'react'
import PermitSelect from './PermitSelect'

import { AccessContext } from '@/provider/context.provider'

export default function Menu() {
  const { openMenu } = useContext(AccessContext)

  return (
    <aside
      className={`sticky flex h-[calc(100vh-3rem)] min-w-[200px] flex-col justify-between overflow-x-auto bg-white p-4 max-sm:absolute
      max-sm:z-10 max-sm:w-full 
      sm:block sm:border-r-[1px] sm:border-zinc-300
    ${openMenu ? 'block' : 'hidden'}`}
    >
      <PermitSelect />
    </aside>
  )
}
