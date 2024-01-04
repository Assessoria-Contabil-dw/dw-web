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
    <div className="model-bg">
      <div className="model-size model-size-full">
        <fieldset className="model-card">
          <div className="model-header">
            <h4 className="text-h4">Atualizar Usuario</h4>
            <button onClick={closeModal} className="model-close">
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
