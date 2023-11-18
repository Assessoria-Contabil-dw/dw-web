'use client'
import { User } from '@/lib/auth'
import { queryClient } from '@/services/query.provider'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavigationHeader() {
  const pathnameCurrent = usePathname()
  const user: User = queryClient.getQueryData('authUser') as User

  const MenuItem = [
    {
      href: '/acessos',
      label: 'Acessos',
      replace: true,
      role: 'CLIENT',
    },
    {
      href: '/acessos/painel',
      label: 'Painel',
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
      href: '/lideres',
      label: 'Representantes',
      replace: true,
      role: 'ADMIN',
    },
    {
      href: '/escritorio',
      label: 'Escritórios',
      replace: true,
      role: 'ADMIN',
    },
    {
      href: '/links',
      label: 'Sites úteis',
      replace: true,
      role: '',
    },
  ]

  console.log(user?.role)

  return (
    <nav>
      <ul className="flex">
        {MenuItem.map(
          (item, index) =>
            (user?.role === item.role || item.role === '') && (
              <li className="w-full" key={index}>
                <Link
                  href={item.href}
                  replace={item.replace}
                  className={`flex w-full flex-row items-center gap-3 whitespace-nowrap border-b-4  px-3 py-4 font-sans text-sm 
          ${
            pathnameCurrent.match(item.href) !== null
              ? 'border-primary font-medium text-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-900'
          }`}
                >
                  {item.label}
                </Link>
              </li>
            ),
        )}
      </ul>
    </nav>
  )
}
