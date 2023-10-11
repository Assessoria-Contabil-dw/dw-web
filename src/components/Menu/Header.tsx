'use client'
import { LogOut } from 'lucide-react'
import { queryClient } from '@/services/query.provider'
import { api } from '@/lib/api'
import { User } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useNotify } from '../Toast/toast'
import imgLogo from '../../assets/icon.svg'
import Image from 'next/image'
import SelectParty from './Select'

export default function Header() {
  const router = useRouter()
  const notify = useNotify()
  const user: User | undefined = queryClient.getQueryData('authUser')

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
    <header className="sticky top-0 z-50 flex w-full flex-row justify-between border-b-[1px] border-zinc-300 bg-white px-6 py-2">
      <div className="flex flex-row">
        <div className="flex w-full items-center justify-start gap-2">
          <Image src={imgLogo} alt="Logo da plataforma" width={40} />
          <span className="font-alt text-xs font-medium leading-3 text-slate-500 ">
            Assessoria <br /> Contábil
          </span>
        </div>
        <SelectParty />
      </div>

      <div className="flex w-fit  cursor-pointer items-center justify-between gap-2">
        <div className="flex flex-col justify-center gap-0  text-right">
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
