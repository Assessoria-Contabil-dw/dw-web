'use client'
import { User } from '@/lib/auth'
import { queryClient } from '@/provider/query.provider'
import { usePathname } from 'next/navigation'
import LinkPrimary from '../../Links/LinkPrimary'
import { AccessContext } from '@/provider/context.provider'
import { useContext } from 'react'

export default function NavigationBody() {
  const pathnameCurrent = usePathname()
  const { openHeader } = useContext(AccessContext)
  const user: User = queryClient.getQueryData('authUser') as User

  const HEADER_ITEM = [
    {
      href: '/painel',
      label: 'Painel',
      replace: true,
      role: '',
    },
    {
      href: '/templates',
      label: 'Templates',
      replace: true,
      role: 'ADMIN',
    },
    {
      href: '/partidos',
      label: 'Partidos',
      replace: true,
      role: 'ADMIN',
    },
    {
      href: '/advogados',
      label: 'Advogados',
      replace: true,
      role: 'ADMIN',
    },
    {
      href: '/escritorios',
      label: 'Escritórios',
      replace: true,
      role: 'ADMIN',
    },
    {
      href: '/clientes' || '/clientes/acessos',
      label: 'Clientes',
      replace: true,
      role: 'ADMIN',
    },
  ]

  return (
    <aside
      className={`absolute right-0 z-10 h-full w-full bg-white transition ${
        openHeader ? 'block' : 'hidden'
      }`}
    >
      <ul className="flex h-full flex-col gap-4">
        {HEADER_ITEM.map(
          (item, index) =>
            (user?.role === item.role || item.role === '') && (
              <li className="h-full w-full" key={index}>
                <LinkPrimary
                  href={item.href}
                  replace={item.replace}
                  variant="line"
                  className={` 
                  ${
                    pathnameCurrent.match(item.href) !== null
                      ? 'border-transparent text-slate-800'
                      : 'border-transparent'
                  }`}
                >
                  {item.label}
                </LinkPrimary>
              </li>
            ),
        )}
      </ul>
    </aside>
  )
}
