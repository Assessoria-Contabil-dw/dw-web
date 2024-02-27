import ButtonIcon from '@/components/Buttons/ButtonIcon'
import { ChevronRight } from 'lucide-react'
import { Dispatch } from 'react'

interface ActiveMenuProps {
  openMenu: boolean
  setOpenMenu: Dispatch<boolean>
}

export default function ActiveMenu({ openMenu, setOpenMenu }: ActiveMenuProps) {
  return (
    <ButtonIcon
      onClick={() => setOpenMenu(!openMenu)}
      icon={
        <i
          className={`${
            openMenu
              ? 'rotate-180 transition duration-300 '
              : 'rotate-0 transition duration-300'
          }`}
        >
          <ChevronRight size={18} />
        </i>
      }
      title="Menu"
      className="h-fit w-fit rounded-none rounded-r-full border-l-0 bg-white pl-0 pr-0 py-2 md:hidden"
    />
  )
}
