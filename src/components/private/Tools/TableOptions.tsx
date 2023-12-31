import { Edit3, Eye, Trash2 } from 'lucide-react'

interface TableOptionsProps {
  role: string

  isView: boolean
  isEdit: boolean
  isDelete: boolean

  handleView?: () => void
  handleEdit?: () => void
  handleDelete?: () => void
}

export function TableOptions({
  role,
  isView,
  isEdit,
  isDelete,
  handleView,
  handleEdit,
  handleDelete,
}: TableOptionsProps) {
  if (role === '') {
    return null
  }

  return (
    <div className="flex h-6 w-fit items-center">
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
    </div>
  )
}
