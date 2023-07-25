'use client'
import {
  KeyRound,
  HomeIcon,
  Users2,
  CalendarRange,
  Ungroup,
  BookMarked,
  GraduationCap,
  FileText,
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
            className={`flex w-full flex-row items-center gap-3 rounded-lg p-2 font-sans text-sm font-medium 
            ${
              activeSegment === null ? 'bg-primary text-white' : 'text-zinc-600'
            }
            `}
          >
            <HomeIcon
              size={18}
              className={`w-4 ${
                activeSegment === null ? ' text-white' : 'text-zinc-400'
              }`}
            />
            Página Inicial
          </Link>
        </li>

        <li className="w-full">
          <Link
            href="/party"
            className={`flex w-full flex-row items-center gap-3 rounded-lg p-2 font-sans text-sm font-medium 
            ${
              activeSegment === 'party'
                ? 'bg-primary text-white'
                : 'text-zinc-600'
            }`}
          >
            <Ungroup
              size={18}
              className={`w-4 ${
                activeSegment === 'party' ? ' text-white' : 'text-zinc-400'
              }`}
            />
            Partidos
          </Link>
        </li>

        <li className="w-full">
          <Link
            href="/spc"
            className={`flex w-full flex-row items-center gap-3 rounded-lg p-2 font-sans text-sm font-medium 
            ${
              activeSegment === 'spc'
                ? 'bg-primary text-white'
                : 'text-zinc-600'
            }`}
          >
            <CalendarRange
              size={18}
              className={`w-4 ${
                activeSegment === 'spc' ? ' text-white' : 'text-zinc-400'
              }`}
            />
            SPC
          </Link>
        </li>

        <li className="w-full">
          <Link
            href="/directory"
            className={`flex w-full flex-row items-center gap-3 rounded-lg p-2 font-sans text-sm font-medium 
            ${
              activeSegment === 'directory'
                ? 'bg-primary text-white'
                : 'text-zinc-600'
            }`}
          >
            <Ungroup
              size={18}
              className={`w-4 ${
                activeSegment === 'directory' ? ' text-white' : 'text-zinc-400'
              }`}
            />
            Diretórios
          </Link>
        </li>

        <li className="w-full">
          <Link
            href="/leader"
            className={`flex w-full flex-row items-center gap-3 rounded-lg p-2 font-sans text-sm font-medium 
            ${
              activeSegment === 'leader'
                ? 'bg-primary text-white'
                : 'text-zinc-600'
            }`}
          >
            <Users2
              size={18}
              className={`w-4 ${
                activeSegment === 'leader' ? ' text-white' : 'text-zinc-400'
              }`}
            />
            Representantes
          </Link>
        </li>

        <li className="w-full">
          <Link
            href="/advocate"
            className={`flex w-full flex-row items-center gap-3 rounded-lg p-2 font-sans text-sm font-medium 
            ${
              activeSegment === 'advocate'
                ? 'bg-primary text-white'
                : 'text-zinc-600'
            }`}
          >
            <GraduationCap
              size={18}
              className={`w-4 ${
                activeSegment === 'advocate' ? ' text-white' : 'text-zinc-400'
              }`}
            />
            Advogados
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/lawfirm"
            className={`flex w-full flex-row items-center gap-3 rounded-lg p-2 font-sans text-sm font-medium 
            ${
              activeSegment === 'lawfirm'
                ? 'bg-primary text-white'
                : 'text-zinc-600'
            }`}
          >
            <BookMarked
              size={18}
              className={`w-4 ${
                activeSegment === 'lawfirm' ? ' text-white' : 'text-zinc-400'
              }`}
            />
            Escritórios
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/relatory"
            className={`flex w-full flex-row items-center gap-3 rounded-lg p-2 font-sans text-sm font-medium 
            ${
              activeSegment === 'relatory'
                ? 'bg-primary text-white'
                : 'text-zinc-600'
            }`}
          >
            <FileText
              size={18}
              className={`w-4 ${
                activeSegment === 'acess' ? ' text-white' : 'text-zinc-400'
              }`}
            />
            Relatórios
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/acess"
            className={`flex w-full flex-row items-center gap-3 rounded-lg p-2 font-sans text-sm font-medium 
            ${
              activeSegment === 'acess'
                ? 'bg-primary text-white'
                : 'text-zinc-600'
            }`}
          >
            <KeyRound
              size={18}
              className={`w-4 ${
                activeSegment === 'acess' ? ' text-white' : 'text-zinc-400'
              }`}
            />
            Administração
          </Link>
        </li>
      </ul>
    </nav>
  )
}
