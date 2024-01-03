import { queryClient } from '@/provider/query.provider'
import { RotateCcw } from 'lucide-react'
import { LoadingSecond } from '../Loading/second'
import { ButtonHTMLAttributes } from 'react'
import ButtonPrimary from './ButtonPrimary'

interface RefreshProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  queryName: string
  isLoading?: boolean
}

export function RefreshButton({ queryName, isLoading, ...atr }: RefreshProps) {
  async function handleRefreshData() {
    await queryClient.invalidateQueries([queryName])
  }

  return (
    <ButtonPrimary
      title="Atualizar dados"
      variant="outline"
      type="button"
      startIcon={
        isLoading ? <LoadingSecond /> : <RotateCcw className="h-fit w-4" />
      }
      onClick={handleRefreshData}
      className="h-9 font-montserrat text-xs"
      {...atr}
    >
      Atualizar
    </ButtonPrimary>
  )
}
