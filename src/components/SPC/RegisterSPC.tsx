'use client'
import { Plus, X } from 'lucide-react'
import { RadioInput } from '../Form/Radio'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import dayjs from 'dayjs'
import { ColorProps, DirectoryProps, DirectorySPCProps } from '@/lib/types'
import { useEffect, useState } from 'react'
import { Form } from '../Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { spcFormShema } from '@/lib/validation'
import { api } from '@/lib/api'
import { Loading } from '../Form/Loading'
import Cookies from 'js-cookie'

interface RegisterPCAModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (spc: DirectorySPCProps) => void
}

type SPCFormData = z.infer<typeof spcFormShema>

export function RegisterSPC({
  onClose,
  isOpen,
  onCreate,
}: RegisterPCAModalProps) {
  const [error, setError] = useState<string | null>(null)
  const [directory, setDirectory] = useState<DirectoryProps[]>([])
  const [selectedDirectory, setSelectedDirectory] = useState('')
  const [colorStatus, setColorStatus] = useState<ColorProps[]>([])
  const [selectedColorStatus, setSelectedColorStatus] = useState('')

  const createSPCForm = useForm<SPCFormData>({
    resolver: zodResolver(spcFormShema),
  })
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = createSPCForm

  const useFieldSPC = useFieldArray({
    control,
    name: 'spc',
  })

  useEffect(() => {
    Promise.all([api.get('/directories'), api.get('/colors/legend')])
      .then(([directory, colorStatus]) => {
        setDirectory(directory.data)
        setColorStatus(colorStatus.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [onClose])

  if (!isOpen) {
    return null
  }

  function handleCloseModal() {
    onClose()
  }

  function addNewSPC() {
    useFieldSPC.append({
      year: '',
      numPge: '',
      status: '',
      observation: '',
      type: 'SPCA',
    })
  }
  async function handleCreateSPC(data: SPCFormData) {
    console.log(data)
    const token = Cookies.get('token')
    try {
      const response = await api.post(
        '/spcs',
        {
          directoryId: data.directoryId,
          spc: data.spc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )

      const spc = response.data[0] as DirectorySPCProps
      console.log(spc)
      // onCreate(spc)
      setError('')
      console.log('SPC cadastrado com sucesso')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <FormProvider {...createSPCForm}>
          <form
            onSubmit={handleSubmit(handleCreateSPC)}
            className="flex h-full w-full flex-col items-end  p-1"
          >
            <div className="flex h-full w-full flex-col justify-between gap-6 overflow-y-auto p-8">
              <div className="flex flex-col gap-6">
                <div className="flex w-full items-start justify-between border-b-[1px]">
                  <div>
                    <h4>Cadastrar PCA</h4>
                    <span>Cadastre um novo pca de um diretório</span>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-4">
                      <Form.Field>
                        <Form.SelectInput
                          onChange={(e) => setSelectedDirectory(e.target.value)}
                          value={selectedDirectory}
                          type="text"
                          placeholder="Selecione o diretório"
                          name="directoryId"
                        >
                          {directory.map((directory, index) => {
                            return (
                              <option key={index} value={directory.id}>
                                {directory.typeOrg} {directory.city}
                              </option>
                            )
                          })}
                        </Form.SelectInput>
                        <Form.ErrorMessage field="directoryId" />
                      </Form.Field>
                      <button
                        type="button"
                        onClick={addNewSPC}
                        className=" w-fit bg-gray-100 text-xs text-gray-500"
                      >
                        <Plus className="w-4" />
                        SPC
                      </button>
                    </div>

                    <hr />

                    {useFieldSPC.fields.map((fieldSPC, index) => {
                      return (
                        <fieldset
                          key={fieldSPC.id}
                          className="flex flex-col gap-3"
                        >
                          <div className="flex">
                            <Form.Field>
                              <Form.Label htmlFor={`spc.${index}.type`}>
                                Tipo
                              </Form.Label>
                              <div className="flex gap-4">
                                <RadioInput
                                  type="radio"
                                  value="SPCA"
                                  label="SPCA"
                                  name={`spc.${index}.type`}
                                />
                                <RadioInput
                                  type="radio"
                                  value="SPCE"
                                  label="SPCE"
                                  name={`spc.${index}.type`}
                                />
                              </div>
                            </Form.Field>
                            <Form.ErrorMessage field={`spc.${index}.type`} />
                            <button
                              onClick={() => useFieldSPC.remove(index)}
                              className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                            >
                              <X size={20} />
                            </button>
                          </div>

                          <div className="flex gap-3">
                            <Form.Field>
                              <Form.Label htmlFor={`spc.${index}.year`}>
                                Ano
                              </Form.Label>
                              <Form.TextInput
                                type="number"
                                min={1999}
                                max={dayjs().year()}
                                placeholder={String(dayjs().year())}
                                name={`spc.${index}.year`}
                              />
                              <Form.ErrorMessage field={`spc.${index}.year`} />
                            </Form.Field>

                            <Form.Field>
                              <Form.Label htmlFor={`spc.${index}.numPge`}>
                                n° PJE
                              </Form.Label>
                              <Form.TextInput
                                type="text"
                                placeholder="Digite o numero do PJE"
                                name={`spc.${index}.numPge`}
                              />
                              <Form.ErrorMessage
                                field={`spc.${index}.numPge`}
                              />
                            </Form.Field>

                            <Form.Field>
                              <Form.Label htmlFor={`spc.${index}.status`}>
                                Status
                              </Form.Label>
                              <Form.SelectInput
                                type="text"
                                value={selectedColorStatus}
                                onChange={(e) =>
                                  setSelectedColorStatus(e.target.value)
                                }
                                placeholder="Selecione o status"
                                name={`spc.${index}.status`}
                              >
                                {colorStatus.map((color) => {
                                  return (
                                    <option key={color.id} value={color.id}>
                                      {color.name}
                                    </option>
                                  )
                                })}
                              </Form.SelectInput>
                              <Form.ErrorMessage
                                field={`spc.${index}.status`}
                              />
                            </Form.Field>
                          </div>

                          <Form.Field>
                            <Form.Label htmlFor={`spc.${index}.observation`}>
                              Observação
                            </Form.Label>
                            <Form.TextAreaInput
                              placeholder="Digite uma observação"
                              name={`spc.${index}.observation`}
                            />
                            <Form.ErrorMessage
                              field={`spc.${index}.observation`}
                            />
                          </Form.Field>
                        </fieldset>
                      )
                    })}
                  </div>
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
