import ActiveLink from './ActiveLink'
import LinkPrimary from '../../../Links/LinkPrimary'
import Image from 'next/image'
import logo from '@/assets/logo_v2.svg'
import { NavigationItem } from '@/interfaces/types'

const NAVIGATION: NavigationItem[] = [
  {
    name: 'Início',
    href: '/',
  },
  {
    name: 'Planos',
    href: '#planos',
  },
  {
    name: 'Sobre nós',
    href: '#sobre',
  },
]

export default function Navbar() {
  return (
    <header className="flex h-20 w-full justify-center border-b text-base">
      <div className="mx-5 flex  max-w-7xl flex-1  items-center justify-between">
        <div className="flex items-center">
          <div className="pr-5">
            <Image src={logo} className="h-12" alt="Figura de contabilidade" />
          </div>
          <ul className="flex">
            <li className="flex gap-3 px-4 ">
              {NAVIGATION.map((item, index) => {
                return <ActiveLink key={index} {...item} />
              })}
            </li>
          </ul>
        </div>

        <div className="flex gap-3">
          <LinkPrimary
            target="_blank"
            variant="outline"
            href="https://api.whatsapp.com/send?phone=559991014072"
          >
            Fale Conosco
          </LinkPrimary>
          <LinkPrimary variant="container" href="/login">
            Entrar
          </LinkPrimary>
        </div>
      </div>
    </header>
  )
}
