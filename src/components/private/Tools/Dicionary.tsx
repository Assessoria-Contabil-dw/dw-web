interface DictionaryProps {
  className?: string
}

export default function Dicionary({ className }: DictionaryProps) {
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

  const onDragStart = (event: any) => {
    event.dataTransfer.setData('text/html', 
    `${"${" + event.target.textContent + "}"}`);
  };

  return (
    <div className={`h-full w-full rounded-lg border-[1px] bg-white p-2 ${className}`}>
      <div className="h-full w-full space-y-2 overflow-auto p-1">
        {dictionary.map((table, index) => (
          <table key={index}>
            <thead>
              <tr>
                <th className="text-left border-none">{Object.keys(table)}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                  {Object.values(table).map((value, index) =>
                value.map((value: any, index: number) => (
                      <div
                      key={index}
                        draggable="true"
                        onDragStart={(event)=> onDragStart(event)}
                        id={`${Object.keys(table)}_${index.toString()}`}
                        className="float-left m-1 uppercase cursor-move text-slate-400 
                        hover:text-slate-600 bg-white w-fit py-1 px-2 rounded-md 
                        border-[1px] transition-all duration-100
                        hover:shadow-sm hover:transition-all hover:duration-100"
                      >
                        {value}
                      </div>
                      )),
                    )}
                  </div>
                </td>
              </tr>
             
            </tbody>
          </table>
        ))}
      </div>
    </div>
  )
}
