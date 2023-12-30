'use client'
import { MenuIcon, XIcon } from 'lucide-react'
import ButtonIcon from '../../Buttons/ButtonIcon'
import { useContext } from 'react'
import { AccessContext } from '@/provider/context.provider'

export default function ActiveHeader() {
  const { openHeader, setOpenHeader } = useContext(AccessContext)

  return (
    <ButtonIcon
      onClick={() => setOpenHeader(!openHeader)}
      className="lg:hidden"
      title="Menu"
      icon={openHeader ? <XIcon size={16} /> : <MenuIcon size={16} />}
    />
  )
}
