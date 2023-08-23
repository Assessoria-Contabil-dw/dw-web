import { api } from '@/lib/api'
import { DirectorySPCProps } from '@/lib/types'
import { useEffect, useState } from 'react'

interface UpdateDirectoryProps {
  id: number
  isOpen: boolean
  onClose: () => void
}
export function UpdateDirectory({ id, onClose, isOpen }: UpdateDirectoryProps) {
  // listar as spcs e permitir a edição individual de cada

  // listar
  const [directory, setDirectory] = useState<DirectorySPCProps[]>([])

  useEffect(() => {
    api.get(`/spcs/${id}`).then((response) => {
      setDirectory(response.data)
    })
  }, [])

  return (
    <div className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        {directory.map((directory) => (
          <h2 key={directory.id}>{directory.party}</h2>
        ))}
      </div>
    </div>
  )
}
