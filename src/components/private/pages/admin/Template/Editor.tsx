import { Editor } from '@tinymce/tinymce-react'
import { useCallback, useRef } from 'react'
import { api } from '@/lib/api'
import { useNotify } from '@/components/Toast/toast'
import { Trash } from 'lucide-react'
import DeleteModel, { DeleteRef } from '../../../../Model/Delete'
import { queryClient } from '@/provider/query.provider'
import ButtonIcon from '@/components/Buttons/ButtonIcon'
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'

interface CreateTemplateProps {
  content?: string
  templateId?: number
  name?: string
}

export function EditorTemplate({
  content,
  templateId,
  name,
}: CreateTemplateProps) {
  const editorRef = useRef<any>()
  const notify = useNotify()

  const modalDeleteRef = useRef<DeleteRef>(null)
  const handleDeleteModal = useCallback((id: string, name?: string) => {
    modalDeleteRef.current?.openModal(
      id,
      'templates',
      `Deseja deletar o template "${name}"?`,
      'templatesData',
    )
  }, [])

  async function handleCreateTemplate(
    name: string | undefined,
    content: string,
  ) {
    if (!name) return
    if (!content) return

    try {
      const response = await api.post('/templates', {
        name,
        content,
      })
      console.log(response)

      notify({ type: 'success', message: 'Template criado com sucesso' })
      queryClient.invalidateQueries('templates')
    } catch (error) {
      console.log(error)
      notify({ type: 'error', message: 'Erro ao criar template' })
    }
  }

  function handleUpdateTemplate(
    templateId: number | undefined,
    name: string | undefined,
    content: string,
  ) {
    if (!templateId) return
    if (!name) return
    if (!content) return

    api
      .put(`/templates/${templateId}`, {
        name,
        content,
      })
      .then(() => {
        notify({ type: 'success', message: 'Template atualizado com sucesso' })
        queryClient.invalidateQueries('templates')
      })
      .catch(() => {
        notify({ type: 'error', message: 'Erro ao atualizar template' })
      })
  }

  return (
    <div className="z-10 flex h-full w-full flex-col gap-2">
      <DeleteModel ref={modalDeleteRef} />

      <Editor
        id="tiny-editor-Create"
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={content}
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
            'fullpage',
          ],
          menubar: 'file edit view insert format tools table',
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat',
          templates: [
            {
              title: 'Simples',
              description: 'Cabeçalho e rodapé simples',
              content: ` <div style="font-family: Arial, sans-serif; display: flex; flex-direction: column; justify-content: space-between;
              width: 21.59cm; height: 30.85cm; position: relative;" size="A4">
                  
                  <header style="width: 100%; height: 0.8cm; background: #01eaa0; ">
                  <div  style="width: 100%; padding: 0.1cm 0.4cm; height: 100%; background: {PARTIDO_COR}; color: white; display: flex; justify-content: space-between; align-items: center;">
                   <p style="line-height: 0;">{PARTIDO_NOME}</p>
                    <p style="line-height: 0;">{DIRETORIO_SURNAME}</p>
                  </div>
                  </header>
              
                  <main style="padding: 0 4rem; height: 100%; flex: 1">Conteúdo</main>
              
                  <footer style="width: 100%; margin-top:0; height: 0.8cm; background: #01eaa0; padding-left: 0px; padding-right: 0px;  ">
                  <div  style="width: 100%; padding: 0.1cm; line-height: 0; margin-top:0; height: 100%; background: {PARTIDO_COR}; color: white; display: flex; justify-content: center;  align-items: center;">
                    <p>{DIRETORIO_ENDEREÇO} - {DIRETORIO_CNPJ} - {DIRETORIO_TELEFONE}</p>
                  </div> 
                  </footer>
                </div>`,
            },
          ],
          content_style: ` 
          header, footer{
            background-color: #01eaa0;
          }
          body{
            text-align: center;
            align-items: center;
            display: flex;
            justify-content: center;
          }
         `,
        }}
      />
      <div className="flex justify-between">
        <div className="flex gap-2">
          <ButtonPrimary
            title="Criar template"
            variant="container"
            onClick={() =>
              handleCreateTemplate(name, editorRef.current.getContent())
            }
          >
            Criar template
          </ButtonPrimary>

          <ButtonPrimary
            title="Atualizar template"
            variant="outline"
            onClick={() =>
              handleUpdateTemplate(
                templateId,
                name,
                editorRef.current.getContent(),
              )
            }
          >
            Atualizar
          </ButtonPrimary>
        </div>

        <ButtonIcon
          title="Deletar template"
          icon={<Trash size={16} />}
          className="border-none bg-red-500 text-white hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-red-500 disabled:hover:text-white"
          onClick={() => handleDeleteModal(String(templateId), name)}
          disabled={!templateId}
        />
      </div>
    </div>
  )
}
