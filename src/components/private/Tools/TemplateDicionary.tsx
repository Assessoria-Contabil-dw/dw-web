import { Copy } from 'lucide-react'

export default function TemplateDicionary() {
  const dictionary = [
    {
      informações: ['DATA', 'LOCAL', 'DATA_ANO', 'DATA_INICIAL', 'DATA_FINAL'],
    },
    {
      partido: ['PARTIDO_NOME', 'PARTIDO_SIGLA'],
    },
    {
      diretório: [
        'DIRETORIO_SURNAME',
        'DIRETORIO_SURNAME_EXTENSO',
        'DIRETORIO_CNPJ',
        'DIRETORIO_ENDEREÇO',
        'DIRETORIO_CIDADE',
        'DIRETORIO_UF',
      ],
    },
    {
      presidente: [
        'PRESIDENTE_NOME',
        'PRESIDENTE_QUALIFICAÇÃO',
        'PRESIDENTE_CPF',
        'PRESIDENTE_ENDEREÇO',
        'PRESIDENTE_TITULO',
        'PRESIDENTE_RG',
      ],
    },
    {
      vice: [
        'VICE_NOME',
        'VICE_QUALIFICAÇÃO',
        'VICE_CPF',
        'VICE_ENDEREÇO',
        'VICE_TITULO',
        'VICE_RG',
      ],
    },
    {
      tesoureiro: [
        'TESOUREIRO_NOME',
        'TESOUREIRO_QUALIFICAÇÃO',
        'TESOUREIRO_CPF',
        'TESOUREIRO_TITULO',
        'TESOUREIRO_ENDEREÇO',
        'TESOUREIRO_RG',
      ],
    },
    {
      advogados: [
        'ADV_1_NOME',
        'ADV_1_OAB',
        'AVD_1_CPF',
        'ADV_1_EMAIL',
        'ADV_1_ENDEREÇO',
        'ADV_2_NOME',
        'ADV_2_OAB',
        'ADV_2_CPF',
        'ADV_2_EMAIL',
        'ADV_2_ENDEREÇO',
      ],
    },
  ]

  function copyPassword(index: string) {
    const password = document.querySelector(`#${index}`) as HTMLSpanElement
    navigator.clipboard.writeText(password.innerText)
  }

  return (
    <fieldset className="h-full w-full rounded-lg border-[1px] bg-white p-1">
      <div className="h-full w-full space-y-2 overflow-y-auto overflow-x-hidden p-3">
        {dictionary.map((table, index) => (
          <table key={index}>
            <thead>
              <tr>
                <th className="text-left">{Object.keys(table)}</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(table).map((value, index) =>
                value.map((value: any, index: number) => (
                  <tr key={index}>
                    <td className="group mr-0 flex cursor-text items-center justify-start gap-2">
                      <span
                        id={`${Object.keys(table)}_${index.toString()}`}
                        className="text-span uppercase"
                      >
                        {value}
                      </span>
                      <button
                        onClick={() =>
                          copyPassword(
                            `${Object.keys(table)}_${index.toString()}`,
                          )
                        }
                        className="h-full  opacity-0 group-hover:opacity-100"
                      >
                        <Copy
                          size={12}
                          className="cursor-pointer text-slate-500 transition-colors duration-100 hover:text-secondHover"
                        />
                      </button>
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        ))}
      </div>
    </fieldset>
  )
}
