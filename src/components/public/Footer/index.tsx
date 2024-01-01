
import { FaPhoneAlt } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { BsFillSendFill } from "react-icons/bs";
import Link from "next/link";
import Image from 'next/image'
import logo from '@/assets/logo_v2.svg'

export default function Footer() {
    return (
        <footer className={`flex flex-col flex-1 items-center bg-neutral-700 text-gray-300 overflow-hidden px-5`}>
            <div className="flex gap-[70px] flex-wrap  w-full max-w-7xl py-14 pb-32">
                <div className="flex flex-col gap-3 flex-1 justify-start">
                    <div>
                        <Image
                            src={logo}
                            alt="Logo Footer"
                        />
                    </div>
                    <p className="text-lg text-justify"
                    >
                        Somos a DW Contabilidade Partidária, especializados em simplificar a contabilidade partidária.

                    </p>


                </div>
                <div className="flex flex-col gap-10">
                    <h2 className="text-3xl">
                        <span>Contato</span>
                    </h2>
                    <ul className="flex flex-col gap-3 text-lg">
                        <li className="flex items-center gap-3">
                            <Link
                                className="flex items-center gap-3"
                                href="mailto:contato@contabilidadepartidaria.com.br">

                                <span className="text-xl w-[24px]">
                                    <BsFillSendFill />
                                </span>

                                <span>
                                    contato@contabilidadepartidaria.com.br
                                </span>
                            </Link>
                        </li>
                        <li >
                            <Link
                                className="flex items-center gap-3"
                                href="tel:5599991014072">

                                <span className="text-xl w-[24px]">
                                    <FaPhoneAlt />
                                </span>
                                <span>
                                    +55 99 99101-4072
                                </span>
                            </Link>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-xl w-[24px]">
                                <SiGooglemaps />
                            </span>
                            <span>
                                Sede em Maranhão | Brasil
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-10">
                    <h2 className="text-3xl">
                        <span>Informações</span>
                    </h2>
                    <ul className="flex flex-col gap-3 text-lg">
                        <li>
                            <Link
                                href="/politica-de-privacidade"
                            >
                                Política de Privacidade
                            </Link>

                        </li>
                        <li>
                            <Link
                                href="/termos-de-uso"
                            >
                                Termos de Uso
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-10">
                    <h2 className="text-3xl">
                        <span>Redes Sociais</span>
                    </h2>
                    <div>

                    </div>
                </div>
            </div>

            <div className="flex w-full justify-center py-7 border-t border-neutral-500">
                <div className="w-full max-w-7xl text-center">
                    Copyright © 2023-{(new Date()).getFullYear()} <b className="text-yellow-300">DW Contabilidade Partidária                       </b> . Todos os direitos reservados.
                </div>
            </div>

        </footer>
    )

}