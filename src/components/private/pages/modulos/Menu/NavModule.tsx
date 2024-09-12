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
      href: `/`,
      label: 'Pagina Inicial',
      sub: null,
    },
    {
      href: `/diretorio`,
      sub: '/vigencia',
      label: 'Diretórios',
      replace: true,
    },
    {
      href: `/spc`,
      label: 'SPC',
      sub: null,
    },
    {
      href: `/emissor`,
      label: 'Emissor',
      sub: null,
    },
    {
      href: `/eleicao`,
      label: 'Eleições',
      sub: null,
    },
    {
      href: `/gera_xsds`,
      label: `Gera XSD's`,
      sub: null,
    },
    // {
    //   href: `/relatorio`,
    //   label: 'Relatório',
    //   sub: null,
    // },
  ]

  function isMenuItemDisabled({ role, href, modules, party }: MenuItemProps) {
    if (role === 'CLIENT') {
      if (modules === null || modules === undefined || modules.length === 0) {
        if (href === '/') return true
        if (href === '/diretorio' && party !== 0) return true
        return false
      }
      switch (href) {
        case '/':
          return true
        case '/diretorio':
          return party !== 0
        case '/spc':
          return !!modules?.find((item) => item.module === 'Visualizar SPC')
        case '/emissor':
          return !!modules?.find((item) => item.module === 'Visualizar Emissor')
        case '/relatorio':
          return !!modules?.find((item) => item.module === 'Visualizar Relatório')
        case '/eleicao':
          return !!modules?.find((item) => item.module === 'Visualizar Eleições')
        case '/gera_xsds':
          return !!modules?.find((item) => item.module === `Gera XSD's`)
        default:
          return false  
      }
    }
    return true
  }

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
          disabled={
            !isMenuItemDisabled({
              role: user?.role || '',
              href: item.href,
              party: Number(partyCode),
              modules,
            })
          }
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
