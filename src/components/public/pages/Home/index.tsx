import { CheckCircle2, MoveRight } from 'lucide-react'
import LinkPrimary from '../../../Links/LinkPrimary'
import Image from 'next/image'
import imgContablue from '../../../../assets/contablue.svg'
import CardPlan from '../../Cards/CardPlan'
import imgSPC from '../../../../assets/modulo-spc.svg'
import imgDirectory from '../../../../assets/modulo-diretorio.svg'
import imgEmissor from '../../../../assets/modulo-emissor.svg'

export default function Home() {
  return (
    <>
      <main className=" flex h-full flex-1 flex-col items-center">
        <section className="flex w-full justify-center px-5">
          <div className="flex max-w-7xl flex-1 justify-between gap-20 py-10">
            <div className="flex w-full flex-col gap-5">
              <h1 className="text-5xl font-bold leading-[55px]">
                Contabilidade para partidos políticos
              </h1>
              <p className="leading-6">
                Simplifique a contabilidade partidárias, com um sistema que
                centraliza suas informações.
              </p>
              <div className="flex flex-wrap gap-3 ">
                <LinkPrimary
                  target="_blank"
                  href="https://api.whatsapp.com/send?phone=559991014072"
                  variant="fill"
                  className="w-full min-w-[150px] xs:w-fit"
                >
                  Assinar agora
                </LinkPrimary>

                <LinkPrimary
                  target="_blank"
                  href="https://api.whatsapp.com/send?phone=559991014072"
                  variant="outline"
                  className="w-full max-w-full xs:max-w-[286px]"
                  endIcon={<MoveRight />}
                >
                  Soluções personalizadas
                </LinkPrimary>
              </div>

              <ul className="flex flex-col gap-3">
                <li className="flex gap-3">
                  <i>
                    <CheckCircle2 />
                  </i>
                  <span>Contabilidade e prestação de contas anual</span>
                </li>
                <li className="flex gap-3">
                  <i>
                    <CheckCircle2 />
                  </i>
                  <span>Suporte por WhatsApp</span>
                </li>
                <li className="flex gap-3">
                  <i>
                    <CheckCircle2 />
                  </i>
                  <span>Acompanhamento exclusivo</span>
                </li>
              </ul>
            </div>
            <div className="hidden w-full justify-center lg:flex">
              <Image
                className="h-auto w-[400px]"
                src={imgContablue}
                alt="Figura de contabilidade"
              />
            </div>
          </div>
        </section>

        <section id="planos" className="flex w-full justify-center px-5">
          <div className="flex max-w-7xl flex-1 flex-col">
            <div className="flex w-full max-w-[600px] flex-col items-start gap-3">
              <h2 className="w-full text-start text-5xl font-bold  leading-[55px] ">
                Conheça nossos planos
              </h2>
              <p>
                Escolha o plano que melhor atende às necessidades do seu partido
                e simplifique sua contabilidade.
              </p>
            </div>

            <div className="flex w-full flex-1 justify-center">
              <div className="my-10 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <CardPlan
                  href="https://api.whatsapp.com/send?phone=559991014072&text=Ol%C3%A1%20CDW,%20quero%20conhecer%20o%20Plano%20Operacional."
                  title="Operacional"
                  descrition="Para você começar"
                  annualValue={60}
                  active={[0, 1]}
                />

                <CardPlan
                  href="https://api.whatsapp.com/send?phone=559991014072&text=Ol%C3%A1%20CDW,%20quero%20conhecer%20o%20Plano%20Supervisor."
                  title="Supervisor"
                  descrition="Para você crescer"
                  label="Sem cobrança de implantação"
                  monthlyValue={20}
                  annualValue={200}
                  active={[0, 1, 2, 3]}
                />

                <CardPlan
                  href="https://api.whatsapp.com/send?phone=559991014072&text=Ol%C3%A1%20CDW,%20quero%20conhecer%20o%20Plano%20Diretor."
                  title="Diretor"
                  descrition="Lidere com eficiência"
                  label="Suporte técnico"
                  monthlyValue={50}
                  annualValue={600}
                  active={[0, 1, 2, 3, 4]}
                />

                <CardPlan
                  href="https://api.whatsapp.com/send?phone=559991014072&text=Ol%C3%A1%20CDW,%20quero%20conhecer%20o%20Plano%20Geral."
                  title="Geral"
                  descrition="Junto com você"
                  active={[0, 1, 2, 3, 4]}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="flex w-full justify-center px-5">
          <div className=" flex flex-col lg:max-w-7xl flex-1 items-center justify-between gap-8 py-10 
          lg:gap-20 lg:flex-row">
            <div className="w-full lg:max-w-[50%]">
              <Image
                className="w-full"
                src={imgDirectory}
                alt="Figura de contabilidade"
                width={400}
                height={300}
              />
            </div>
            <div className="flex flex-1 flex-col gap-5 h-fit">
              <h1 className="text-4xl font-bold leading-[42px]">
                <span className="text-secondHover">Módulo Diretório </span>
                centralize suas informações
              </h1>
              <p className=" leading-6">
                Centralize as informações cadastradas no SGIP/TSE, como endereço
                e composição da agremiação. Além de emitir alertas do vencimento
                da composição, garantindo uma gestão eficiente e proativa.
              </p>
            </div>
          </div>
        </section>

        <section className="flex w-full justify-center px-5">
          <div className="flex flex-col-reverse lg:max-w-7xl flex-1 items-center justify-between gap-8 py-10 
          lg:gap-20 lg:flex-row">
            <div className="flex flex-1 flex-col gap-5 h-fit">
              <h1 className="text-4xl font-bold leading-[42px]">
                <span className="text-secondHover">Módulo SPC </span>
                atualize suas informações
              </h1>
              <p className=" leading-6">
                Visualize as informações de cada prestações de contas
                (SPCA/SPCE), incluindo situação, parecer preliminar, data de
                vencimento e notificações sobre ela.
              </p>

              <ul className="flex flex-col gap-3">
                <li className="flex gap-3">
                  <i>
                    <CheckCircle2 />
                  </i>
                  <span>Acesso ao Portal DIVULGA SPCA</span>
                </li>
                <li className="flex gap-3">
                  <i>
                    <CheckCircle2 />
                  </i>
                  <span>Acesso ao Portal do Consulta Pública PJE</span>
                </li>
              </ul>
            </div>

            <div className=" w-full lg:max-w-[50%]">
              <Image
                className="h-auto w-full"
                src={imgSPC}
                alt="Figura do módulo SPC"
                width={400}
                height={300}
              />
            </div>
          </div>
        </section>

        <section className="flex w-full justify-center px-5">
          <div className="flex flex-col lg:max-w-7xl flex-1 items-center justify-between gap-8 py-10 
          lg:gap-20 lg:flex-row">
            <div className=" w-full lg:max-w-[50%]">
              <Image
                className="h-auto w-full"
                src={imgEmissor}
                alt="Figura de contabilidade"
                width={400}
                height={300}
              />
            </div>

            <div className="flex flex-1 flex-col gap-5 h-fit">
              <h1 className="text-4xl font-bold leading-[42px]">
                <span className="text-secondHover">Módulo Emissor </span>
                facilita a emissão de documentos
              </h1>
              <p className=" leading-6">
                Gere peças complementares da prestação de contas anual, como
                procurações, parecer da comissão executiva, certidão de ausência
                de movimentação em contas bancárias, etc. Além de gerar os
                documentos com os campos já preenchidos, é possível incluir a
                imagem das assinaturas, autorizadas pelos respectivos
                responsáveis
              </p>

              <ul className="flex flex-col gap-3">
                <li className="flex gap-3">
                  <i>
                    <CheckCircle2 />
                  </i>
                  <span>Templates personalizados</span>
                </li>
                <li className="flex gap-3">
                  <i>
                    <CheckCircle2 />
                  </i>
                  <span>Informações pre-preenchidas</span>
                </li>
                <li className="flex gap-3">
                  <i>
                    <CheckCircle2 />
                  </i>
                  <span>Assinaturas válidadas</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
