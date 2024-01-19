'use client'
import { useState } from 'react'
import { FormDocument } from './Form'
import { ViewDocuments } from './View'
import EditorDocument from './Editor'
import ActiveOptionsDocument from './ActiveOptions'
import TemplateDicionary from '@/components/private/Tools/TemplateDicionary'

interface DocumentProps {
  content?: string
}

export function DocumentsView() {
  const [formData, setFormData] = useState<DocumentProps>({} as DocumentProps)
  const [isEditor, setIsEditor] = useState(false)
  const [option, setOption] = useState(1)
  const [urlPDF, setUrlPDF] = useState('')

  const handleFormSubmit = (data: DocumentProps) => {

    setFormData(data)
  }

  const handleSaveEditorDocument = (data: DocumentProps) => {
    setFormData(data)
    setIsEditor((old) => !old)
  }

  const handleEditor = () => {
    setIsEditor((old) => !old)
  }

  return (
    <div className="flex h-full w-full gap-4 ">
      <div className="h-[800px] w-full flex-1 ">
        {isEditor ? (
          <EditorDocument
            onSubmit={handleSaveEditorDocument}
            content={formData.content}
          />
        ) : (
          <ViewDocuments 
            onSetUrl={setUrlPDF}
            url={urlPDF} 
            onClick={handleEditor} 
            content={formData.content} 
            />
        )}
      </div>

      <div className="h-2/3 w-3/12 space-y-2 max-xl:min-w-[200px] ">
        <ActiveOptionsDocument option={option} setOption={setOption} />
        {option === 1 && (
          <FormDocument
            onSetUrl={setUrlPDF}
            editor={isEditor}
            content={formData.content}
            onSubmit={handleFormSubmit}
          />
        )}
        {option === 2 && <TemplateDicionary />}
      </div>
    </div>
  )
}
