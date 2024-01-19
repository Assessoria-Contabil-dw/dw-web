'use client'
import { useState } from 'react'
import { ViewDocuments } from './View'
import EditorDocument from './Editor'
import TemplateDicionary from '@/components/private/Tools/TemplateDicionary'

interface DocumentProps {
  content?: string
}

export function Relatory() {
  const [formData, setFormData] = useState<DocumentProps>({} as DocumentProps)
  const [isEditor, setIsEditor] = useState(false)

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
          <ViewDocuments onClick={handleEditor} content={formData.content} />
        )}
      </div>

      <div className="h-[72%] w-3/12 space-y-2 max-xl:min-w-[200px] ">
       <TemplateDicionary/>
      </div>
    </div>
  )
}
