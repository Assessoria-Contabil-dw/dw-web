'use client'
import { X, Trash2 } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import {
  useEffect,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react'
import { Form } from '../Form'
import dayjs from 'dayjs'
import { virgenciesFormSchema } from '@/lib/validation'
import { Loading } from '../Form/Loading'
import {
  AdvocateProps,
  LawFirmProps,
  LeaderProps,
  OfficesProps,
} from '@/lib/types'

type VigencyFormData = z.infer<typeof virgenciesFormSchema>

export interface RegisterVigencyRef {
  openViewModal: (id: string) => void
  closeViewModal: () => void
}

const RegisterVigencyModel: ForwardRefRenderFunction<RegisterVigencyRef> = (
  props,
  ref,
) => {
  const [directoryId, setDirectoryId] = useState('')

  const [error, setError] = useState<string | null>(null)
  const [isModalView, setIsModalView] = useState(false)

  const [leaderies, setLeader] = useState<LeaderProps[]>([])
  const [advocates, setAdvocate] = useState<AdvocateProps[]>([])
  const [offices, setOffice] = useState<OfficesProps[]>([])
  const [lawFirms, setLawFirm] = useState<LawFirmProps[]>([])

  const [selectedLeader, setSelectedLeader] = useState('')
  const [selectedOffice, setSelectedOffice] = useState('')

  // DINAMICA DO MODEL
  const openViewModal = useCallback((id: string) => {
    setDirectoryId(id)
    setIsModalView(true)
  }, [])

  const closeViewModal = useCallback(() => {
    setIsModalView(false)
  }, [])

  useImperativeHandle(ref, () => ({
    openViewModal,
    closeViewModal,
  }))

  const createVigencyForm = useForm<VigencyFormData>({
    resolver: zodResolver(virgenciesFormSchema),
  })

  console.log('registe')
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = createVigencyForm

  const useFieldLeader = useFieldArray({
    control,
    name: 'vigencyLeader',
  })

  function addNewLeader() {
    useFieldLeader.append({ leaderId: '', officeId: '' })
  }

  const useFieldAdvocate = useFieldArray({
    control,
    name: 'vigencyAdvocate',
  })

  function addNewAdvocate() {
    useFieldAdvocate.append({ advocateId: '' })
  }

  const useFieldLawFirm = useFieldArray({
    control,
    name: 'vigencyLawFirm',
  })

  function addNewLawFirm() {
    useFieldLawFirm.append({ lawFirmId: '' })
  }

  useEffect(() => {
    Promise.all([
      api.get('/leaderies'),
      api.get('/offices'),
      api.get('/advocates'),
      api.get('/lawFirms'),
    ])
      .then(([leaderies, offices, advocates, lawFirms]) => {
        setLeader(leaderies.data)
        setOffice(offices.data)
        setAdvocate(advocates.data)
        setLawFirm(lawFirms.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [directoryId])

  async function handleVigency(data: VigencyFormData) {
    const token = Cookie.get('token')
    console.log(dayjs(data.dateFirst).format())

    try {
      await api.post(
        '/vigencies/directory',
        {
          dateFirst: dayjs(data.dateFirst).format(),
          dateLast: dayjs(data.dateLast).format(),
          directoryId,
          vigencyLeader: data.vigencyLeader,
          vigencyAdvocate: data.vigencyAdvocate,
          vigencyLawFirm: data.vigencyLawFirm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setError('')
      console.log('Partido cadastrado com sucesso')
    } catch (error: any) {
      if (
        error.response.status === 422 ||
        error.response.status === 400 ||
        error.response.status === 404
      ) {
        setError(error.response.data.message)
      } else {
        console.log(error)
        setError('Não foi possível cadastrar vigência')
      }
    }
  }

  if (!isModalView) {
    return null
  }

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <FormProvider {...createVigencyForm}>
          <form
            onSubmit={handleSubmit(handleVigency)}
            className="flex h-full w-full flex-col items-end  p-1 py-3"
          >
            <div className="flex h-full w-full flex-col justify-between gap-6 overflow-y-auto p-8">
              <div className="flex flex-col gap-6">
                <div className="flex w-full items-start justify-between border-b-[1px]">
                  <div>
                    <h4>Cadastrar Vigência</h4>
                    <span>Cadastre uma vigência</span>
                  </div>
                  <button
                    onClick={closeViewModal}
                    className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-3">
                    <Form.Field>
                      <Form.Label htmlFor="dateFirst">Data Inicial</Form.Label>
                      <Form.TextInput type="date" name="dateFirst" />
                      <Form.ErrorMessage field="dateFirst" />
                    </Form.Field>
                    <Form.Field>
                      <Form.Label htmlFor="dateLast">Data Final</Form.Label>
                      <Form.TextInput type="date" name="dateLast" />
                      <Form.ErrorMessage field="dateLast" />
                    </Form.Field>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={addNewLeader}
                      className=" w-fit bg-gray-100  text-xs text-gray-500"
                    >
                      Representante
                    </button>

                    <button
                      type="button"
                      onClick={addNewAdvocate}
                      className=" w-fit bg-gray-100 text-xs text-gray-500"
                    >
                      Advogado
                    </button>

                    <button
                      type="button"
                      onClick={addNewLawFirm}
                      className=" w-fit bg-gray-100 text-xs text-gray-500"
                    >
                      Escritório
                    </button>
                  </div>

                  <hr />

                  <Form.Field className="flex flex-col gap-4">
                    {useFieldLeader.fields.map((fieldLeader, index) => {
                      const fleader = `vigencyLeader.${index}.leaderId`
                      const foffice = `vigencyLeader.${index}.officeId`

                      return (
                        <Form.Field key={fieldLeader.id}>
                          <Form.Label htmlFor={fleader}>
                            Representante {index + 1}
                          </Form.Label>
                          <div className="flex gap-2">
                            <Form.Field>
                              <Form.SelectInput
                                onChange={(e) =>
                                  setSelectedLeader(e.target.value)
                                }
                                value={selectedLeader}
                                type="text"
                                placeholder="Selecione representante"
                                name={fleader}
                              >
                                {leaderies.map((leader, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={leader.id.toString()}
                                    >
                                      {leader.id}
                                    </option>
                                  )
                                })}
                              </Form.SelectInput>
                              <Form.ErrorMessage field={fleader} />
                            </Form.Field>

                            <Form.Field>
                              <Form.SelectInput
                                onChange={(e) =>
                                  setSelectedOffice(e.target.value)
                                }
                                type="text"
                                value={selectedOffice}
                                placeholder="Selecione cargo"
                                name={foffice}
                              >
                                {offices.map((office, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={office.id.toString()}
                                    >
                                      {office.name}
                                    </option>
                                  )
                                })}
                              </Form.SelectInput>
                              <Form.ErrorMessage field={foffice} />
                            </Form.Field>
                            <button
                              onClick={() => useFieldLeader.remove(index)}
                              type="button"
                              className="w-fit text-red-500"
                            >
                              <Trash2 className="w-4" />
                            </button>
                          </div>
                        </Form.Field>
                      )
                    })}
                  </Form.Field>

                  <Form.Field className="flex flex-col gap-4">
                    {useFieldAdvocate.fields.map((fieldAdvocate, index) => {
                      const fadvocate = `vigencyAdvocate.${index}.advocateId`

                      return (
                        <Form.Field key={fieldAdvocate.id}>
                          <Form.Label htmlFor={fadvocate}>Advogado</Form.Label>
                          <div className="flex gap-2">
                            <Form.SelectInput
                              onChange={(e) =>
                                setSelectedOffice(e.target.value)
                              }
                              type="text"
                              value={selectedOffice}
                              placeholder="Selecione advogado"
                              name={fadvocate}
                            >
                              {advocates.map((advocate) => {
                                return (
                                  <option
                                    key={advocate.id}
                                    value={advocate.id.toString()}
                                  >
                                    {advocate.name}
                                  </option>
                                )
                              })}
                            </Form.SelectInput>
                            <button
                              onClick={() => useFieldAdvocate.remove(index)}
                              type="button"
                              className="w-fit text-red-500"
                            >
                              <Trash2 className="w-4" />
                            </button>
                          </div>
                          <Form.ErrorMessage field={fadvocate} />
                        </Form.Field>
                      )
                    })}
                  </Form.Field>

                  <Form.Field className="flex flex-col gap-2">
                    {useFieldLawFirm.fields.map((fieldLawFirm, index) => {
                      const flawFirm = `vigencyLawFirm.${index}.lawFirmId`
                      return (
                        <Form.Field key={fieldLawFirm.id}>
                          <Form.Label htmlFor={flawFirm}>Escritório</Form.Label>
                          <div className="flex gap-2">
                            <Form.SelectInput
                              onChange={(e) =>
                                setSelectedOffice(e.target.value)
                              }
                              type="text"
                              value={selectedOffice}
                              placeholder="Selecione escritorio"
                              name={flawFirm}
                            >
                              {lawFirms.map((lawFirm) => {
                                return (
                                  <option
                                    key={lawFirm.id}
                                    value={lawFirm.id.toString()}
                                  >
                                    {lawFirm.name}
                                  </option>
                                )
                              })}
                            </Form.SelectInput>
                            <button
                              onClick={() => useFieldLawFirm.remove(index)}
                              type="button"
                              className="w-fit text-red-500"
                            >
                              <Trash2 className="w-4" />
                            </button>
                          </div>
                          <Form.ErrorMessage field={flawFirm} />
                        </Form.Field>
                      )
                    })}
                  </Form.Field>
                </div>
              </div>

              {error && <span className="text-sm text-red-500">{error}</span>}

              <div className="flex gap-4">
                <button
                  onClick={closeViewModal}
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
    </div>
  )
}

export default forwardRef(RegisterVigencyModel)
