import ButtonIcon from '@/components/Buttons/ButtonIcon'
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'
import { api } from '@/lib/api'
import { Edit2Icon } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from 'react-query'

interface TemplateProps {
  content?: string
  onClick?: () => void
  url: string
  onSetUrl: (data: string) => void
}

export function ViewDocuments({ content, onClick, url, onSetUrl }: TemplateProps) {

  const { isFetching, refetch } = useQuery('linkPdf', generatePDF, {
    retry: 1,
    keepPreviousData: true,
    enabled: false,
  })

  async function generatePDF() {
    try {
      if (!content) return
      const printArea = document.getElementById('printArea')

      const pdfResponse = await api.post(
        '/templates/pdf',
        { contentHtml: printArea?.innerHTML },
        {
          responseType: 'arraybuffer',
        },
      )

      const blob = new Blob([pdfResponse.data], { type: 'application/pdf' })
      const blobURL = URL.createObjectURL(blob)
      
      onSetUrl(blobURL)
      // window.open(blobURL, '_blank')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleButtonClick = () => {
    refetch()
  }

  return (
    <div className="flex h-full w-full flex-col gap-2 ">
      <div className="h-full w-full rounded-md border-[1px] bg-white p-1">
        {content ? (
          url ? (
            <iframe
              src={url}
              className="relative right-0 top-0 m-0 flex h-full w-full justify-center overflow-y-auto"
            />
          ) :(
          <div
            id="printArea"
            className="relative right-0 top-0 m-0 flex h-full w-full justify-center overflow-y-auto"
            dangerouslySetInnerHTML={{
              __html: `${content}`,
            }}
          />)
        ) : (
          <div className="p-3">
            <span className="font-inter text-sm text-slate-400">
              Selecione um modelo de documento
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-2 pb-4">
        <ButtonPrimary
          title="Gerar PDF"
          variant="fill"
          loading={isFetching}
          onClick={handleButtonClick}
        >
          Gerar PDF
        </ButtonPrimary>
        <ButtonIcon
          icon={<Edit2Icon size={20} />}
          title="Editar"
          onClick={onClick}
          className="h-10 w-10"
        />
      </div>
    </div>
  )
}
