'use client'
import { Lock } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { AccessContext, Modules } from '@/provider/context.provider'
import { useContext } from 'react'
import { User } from '@/lib/auth'
import { queryClient } from '@/provider/query.provider'

export default function NavigationModule({ modules }: { modules: Modules[] }) {
  const router = useRouter()
  const params = usePathname()
  const user: User = queryClient.getQueryData('authUser') as User

  const { partyCode, cityCode, stateId } = useContext(AccessContext)

  const modulesClient = [
    {
      href: `/painel`,
      label: 'Pagina Inicial',
      sub: null,
      replace: true,
      disable: true,
    },
    {
      href: `/painel/diretorio`,
      sub: '/vigencia',
      label: 'Diretórios',
      replace: true,
      disable: user?.role === 'CLIENT' ? partyCode !== 0 && true : true,
    },
    {
      href: `/painel/spc`,
      label: 'SPC',
      sub: null,
      replace: true,
      disable:
        user?.role === 'CLIENT'
          ? modules?.find((item) => item.module === 'Visualizar SPC')
          : true,
    },
    {
      href: `/painel/relatorio`,
      label: 'Relatórios',
      sub: null,
      replace: true,
      disable:
        user?.role === 'CLIENT'
          ? modules?.find((item) => item.module === 'Visualizar Relatórios')
          : true,
    },
  ]

  const modulesAdmin = [
    {
      href: '/painel/partidos',
      label: 'Partidos',
      replace: true,
    },
    {
      href: '/painel/advogados',
      label: 'Advogados',
      replace: true,
    },
    {
      href: '/painel/lideres',
      label: 'Representantes',
      replace: true,
    },
    {
      href: '/painel/escritorio',
      label: 'Escritórios',
      replace: true,
    },
  ]

  function handleClick(path: string) {
    if (user?.role === 'ADMIN') {
      router.replace(path)
      return
    }

    if (partyCode && !stateId && !cityCode) {
      router.replace(`${path}?partido=${partyCode}`)
      return
    }

    if (partyCode && stateId && !cityCode) {
      router.replace(`${path}?partido=${partyCode}&estado=${stateId}`)
      return
    }
    if (partyCode && stateId && cityCode) {
      router.replace(
        `${path}?partido=${partyCode}&estado=${stateId}&cidade=${cityCode}`,
      )
    }
  }

  if (user?.role === 'CLIENT') {
    if (modules === null) {
      return null
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {modulesClient?.map((item, index) => (
        <button
          disabled={!item.disable}
          onClick={() => handleClick(item.href)}
          className={`w-full justify-between text-start font-medium disabled:cursor-not-allowed disabled:text-slate-400
          
          ${
            params === item.href || (item.sub && params.match(item.sub) != null)
              ? 'bg-primary'
              : ''
          }`}
          key={index}
        >
          {item.label}
          {!item.disable && <Lock size={18} />}
        </button>
      ))}

      {user?.role === 'ADMIN' &&
        modulesAdmin?.map((item, index) => (
          <button
            onClick={() => handleClick(item.href)}
            className={`w-full justify-between text-start font-medium disabled:cursor-not-allowed disabled:text-slate-400
            
            ${params === item.href ? 'bg-primary' : ''}`}
            key={index}
          >
            {item.label}
          </button>
        ))}
    </div>
  )
}
