'use client'
import { User } from '@/lib/auth'
import { queryClient } from '@/provider/query.provider'
import { usePathname } from 'next/navigation'
import LinkPrimary from '../../Links/LinkPrimary'

export default function NavigationHeader() {
  const pathnameCurrent = usePathname()
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
      href: '/clientes',
      label: 'Clientes',
      replace: true,
      role: 'ADMIN',
    },
  ]

  return (
    <nav className="h-full transition max-lg:hidden">
      <ul className="flex h-full gap-6">
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
                      ? 'border-primary font-medium text-slate-800'
                      : 'border-transparent font-normal'
                  }`}
                >
                  {item.label}
                </LinkPrimary>
              </li>
            ),
        )}
      </ul>
    </nav>
  )
}
