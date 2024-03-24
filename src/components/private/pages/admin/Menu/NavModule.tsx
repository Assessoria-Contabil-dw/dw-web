'use client'
import { Lock } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { AccessContext } from '@/provider/context.provider'
import { useContext } from 'react'
import { queryClient } from '@/provider/query.provider'
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'
import { Modules } from '@/interfaces/modules'
import { User } from '@/hooks/Access/User/useAuth'


interface NavigationProps {
  modules: Modules[]
}
interface MenuItemProps {
  
  role: string
  href: string
  modules: Modules[]
  party: number
}
export default function NavigationModule( { modules } :NavigationProps) {
  const router = useRouter()
  const params = usePathname()
  const user: User = queryClient.getQueryData('authUser') as User
  const { partyCode, cityCode, stateId } = useContext(AccessContext)

  const MENU_MODULOS = [
    {
      href: `/admin`,
      label: 'Pagina Inicial',
      sub: null,
    },
    {
      href: `/admin/partidos`,
      label: 'Partidos',
      replace: true,
    },
    {
      href: `/admin/diretorio`,
      sub: '/admin/vigencia',
      label: 'Diretórios',
      replace: true,
    },
    {
      href: `/admin/spc`,
      label: 'SPC',
      sub: null,
    },
    {
      href: `/admin/template`,
      label: 'Template',
      sub: null,
    },
    {
      href: `/admin/advogados`,
      label: 'Advogados',
      replace: true,
      sub: null,
    },
    {
      href: `/admin/clientes`,
      sub: '/acessos',
      label: 'Clientes',
    },
  ]

  function handleClick(path: string) {
    let queryParams = ''

    if (user?.role !== 'ADMIN') {
      queryParams = `?partido=${partyCode}`

      if (stateId) queryParams += `&estado=${stateId}`
      if (cityCode) queryParams += `&cidade=${cityCode}`

      router.replace(`${path}${queryParams}`)
    } else {
      router.replace(path)
    }
  }

  return (
    <nav className="flex flex-col gap-2">
      {MENU_MODULOS?.map((item, index) => (
        <ButtonPrimary
          onClick={() => handleClick(item.href)}
          key={index}
          title={item.label}
          variant={params == item.href || (item.sub && params.match(item.sub) != null) ? "fill" : "ghost"}
          className="group items-start justify-between text-left"
          endIcon={
            <i className="hidden group-disabled:block">
              <Lock size={12} />
            </i>
          }
        >
          {item.label}
        </ButtonPrimary>
      ))}
    </nav>
  )
}
