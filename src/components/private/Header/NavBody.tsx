"use client";
import { AccessContext } from "@/provider/context.provider";
import { useContext } from "react";
import ActiveLink from "./ActiveLink";
import { queryClient } from "@/provider/query.provider";
import { User } from "@/hooks/Access/User/useAuth";

export default function NavigationBody() {
  const { openHeader } = useContext(AccessContext);

  const user: User = queryClient.getQueryData("authUser") as User;

  const HEADER_ITEM_LINK = [
    {
      href: '/' ,
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
    <aside
      className={`absolute right-0 z-10 h-full w-full bg-white transition ${
        openHeader ? "block" : "hidden"
      }`}
    >
      <ul className="flex h-full flex-col gap-4">
        {HEADER_ITEM_LINK.map(
          (item, index) =>
            !item?.disable && (
              <li className="h-12 w-full px-8" key={index}>
                <ActiveLink href={item.href} name={item.label} />
              </li>
            )
        )}
      </ul>
    </aside>
  );
}
