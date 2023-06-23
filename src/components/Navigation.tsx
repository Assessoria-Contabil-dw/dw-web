'use client'
import {
  KeyRound,
  ClipboardList,
  HomeIcon,
  SquareAsterisk,
  Users2,
} from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export function NavigationMenu() {
  const activeSegment = useSelectedLayoutSegment()

  return (
    <nav className="flex flex-col">
      <ul className="flex flex-col gap-2">
        <li className="w-full">
          <Link
            href="/"
            className={`flex w-full flex-row items-center gap-2 rounded-lg  p-2 font-sans text-sm text-white
            ${activeSegment === null ? 'bg-[#ffffff19]' : ''}
            `}
          >
            <HomeIcon size={20} />
            Página Inicial
          </Link>
        </li>

        <li className="w-full">
          <Link
            href="/directory"
            className={`flex w-full flex-row items-center gap-2 rounded-lg  p-2 font-sans text-sm text-white
            ${activeSegment === 'newDirectory' ? 'bg-[#ffffff19]' : ''}`}
          >
            <SquareAsterisk size={20} />
            Diretórios
          </Link>
        </li>

        <li className="w-full">
          <Link
            href="/leader"
            className={`flex w-full flex-row items-center gap-2 rounded-lg  p-2 font-sans text-sm text-white
            ${activeSegment === 'leader' ? 'bg-[#ffffff19]' : ''}`}
          >
            <Users2 size={20} />
            Representantes
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/advocate"
            className={`flex w-full flex-row items-center gap-2 rounded-lg  p-2 font-sans text-sm text-white
            ${activeSegment === 'advocate' ? 'bg-[#ffffff19]' : ''}`}
          >
            <SquareAsterisk size={20} />
            Advogados
          </Link>
        </li>

        <li className="w-full">
          <Link
            href="/pca"
            className={`flex w-full flex-row items-center gap-2 rounded-lg  p-2 font-sans text-sm text-white
            ${activeSegment === 'pca' ? 'bg-[#ffffff19]' : ''}`}
          >
            <ClipboardList size={20} />
            Cadastrar PCA
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/acess"
            className={`flex w-full flex-row items-center gap-2 rounded-lg  p-2 font-sans text-sm text-white
            ${activeSegment === 'acess' ? 'bg-[#ffffff19]' : ''}`}
          >
            <KeyRound size={20} />
            Novo acesso
          </Link>
        </li>
      </ul>
    </nav>
  )
}
