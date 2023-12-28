'use client'
import { VigencyTable } from '@/components/pages/Vigency'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function VigencyPage() {
  const params = useParams()
  const { id } = params

  useEffect(() => {
    if (id) {
      console.log(id)
    }
  }, [id])

  return <VigencyTable directoryId={id.toString()} />
}
