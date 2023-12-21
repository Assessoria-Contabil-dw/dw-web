import { queryClient } from '@/provider/query.provider'
import { RotateCcw } from 'lucide-react'
import { LoadingSecond } from '../Loading/second'

interface RefreshProps {
  queryName: string
  isLoading?: boolean
}

export function RefreshButton({ queryName, isLoading }: RefreshProps) {
  async function handleRefreshData() {
    await queryClient.invalidateQueries([queryName])
  }

  return (
    <button
      type="button"
      onClick={handleRefreshData}
      className="w-fit border-[1px] border-gray-200 bg-white text-gray-700"
    >
      {isLoading ? <LoadingSecond /> : <RotateCcw className="w-4" />}
      Atualizar
    </button>
  )
}
