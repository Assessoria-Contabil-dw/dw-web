'use client'
import { useState } from 'react'
import { FormDocument } from './Form'
import { ViewDocuments } from './View'
import EditorDocument from './Editor'

interface DocumentProps {
  content?: string
}

export function DocumentsView() {
  const [formData, setFormData] = useState<DocumentProps>({} as DocumentProps)
  const [isEditor, setIsEditor] = useState(false)

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
    <div className="mb-8 flex h-full gap-4">
      {isEditor ? (
        <EditorDocument
          onSubmit={handleSaveEditorDocument}
          content={formData.content}
        />
      ) : (
        <ViewDocuments onClick={handleEditor} content={formData.content} />
      )}

      <FormDocument content={formData.content} onSubmit={handleFormSubmit} />
    </div>
  )
}
