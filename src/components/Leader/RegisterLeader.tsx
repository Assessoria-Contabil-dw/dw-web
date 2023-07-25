'use client'

import { X } from 'lucide-react'
import { RadioInput } from '../Form/Radio'
import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../Form'
import { Loading } from '../Form/Loading'
import { useState } from 'react'
import { leaderFormShema } from '@/lib/validation'
import Cookies from 'js-cookie'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { LeaderProps } from '@/lib/types'

interface RegisterLeaderModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (leader: LeaderProps) => void
}

type LeaderFormData = z.infer<typeof leaderFormShema>

export function RegisterLeader({
  onClose,
  isOpen,
  onCreate,
}: RegisterLeaderModalProps) {
  const [error, setError] = useState<string | null>(null)

  const createLeaderForm = useForm<LeaderFormData>({
    resolver: zodResolver(leaderFormShema),
  })

  if (!isOpen) {
    return null
  }
  function handleCloseModal() {
    onClose()
  }

  async function handleAddLeader(data: LeaderFormData) {
    console.log(data)

    const token = Cookies.get('token')
    let url = ''

    try {
      const existAdvocate = await api.get(
        `/leaderies/${String(data.name.toUpperCase())}`,
      )
      if (existAdvocate.data !== null) {
        console.log('Advogado já cadastrado')
        return
      }
    } catch (error) {
      setError('Error')
    }

    if (data.img !== undefined) {
      const formData = new FormData()
      formData.set('file', data.img)

      console.log(formData)

      try {
        const response = await api.post('/update/signature', formData, {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: `Bearer ${token}`,
          },
        })
        url = response.data
      } catch (error: any) {
        if (error.response.status === 400 || error.response.status === 402) {
          setError(error.response.data.message)
        } else {
          setError('Error ao fazer upload da imagem')
        }
      }
    }

    console.log(url)
    try {
      const response = await api.post(
        '/leaderies',
        [
          {
            name: data.name,
            cpf: data.cpf,
            rg: data.rg,
            birthday: dayjs(data.birthday).format(),
            email: data.email,
            phone: data.phone,
            address: data.address,
            signatureUrl: url === '' ? undefined : url,
            title: data.title,
            nationality: data.nationality,
            status: data.status,
          },
        ],
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )

      const leader = response.data[0] as LeaderProps
      onCreate(leader)

      setError('')
      console.log('Advogado cadastrado com sucesso')
    } catch (error: any) {
      if (
        error.response.status === 422 ||
        error.response.status === 401 ||
        error.response.status === 400
      ) {
        setError(error.response.data.message)
      } else {
        console.log(error)
        setError('Error ao cadastrar o advogado')
      }
    }
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createLeaderForm

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <FormProvider {...createLeaderForm}>
          <form
            onSubmit={handleSubmit(handleAddLeader)}
            className="flex h-full w-full flex-col items-end  p-1"
          >
            <div className="flex h-full w-full flex-col justify-between gap-6 overflow-y-auto p-8">
              <div className="flex flex-col gap-6">
                <div className="flex w-full items-start justify-between border-b-[1px]">
                  <div>
                    <h4>Cadastrar Representante</h4>
                    <span>Insira as informações de um representante</span>
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
                      <Form.Label htmlFor="name">Nome</Form.Label>
                      <Form.TextInput
                        name="name"
                        type="text"
                        placeholder="Digite o nome completo"
                      />
                      <Form.ErrorMessage field="name" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="cpf">CPF</Form.Label>
                      <Form.TextInput
                        name="cpf"
                        type="text"
                        placeholder="Digite o nome cpf"
                      />
                      <Form.ErrorMessage field="cpf" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="rg">RG</Form.Label>
                      <Form.TextInput
                        name="rg"
                        type="text"
                        placeholder="Digite o nome rg"
                      />
                      <Form.ErrorMessage field="rg" />
                    </Form.Field>
                  </div>

                  <div className="flex gap-3">
                    <Form.Field>
                      <Form.Label htmlFor="title">Título</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite o título"
                        name="title"
                      />
                      <Form.ErrorMessage field="title" />
                    </Form.Field>

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
                  </div>

                  <div className="flex gap-3">
                    <Form.Field>
                      <Form.Label htmlFor="profession">Profissão</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite a profissão"
                        name="profession"
                      />
                      <Form.ErrorMessage field="profession" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="status">Situação Cívil</Form.Label>
                      <div>
                        <RadioInput
                          checked
                          type="radio"
                          value="SOLTEIRO"
                          label="Solteiro"
                          name="status"
                        />
                        <RadioInput
                          type="radio"
                          value="CASADO"
                          label="Casado"
                          name="status"
                        />
                        <RadioInput
                          type="radio"
                          value="DIVORCIADO"
                          label="Divorciado"
                          name="status"
                        />
                        <RadioInput
                          type="radio"
                          value="VIÚVO"
                          label="Viúvo"
                          name="status"
                        />
                      </div>
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="nationality">
                        Nacionalidade
                      </Form.Label>
                      <div>
                        <RadioInput
                          type="radio"
                          value="BRASILEIRO"
                          label="Brasileiro"
                          name="nationality"
                          checked
                        />
                        <RadioInput
                          type="radio"
                          value="ESTRANGEIRO"
                          label="Estrangeiro"
                          name="nationality"
                        />
                      </div>
                    </Form.Field>
                  </div>

                  <Form.Field>
                    <Form.Label htmlFor="address">Endereço</Form.Label>
                    <Form.TextInput
                      type="text"
                      placeholder="Rua, n°, Bairro, Cidade - UF, CEP"
                      name="address"
                    />
                    <Form.ErrorMessage field="address" />
                  </Form.Field>

                  <Form.Field className="h-32">
                    <Form.Label htmlFor="img">Assinatura</Form.Label>
                    <Form.ImgInput accept="image/*" name="img" />
                    <Form.ErrorMessage field="img" />
                  </Form.Field>
                </div>
              </div>
              {error && <span className="text-sm text-red-500">{error}</span>}

              <div className="flex gap-4">
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="bg-gray-200 text-gray-500 hover:bg-gray-300 "
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white hover:bg-primary-hover "
                >
                  {isSubmitting ? <Loading /> : 'Cadastrar'}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
