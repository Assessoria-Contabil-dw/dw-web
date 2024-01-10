'use client'
import { Plus, X } from 'lucide-react'
import { RadioInput } from '../../../../Form/Radio'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'

import { z } from 'zod'
import dayjs from 'dayjs'
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Form } from '../../../../Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/api'
import { spcFormShema } from '@/interfaces/validation'
import { ColorProps, DirectoryProps, SPCProps } from '@/interfaces/types'
import ButtonSecond from '@/components/Buttons/ButtonSecond'
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'
import SelectDirectory from '@/components/private/Search/Select/SelectDirectory'

export interface CreateSPCRef {
  openModal: () => void
  closeModal: () => void
}

type SPCFormData = z.infer<typeof spcFormShema>

const CreateSPCModel: ForwardRefRenderFunction<CreateSPCRef> = (props, ref) => {
  const [error, setError] = useState<string | null>(null)
  const [directory, setDirectory] = useState<DirectoryProps[]>([])
  const [selectedDirectory, setSelectedDirectory] = useState('')
  const [colorStatus, setColorStatus] = useState<ColorProps[]>([])
  const [selectedColorStatus, setSelectedColorStatus] = useState('')
  const [isModalView, setIsModalView] = useState(false)

  const openModal = useCallback(() => {
    setIsModalView(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalView(false)
  }, [])

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }))

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
  }, [])

  if (!isModalView) {
    return null
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
    try {
      const response = await api.post('/spcs', {
        directoryId: data.directoryId,
        spc: data.spc,
      })

      const spc = response.data[0] as SPCProps
      console.log(spc)
      // onCreate(spc)
      setError('')
      console.log('SPC cadastrado com sucesso')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="model-bg">
      <div className="model-size model-size-full">
        <FormProvider {...createSPCForm}>
          <form className="model-card" onSubmit={handleSubmit(handleCreateSPC)}>
            <div className="flex h-full w-full flex-col gap-6">
              <div className="model-header">
                <div>
                  <h4 className="text-h4">Cadastrar PCA</h4>
                  <span className="text-span">
                    Cadastre um novo pca de um diretório
                  </span>
                </div>
                <button onClick={closeModal} className="model-close">
                  <X size={20} />
                </button>
              </div>
              <div className="model-body">
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
                        {/* { directory && directory..map((directory, index) => {
                          return (
                            <option key={index} value={directory.id.toString()}>
                              {directory.surname}
                            </option>
                          )
                        })} */}
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
                            <Form.ErrorMessage field={`spc.${index}.numPge`} />
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
                                  <option
                                    key={color.id}
                                    value={color.id.toString()}
                                  >
                                    {color.name}
                                  </option>
                                )
                              })}
                            </Form.SelectInput>
                            <Form.ErrorMessage field={`spc.${index}.status`} />
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
              <ButtonSecond
                title="Cancelar"
                variant="cancel"
                onClick={closeModal}
                type="button"
              >
                Cancelar
              </ButtonSecond>
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
        </FormProvider>
      </div>
    </div>
  )
}

export default forwardRef(CreateSPCModel)
