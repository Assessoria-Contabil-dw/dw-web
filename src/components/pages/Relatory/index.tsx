'use client'
import { useState } from 'react'
import { FormRelatory } from './FormRelatory'

const menuReport = [
  { title: 'Procuração Partido I' },
  { title: 'Procuração Partido II' },
  { title: 'Procuração Individual' },
  { title: 'Procuração Presidente' },
  { title: 'Procuração Tesoureiro' },
  { title: 'Parecer da Comissão Executiva' },
  { title: 'Contrato Contabilidade' },
  { title: 'Notas explicativas' },
  { title: 'Contrato do Advogado' },
  { title: 'Acordo por Assunção de Dívidas' },
]

export function RelatoryView() {
  // const [url, setUrl] = useState<string>('')
  const [modelType, setModelType] = useState(0)

  return (
    <div className="flex gap-4">
      <FormRelatory />

      <div className="flex w-full flex-[2_2_0%] flex-col">
        <div className="my-2">
          {menuReport.map((item, key) => {
            return (
              <button
                key={key}
                className={`float-left flex h-auto w-auto cursor-pointer items-center rounded-none border-b-2 bg-transparent  px-2 py-1 text-left text-[10px] font-normal tracking-widest 
                hover:text-primary
                ${
                  modelType === key
                    ? 'border-b-2 border-solid border-primary text-primary opacity-100 hover:text-primary'
                    : 'border-transparent text-gray-600 opacity-60 '
                }`}
                onClick={(e) => setModelType(key)}
              >
                {item.title}
              </button>
            )
          })}
        </div>

        <div className="h-[600px] w-full min-w-[700px] rounded-xl bg-gray-600 p-3">
          <iframe
            className="h-full w-full"
            // src={url}
            src="https://www.saude.go.gov.br/files/escola-saude/manual-de-uso-do-site.pdf"
          ></iframe>
        </div>

        <div className="my-8 flex flex-row items-center justify-end gap-3">
          <button
            className="w-fit border-[1px]  border-gray-200 bg-white text-gray-700"
            // onClick={getDownload}
          >
            Baixar
          </button>
          <button
            className="w-fit border-[1px]  border-gray-200 bg-white text-gray-700"
            // onClick={getOpen}
          >
            Abrir
          </button>
          <button
            className="w-fit border-[1px]  border-gray-200 bg-white text-gray-700"
            // onClick={getPrint}
          >
            Imprimir
          </button>
        </div>
      </div>
    </div>
  )
}
