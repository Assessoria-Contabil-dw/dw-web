'use client'
import { VigencyTable } from '@/components/Vigency/'
import { useParams } from 'next/navigation'

export default function Vigency() {
  const params = useParams()
  const { id } = params
  return (
    <>
      <VigencyTable directoryId={id.toString()} />
    </>
  )
}
