import { X } from 'lucide-react'
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import FormUpdate from './FormUpdate'

export interface UpdateUserRef {
  openModal: (id: number) => void
  closeModal: () => void
}

const UpdateUser: ForwardRefRenderFunction<UpdateUserRef> = (props, ref) => {
  const [isModalView, setIsModalView] = useState(false)
  const [id, setId] = useState(0)

  const openModal = useCallback((id: number) => {
    setId(id)
    setIsModalView(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalView(false)
  }, [])

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }))

  if (!isModalView) {
    return null
  }

  return (
    <div className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <fieldset className="flex h-full w-full flex-col items-start justify-start  border-b-[1px]">
          <div className="flex w-full justify-between">
            <div>
              <h4>Atualizar Usuario</h4>
            </div>
            <button
              onClick={closeModal}
              className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <FormUpdate id={id} closeModal={closeModal} />
        </fieldset>
      </div>
    </div>
  )
}

export default forwardRef(UpdateUser)
