'use client'
import { Lock } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { AccessContext, Modules } from '@/services/context.provider'
import { useContext } from 'react'
import { User } from '@/lib/auth'
import { queryClient } from '@/services/query.provider'

export default function NavigationModule({ modules }: { modules: Modules[] }) {
  const router = useRouter()
  const params = usePathname()
  const user: User = queryClient.getQueryData('authUser') as User

  const { partyCode, cityCode, stateId } = useContext(AccessContext)

  const mudulosMenu = [
    {
      href: `/acessos/painel`,
      label: 'Diretórios',
      replace: true,
      disable: true,
    },
    {
      href: `/acessos/painel/spc`,
      label: 'SPC',
      replace: true,
      disable:
        user?.role === 'CLIENT'
          ? modules?.find((item) => item.module === 'Visualizar SPC')
          : true,
    },
    {
      href: `/acessos/painel/relatory`,
      label: 'Relatórios',
      replace: true,
      disable:
        user?.role === 'CLIENT'
          ? modules?.find((item) => item.module === 'Visualizar Relatórios')
          : true,
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
    if (!modules) {
      return null
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {mudulosMenu.map((item, index) => (
        <button
          disabled={!item.disable}
          onClick={() => handleClick(item.href)}
          className={`w-full justify-between text-start font-medium disabled:cursor-not-allowed disabled:text-slate-400
          ${params === item.href ? 'bg-primary' : ''}`}
          key={index}
        >
          {item.label}
          {!item.disable && <Lock size={18} />}
        </button>
      ))}
    </div>
  )
}
