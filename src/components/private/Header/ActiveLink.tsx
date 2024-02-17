"use client";
import { NavigationItem } from "@/interfaces/types";
import { usePathname } from "next/navigation";

export default function ActiveLink({ name, href }: NavigationItem) {
  const pathname = usePathname();

  console.log( pathname.length, href);
  return (
    <a
      href={href}
      className={` ${
        (href.length > 1 ? pathname.match(href) !== null : pathname === href) &&
        "border-b-primary font-medium text-slate-800"
      } flex h-full items-center justify-center border-y-4 border-transparent px-1 text-slate-400 transition-colors  hover:text-slate-800
      focus-visible:ring-1 focus-visible:ring-transparent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800
      `}
    >
      {name}
    </a>
  );
}

