'use client'
import { X } from 'lucide-react'
import { useForm, FormProvider } from 'react-hook-form'
import { Form } from '../../Form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingSecond } from '../../Loading/second'
import { LawFirmProps } from '@/interfaces/types'
import Cookies from 'js-cookie'
import { api } from '@/lib/api'
import { useState } from 'react'
import { lawFirmFormShema } from '@/interfaces/validation'

interface LawFirmModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (lawFirm: LawFirmProps) => void
}

type LawFirmFormData = z.infer<typeof lawFirmFormShema>

export function RegisterLawFirm({
  onClose,
  isOpen,
  onCreate,
}: LawFirmModalProps) {
  const createLawFirmForm = useForm<LawFirmFormData>({
    resolver: zodResolver(lawFirmFormShema),
  })

  const [error, setError] = useState('')

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createLawFirmForm

  if (!isOpen) {
    return null
  }

  function handleCloseModal() {
    onClose()
  }

  async function handleLawFirm(data: LawFirmFormData) {
    console.log(data)

    const token = Cookies.get('token')

    try {
      const response = await api.post('/lawFirms', [data], {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const lawFirm = response.data[0] as LawFirmProps
      // onCreate(lawFirm)
      console.log(lawFirm)
    } catch (error: any) {
      if (error.response.status === 400) {
        setError(error.response.data.message)
      } else {
        setError('Erro ao cadastrar o escritório')
      }
    }
  }

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden bg-white">
        <FormProvider {...createLawFirmForm}>
          <form
            onSubmit={handleSubmit(handleLawFirm)}
            className="flex h-full w-full flex-col items-end  p-1"
          >
            <div className="flex h-full w-full flex-col justify-between gap-6 overflow-y-auto p-8">
              <div className="flex flex-col gap-6">
                <div className="flex w-full items-start justify-between border-b-[1px]">
                  <div>
                    <h4>Cadastrar Escritório</h4>
                    <span>Cadastre um novo escritório e seus advogados</span>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex gap-3">
                    <Form.Field>
                      <Form.Label htmlFor="address">Endereço</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Rua, n°, Bairro, Cidade - UF, CEP"
                        name="address"
                      />
                      <Form.ErrorMessage field="address" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="cnpj">CNPJ</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite o CNPJ"
                        name="cnpj"
                      />
                      <Form.ErrorMessage field="cnpj" />
                    </Form.Field>
                  </div>

                  <div className="flex gap-3">
                    <Form.Field>
                      <Form.Label htmlFor="phone">Telefone</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite o telefone"
                        name="phone"
                      />
                      <Form.ErrorMessage field="phone" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="email">E-mail</Form.Label>
                      <Form.TextInput
                        type="email"
                        placeholder="Digite o e-mail"
                        name="email"
                      />
                      <Form.ErrorMessage field="email" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="siteUrl">Site URL</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite o link do site"
                        name="siteUrl"
                      />
                      <Form.ErrorMessage field="siteUrl" />
                    </Form.Field>
                  </div>

                  <div className="flex gap-3"></div>
                </div>
              </div>

              {error && <span className="text-red-500">{error}</span>}

              <div className="flex gap-4">
                <button
                  onClick={handleCloseModal}
                  type="submit"
                  className="bg-gray-200 text-gray-500 hover:bg-gray-300 "
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="hover:bg-primary-hover bg-primary text-white "
                >
                  {isSubmitting ? <LoadingSecond /> : `Cadastrar`}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
