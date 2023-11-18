'use client'

import { api } from '@/lib/api'
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import { X } from 'lucide-react'
import { LoadingSecond } from '../Loading/second'
import { useNotify } from '../Toast/toast'
// import { ToastContainer, toast } from 'react-toastify'

export interface DeletRef {
  openModal: (id: string, path: string, msg: string) => void
  closeModal: () => void
}

const DeletModel: ForwardRefRenderFunction<DeletRef> = (props, ref) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isModalView, setIsModalView] = useState(false)
  const [params, setParams] = useState({
    id: '',
    path: '',
    msg: '',
  })

  const notify = useNotify()

  const openModal = useCallback((id: string, path: string, msg: string) => {
    setParams({ id, path, msg })
    setIsModalView(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalView(false)
  }, [])

  useImperativeHandle(ref, () => {
    return {
      openModal,
      closeModal,
    }
  })

  async function handleDelete(id: string, path: string) {
    setIsSubmitting(true)
    console.log(id, path)
    try {
      await api.delete(`/${path}/${id}`)
      setIsSubmitting(false)
      notify({ type: 'success', message: 'Registro deletado com sucesso' })
      closeModal()
    } catch (error) {
      console.log(error)
      setIsSubmitting(false)
    }
  }

  if (!isModalView) {
    return null
  }

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <fieldset className="w-auto">
        <div className="flex w-full items-center justify-between">
          <h4>Deletar registro</h4>
          <button
            onClick={() => closeModal()}
            className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mb-4">
          <span>Deseja realmente apagar o regitro {params.msg} ?</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => closeModal()}
            type="button"
            className="bg-gray-200 text-gray-500 hover:bg-gray-300 "
          >
            Cancelar
          </button>
          <button
            onClick={() => handleDelete(params.id, params.path)}
            type="button"
            className="bg-red-500 text-white hover:bg-red-600 "
          >
            {isSubmitting ? <LoadingSecond /> : 'Deletar'}
          </button>
        </div>
      </fieldset>
      {/* <ToastContainer /> */}
    </div>
  )
}

export default forwardRef(DeletModel)
