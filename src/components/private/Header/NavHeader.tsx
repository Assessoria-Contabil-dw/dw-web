'use client'
import { User } from "@/hooks/useAuth";
import ActiveLink from "./ActiveLink";
import { queryClient } from "@/provider/query.provider";

export default function NavigationHeader() {
  const user: User = queryClient.getQueryData("authUser") as User;

  const HEADER_ITEM_LINK = [
    {
      href: '/painel',
      label: 'Painel',
      disable: false,
    },
    {
      href: '/templates',
      label: 'Templates',
      disable: user?.role === 'ADMIN' ? false : true,
    },
    {
      href: '/partidos',
      label: 'Partidos',
      disable: user?.role === 'ADMIN' ? false : true,
    },
    {
      href: '/advogados',
      label: 'Advogados',
      disable: user?.role === 'ADMIN' ? false : true,
    },
    {
      href: '/escritorios',
      label: 'Escritórios',
      disable: user?.role === 'ADMIN' ? false : true,
    },
    {
      href: '/clientes' || '/clientes/acessos',
      label: 'Clientes',
      disable: user?.role === 'ADMIN' ? false : true,
    },
  ]

  return (
    <nav className="h-full transition max-lg:hidden">
      <ul className="flex h-full gap-6">
        {HEADER_ITEM_LINK.map(
          (item, index) =>
            !item?.disable && (
              <li className="h-full w-full" key={index}>
                <ActiveLink href={item.href} name={item.label} />
              </li>
            )
        )}
      </ul>
    </nav>
  );
}
