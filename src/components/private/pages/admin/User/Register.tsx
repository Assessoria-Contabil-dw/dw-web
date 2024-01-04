import { X } from 'lucide-react'
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import FormUser from './FormCreate'

export interface RegisterUserRef {
  openModal: () => void
  closeModal: () => void
}

const RegisterUser: ForwardRefRenderFunction<RegisterUserRef> = (
  props,
  ref,
) => {
  const [isModalView, setIsModalView] = useState(false)

  const openModal = useCallback(() => {
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
            <h4 className="text-h4">Cadastrar Usuario</h4>
            <button onClick={closeModal} className="model-close">
              <X size={20} />
            </button>
          </div>

          <FormUser openModal={openModal} closeModal={closeModal} />
        </fieldset>
      </div>
    </div>
  )
}

export default forwardRef(RegisterUser)
