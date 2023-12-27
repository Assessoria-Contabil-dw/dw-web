import { LoadingSecond } from '@/components/Loading/second'
import { api } from '@/lib/api'
import { Edit2Icon } from 'lucide-react'
import { useQuery } from 'react-query'

interface TemplateProps {
  content?: string
  onClick?: () => void
}

export function ViewDocuments({ content, onClick }: TemplateProps) {
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

      window.open(blobURL, '_blank')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleButtonClick = () => {
    refetch()
  }

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="h-[500px] w-full rounded-md border-[1px] bg-white p-1">
        {content ? (
          <div
            id="printArea"
            className="relative right-0 top-0 m-0 flex h-full w-full justify-center overflow-y-auto"
            dangerouslySetInnerHTML={{
              __html: `${content}`,
            }}
          />
        ) : (
          <div className="p-4">
            <span>Selecione um modelo de documento</span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          disabled={isFetching}
          className="button-primary"
          onClick={handleButtonClick}
        >
          {isFetching && <LoadingSecond />}
          Gerar PDF
        </button>
        <button onClick={onClick} className="button-tertiary">
          <Edit2Icon size={20} />
        </button>
      </div>
    </div>
  )
}
