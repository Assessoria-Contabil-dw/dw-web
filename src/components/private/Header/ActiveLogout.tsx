'use client'
import { LogOut } from 'lucide-react'
import ButtonIcon from '../../Buttons/ButtonIcon'
import { useAuth } from '@/hooks/useAuth'
import { useLogout } from '@/hooks/useLogout'

export default function ActiveLogout() {
  const user = useAuth()
  const { refetch } = useLogout()

  if (!user) return null

  function handleLogout() {
    refetch()
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex cursor-default flex-col justify-center text-right max-md:hidden">
        <h5 className="text-h6 max-w-[90px] overflow-hidden text-ellipsis whitespace-nowrap">
          {user.name}
        </h5>
        <span className="text-[10px] font-medium uppercase leading-[8px] text-slate-400">
          {user.role === 'CLIENT' ? 'Cliente' : 'Administrador'}
        </span>
      </div>

      <ButtonIcon
        onClick={handleLogout}
        title="Sair"
        icon={<LogOut size={16} />}
      />
    </div>
  )
}
