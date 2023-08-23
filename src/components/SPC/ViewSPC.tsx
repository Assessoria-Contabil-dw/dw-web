import { DirectoryProps } from '@/lib/types'
import { X } from 'lucide-react'

interface ViewSPCModalProps {
  isOpen: boolean
  onClose: () => void
  //   data: DirectoryProps
}

export function ViewSPC({ onClose, isOpen }: ViewSPCModalProps) {
  if (!isOpen) {
    return null
  }
  function handleCloseModal() {
    onClose()
  }

  return (
    <div className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <div className="flex w-full items-start justify-between border-b-[1px]">
          <div>
            <h4>Cadastrar PCA</h4>
            <span>Cadastre um novo pca de um diretório</span>
          </div>
          <button
            onClick={handleCloseModal}
            className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        <ul>
          <li>ola</li>
        </ul>
      </div>
    </div>
  )
}
