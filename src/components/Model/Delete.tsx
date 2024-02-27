'use client'

import { api } from '@/lib/api'
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { useNotify } from '../Toast/toast'
import { queryClient } from '@/provider/query.provider'
import ButtonSecond from '../Buttons/ButtonSecond'

export interface DeleteRef {
  openModal: (
    id: string,
    path: string,
    msg: string | 'Deseja excluir o registro?',
    query: string | undefined,
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
    query: '',
  })

  const notify = useNotify()

  const openModal = useCallback(
    (
      id: string,
      path: string,
      msg: string | undefined,
      query: string | undefined,
    ) => {
      if (!msg) return
      if (!query) return
      setParams({ id, path, msg, query })
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

  async function handleDelete(id: string, path: string, query: string) {
    setIsSubmitting(true)
    try {
      await api.delete(`/${path}/${id}`)
      setIsSubmitting(false)
      notify({ type: 'success', message: 'Registro deletado com sucesso' })
      queryClient.invalidateQueries(query)
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
      <fieldset className="model-size model-size-min">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-end">
            <button
              onClick={() => closeModal()}
              className="w-fit rounded-full p-0 text-slate-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-6">
              <AlertTriangle className="stroke-red-500 " />
              <div className="flex flex-col items-center gap-2">
                <h4 className="text-h4">Deletar registro</h4>
                <p className="w-52 text-center font-mono text-xs text-slate-600">
                  {params.msg}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <ButtonSecond
                title="Cancelar"
                variant="cancel"
                onClick={() => closeModal()}
                type="button"
                className=" justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300"
              >
                Não, manter
              </ButtonSecond>
              <ButtonSecond
                title="Deletar"
                loading={isSubmitting}
                variant="delete"
                onClick={() =>
                  handleDelete(params.id, params.path, params.query)
                }
                type="button"
                className=" "
              >
                Sim, deletar
              </ButtonSecond>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default forwardRef(DeleteModel)
