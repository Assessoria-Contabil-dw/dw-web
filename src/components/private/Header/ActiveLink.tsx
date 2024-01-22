"use client";
import { NavigationItem } from "@/interfaces/types";
import { usePathname } from "next/navigation";

export default function ActiveLink({ name, href }: NavigationItem) {
  const pathname = usePathname();
  return (
    <a
      href={href}
      className={` ${
        pathname.match(href) !== null &&
        "border-b-primary font-medium text-slate-800"
      } flex h-full items-center justify-center border-y-4 border-transparent px-1 text-slate-400 transition-colors  hover:text-slate-800`}
    >
      {name}
    </a>
  );
}

