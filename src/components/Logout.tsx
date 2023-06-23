import { getUser } from '@/lib/auth'
import { LogOut } from 'lucide-react'

export function Logout() {
  const { name, role } = getUser()

  return (
    <div className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg bg-white/10 p-2">
      <div className="flex flex-col gap-0">
        <span className="font-sans text-[10px] font-medium uppercase text-white">
          {role === 'CLIENT' ? 'Cliente' : 'Administrador'}
        </span>
        <h5 className="font-alt font-semibold text-gray-700">{name}</h5>
      </div>
      <a
        href="/api/auth/logout"
        className="flex items-center justify-start gap-2 rounded-md bg-white/25 
        p-2 text-sm text-secundary
        transition-all hover:bg-white/50"
        title="Sair"
      >
        <LogOut size={16} />
      </a>
    </div>
  )
}
