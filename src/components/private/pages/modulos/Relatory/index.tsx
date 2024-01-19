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

export function Relatory() {
  const [formData, setFormData] = useState<DocumentProps>({} as DocumentProps)
  
  const handleSaveEditorDocument = (data: DocumentProps) => {
    setFormData(data)
  }

  return (
    <div className="flex h-full w-full gap-4 ">
      <EditorDocument
            onSubmit={handleSaveEditorDocument}
            content={formData.content}
          />

      <div className="h-[72%] w-3/12 space-y-2 max-xl:min-w-[200px] ">
       <TemplateDicionary/>
      </div>
    </div>
  )
}
