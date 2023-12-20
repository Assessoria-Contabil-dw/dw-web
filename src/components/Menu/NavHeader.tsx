'use client'
import { User } from '@/lib/auth'
import { queryClient } from '@/provider/query.provider'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavigationHeader() {
  const pathnameCurrent = usePathname()
  const user: User = queryClient.getQueryData('authUser') as User

  const MenuItem = [
    {
      href: '/painel',
      label: 'Painel',
      replace: true,
      role: '',
    },
  ]

  return (
    <nav className="h-full">
      <ul className="flex h-full">
        {MenuItem.map(
          (item, index) =>
            (user?.role === item.role || item.role === '') && (
              <li className="h-full w-full" key={index}>
                <Link
                  href={item.href}
                  replace={item.replace}
                  className={`flex h-full w-full flex-row items-center gap-3 whitespace-nowrap border-b-4  px-3 font-sans text-sm 
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
