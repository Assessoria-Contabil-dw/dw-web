"use client";
import { NavigationItem } from "@/interfaces/types";
import { usePathname } from "next/navigation";

export default function ActiveLink({ name, href }: NavigationItem) {
  const pathname = usePathname();

  return (
    <a
      href={href}
      className={` ${
        (href != "/" ? pathname.match(href) !== null : 
        pathname === href ||
        pathname.match("diretorio") !== null ||
        pathname.match("spc") !== null ||
        pathname.match("emissor") !== null ||
        pathname.match("relatorio") !== null)  &&
        "border-b-primary font-semibold text-slate-800"
      } font-normal font-serif text-sm flex h-full items-center justify-center border-y-4 border-transparent px-1 text-slate-500 transition-colors  hover:text-slate-800
      focus-visible:ring-1 focus-visible:ring-transparent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800
      `}
    >
      {name}
    </a>
  );
}

