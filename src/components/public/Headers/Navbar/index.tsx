import { NavigationItem } from "@/@types/types";
import ActiveLink from "./ActiveLink";
import LinkPrimary from "../../Links/LinkPrimary";
import Image from 'next/image'
import logo from '@/assets/logo_v2.svg'
const NAVIGATION: NavigationItem[] = [
    {
        name: "Início",
        href: "/"
    },
    {
        name: "Planos",
        href: "/planos"
    },
    {
        name: "Sobre nós",
        href: "/sobre"
    }
]

export default function Navbar() {
    return (
        <header className="flex w-full justify-center h-20 border-b text-base">
            <div className="flex flex-1  max-w-7xl mx-5  items-center justify-between">
                <div className="flex items-center">
                    <div className="pr-5">
                        <Image
                            src={logo}
                            className="h-[60px]"
                            alt="Figura de contabilidade"
                        />
                    </div>
                    <ul className="flex">
                        <li className="flex px-4 gap-3 ">
                            {NAVIGATION.map((item) => {
                                return (
                                    <ActiveLink
                                        {...item}
                                    />
                                )
                            })}
                        </li>
                    </ul>
                </div>

                <div className="flex gap-3">
                    <LinkPrimary
                        variant="outline"
                        href="/"
                    >
                        Fale Conosco
                    </LinkPrimary>
                    <LinkPrimary
                        href="/login"

                    >
                        Entrar
                    </LinkPrimary>
                </div>
            </div>
        </header>
    )
}