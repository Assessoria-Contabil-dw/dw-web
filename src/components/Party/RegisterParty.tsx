'use client'
import { X } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useEffect, useState } from 'react'
import { Form } from '../Form'
import { ColorProps } from '@/lib/types'
import { Loading } from '../Form/Loading'
import { partyFormShema } from '@/lib/validation'
import { ToastContainer } from 'react-toastify'
import { ToastSucess } from '../Form/Tost'

type PartyFormData = z.infer<typeof partyFormShema>

interface RegisterDirectoryModalProps {
  isCreate: boolean
  onClose: () => void
}

export function RegisterParty({
  onClose,
  isCreate,
}: RegisterDirectoryModalProps) {
  const [error, setError] = useState<string | null>(null)
  const [colors, setColors] = useState<ColorProps[]>([])
  const [selectedColor, setSelectedColor] = useState('')

  const createPartyForm = useForm<PartyFormData>({
    resolver: zodResolver(partyFormShema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = createPartyForm

  function handleReset() {
    reset({
      code: undefined,
      name: '',
      abbreviation: '',
      logoUrl: undefined,
      colorId: undefined,
    })
    setSelectedColor('')
  }

  useEffect(() => {
    async function getColors() {
      try {
        const response = await api.get('/colors/background')
        setColors(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getColors()
  }, [onClose])

  if (!isCreate) {
    return null
  }

  function handleCloseModal() {
    handleReset()
    onClose()
  }

  async function handleParty(data: PartyFormData) {
    const token = Cookie.get('token')
    let url = ''

    try {
      const existParty = await api.get(`/parties/${String(data.code)}`)
      if (existParty.data !== null) {
        setError('Partido já cadastrado')
        return
      }
    } catch (error) {
      setError('Error ao verificar se o partido já existe')
      return
    }

    if (data.logoUrl !== undefined) {
      const formData = new FormData()
      formData.set('file', data.logoUrl)

      try {
        const response = await api.post('/update/logo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })

        url = response.data
      } catch (error: any) {
        if (error.response.status === 400 || error.response.status === 402) {
          setError(error.response.data.message)
        } else {
          setError('Error ao fazer upload da imagem')
          return
        }
      }
    }

    try {
      await api.post(
        '/parties',
        [
          {
            code: data.code,
            name: data.name,
            abbreviation: data.abbreviation,
            logoUrl: url === '' ? undefined : url,
            colorId: selectedColor,
          },
        ],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setError('')
      handleReset()

      ToastSucess('Partido cadastrado com sucesso')
    } catch (error: any) {
      if (
        error.response.status === 422 ||
        error.response.status === 401 ||
        error.response.status === 400
      ) {
        setError(error.response.data.message)
      } else {
        console.log(error)
        setError('Error ao cadastrar o partido')
      }
    }
  }

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <FormProvider {...createPartyForm}>
          <form
            onSubmit={handleSubmit(handleParty)}
            className="flex h-full w-full flex-col items-end  p-1 py-3"
          >
            <div className="flex h-full w-full flex-col justify-between gap-6 overflow-y-auto p-8">
              <div className="flex flex-col gap-6">
                <div className="flex w-full items-start justify-between border-b-[1px]">
                  <div>
                    <h4>Cadastrar Partido</h4>
                    <span>Cadastre um Partido</span>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex h-full flex-1 flex-row gap-8">
                  <div className="flex flex-1 flex-col gap-4">
                    <Form.Field>
                      <Form.Label htmlFor="colorId">Cor</Form.Label>
                      <Form.SelectInput
                        type="text"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        placeholder="Selecione uma cor"
                        name="colorId"
                      >
                        {colors.map((color) => {
                          return (
                            <option key={color.id} value={color.id.toString()}>
                              {color.name}
                            </option>
                          )
                        })}
                      </Form.SelectInput>
                      <Form.ErrorMessage field="colorId" />
                    </Form.Field>
                    <Form.Field className=" h-3/5">
                      <Form.Label htmlFor="img">Logo</Form.Label>
                      <Form.ImgInput accept="image/*" name="img" />
                      <Form.ErrorMessage field="img" />
                    </Form.Field>
                  </div>

                  <div className="flex flex-1 flex-col gap-4">
                    <Form.Field>
                      <Form.Label htmlFor="code">Código</Form.Label>
                      <Form.TextInput
                        type="number"
                        placeholder="Digite o número"
                        name="code"
                      />
                      <Form.ErrorMessage field="code" />
                    </Form.Field>
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
                      <Form.Label htmlFor="abbreviation">Sigla</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite a sigla"
                        name="abbreviation"
                      />
                      <Form.ErrorMessage field="abbreviation" />
                    </Form.Field>
                  </div>
                </div>
              </div>
              {error && <span className="text-sm text-red-500">{error}</span>}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-200 text-gray-500 hover:bg-gray-300 "
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white hover:bg-green-600 disabled:bg-primary disabled:text-white"
                >
                  {isSubmitting ? <Loading /> : 'Cadastrar'}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
      <ToastContainer className="h-auto w-auto" />
    </div>
  )
}
