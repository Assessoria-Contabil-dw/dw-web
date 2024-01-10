import { inter } from '@/app/fonts'
import LinkBase from '@/components/Links/LinkBase'
import { Check, Info, X } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

type CardPlanProps = {
  title: string
  descrition: string
  monthlyValue?: number
  annualValue?: number
  label?: string
  href?: string
  active?: number[]
}
const SERVICES: string[] = [
  'Módulo Diretório',
  'Módulo SPC',
  'Módulo Emissor',
  'Módulo Relatórios',
  'Módulo Xsd’s SPCA',
]

export default function CardPlan(props: CardPlanProps) {
  return (
    <div
      className={`${inter.className} min-w-[300px] flex-1 rounded-lg border px-7 py-10  text-[14px] shadow-sm`}
    >
      <div className="flex flex-1 flex-col border-b pb-5">
        <h3 className="text-[1em] font-semibold uppercase text-violet-600">
          {props.descrition}
        </h3>
        <div className="flex w-full flex-col  ">
          <h2 className="text-[1.8em] font-semibold">{props.title}</h2>
          <div className="mb-5 flex h-[85px] flex-col ">
            {!props.annualValue && !props.monthlyValue && (
              <div>
                <b className="text-[2.5em] font-semibold">Negociável</b>
                <p>Contabilidade e prestação de contas anual</p>
              </div>
            )}

            {props.annualValue && (
              <span>
                <b className="text-[2.5em] font-semibold">
                  {' '}
                  R$ {props.annualValue.toFixed(2).replaceAll('.', ',')}
                </b>
                /ano
              </span>
            )}
            {props.monthlyValue && (
              <span>
                <b className="text-[1.5em] font-semibold">
                  {' '}
                  R$ {props.monthlyValue.toFixed(2).replaceAll('.', ',')}
                </b>
                /mês
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {props.annualValue || props.monthlyValue ? (
            <LinkBase
              href={props.href || ''}
              target="_blank"
              className="h-14 rounded-[4px] border-2 border-black !text-[1.1em] shadow-sm hover:border-primary hover:bg-primary "
            >
              Assinar agora
            </LinkBase>
          ) : (
            <LinkBase
              href={props.href || ''}
              className=" h-14 rounded-[4px] bg-green-700  !text-[1.1em] text-white hover:bg-green-900"
              startIcon={
                <span className="text-[1.5em]">
                  <FaWhatsapp />
                </span>
              }
            >
              Entre em contato
            </LinkBase>
          )}

          {props.label ? (
            <p className="text-center text-[0.8em] text-neutral-700">
              {props.label}
            </p>
          ) : (
            <p className="text-[0.8em] text-transparent">label</p>
          )}
        </div>
      </div>
      <ul className="flex flex-col gap-3 pt-5 text-[1.1em]">
        {SERVICES.map((item, index) => {
          return (
            <li
              className="flex items-center justify-between gap-3 text-neutral-700"
              key={index}
            >
              <div className="flex gap-3">
                {props.active?.includes(index) ? (
                  <span className="text-green-400">
                    <Check />
                  </span>
                ) : (
                  <span className="text-red-400">
                    <X />
                  </span>
                )}
                <span>{item}</span>
              </div>
              <span>
                <Info />
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
