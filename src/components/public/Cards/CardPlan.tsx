import { inter } from "@/app/fonts"
import LinkBase from "@/components/Links/LinkBase"
import { Check, Info, X } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";

type CardPlanProps = {
  title: string
  descrition: string
  monthlyValue?: number
  annualValue?: number
  label?: string
  href?: string,
  active?: number[]
}
const SERVICES: string[] = [
  "Módulo Diretório",
  "Módulo SPC",
  "Módulo Emissor",
  "Módulo Relatórios",
  "Módulo Xsd’s SPCA"
]

export default function CardPlan(props: CardPlanProps) {
  return (
    <div className={`${inter.className} shadow-sm text-[14px] px-7 py-10 flex-1 w-[350px]  border rounded-[4px]`}>
      <div className="flex flex-1 flex-col border-b pb-5" >
        <h3 className="text-violet-600 text-[1em] font-semibold uppercase">
          {props.title}
        </h3>
        <div className="flex  h-[53px] w-full justify-between gap-3  items-center mb-5 ">
          <h2 className="text-[1.8em] font-semibold">
            {props.title}
          </h2>
          <div className="flex flex-col">

            {!props.annualValue && !props.monthlyValue &&
              <b className="text-[1.3em] font-semibold">
                Negociável
              </b>
            }
            {props.monthlyValue &&
              <span>
                R$  <b className="text-[1.2em] font-semibold">{props.monthlyValue.toFixed(2).replaceAll(".", ",")}</b>/mês
              </span>
            }
            {props.annualValue &&
              <span>
                R$ <b className="text-[1.3em] font-semibold">{props.annualValue.toFixed(2).replaceAll(".", ",")}</b>/ano
              </span>
            }
          </div>
        </div>
        <div className="flex flex-col gap-2">

          {(props.annualValue || props.monthlyValue) ?
            <LinkBase
              href={props.href || ""}
              className="shadow-sm border-2 h-14 !text-[1.1em] border-black rounded-[4px] hover:bg-primary hover:border-primary "
            >
              Assinar agora
            </LinkBase>
            :
            <LinkBase
              href={props.href || ""}
              className=" text-white h-14 !text-[1.1em]  bg-green-700 hover:bg-green-900 rounded-[4px]"
              startIcon={
                <span className="text-[1.5em]">
                  <FaWhatsapp />
                </span>
              }
            >
              Entre em contato
            </LinkBase>

          }

          {props.label ?
            <p className="text-center text-[0.8em] text-neutral-700">
              {props.label}
            </p>

            :

            <p className="text-[0.8em] text-transparent">
              label
            </p>
          }
        </div>
      </div>
      <ul className="flex flex-col gap-3 text-[1.1em] pt-5">
        {SERVICES.map((item, index) => {
          return (
            <li
              className="flex gap-3 justify-between items-center text-neutral-700"
              key={index}
            >
              <div className="flex gap-3">
                {props.active?.includes(index) ?
                  <span className="text-green-400">
                    <Check />
                  </span>
                  :
                  <span className="text-red-400">
                    <X />
                  </span>
                }
                <span>
                  {item}
                </span>
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
