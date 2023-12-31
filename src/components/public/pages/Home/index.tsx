import { CheckCircle2, MoveRight } from 'lucide-react'
import LinkPrimary from '../../../Links/LinkPrimary'
import Image from 'next/image'
import imgContablue from '../../../../assets/contablue.svg'
import Navbar from '../../Headers/Navbar'
import CardPlan from '../../Cards/CardPlan'

export default function Home() {
    return (
        <>
            <Navbar />
            <main className=" flex h-full flex-1 flex-col items-center">
                <section className="flex w-full justify-center">
                    <div className="mx-5 flex max-w-7xl flex-1 justify-between gap-20 py-10">
                        <div className="flex w-[38%] flex-col gap-5">
                            <h1 className="text-5xl font-bold leading-[55px]">
                                Contabilidade para partidos políticos
                            </h1>
                            <p className="leading-6">
                                Simplifique a contabilidade partidarias, com um sistema que
                                centraliza suas informações.
                            </p>
                            <div className="flex gap-3">
                                <LinkPrimary
                                    href="https://api.whatsapp.com/send?phone=559991014072"
                                    variant="container"
                                    className="px-12"
                                >
                                    Assinar agora
                                </LinkPrimary>

                                <LinkPrimary
                                    href=""
                                    variant="outline"
                                    className="flex-1"
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
                        <div className="flex flex-1 justify-center">
                            <Image
                                className="h-auto w-[60%]"
                                src={imgContablue}
                                alt="Figura de contabilidade"
                            />
                        </div>
                    </div>
                </section>
                <section className="flex w-full justify-center">
                    <div className="mx-5 flex max-w-7xl flex-1 justify-between gap-20 py-10">
                        <div className="flex flex-1 justify-center">
                            <Image
                                className="h-auto"
                                src={imgContablue}
                                alt="Figura de contabilidade"
                            />
                        </div>
                        <div className="flex w-[60%] flex-col gap-5">
                            <h1 className="text-4xl font-bold leading-[42px]">
                                <span className="text-secondHover">Módulo Diretório </span>
                                centralize suas informações
                            </h1>
                            <p className=" leading-6">
                                Concenliza as informações cadastradas no SGIP/TSE, como endereço
                                e composição da agremiação. Além de emitir alertas do vencimento
                                da composição, garantindo uma gestão eficiente e proativa.
                            </p>
                        </div>
                    </div>
                </section>

                <section id='planos' className='flex w-full justify-center'>
                    <div className="mx-5 flex flex-col max-w-7xl flex-1 items-center">
                        <h2 className='w-full text-5xl font-bold text-start  leading-[55px]  my-14 '>
                            Conheças nossos planos
                        </h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
                            <CardPlan
                                title='Operacional'
                                descrition='Para você começar'
                                annualValue={60}
                                active={[0, 1, 2]}
                            />

                            <CardPlan
                                title='Supervisor'
                                descrition='Para você começar'
                                label='Sem cobrança de implantação'
                                monthlyValue={20}
                                annualValue={200}
                                active={[0, 1, 2, 3]}
                            />

                            <CardPlan
                                title='Diretor'
                                descrition='Para você começar'
                                label='Suporte técnico'
                                monthlyValue={50}
                                annualValue={600}
                                active={[0, 1, 2, 3, 4]}
                            />

                            <CardPlan
                                title='Geral'
                                descrition='Junto com você'
                                active={[0, 1, 2, 3, 4]}
                            />
                        </div>
                    </div>
                </section>

                <section className="flex w-full justify-center">
                    <div className="mx-5 flex max-w-7xl flex-1 justify-between gap-20 py-10">
                        <div className="flex w-[60%] flex-col gap-5">
                            <h1 className="text-4xl font-bold leading-[42px]">
                                <span className="text-secondHover">Módulo SPC </span>
                                atualize suas informações
                            </h1>
                            <p className=" leading-6">
                                Visualize as informações de cada prestações de contas
                                (SPCA/SPCE), incluindo status, parecer preliminar, data de
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

                        <div className="flex flex-1 justify-center">
                            <Image
                                className="h-auto"
                                src={imgContablue}
                                alt="Figura de contabilidade"
                            />
                        </div>
                    </div>
                </section>

                <section className="flex w-full justify-center">
                    <div className="mx-5 flex max-w-7xl flex-1 justify-between gap-20 py-10">
                        <div className="flex flex-1 justify-center">
                            <Image
                                className="h-auto"
                                src={imgContablue}
                                alt="Figura de contabilidade"
                            />
                        </div>

                        <div className="flex w-[60%] flex-col gap-5">
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
