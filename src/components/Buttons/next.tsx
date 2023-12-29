'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { LoadingSecond } from '../Loading/second'

export interface PaddingProps {
  prevPage: () => void
  nextPage: () => void
  page: number
  pages: number
  isPreviousData: boolean
  next: boolean | null
  isFetching: boolean
}

export const PaddingButtons = ({
  page,
  pages,
  isPreviousData,
  next,
  isFetching,
  nextPage,
  prevPage,
}: PaddingProps) => {
  return (
    <div className="z-1 flex w-fit items-center space-x-2">
      <button
        className="button-arrow"
        onClick={() => prevPage()}
        disabled={page === 0}
      >
        <ChevronLeft size={18} />
      </button>
      <span>{pages === 1 ? 1 : page + 1 + '...' + pages}</span>
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
      {isFetching ? (
        <span>
          <LoadingSecond />
        </span>
      ) : null}
    </div>
  )
}
