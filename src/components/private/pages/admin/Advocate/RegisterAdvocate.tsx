'use client'
import { z } from 'zod'
import { X } from 'lucide-react'
import { RadioInput } from '../../../../Form/Radio'
import { Form } from '../../../../Form'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { LoadingSecond } from '../../../../Loading/second'
import dayjs from 'dayjs'
import { AdvocateProps } from '@/interfaces/types'
import { advocateFormShema } from '@/interfaces/validation'
interface RegisterLeaderModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (advocate: AdvocateProps) => void
}

type AdvocateFormData = z.infer<typeof advocateFormShema>
interface LawFirm {
  id: string
  name: string
}
export function RegisterAdvocate({
  onClose,
  isOpen,
  onCreate,
}: RegisterLeaderModalProps) {
  const createAdvocateForm = useForm<AdvocateFormData>({
    resolver: zodResolver(advocateFormShema),
  })
  const [selectedLawFirm, setSelectedLawFirm] = useState('')
  const [lawFirm, setLawFirm] = useState<LawFirm[]>([])
  const [error, setError] = useState<string | null>(null)

  // pegar os escritorios
  useEffect(() => {
    async function getLawFirm() {
      const token = Cookies.get('token')
      try {
        const response = await api.get('/lawFirms', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setLawFirm(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getLawFirm()
  }, [onClose])

  if (!isOpen) {
    return null
  }
  function handleCloseModal() {
    onClose()
  }

  async function handleAdvocate(data: AdvocateFormData) {
    console.log(data)

    const token = Cookies.get('token')
    let url = ''

    try {
      const existAdvocate = await api.get(
        `/advocates/${data.cpf?.replace(/\D/g, '')}`,
      )
      if (existAdvocate.data !== null) {
        setError('Advogado já cadastrado')
        return
      }
    } catch (error) {
      setError('Error')
      return
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
        if (error.response.status === 400) {
          setError(error.response.data.message)
          return
        } else if (error.response.status === 422) {
          setError(error.response.data.message)
          return
        } else {
          setError('Error ao fazer upload da imagem')
          return
        }
      }
    }

    try {
      const response = await api.post(
        '/advocates',
        [
          {
            name: data.name,
            cpf: data.cpf,
            birthday:
              data.birthday !== ''
                ? dayjs(data.birthday).format('YYYY-MM-DD')
                : undefined,
            email: data.email,
            phone: data.phone,
            address: data.address,
            signatureUrl: url === '' ? undefined : url,
            title: data.title,
            lawFirmId: selectedLawFirm,
            status: data.status,
            oab: data.oab,
          },
        ],
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )

      const advocate = response.data[0] as AdvocateProps
      // onCreate(advocate)
      console.log(advocate)

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
  } = createAdvocateForm

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <FormProvider {...createAdvocateForm}>
          <form
            onSubmit={handleSubmit(handleAdvocate)}
            className="flex h-full w-full flex-col items-end  p-1"
          >
            <div className="flex h-full w-full flex-col justify-between gap-6 overflow-y-auto p-8">
              <div className="flex flex-col gap-6">
                <div className="flex w-full items-start justify-between border-b-[1px]">
                  <div>
                    <h4>Cadastrar Advogado</h4>
                    <span>Insira as informações de um advogado</span>
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
                        type="text"
                        placeholder="Digite o nome do partido"
                        name="name"
                      />
                      <Form.ErrorMessage field="name" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="cpf">CPF</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite o cpf"
                        name="cpf"
                      />
                      <Form.ErrorMessage field="cpf" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="oab">OAB</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite a OAB"
                        name="oab"
                      />
                      <Form.ErrorMessage field="oab" />
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
                      <Form.Label htmlFor="birthday">
                        Data de Nascimento
                      </Form.Label>
                      <Form.TextInput
                        type="date"
                        placeholder="Data de nascimento"
                        name="birthday"
                      />
                      <Form.ErrorMessage field="birthday" />
                    </Form.Field>
                  </div>

                  <div className="flex justify-between gap-8">
                    <Form.Field>
                      <Form.Label htmlFor="lawFirmId">Escritório</Form.Label>
                      <Form.SelectInput
                        type="text"
                        value={selectedLawFirm}
                        onChange={(e) => setSelectedLawFirm(e.target.value)}
                        placeholder="Selecione o escritório"
                        name="lawFirmId"
                      >
                        {lawFirm.map((law) => {
                          return (
                            <option key={law.id} value={law.id}>
                              {law.name}
                            </option>
                          )
                        })}
                      </Form.SelectInput>
                      <Form.ErrorMessage field="lawFirmId" />
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
                  </div>
                  <Form.Field className="h-full flex-1">
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
                  disabled={isSubmitting}
                  className="hover:bg-primary-hover bg-primary text-white "
                >
                  {isSubmitting ? <LoadingSecond /> : 'Cadastrar'}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
