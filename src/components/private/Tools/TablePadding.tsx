import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface PaddingProps {
  prevPage: () => void
  nextPage: () => void
  page: number
  pages: number
  isPreviousData: boolean
  next: boolean | null
}

export default function PaddingTable({
  page,
  pages,
  isPreviousData,
  next,
  nextPage,
  prevPage,
}: PaddingProps) {
  if (pages === 0) {
    return null
  }

  return (
    <div className="z-1 flex w-fit items-center space-x-2">
      <button
        className="button-arrow"
        onClick={() => prevPage()}
        disabled={page === 1}
      >
        <ChevronLeft size={18} />
      </button>
      <span className="text-span">{page + '...' + pages}</span>
      <button
        className="button-arrow"
        onClick={() => {
          if (!isPreviousData && next) {
            nextPage()
          }
        }}
        disabled={isPreviousData || !next}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
