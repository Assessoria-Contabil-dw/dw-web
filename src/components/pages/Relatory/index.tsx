'use client'
import { useRef } from 'react'
import { FormRelatory } from './FormRelatory'
import { Editor } from '@tinymce/tinymce-react'
import { api } from '@/lib/api'
// interface TinyMCEEditor {
//   getContent: () => string
//   // Adicione outras propriedades e métodos conforme necessário
// }

// const menuReport = [
//   { title: 'Procuração Partido I' },
//   { title: 'Procuração Partido II' },
//   { title: 'Procuração Individual' },
//   { title: 'Procuração Presidente' },
//   { title: 'Procuração Tesoureiro' },
//   { title: 'Parecer da Comissão Executiva' },
//   { title: 'Contrato Contabilidade' },
//   { title: 'Notas explicativas' },
//   { title: 'Contrato do Advogado' },
//   { title: 'Acordo por Assunção de Dívidas' },
// ]

interface TemplateProps {
  partido: string
  surname: string
  presidente: string
  qualificacao: string
  cidade: string
  cnpj: string
  cpf: string
  rg: string
  endereco: string
  advogado: string
}

export function RelatoryView({ ...props }: TemplateProps) {
  // const [url, setUrl] = useState<string>('')
  // const [modelType, setModelType] = useState(0)
  const editorRef = useRef<any>()

  const handleCreateTemplate = () => {
    if (editorRef.current) {
      api.post('/templates', {
        name: 'Teste',
        content: editorRef.current.getContent(),
      })
      console.log(editorRef.current.getContent())
    }
  }

  return (
    <div className="flex gap-4">
      <FormRelatory />

      <div className="flex w-full flex-[2_2_0%] flex-col">
        {/* <div className="my-2">
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
        </div> */}

        <div
        // className="h-[600px] w-full min-w-[700px] rounded-xl bg-gray-600 p-3"
        >
          {/* <iframe
            className="h-full w-full"
            // src={url}
            src="https://www.saude.go.gov.br/files/escola-saude/manual-de-uso-do-site.pdf"
          ></iframe> */}

          <Editor
            id="tiny-editor"
            apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 500,
              quickbars_selection_toolbar: true,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'code',
                'wordcount',
                'quickbars',
                'pagebreak',
                'template',
                'print',
                'table',
              ],

              menubar: 'file edit view insert format tools table print',
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | pagebreak | template | backcolor',

              templates: [
                {
                  title: 'Template 1',
                  description: 'Test 1',
                  content: `<body>
                  <header id="header"><div>Ola mundo</div></header>
                  <main> <p style="text-align: center;  padding-top: 72px; ">PROCURA&Ccedil;&Atilde;O <strong><em>AD JUDICIA ET EXTRA</em></strong></p>
                  <p style="text-align: center;">&nbsp;</p>
                  <p style="text-align: left;"><strong>OUTORGANTE:</strong></p>
                  <p style="text-align: justify;">{$PARTIDO} - {$PARTIDO_SIGLA}/{$SUR_NAME}, inscrito no CNPJ sob n. {$CNPJ}, com endere&ccedil;o para notifica&ccedil;&atilde;o&nbsp;&agrave; {$ENDERE&Ccedil;O}, neste ato representado por seu presidente, Sr(a). {$PRESIDENTE}, {$QUALIFICA&Ccedil;&Atilde;O}, inscrita no CPF sob o n. {$CPF}, residente e domiciliada &agrave;&nbsp;{$ENDERE&Ccedil;O}.</p>
                  <p style="text-align: left;">&nbsp;</p>
                  <p style="text-align: left;"><strong>OUTORGANTE</strong>:</p>
                  <p style="text-align: justify;"><strong>{$ADV_1}</strong>, portador(a) do registro {$OAB_1}, cadastrado no Minist&eacute;rio da Fazenda sob n. {$CPF_1}, e-mail: {$EMAIL} e <strong>{$ADV_2}</strong>, portador(a) do registro {$OAB_2}, inscrito no CPF sob n.&nbsp;{$CPF_2}, ambos com endere&ccedil;o profissional situado na {$END_2}, e- mail: {$EMAIL_2},&nbsp;conferindo- lhes os poderes da cl&aacute;usula <strong><em>"ad judicia et extra"</em></strong> para em qualquer&nbsp;inst&acirc;ncia ou tribunal defenderem os seus interesses, propor a&ccedil;&atilde;o, nela podendo&nbsp;contestar, reconvir, recorrer e impetrar mandados, acompanhando os processos at&eacute; o&nbsp;seu tr&acirc;nsito final, confere tamb&eacute;m os poderes especiais para desistir, renunciar a&nbsp;direito em que se funda&ccedil;&atilde;o, transigir, acordar, firmar termos e compromissos, prestar declara&ccedil;&atilde;o, receber e quitar, juntar e desentranhar documentos, requerer&nbsp;administrativamente ou judicialmente o que de direito, bem como substabelecer o&nbsp;presente mandato com ou sem reserva a pessoa de confian&ccedil;a.</p>
                  <p style="text-align: justify;">&nbsp;</p>
                  <p style="text-align: justify;">&nbsp;</p>
                  <p style="text-align: right;">{$DATA}, {$LOCAL}</p>
                  <p style="text-align: center;">&nbsp;</p>
                  <pre style="text-align: center; display: relative;">
                  <img style="display: absolute; transform: translateY(50%); margin-left: auto; margin-right: auto;" src="https://upload.wikimedia.org/wikipedia/commons/4/42/Assinatura_de_Fernando_Henrique_Cardoso_-_vers%C3%A3o_3.svg" width="194" height="90">  
                  <br>_________________________________________</pre>
                  <p style="text-align: center;">{$PRESIDENTE} - Presidente</p>     
                  </main>
                  </body`,
                },
              ],
              template_replace_values: {
                // PARTIDO: props.partido,
                // PARTIDO_SIGLA: 'Teste',
                // SUR_NAME: props.surname,
                // PRESIDENTE: 'Teste',
                // QUALIFICAÇÃO: 'Teste',
                // CIDADE: 'Teste',
                // CNPJ: 'Teste',
                // CPF: 'Teste',
                // RG: 'Teste',
                // ENDERECO: 'Teste',
                // ADVOGADO: 'Teste',
                // OAB: 'Teste',
                // EMAIL: 'Teste',
              },
              content_style: ` @media print {
                #header, 
                #footer {
                  color: red !important;
                  background-color: red !important;
                }
                body{
                  -webkit-print-color-adjust:exact !important;
                  print-color-adjust:exact !important;
                }
                @page {
                  size: auto;
                  margin: 0;
              }
                main{ padding: 0 4rem; }
                #header{ position: fixed; top: 0; r  }
              }`,
            }}
          />
          <button
            className="w-fit border-[1px]  border-gray-200 bg-white text-gray-700"
            type="button"
            onClick={handleCreateTemplate}
          >
            Criar Template
          </button>
        </div>

        {/* <div className="my-8 flex flex-row items-center justify-end gap-3">
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
        </div> */}
      </div>
    </div>
  )
}
