'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/lib/api'
import cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { Image, X } from 'lucide-react'

const advocateFormShema = z.object({
  cpf: z
    .string()
    .min(11, 'O CPF deve ter 11 caracteres')
    .max(11, 'O CPF deve ter 11 caracteres')
    .nonempty('O cpf é obrigatório'),
  passwordHash: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type SignInUser = z.infer<typeof advocateFormShema>

interface TokenResponse {
  token: string
}

interface RegisterLeaderModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AdvocateForm({ onClose, isOpen }: RegisterLeaderModalProps) {
  const router = useRouter()
  const { register, handleSubmit } = useForm<SignInUser>({
    resolver: zodResolver(advocateFormShema),
  })

  async function handleSignInUser({ cpf, passwordHash }: SignInUser) {
    try {
      const response = await api.post('/', {
        cpf,
        passwordHash,
      })

      console.log(response.data)

      const { token } = response.data as TokenResponse

      cookie.set('token', token, { expires: 7, path: '/' })
      return router.refresh()
    } catch (err) {
      console.log(err)
    }
  }

  if (!isOpen) {
    return null
  }
  function handleCloseModal() {
    onClose()
  }

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 overflow-hidden">
        <form
          onSubmit={handleSubmit(handleSignInUser)}
          className="flex h-full flex-col items-end p-1"
        >
          <div className="overflow-y-auto p-6">
            <div className="flex w-full justify-between">
              <h4>Cadastrar Advogado</h4>
              <div>
                <button onClick={handleCloseModal} className="text-gray-600">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8">
              <div className="flex w-full flex-row gap-8">
                <div className="flex flex-1 flex-col gap-4">
                  <label className="flex flex-col gap-1 text-sm font-semibold">
                    Nome
                    <input
                      type="text"
                      placeholder="Digite o Nome Completo"
                      {...register('cpf')}
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm font-semibold">
                    CPF
                    <input
                      type="text"
                      placeholder="Digite o CPF"
                      {...register('cpf')}
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm font-semibold">
                    OAB
                    <input
                      type="text"
                      placeholder="Digite o RG"
                      {...register('cpf')}
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm font-semibold">
                    Endereço
                    <input
                      type="text"
                      placeholder="Digite o Endereço"
                      {...register('cpf')}
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm font-semibold">
                    Telefone
                    <input
                      type="text"
                      placeholder="Digite o Telefone"
                      {...register('cpf')}
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm font-semibold">
                    E-mail
                    <input
                      type="text"
                      placeholder="Digite o e-mail"
                      {...register('cpf')}
                    />
                  </label>
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <div>
                    <label className="flex flex-col gap-1 text-sm font-semibold">
                      Nacionalidade
                    </label>
                    <ul>
                      <li>
                        <label className="flex gap-1 text-sm font-normal">
                          <input checked type="radio" name="Brasileiro" id="" />
                          Brasileiro
                        </label>
                      </li>
                      <li>
                        <label className="flex gap-1 text-sm font-normal">
                          <input type="radio" name="Estrangeiro" id="" />
                          Estrangeiro
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <label className="flex flex-col gap-1 text-sm font-semibold">
                      Situação Cívil
                    </label>
                    <ul>
                      <li>
                        <label className="flex gap-1 text-sm font-normal">
                          <input type="radio" name="Solteiro" id="s" />
                          Solteiro
                        </label>
                      </li>
                      <li>
                        <label className="flex gap-1 text-sm font-normal">
                          <input type="radio" name="Casado" id="c" />
                          Casado
                        </label>
                      </li>
                      <li>
                        <label className="flex gap-1 text-sm font-normal">
                          <input type="radio" name="Divorciado" id="d" />
                          Divorciado
                        </label>
                      </li>
                      <li>
                        <label className="flex gap-1 text-sm font-normal">
                          <input type="radio" name="Viúvo" id="v" />
                          Viúvo
                        </label>
                      </li>
                    </ul>
                  </div>

                  <label className="flex flex-col gap-1 text-sm font-semibold">
                    Assinatura
                    <div className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-200">
                      <Image size={32} />
                    </div>
                    <input
                      className="border-0 file:rounded-xl file:border-0 file:bg-secundary file:p-2 file:text-white"
                      type="file"
                      name=""
                      id=""
                    />
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-primary text-white hover:bg-primary-hover "
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
