'use client'

import { api } from '@/lib/api'
import {
  FormEvent,
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import { X } from 'lucide-react'
import { LoadingSecond } from '../../Loading/second'
import { useNotify } from '../../Toast/toast'

export interface CreateTemplateRef {
  openModal: (content: string) => void
  closeModal: () => void
}

const CreateTemplateModel: ForwardRefRenderFunction<CreateTemplateRef> = (
  props,
  ref,
) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isModalView, setIsModalView] = useState(false)
  const [content, setContent] = useState<string>('')

  const notify = useNotify()

  const openModal = useCallback((content: string) => {
    setContent(content)
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

  async function handleCreateTemplate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nameInput = event.currentTarget.elements.namedItem(
      'name',
    ) as HTMLInputElement

    if (!nameInput) return
    if (!content) return
    setIsSubmitting(true)

    console.log(nameInput.value, content)
    try {
      const response = await api.post('/templates', {
        name: nameInput.value,
        content,
      })
      console.log(response)
      closeModal()
      notify({ type: 'success', message: 'Template criado com sucesso' })
    } catch (error) {
      console.log(error)
      notify({ type: 'error', message: 'Erro ao criar template' })
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
          <h4>Nomear arquivo</h4>
          <button
            onClick={() => closeModal()}
            className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleCreateTemplate}>
          <div className="mb-4">
            <span>Titulo:</span>
            <input type="text" name="name" required />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => closeModal()}
              type="button"
              className="w-full bg-gray-200 text-gray-500 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button type="submit" className="button-primary w-full">
              {isSubmitting ? <LoadingSecond /> : 'Cadastrar'}
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  )
}

export default forwardRef(CreateTemplateModel)
