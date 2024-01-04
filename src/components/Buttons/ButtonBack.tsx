'use client'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ButtonIcon from './ButtonIcon'

export const ButtomBack = () => {
  const router = useRouter()

  function handleBack() {
    router.back()
  }

  return (
    <ButtonIcon
      type="button"
      title="Voltar"
      icon={<ChevronLeft size={20} />}
      onClick={handleBack}
    />
  )
}
