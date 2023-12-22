'use client'
import { LogOut, MenuIcon, XIcon } from 'lucide-react'
import { queryClient } from '@/provider/query.provider'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useNotify } from '../Toast/toast'
import imgLogo from '../../assets/icon.svg'
import Image from 'next/image'
import { NavigationHeader } from './NavHeader'
import Link from 'next/link'
import { AccessContext } from '@/provider/context.provider'
import { useContext } from 'react'

export default function Header() {
  const router = useRouter()
  const notify = useNotify()
  const user = useAuth()
  const { setOpenMenu, openMenu } = useContext(AccessContext)

  function handleLogout() {
    api
      .post('/logout')
      .then(() => {
        queryClient.removeQueries('authUser')
        notify({ type: 'success', message: 'Saiu da conta com sucesso' })
        router.refresh()
      })
      .catch(() => {
        notify({ type: 'error', message: 'Erro ao sair da conta' })
      })
  }

  if (!user) {
    return null
  }

  return (
    <header className="sticky top-0 z-0 flex h-12 w-full flex-row justify-between border-b-[1px] border-zinc-300 bg-white px-6 max-md:px-2">
      <div className="flex flex-row items-center gap-6 max-md:gap-2">
        <Link
          href="/"
          className="flex w-full cursor-pointer items-center justify-start gap-2  max-md:hidden"
        >
          <Image src={imgLogo} alt="Logo da plataforma" width={40} />
          <span className="font-alt text-xs font-semibold leading-3 text-slate-700">
            Assessoria <br /> Contábil
          </span>
        </Link>

        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="button-tertiary hidden max-md:block"
          title="Menu"
        >
          {openMenu ? <XIcon size={16} /> : <MenuIcon size={16} />}
        </button>

        <NavigationHeader />
      </div>

      <div className="flex w-fit  cursor-pointer items-center justify-between gap-2">
        <div className="flex flex-col justify-center gap-0  text-right max-md:hidden">
          <h6 className="whitespace-nowrap">{user.name}</h6>

          <span className="text-[10px] font-medium uppercase leading-[8px] text-slate-400">
            {user.role === 'CLIENT' ? 'Cliente' : 'Admin'}
          </span>
        </div>
        <button onClick={handleLogout} className="button-tertiary" title="Sair">
          <LogOut size={16} />
        </button>
      </div>
    </header>
  )
}
