'use client'

import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { Loading } from '../Form/Loading'
import { X } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'

interface ModelDeletProps {
  path: string
  id: string
  msg: string
  isOpen: boolean
  onClose: () => void
  loading: () => void
}

export function ModelDelet({
  path,
  id,
  msg,
  onClose,
  isOpen,
  loading,
}: ModelDeletProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleDelete(path: string, id: string) {
    setIsSubmitting(true)
    const token = Cookies.get('token')
    try {
      await api.delete(`/${path}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setIsSubmitting(false)
      // alerta
      loading()
      handleCloseModal()
    } catch (error) {
      console.log(error)
    }
  }

  if (!isOpen) {
    return null
  }

  function handleCloseModal() {
    toast.success('Registro deletado com sucesso', {
      position: 'top-right',
      autoClose: 200,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })

    onClose()
  }
  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <fieldset className="w-auto">
        <div className="flex w-full items-center justify-between">
          <h4>Deletar registro</h4>
          <button
            onClick={handleCloseModal}
            className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mb-4">
          <span>Deseja realmente apagar o regitro {msg} ?</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleCloseModal}
            type="button"
            className="bg-gray-200 text-gray-500 hover:bg-gray-300 "
          >
            Cancelar
          </button>
          <button
            onClick={() => handleDelete(path, id)}
            type="button"
            className="bg-red-500 text-white hover:bg-red-600 "
          >
            {isSubmitting ? <Loading /> : 'Deletar'}
          </button>
        </div>
      </fieldset>
      <ToastContainer />
    </div>
  )
}
