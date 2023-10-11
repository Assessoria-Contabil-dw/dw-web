'use client'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const ButtomBack = () => {
  const router = useRouter()

  function handleBack() {
    router.back()
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="w-fit rounded-md border border-slate-200 p-2 text-slate-700"
    >
      <ChevronLeft size={24} />
    </button>
  )
}
