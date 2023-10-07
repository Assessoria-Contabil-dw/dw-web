'use client'
import {
  KeyRound,
  HomeIcon,
  Users2,
  CalendarRange,
  Ungroup,
  BookMarked,
  GraduationCap,
  FileText,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavigationMenu() {
  const pathnameCurrent = usePathname()
  const MenuItem = [
    {
      href: '/painel',
      icon: HomeIcon,
      label: 'Página Inicial',
      click: null,
      replace: true,
    },
    {
      href: '/painel/party',
      icon: Ungroup,
      label: 'Partidos',
      click: 'party',
      replace: true,
    },
    {
      href: '/painel/spc',
      icon: CalendarRange,
      label: 'SPC',
      click: 'spc',
      replace: true,
    },
    {
      href: '/painel/directory',
      icon: Ungroup,
      label: 'Diretórios',
      click: 'directory',
      replace: true,
    },
    {
      href: '/painel/leader',
      icon: Users2,
      label: 'Representantes',
      click: 'leader',
      replace: true,
    },
    {
      href: '/painel/advocate',
      icon: GraduationCap,
      label: 'Advogados',
      click: 'advocate',
      replace: true,
    },
    {
      href: '/painel/lawfirm',
      icon: BookMarked,
      label: 'Escritórios',
      click: 'lawfirm',
      replace: true,
    },
    {
      href: '/painel/relatory',
      icon: FileText,
      label: 'Relatórios',
      click: 'relatory',
      replace: true,
    },
    {
      href: '/painel/admin',
      icon: KeyRound,
      label: 'Administração',
      click: 'admin',
      replace: true,
    },
  ]
  return (
    <nav className="flex flex-col">
      <ul className="flex flex-col gap-2">
        {MenuItem.map((item, index) => (
          <li className="w-full" key={index}>
            <Link
              href={item.href}
              replace={item.replace}
              className={`flex w-full flex-row  items-center gap-3 rounded-lg p-2 font-sans text-sm font-medium text-slate-700 
            ${pathnameCurrent === item.href ? 'bg-slate-100' : ''}`}
            >
              <item.icon size={18} className="w-4 text-slate-700" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
