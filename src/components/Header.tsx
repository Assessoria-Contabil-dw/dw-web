import { LogOut } from 'lucide-react'
import { getUser } from '@/lib/auth'

interface HeaderProps {
  title: string
  descrition?: string
}

export default function Header({ title, descrition }: HeaderProps) {
  const { name, role } = getUser()

  return (
    <div className="flex flex-row justify-between">
      <div>
        <h2>{title}</h2>
        <span>{descrition}</span>
      </div>
      <div className="flex w-fit cursor-pointer items-center justify-between gap-4 rounded-lg border-[1px] border-dashed bg-white p-2">
        <div className="flex flex-col gap-0">
          <span className="font-sans text-[10px] font-medium uppercase text-gray-400">
            {role === 'CLIENT' ? 'Cliente' : 'Administrador'}
          </span>
          <h5 className="font-alt font-semibold text-gray-600">{name}</h5>
        </div>
        <a
          href="/api/auth/logout"
          className="flex items-center justify-start gap-2 rounded-md bg-secundary/10
        p-2 text-sm text-secundary
        transition-all hover:bg-secundary hover:text-white"
          title="Sair"
        >
          <LogOut size={16} />
        </a>
      </div>
    </div>
  )
}
