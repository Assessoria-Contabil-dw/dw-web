import { CheckCircle2, MoveRight } from "lucide-react";
import LinkPrimary from "../../Links/LinkPrimary";
import Image from 'next/image'
import imgContablue from '/src/assets/contablue.png'

export default function Home() {
  return (
    <>
      <main className="flex flex-col flex-1 items-center">
        <section className="flex w-full justify-center">
          <div className="flex flex-1 max-w-7xl mx-5 justify-between py-10 gap-20">
            <div className="w-[38%] flex flex-col gap-5">
              <h1 className="text-5xl font-bold leading-[55px]">
                A assinatura eletrônica e digital mais fácil de usar
              </h1>
              <p className="leading-6">
                Simplifique o processo de coleta de assinaturas da sua empresa. Crie, envie e assine documentos, sempre com validade jurídica.
              </p>
              <div className="flex gap-3">
                <LinkPrimary
                  href=""
                  variant="container"
                  className="px-12"
                >
                  Testar Grátis
                </LinkPrimary>

                <LinkPrimary
                  href=""
                  variant="outline"
                  className="flex-1"
                  endIcon={
                    <MoveRight />
                  }
                >
                  Soluções personalizadas
                </LinkPrimary>
              </div>

              <ul className="flex flex-col gap-3">
                <li className="flex gap-3">
                  <i>
                    <CheckCircle2 />
                  </i>
                  <span>
                    Sem cartão de crédito
                  </span>
                </li>
                <li className="flex gap-3">
                  <i>
                    <CheckCircle2 />
                  </i>
                  <span>
                    Suporte por WhatsApp
                  </span>
                </li>
                <li className="flex gap-3">
                  <i>
                    <CheckCircle2 />
                  </i>
                  <span>
                    Acompanhamento exclusivo
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-1 justify-center">
              <Image
                className="w-[70%] h-auto"
                src={imgContablue}
                alt="Figura de contabilidade"
              />
            </div>
          </div>

        </section>
      </main>
    </>

  )

}
