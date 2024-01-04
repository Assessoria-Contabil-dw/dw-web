import { Edit3, Eye, Trash2 } from 'lucide-react'
import { ReactNode } from 'react'

interface TableOptionsProps {
  role: string

  isView: boolean
  isEdit: boolean
  isDelete: boolean

  handleView?: () => void
  handleEdit?: () => void
  handleDelete?: () => void
  children?: ReactNode
}

export function TableOptions({
  role,
  isView,
  isEdit,
  isDelete,
  handleView,
  handleEdit,
  handleDelete,
  children,
}: TableOptionsProps) {
  if (role === '') {
    return null
  }

  return (
    <div className="flex h-6 w-full items-center justify-end">
      {isView && (
        <button
          onClick={handleView}
          type="button"
          className="h-full px-1 hover:text-blue-500"
        >
          <Eye size={16} />
        </button>
      )}
      {isEdit && role === 'ADMIN' && (
        <button
          onClick={handleEdit}
          type="button"
          className="h-full px-1 hover:text-primary"
        >
          <Edit3 size={16} />
        </button>
      )}
      {isDelete && role === 'ADMIN' && (
        <button
          onClick={handleDelete}
          type="button"
          className="h-full px-1 hover:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      )}
      {children}
    </div>
  )
}
