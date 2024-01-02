import ActiveLink from './ActiveLink'
import LinkPrimary from '../../../Links/LinkPrimary'
import Image from 'next/image'
import logo from '@/assets/logo_v2.svg'
import { NavigationItem } from '@/interfaces/types'
import MenuBar from './MenuBar'
import Link from 'next/link'


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
    <header className="relative flex h-20 w-full justify-center border-b text-base overflow-x-hidden px-5">
      <div className="flex max-w-7xl flex-1  items-center justify-between">
        <div className="flex items-center">
          <Link
            href='/'
            aria-label="Inicio"
            className="pr-5 -ml-6"
          >
            <Image src={logo} className="h-12" alt="Figura de contabilidade" />
          </Link>
          <ul className="hidden lg:flex gap-3 px-4  ">
            {NAVIGATION.map((item, index) => {
              return (
                <li key={index} className="flex ">
                  <ActiveLink key={index} {...item} />
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex gap-3">
          <LinkPrimary
            target="_blank"
            variant="outline"
            href="https://api.whatsapp.com/send?phone=559991014072"
            className='hidden xs:flex'
          >
            Fale Conosco
          </LinkPrimary>

          <LinkPrimary variant="container" href="/login">
            Entrar
          </LinkPrimary>

          <MenuBar
            menu={NAVIGATION}
          />
        </div>
      </div>
    </header>
  )
}
