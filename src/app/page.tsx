'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const router = useRouter()

  function handleSignIn() {
    router.push('/login')
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1>Página em construção</h1>
      <button onClick={handleSignIn} className="button-primary">
        Entrar na conta
      </button>
    </div>
  )
}
