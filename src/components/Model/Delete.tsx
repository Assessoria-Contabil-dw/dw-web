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
import { queryClient } from '@/provider/query.provider'
// import { ToastContainer, toast } from 'react-toastify'

export interface DeleteRef {
  openModal: (
    id: string | undefined,
    path: string,
    msg: string | undefined,
  ) => void
  closeModal: () => void
}

const DeleteModel: ForwardRefRenderFunction<DeleteRef> = (props, ref) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isModalView, setIsModalView] = useState(false)
  const [params, setParams] = useState({
    id: '',
    path: '',
    msg: '',
  })

  const notify = useNotify()

  const openModal = useCallback(
    (id: string | undefined, path: string, msg: string | undefined) => {
      if (!id) return
      if (!msg) return
      setParams({ id, path, msg })
      setIsModalView(true)
    },
    [],
  )

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
      queryClient.invalidateQueries(path)
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
    <div className="model-bg">
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

export default forwardRef(DeleteModel)
