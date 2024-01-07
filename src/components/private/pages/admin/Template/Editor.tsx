import { Editor } from '@tinymce/tinymce-react'
import { useCallback, useRef } from 'react'
import { Trash } from 'lucide-react'
import DeleteModel, { DeleteRef } from '../../../../Model/Delete'
import ButtonIcon from '@/components/Buttons/ButtonIcon'
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'
import { useTemplateCreate, useTemplateUpdate } from '@/hooks/useTemplate'

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

  console.log(editorRef.current?.getContent())
  const { isLoading: loadingUpdate, refetch: refetchUpdate } =
    useTemplateUpdate(editorRef.current?.getContent(), templateId, name)

  const { isLoading: loadingCreate, refetch: refetchCreate } =
    useTemplateCreate(name, editorRef.current?.getContent())

  const modalDeleteRef = useRef<DeleteRef>(null)
  const handleDeleteModal = useCallback((id: string, name?: string) => {
    modalDeleteRef.current?.openModal(
      id,
      'templates',
      `Deseja deletar o template "${name}"?`,
      'templateData',
    )
  }, [])

  async function handleCreate() {
    console.log(editorRef.current?.getContent(), templateId, name)
    await refetchCreate()
  }

  async function handleUpdate() {
    console.log(editorRef.current?.getContent(), templateId, name)
    await refetchUpdate()
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
              content: `
              <div
              style="font-family: Arial, sans-serif; display: flex; flex-direction: column; justify-content: space-between; width: 50rem; height: 62.5rem; position: relative;">
              <header
                  style="width: 100%; height: 3rem; background: #d0d0d0;">
                  <div
                      style="width: 100%; height: 100%; color: white; display: flex; align-items: center; background: PARTIDO_COR;">
                     <div style="margin: 0rem 3rem; width: 100%; height: 100%;  display: flex; justify-content: space-between; align-items: center;">
                          <p style="line-height: 0;">{PARTIDO_NOME}</p>
                          <p style="line-height: 0;">{DIRETORIO_SURNAME}</p>
                     </div>
                  </div>
              </header>
              
              <main style="padding: 0 4rem; height: 100%; flex: 1;">
                 Conteúdo
              </main>
              <footer
                  style="width: 100%; height: 3rem; background: #d0d0d0;">
                  <div
                      style="color: white; background: PARTIDO_COR;">
                      <div style="margin: 0rem 3rem; text-align: center;">
                          <p>{DIRETORIO_ENDERE&Ccedil;O} - {DIRETORIO_CNPJ} -
                              {DIRETORIO_TELEFONE}</p>
                      </div>
                    
                  </div>
              </footer>
              </div>
              `,
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
            loading={loadingCreate}
            onClick={handleCreate}
          >
            Criar template
          </ButtonPrimary>

          <ButtonPrimary
            title="Atualizar template"
            variant="outline"
            loading={loadingUpdate}
            onClick={handleUpdate}
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
