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
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'
import ButtonIcon from '@/components/Buttons/ButtonIcon'

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
    <div className="model-bg">
      <div className="model-size model-size-min">
        <fieldset className="model-card">
          <div className="model-header">
            <h4 className="text-h5">Redefinir senha</h4>
            <button onClick={closeModal} className="model-close">
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={handlePasswordUser}
            className="flex w-full flex-col gap-4 border-none"
          >
            <div className="flex gap-2">
              <input
                className="input-style"
                name="password"
                type="text"
                placeholder="Digite uma nova senha"
              />

              <ButtonIcon
                title="Copiar senha"
                icon={<Copy size={20} />}
                type="button"
                onClick={copyPassword}
              />
            </div>

            {error && <span className="text-red-500">{error}</span>}
            <div className="flex gap-4">
              <ButtonPrimary
                title="Cancelar"
                variant="outline"
                type="button"
                onClick={closeModal}
              >
                Cancelar
              </ButtonPrimary>
              <ButtonPrimary
                title="Cadastrar"
                variant="container"
                type="submit"
                loading={isSubmitting}
              >
                Cadastrar
              </ButtonPrimary>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  )
}

export default forwardRef(PasswordUser)
