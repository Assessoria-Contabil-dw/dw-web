'use client'
import { X } from 'lucide-react'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { Form } from '../../Form'
import { ColorProps } from '@/@types/types'
import { LoadingSecond } from '@/components/Loading/second'

// export const partyFormShema = z.object({
//   name: z
//     .string()
//     .min(3, 'O nome do partido deve ter no mínimo tres letras')
//     .max(255, 'O nome do partido deve ter no máximo 255 letras')
//     .nonempty('O nome do partido não pode ser vazio'),
//   abbreviation: z
//     .string()
//     .min(2, 'A sigla do partido deve ter no mínimo duas letras')
//     .max(25, 'A sigla do partido deve ter no máximo 25 letras')
//     .nonempty('A sigla do partido não pode ser vazio'),
//   logoUrl: z
//     .instanceof(FileList)
//     .transform((file) => file[0])
//     .optional(),
//   colorId: z.coerce
//     .number()
//     .positive('A cor do partido deve não deve ser vazia')
//     .min(1, 'A cor do partido não deve ser vazia'),
// })

interface UpgradePartyProps {
  name: string
  abbreviation: string
  logoUrl: string
  color: string
}
// type PartyFormData = z.infer<typeof partyFormShema>

interface UpdateDirectoryModalProps {
  isCreate: boolean
  id: string
  onClose: () => void
  loading: () => void
}

export function UpdateParty({
  onClose,
  isCreate,
  loading,
  id,
}: UpdateDirectoryModalProps) {
  // valores dos inputs
  const [values, setValues] = useState<UpgradePartyProps>(
    {} as UpgradePartyProps,
  )

  // erros dos inputs
  const [error, setError] = useState<string | null>(null)
  const [colors, setColors] = useState<ColorProps[]>([])
  const [selectedColor, setSelectedColor] = useState('')

  const createPartyForm = useForm<UpgradePartyProps>({
    // resolver: zodResolver(partyFormShema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createPartyForm

  // função para pegar as cores
  async function getColors() {
    try {
      const response = await api.get('/colors/background')
      setColors(response.data)
      console.log(values.color, response.data)
      const colorSelect = response.data.find(
        (c: ColorProps) => c.hex === values.color,
      )
      setSelectedColor(colorSelect.id)
    } catch (err) {
      console.log(err)
    }
  }

  // função para colocar os valores nos inputs
  async function handleParty(id: string) {
    try {
      const p = await api.get(`/parties/${id}`)
      setValues({
        ...values,
        abbreviation: p.data.abbreviation,
        name: p.data.name,
        color: p.data.color,
        logoUrl: p.data.logoUrl,
      })
      console.log(values)

      getColors()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleParty(id)
  }, [id])

  if (!isCreate) {
    return null
  }

  function handleCloseModal() {
    onClose()
  }

  // função para atualizar o partido
  async function handleUpadeParty(data: UpgradePartyProps) {
    console.log({
      name: data.name,
      abbreviation: data.abbreviation,
      logoUrl: data.logoUrl ? data.logoUrl : '',
      colorId: selectedColor,
    })

    try {
      const r = await api.put(`/parties/${String(id)}`, {
        name: data.name,
        abbreviation: data.abbreviation,
        logoUrl: data.logoUrl,
        colorId: selectedColor,
      })
      console.log(r)
      loading()
    } catch (error: any) {
      setError('Error ao atualizar o partido')
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
            onSubmit={handleSubmit(handleUpadeParty)}
            className="flex h-full w-full flex-col items-end  p-1 py-3"
          >
            <div className="flex h-full w-full flex-col justify-between gap-6 overflow-y-auto p-8">
              <div className="flex flex-col gap-6">
                <div className="flex w-full items-start justify-between border-b-[1px]">
                  <div>
                    <h4>Editar Partido</h4>
                    <span>Edite o partido</span>
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
                      <Form.Label htmlFor="name">Nome</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite o nome do partido"
                        name="name"
                        defaultValue={values.name}
                      />
                      <Form.ErrorMessage field="name" />
                    </Form.Field>
                    <Form.Field>
                      <Form.Label htmlFor="abbreviation">Sigla</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite a sigla"
                        name="abbreviation"
                        defaultValue={values.abbreviation}
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
                  {isSubmitting ? <LoadingSecond /> : 'Atualizar'}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
