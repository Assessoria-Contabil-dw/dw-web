import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { Copy, X } from 'lucide-react'
import {
  FormEvent,
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import { LoadingSecond } from '../../Loading/second'

export interface PasswordUserRef {
  openModal: (id: number) => void
  closeModal: () => void
}

const PasswordUser: ForwardRefRenderFunction<PasswordUserRef> = (
  props,
  ref,
) => {
  const [isModalView, setIsModalView] = useState(false)
  const [id, setId] = useState(0)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  function copyPassword() {
    const password = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement
    navigator.clipboard.writeText(password.value)
  }

  async function handlePasswordUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    console.log(id)
    setIsSubmitting(true)

    const { password } = event.currentTarget
    try {
      const token = Cookies.get('token')
      const response = await api.put(
        `/users/password/${String(id)}`,
        { passwordHash: password.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      console.log(response)
      if (response) {
        setIsSubmitting(true)
        closeModal()
      }
    } catch (err) {
      setIsSubmitting(false)
      setError('Erro ao redefinir senha')
    }
  }

  return (
    <div className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
      <div>
        <fieldset className="flex h-full w-full flex-col items-start justify-start  border-b-[1px]">
          <div className="flex w-full justify-between">
            <div>
              <h4>Redefinir senha</h4>
            </div>
            <button
              onClick={closeModal}
              className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={handlePasswordUser}
            className="flex w-full flex-col gap-4 border-none"
          >
            <div className="flex gap-2">
              <input
                name="password"
                type="text"
                placeholder="Digite uma nova senha"
              />

              <div className="group relative inline-block">
                <button
                  type="button"
                  onClick={copyPassword}
                  className="bg-green-400 p-2"
                >
                  <span
                    className="absolute -top-full z-10 w-32 items-center rounded-xl bg-gray-400/50 p-2 text-center 
                    text-sm text-white opacity-0 transition-all duration-300 group-hover:opacity-100"
                  >
                    Copiar senha
                  </span>
                  <Copy size={20} color="white" />
                </button>
              </div>
            </div>

            {error && <span className="text-red-500">{error}</span>}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-200 text-gray-500 hover:bg-gray-300 "
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white hover:bg-green-600 disabled:bg-primary disabled:text-white"
              >
                {isSubmitting ? <LoadingSecond /> : 'Cadastrar'}
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  )
}

export default forwardRef(PasswordUser)
