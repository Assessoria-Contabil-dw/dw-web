'use client'
import { X, Trash2, MoreHorizontal, Plus } from 'lucide-react'

import { api } from '@/lib/api'
import {
  useEffect,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useCallback,
  FormEvent,
} from 'react'
import dayjs from 'dayjs'
import {
  AdvocateProps,
  LawFirmProps,
  LeaderProps,
  OfficesProps,
  VigencyProps,
} from '@/@types/types'
import { LoadingSecond } from '@/components/Loading/second'
import { useNotify } from '@/components/Toast/toast'
import { useQuery } from 'react-query'
import { queryClient } from '@/provider/query.provider'

export interface UpdateVigencyRef {
  openViewModal: (id: string) => void
  closeViewModal: () => void
}

type leaderProps = {
  id: number
  leaderId: number
}

type officesProps = {
  id: number
  officeId: number
}

type advocateProps = {
  id: number
  advocateId: number
}
type lawFirmProps = {
  id: number
  lawFirmId: number
}

const UpdateVigencyModel: ForwardRefRenderFunction<UpdateVigencyRef> = (
  props,
  ref,
) => {
  const [vigencyId, setvigencyId] = useState('')
  const [isModalView, setIsModalView] = useState(false)

  const [leaderies, setLeader] = useState<LeaderProps[]>([])
  const [offices, setOffice] = useState<OfficesProps[]>([])
  const [lawFirms, setLawFirm] = useState<LawFirmProps[]>([])
  const [advocates, setAdvocate] = useState<AdvocateProps[]>([])

  const [selectedLeader, setSelectedLeader] = useState<leaderProps[]>([])
  const [selectedOffice, setSelectedOffice] = useState<officesProps[]>([])
  const [selectedAdvocate, setSelectedAdvocate] = useState<advocateProps[]>([])
  const [selectedLawFirm, setSelectedLawFirm] = useState<lawFirmProps[]>([])

  const openViewModal = useCallback((id: string) => {
    setvigencyId(id)
    setIsModalView(true)
  }, [])

  const closeViewModal = useCallback(() => {
    setIsModalView(false)
  }, [])

  useImperativeHandle(ref, () => ({
    openViewModal,
    closeViewModal,
  }))

  const { data: vigencyData, isLoading } = useQuery<VigencyProps>(
    ['vigencies', vigencyId],
    async () => {
      const response = await api.get(`/vigencie/update/${vigencyId}`)
      console.log(response.data.vigencyLeader)

      return response.data
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
      retry: 2,
      enabled: isModalView,
    },
  )

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
  }, [vigencyId])

  const handleLeaderChange = (
    index: number,
    selectedLeaderId: number,
    id: number,
  ) => {
    setSelectedLeader((prevSelected) => {
      const newSelected = [...prevSelected]
      newSelected[index] = { id, leaderId: selectedLeaderId }
      return newSelected
    })
  }

  const handleOfficeChange = (
    index: number,
    selectedOfficeId: number,
    id: number,
  ) => {
    setSelectedOffice((prevSelected) => {
      const newSelected = [...prevSelected]
      newSelected[index] = { id, officeId: selectedOfficeId }
      return newSelected
    })
  }

  const handleAdvocateChange = (
    index: number,
    selectedAdvocateId: number,
    id: number,
  ) => {
    setSelectedAdvocate((prevSelected) => {
      const newSelected = [...prevSelected]
      newSelected[index] = { id, advocateId: selectedAdvocateId }
      return newSelected
    })
  }
  const handleRemoveAdvocate = (advocateId: number) => {
    queryClient.setQueryData<VigencyProps>(
      ['vigencies', vigencyId],
      (prevData: any) => {
        const updatedAdvocates = prevData.vigencyAdvocate.filter(
          (item: any) => item.id !== advocateId,
        )
        return {
          ...prevData,
          vigencyAdvocate: updatedAdvocates,
        }
      },
    )
  }

  const handleLawFirmChange = (
    index: number,
    selectedLawFirmId: number,
    id: number,
  ) => {
    setSelectedLawFirm((prevSelected) => {
      const newSelected = [...prevSelected]
      newSelected[index] = { id, lawFirmId: selectedLawFirmId }
      return newSelected
    })
  }

  const notify = useNotify()

  const handleEditFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const dateFirst = dayjs(formData.get('dateFirst') as string).format()
    const dateLast = dayjs(formData.get('dateLast') as string).format()

    const vigencyLeader = selectedLeader.map((id, index) => ({
      id: id.id,
      leaderId: id.leaderId,
      officeId: selectedOffice[index].officeId,
    }))

    const vigencyAdvocate = selectedAdvocate.map((id) => {
      return {
        id: id.id,
        advocateId: id.advocateId,
      }
    })

    const vigencyLawFirm = selectedLawFirm.map((id) => {
      return {
        id: id.id,
        lawFirmId: id.lawFirmId,
      }
    })
    const data = {
      dateFirst,
      dateLast,
      vigencyLeader:
        vigencyLeader.length !== 0 ? vigencyLeader : vigencyData?.vigencyLeader,
      vigencyAdvocate:
        vigencyAdvocate.length !== 0
          ? vigencyAdvocate
          : vigencyData?.vigencyAdvocate,
      vigencyLawFirm:
        vigencyLawFirm.length !== 0
          ? vigencyLawFirm
          : vigencyData?.vigencyLawFirm,
    }

    console.log(data)
  }
  // async function handleEditFormSubmit(event: FormEvent<HTMLFormElement>) {
  // try {
  //   await api.put('/vigencies/directory', {
  //     dateFirst: dayjs(data.dateFirst).format(),
  //     dateLast: dayjs(data.dateLast).format(),
  //     vigencyLeader: data.vigencyLeader,
  //     vigencyAdvocate: data.vigencyAdvocate,
  //     vigencyLawFirm: data.vigencyLawFirm,
  //   })

  //   setError('')
  //   notify({ type: 'success', message: 'Vigência atualizada com sucesso' })
  // } catch (error: any) {
  //   if (
  //     error.response.status === 422 ||
  //     error.response.status === 400 ||
  //     error.response.status === 404
  //   ) {
  //     setError(error.response.data.message)
  //   } else {
  //     console.log(error)
  //     setError('Não foi possível atualizar vigência')
  //   }
  // }

  if (!isModalView) {
    return null
  }

  return (
    <div className="model-bg">
      <div className="model-size">
        <div className="model-card">
          <div className="model-header ">
            <div>
              <h4>Cadastrar Vigência</h4>
            </div>
            <button
              onClick={closeViewModal}
              className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          {isLoading ? (
            <div className="model-loading">
              <LoadingSecond />
            </div>
          ) : (
            <form className="model-body " onSubmit={handleEditFormSubmit}>
              <div>
                <label htmlFor="dateFirst">Data Inicial</label>
                <input
                  type="date"
                  name="dateFirst"
                  defaultValue={vigencyData?.dateFirst}
                />
              </div>
              <div>
                <label htmlFor="dateLast">Data Final</label>
                <input
                  type="date"
                  name="dateLast"
                  defaultValue={vigencyData?.dateLast}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="">Representantes</label>
                {vigencyData?.vigencyLeader.map((leader, index) => {
                  return (
                    <div className="flex gap-2" key={leader.id}>
                      <select
                        defaultValue={leader.leaderId}
                        name={`vigencyLeader${index}`}
                        onChange={(e) =>
                          handleLeaderChange(
                            index,
                            Number(e.target.value),
                            leader.id,
                          )
                        }
                      >
                        {leaderies.map((l, i) => {
                          return (
                            <option key={i} value={l.id}>
                              {l.name}
                            </option>
                          )
                        })}
                      </select>

                      <select
                        name={`vigencyOffice${index}`}
                        onChange={(e) =>
                          handleOfficeChange(
                            index,
                            Number(e.target.value),
                            leader.id,
                          )
                        }
                        defaultValue={leader.officeId}
                      >
                        {offices.map((o, i) => {
                          return (
                            <option key={i} value={o.id}>
                              {o.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  )
                })}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="">Advogados</label>
                  <button
                    type="button"
                    // onClick={addNewAdvocate}
                    className="button-min"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {vigencyData?.vigencyAdvocate.map((advocate, index) => {
                  return (
                    <div className="flex gap-2" key={advocate.id}>
                      <select
                        defaultValue={advocate.advocateId}
                        name={`vigencyAdvocate${index}`}
                        onChange={(e) =>
                          handleAdvocateChange(
                            index,
                            Number(e.target.value),
                            advocate.id,
                          )
                        }
                      >
                        {advocates.map((a, i) => {
                          return (
                            <option key={i} value={a.id}>
                              {a.name}
                            </option>
                          )
                        })}
                      </select>
                      <button
                        onClick={() => handleRemoveAdvocate(advocate.id)}
                        type="button"
                        className="w-fit text-red-500"
                      >
                        <Trash2 className="w-4" />
                      </button>
                    </div>
                  )
                })}
              </div>

              <div>
                <label htmlFor="">Escritorio</label>
                {vigencyData?.vigencyLawFirm.map((lawFirm, index) => {
                  return (
                    <div className="flex gap-2" key={lawFirm.id}>
                      <select
                        onChange={(e) =>
                          handleLawFirmChange(
                            index,
                            Number(e.target.value),
                            lawFirm.id,
                          )
                        }
                        defaultValue={lawFirm.lawFirmId}
                        name={`vigencyLawFirm${index}`}
                      >
                        {lawFirms.map((l, i) => {
                          return (
                            <option key={i} value={l.id}>
                              {l.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={closeViewModal}
                  className="bg-gray-200 text-gray-500 hover:bg-gray-300 "
                >
                  Cancelar
                </button>
                <button type="submit" className="button-primary">
                  Atualizar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default forwardRef(UpdateVigencyModel)
