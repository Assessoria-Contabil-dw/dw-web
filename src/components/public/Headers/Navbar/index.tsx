import ActiveLink from './ActiveLink'
import LinkPrimary from '../../../Links/LinkPrimary'
import Image from 'next/image'
import logo from '@/assets/cdw-horizontal.svg'
import { NavigationItem } from '@/interfaces/types'
import MenuBar from './MenuBar'

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
    <header
      id="header"
      className="relative flex h-20 w-full justify-center overflow-x-hidden border-b px-5 text-base"
    >
      <div className="flex max-w-7xl flex-1  items-center justify-between">
        <div className="flex items-center">
          <div>
            <a href="/" aria-label="Inicio" className="-ml-6 pr-5">
              <Image src={logo} className="h-12" alt="Figura de contabilidade" />
            </a>
          </div>
         
          <ul className="hidden gap-3 px-4 lg:flex  ">
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
            className="hidden xs:flex"
          >
            Fale Conosco
          </LinkPrimary>

          <LinkPrimary variant="container" href="/login">
            Entrar
          </LinkPrimary>

          <MenuBar menu={NAVIGATION} />
        </div>
      </div>
    </header>
  )
}
