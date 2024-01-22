"use client";
import { User } from "@/hooks/useAuth";
import { queryClient } from "@/provider/query.provider";

const user: User = queryClient.getQueryData("authUser") as User;

export const HEADER_ITEM_LINK = [
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