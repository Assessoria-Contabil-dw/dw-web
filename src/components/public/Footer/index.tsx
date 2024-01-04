import { FaPhoneAlt } from 'react-icons/fa'
import { SiGooglemaps } from 'react-icons/si'
import { BsFillSendFill } from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/logo_v2.svg'
import { PopupCookieConsent } from '../Popups/PopupCookieConsent'

export default function Footer() {
  return (
    <footer
      className={`flex flex-1 flex-col items-center overflow-hidden bg-neutral-700 text-gray-300 `}
    >
      <PopupCookieConsent />

      <div className="flex w-full max-w-7xl  flex-wrap gap-[70px] px-5 py-14 pb-32">
        <div className="flex flex-1 flex-col justify-start gap-3">
          <Link href="/" aria-label="Inicio">
            <Image src={logo} alt="Logo Footer" />
          </Link>
          <p className="text-justify text-lg">
            Somos a DW Assessoria Contábel, especializados em simplificar a
            contabilidade partidária.
          </p>
        </div>
        <div className="flex flex-col gap-10">
          <h2 className="text-3xl">
            <span>Contato</span>
          </h2>
          <ul className="flex flex-col gap-3 text-lg">
            <li className="flex items-center gap-3">
              <Link
                className="flex items-center gap-3 hover:underline"
                href="mailto:contato@contabilidadepartidaria.com.br"
              >
                <span className="w-[24px] text-xl">
                  <BsFillSendFill />
                </span>

                <span>contato@contabilidadepartidaria.com.br</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 hover:underline"
                href="tel:+5599991014072"
              >
                <span className="w-[24px] text-xl">
                  <FaPhoneAlt />
                </span>
                <span>+55 99 99101-4072</span>
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-[24px] text-xl">
                <SiGooglemaps />
              </span>
              <span>Sede em Maranhão | Brasil</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-10">
          <h2 className="text-3xl">
            <span>Informações</span>
          </h2>
          <ul className="flex flex-col gap-3 text-lg">
            <li>
              <Link href="/politica-de-privacidade" className="hover:underline">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/termos-de-uso" className="hover:underline">
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-10">
          <h2 className="text-3xl">
            <span>Redes Sociais</span>
          </h2>
          <div className="flex gap-5">
            <Link
              aria-label="Signa-nos no Facebook"
              href="https://www.instagram.com/dwassessoriacontabil"
              target="_blank"
              className="h-12 w-12 bg-contain"
              style={{
                backgroundImage: "url('/assets/logo_instagram.svg",
              }}
            ></Link>

            <Link
              aria-label="Signa-nos no instagram"
              href="https://www.instagram.com/dwassessoriacontabil"
              target="_blank"
              className="h-12 w-12 bg-contain"
              style={{
                backgroundImage: "url('/assets/logo_facebook.svg",
              }}
            ></Link>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center border-t border-neutral-500 px-5 py-7">
        <div className="w-full max-w-7xl text-center">
          Copyright © 2023-{new Date().getFullYear()}{' '}
          <b className="text-yellow-300">DW Assessoria Contábel </b> . Todos os
          direitos reservados.
        </div>
      </div>
    </footer>
  )
}
