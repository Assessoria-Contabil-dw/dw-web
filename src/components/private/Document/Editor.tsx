'use client'
import { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { LoadingSecond } from '@/components/Loading/second'
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'

interface EditorDocumentProps {
  content?: string
  onSubmit: (data: any) => void
}
export default function EditorDocument({
  content,
  onSubmit,
}: EditorDocumentProps) {
  const [loading, setLoading] = useState(true)
  const editorRef = useRef<any>()

  const handleEditorInit = (evt: any, editor: any) => {
    editorRef.current = editor
    setLoading(false)
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {loading && (
        <div className="flex h-full w-full items-center justify-center ">
          <LoadingSecond />
        </div>
      )}

      <Editor
        id="tiny-editor"
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        onInit={handleEditorInit}
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
            'template',
            'print',
          ],

          menubar: 'file edit view insert format',
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat ',

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

      {!loading && (
        <ButtonPrimary
          title="Salvar documento"
          variant="outline"
          className="w-fit "
          type="button"
          disabled={loading}
          onClick={() => onSubmit({ content: editorRef.current.getContent() })}
        >
          Salvar
        </ButtonPrimary>
      )}
    </div>
  )
}
