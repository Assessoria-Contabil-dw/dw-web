import { queryClient } from '@/provider/query.provider'
import { RotateCcw } from 'lucide-react'
import { LoadingSecond } from '../Loading/second'
import { ButtonHTMLAttributes } from 'react'

interface RefreshProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  queryName: string
  isLoading?: boolean
}

export function RefreshButton({ queryName, isLoading, ...atr }: RefreshProps) {
  async function handleRefreshData() {
    await queryClient.invalidateQueries([queryName])
  }

  return (
    <button
      type="button"
      onClick={handleRefreshData}
      className="button-icon flex h-fit items-center gap-2 font-montserrat text-xs font-semibold "
      {...atr}
    >
      {isLoading ? <LoadingSecond /> : <RotateCcw className="h-fit w-4" />}
      Atualizar
    </button>
  )
}
