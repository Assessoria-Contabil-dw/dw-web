import { Editor } from '@tinymce/tinymce-react'
import CreateTemplateModel, {
  CreateTemplateRef,
} from '@/components/Model/CreateTemplate'
import { useRef } from 'react'

export function CreateTemplate() {
  const editorRef = useRef<any>()

  const modelCreateTemplateRef = useRef<CreateTemplateRef>(null)
  const handleCreateTemplateModal = () => {
    console.log(editorRef.current.getContent())
    modelCreateTemplateRef.current?.openModal(editorRef.current.getContent())
  }

  return (
    <div>
      <CreateTemplateModel ref={modelCreateTemplateRef} />

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
        onClick={handleCreateTemplateModal}
      >
        Criar Template
      </button>
    </div>
  )
}
