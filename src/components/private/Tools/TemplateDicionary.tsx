import { Copy } from 'lucide-react'

export default function TemplateDicionary() {
  const dictionary = [
    {
      informações: [
        'DATA_EMISSAO',
        'DATA_EMISSAO_EXTENSO',
        'DATA_EMISSAO_ANO',
        'CIDADE_UF',
        'DATA_VIGENCIA_INICIAL',
        'DATA_VIGENCIA_FINAL',
      ],
    },
    {
      partido: [
        'PARTIDO_NUMERO',
        'PARTIDO_NOME',
        'PARTIDO_SIGLA',
        'PARTIDO_COR',
        'PARTIDO_LOGO',
      ],
    },
    {
      diretório: [
        'DIRETORIO_SURNAME',
        'DIRETORIO_SURNAME_EXTENSO',
        'DIRETORIO_CNPJ',
        'DIRETORIO_ENDERECO',
        'DIRETORIO_CIDADE',
        'DIRETORIO_UF',
        'DIRETORIO_EMAIL',
        'DIRETORIO_TELEFONE',
        'DIRETORIO_TIPO_DE_ORGANIZACAO',
      ],
    },
    {
      presidente: [
        'PRESIDENTE_NOME',
        'PRESIDENTE_CPF',
        'PRESIDENTE_RG',
        'PRESIDENTE_TITULO',
        'PRESIDENTE_QUALIFICACAO',
        'PRESIDENTE_NASCIMENTO',
        'PRESIDENTE_ENDERECO',
        'PRESIDENTE_TELEFONE',
        'PRESIDENTE_EMAIL',
        'PRESIDENTE_CARGO',
        'PRESIDENTE_ASSINATURA',
      ],
    },
    {
      vice: [
        'VICE_NOME',
        'VICE_ASSINATURA',
        'VICE_QUALIFICACAO',
        'VICE_CPF',
        'VICE_ENDERECO',
        'VICE_TITULO',
        'VICE_RG',
        'VICE_TELEFONE',
        'VICE_EMAIL',
        'VICE_NASCIMENTO',
        'VICE_CARGO',
      ],
    },
    {
      tesoureiro: [
        'TESOUREIRO_NOME',
        'TESOUREIRO_QUALIFICACAO',
        'TESOUREIRO_CPF',
        'TESOUREIRO_TITULO',
        'TESOUREIRO_ENDERECO',
        'TESOUREIRO_RG',
        'TESOUREIRO_ASSINATURA',
        'TESOUREIRO_TELEFONE',
        'TESOUREIRO_EMAIL',
        'TESOUREIRO_NASCIMENTO',
        'TESOUREIRO_CARGO',
      ],
    },
    {
      advogados: [
        'ADV_1_NOME',
        'ADV_1_OAB',
        'ADV_1_NASCIMENTO',
        'AVD_1_TITULO',
        'AVD_1_CPF',
        'ADV_1_EMAIL',
        'ADV_1_TELEFONE',
        'ADV_1_ENDERECO',
        'ADV_1_ASSINATURA',
        'ADV_1_STATUS',

        'ADV_2_NOME',
        'ADV_2_OAB',
        'ADV_2_NASCIMENTO',
        'AVD_2_TITULO',
        'ADV_2_CPF',
        'ADV_2_EMAIL',
        'ADV_2_ENDERECO',
        'ADV_2_TELEFONE',
        'ADV_2_ASSINATURA',
        'ADV_2_STATUS',
      ],
    },
  ]

  function copyPassword(index: string) {
    const password = document.querySelector(`#${index}`) as HTMLSpanElement
    navigator.clipboard.writeText('${' + `${password.innerText}` + '}')
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
