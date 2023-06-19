"use client";

import { HomeIcon, SquareAsterisk} from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Menu() {

  const activeSegment = useSelectedLayoutSegment()


  return (
    <nav className="flex h-screen  flex-col gap-8 bg-primary p-4 shadow-sm">
      <div>
        <h2>Nome</h2>
      </div>
      <ul className="flex flex-col gap-2">
        <li className="w-full">
          <Link
            href="/"
            className={`flex w-full flex-row items-center gap-2 rounded-lg  p-2 font-sans text-sm text-white
            ${activeSegment === null ? 'bg-[#ffffff19]' : ''}`}
          >
            <HomeIcon size={20} />
            Página Inicial
          </Link>
        </li>

        <li className="w-full">
          <Link
            href="/newDirectory"
            className={`flex w-full flex-row items-center gap-2 rounded-lg  p-2 font-sans text-sm text-white
            ${activeSegment === 'newDirectory' ? 'bg-[#ffffff19]' : ''}`}
          >
            <SquareAsterisk size={20} />
            Cadastrar Diretório
          </Link>
        </li>
      </ul>

      <button>Sair</button>
    </nav>
  );
}
