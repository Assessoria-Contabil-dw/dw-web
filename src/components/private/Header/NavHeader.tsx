'use client'
import { User } from "@/hooks/Access/User/useAuth";
import ActiveLink from "./ActiveLink";
import { queryClient } from "@/provider/query.provider";

export default function NavigationHeader() {
  const user: User = queryClient.getQueryData("authUser") as User;

  const HEADER_ITEM_LINK = [
    {
      href:  '/' ,
      label: 'Painel',
      disable: false,
    },
    {
      href: '/admin',
      label: 'Administrador',
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
