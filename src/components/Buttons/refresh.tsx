import { queryClient } from '@/services/providers'
import { RotateCcw } from 'lucide-react'

interface RefreshProps {
  queryName: string
}

export function RefreshButton({ queryName }: RefreshProps) {
  async function handleRefreshData() {
    console.log('refresh')
    await queryClient.invalidateQueries([queryName])
  }

  return (
    <button
      type="button"
      onClick={handleRefreshData}
      className="w-fit border-[1px]  border-gray-200 bg-white text-gray-700"
    >
      <RotateCcw className="w-4" />
      Atualizar
    </button>
  )
}
