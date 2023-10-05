'use client'

import { useCallback, useRef } from 'react'
import Register, { RegisterUserRef } from './Register'
import { UserTable } from './Table'

export function Acess() {
  const modalRegisterRef = useRef<RegisterUserRef>(null)

  const handleRegisterModal = useCallback(() => {
    modalRegisterRef.current?.openModal()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <Register ref={modalRegisterRef} />
      <button
        onClick={handleRegisterModal}
        className="w-fit rounded-md bg-green-500 px-4 py-2 text-white"
      >
        Registrar
      </button>
      <UserTable />
    </div>
  )
}
