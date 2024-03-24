import ButtonPrimary from '@/components/Buttons/ButtonPrimary'
import { LoadingSecond } from '@/components/Loading/second'
import { queryClient } from '@/provider/query.provider'
import { RotateCcw } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  queryName: string
  isLoading?: boolean
}

export default function RefreshButton({ queryName, isLoading, ...atr }: ButtonsProps) {
  async function handleRefreshData() {
    await queryClient.invalidateQueries([queryName])
  }

  return (
    <ButtonPrimary
      title="Atualizar dados"
      variant="outline"
      type="button"
      startIcon={isLoading ? <LoadingSecond /> : <RotateCcw size={16} />}
      onClick={handleRefreshData}
      {...atr}
    >
      Atualizar
    </ButtonPrimary>
  )
}
