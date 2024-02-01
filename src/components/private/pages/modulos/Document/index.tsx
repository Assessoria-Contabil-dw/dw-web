'use client'
import { useState } from 'react'
import { FormDocument } from './Form'
import { ViewDocuments } from './View'
import EditorDocument from './Editor'
import ActiveOptionsDocument from './ActiveOptions'
import Dicionary from '@/components/private/Tools/Dicionary'

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
      <div className="h-full w-full flex-1 ">
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

      <div className="max-h-[80%] min-h-fit w-3/12 space-y-2 max-xl:min-w-[200px] ">
        <ActiveOptionsDocument option={option} setOption={setOption} />
        <FormDocument
            className={option === 1 ? 'block' : 'hidden'}
            onSetUrl={setUrlPDF}
            editor={isEditor}
            content={formData.content}
            onSubmit={handleFormSubmit}
          />
        <Dicionary className={option === 2 ? 'block' : 'hidden'}/>
      </div>
    </div>
  )
}
