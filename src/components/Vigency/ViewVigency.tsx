'use client'
import { api } from '@/lib/api'
import { VigencyProps } from '@/lib/types'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

// type VigencyFormData = z.infer<typeof virgenciesFormSchema>

interface RegisterDirectoryModalProps {
  isOpen: boolean
  onClose: () => void
  vigencyId: string
}

export function ViewVigency({
  onClose,
  isOpen,
  vigencyId,
}: RegisterDirectoryModalProps) {
  const [vigencyData, setVigency] = useState<VigencyProps | null>(null)

  async function handleVigency(id: string) {
    try {
      const response = await api.get(`/vigencies/${id}`)
      setVigency(response.data)
    } catch (error) {
      console.log('Não foi possível carregar as vigências')
    }
  }
  useEffect(() => {
    handleVigency(vigencyId)
  }, [vigencyData])

  if (!isOpen) {
    return null
  }

  function handleCloseModal() {
    onClose()
  }

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <fieldset className="flex w-full flex-col items-start justify-between border-b-[1px]">
          <div className="flex w-full justify-between">
            <div>
              <h4>
                Vigência {vigencyData?.dateFirst} - {vigencyData?.dateLast}
              </h4>
              <span>Cadastre uma vigência</span>
            </div>
            <button
              onClick={handleCloseModal}
              className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          <div>
            <ul>
              <li>Data inicial:</li>
              <li>Data final:</li>
              <li>Diretório:</li>
              <li>Imagem</li>
              <li>Presidente:</li>
              <li>Vice-presidente</li>
              <li>Tesoureiro</li>
            </ul>
            <ul>
              <li>Advogados</li>
            </ul>
          </div>
        </fieldset>
      </div>
    </div>
  )
}
