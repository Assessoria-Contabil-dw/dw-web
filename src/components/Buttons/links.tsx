'use client'
import { useCallback, useRef } from 'react'
import ModelLinks, { ModelRef } from '../Model/Links'
import { Link } from 'lucide-react'

export default function LinksButton() {
  const modelLinksRef = useRef<ModelRef>(null)

  const handleLinksModal = useCallback(() => {
    modelLinksRef.current?.openModal()
  }, [])

  return (
    <>
      <ModelLinks ref={modelLinksRef} />
      <button
        className="  button-arrow rounded-full  bg-white p-3 text-blue-400 drop-shadow-md hover:text-blue-600"
        onClick={handleLinksModal}
      >
        <Link size={16} />
      </button>
    </>
  )
}
