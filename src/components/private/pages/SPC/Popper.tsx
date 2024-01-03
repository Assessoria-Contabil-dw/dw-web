import { X } from 'lucide-react'
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'

export interface PopperSPCRef {
  openModal: (message: string) => void
  closeModal: () => void
}

const PopperSPC: ForwardRefRenderFunction<PopperSPCRef> = (props, ref) => {
  const [isModalView, setIsModalView] = useState(false)
  const [message, setMessage] = useState('')

  const openModal = useCallback((message: string) => {
    setMessage(message)
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
    <div className="absolute z-50 flex w-96 flex-col rounded-md border-[1px] border-zinc-200 bg-white text-gray-800 shadow-lg">
      <div className="flex flex-row justify-between bg-gray-200 p-3 text-gray-600">
        <h5>Observação</h5>
        <button className="h-fit w-fit p-0" onClick={closeModal}>
          <X className="h-4 w-4 rounded-full" />
        </button>
      </div>
      <div className="p-3">
        <p className="font-alt text-xs">{message}</p>
      </div>
    </div>
  )
}
export default forwardRef(PopperSPC)
