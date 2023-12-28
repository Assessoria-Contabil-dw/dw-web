'use client'
import { X, Trash2, Plus } from 'lucide-react'

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
  VigencyAdvocateProps,
  VigencyLawFirmProps,
  VigencyLeadersProps,
  VigencyProps,
} from '@/interfaces/types'
import { LoadingSecond } from '@/components/Loading/second'
import { useNotify } from '@/components/Toast/toast'
import { useQuery } from 'react-query'
import { queryClient } from '@/provider/query.provider'

export interface UpdateVigencyRef {
  openViewModal: (id: string) => void
  closeViewModal: () => void
}

interface CreateVigencyProps {
  vigencyLeader: VigencyLeadersProps[]
  vigencyAdvocate: VigencyAdvocateProps[]
  vigencyLawFirm: VigencyLawFirmProps[]
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

  const [vigencyAdd, setVigencyAdd] = useState<CreateVigencyProps>()

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

  // LIDER
  const handleLeaderChange = (id: number, leaderId: number) => {
    queryClient.setQueryData(['vigencies', vigencyId], (oldData: any) => {
      return {
        ...oldData,
        vigencyLeader: oldData.vigencyLeader.map((item: any) => {
          if (item.id === id) {
            console.log(id, item.id)
            return { ...item, leaderId }
          }
          return item
        }),
      }
    })
  }

  const handleOfficeChange = (id: number, officeId: number) => {
    queryClient.setQueryData(['vigencies', vigencyId], (oldData: any) => {
      return {
        ...oldData,
        vigencyLeader: oldData.vigencyLeader.map((item: any) => {
          if (item.id === id) {
            console.log(id, item.id)

            return { ...item, officeId }
          }
          return item
        }),
      }
    })
  }

  const handleRemoveLeader = (leaderId: number) => {
    setVigencyAdd((prevSelected: CreateVigencyProps | undefined) => {
      if (!prevSelected) {
        return undefined
      }

      const newSelected = {
        ...prevSelected,
        vigencyLeader: prevSelected.vigencyLeader.filter(
          (item) => item.id !== leaderId,
        ),
      }
      console.log(newSelected)
      return newSelected
    })
  }

  const handleDeleteVigency = (leaderId: number, path: string) => {
    try {
      api.delete(`/vigencies/${path}/${leaderId}`)
      queryClient.invalidateQueries('vigencies')

      notify({ message: 'Removido com sucesso', type: 'success' })
    } catch (error) {
      notify({ message: 'Não foi possível remover', type: 'error' })
    }
  }

  const handleLeaderCreate = (id: number, leaderId: number) => {
    setVigencyAdd((prevSelected: any) => {
      if (!prevSelected) {
        return undefined
      }

      const newSelected = {
        ...prevSelected,
        vigencyLeader: prevSelected.vigencyLeader.map((item: any) => {
          if (item.id === id) {
            return { ...item, id, leaderId }
          }
          return item
        }),
      }
      return newSelected
    })
  }

  const handleOfficeCreate = (id: number, officeId: number) => {
    setVigencyAdd((prevSelected: any) => {
      if (!prevSelected) {
        return undefined
      }
      console.log(id, officeId)

      const newSelected = {
        ...prevSelected,
        vigencyLeader: prevSelected.vigencyLeader.map((item: any) => {
          if (item.id === id) {
            return { ...item, id, officeId }
          }
          return item
        }),
      }
      return newSelected
    })
  }

  const handleAddLeader = (index: number) => {
    setVigencyAdd((prevSelected: any) => {
      const newIndex = index || 0
      console.log(prevSelected.vigencyLeader)

      if (!prevSelected) {
        return {
          vigencyLeader: [{ id: newIndex, leaderId: 0, officeId: 0 }],
        }
      }

      if (!prevSelected.vigencyLeader) {
        return {
          ...prevSelected,
          vigencyLeader: [{ id: newIndex, leaderId: 0, officeId: 0 }],
        }
      } else {
        return {
          ...prevSelected,
          vigencyLeader: [
            ...prevSelected.vigencyLeader,
            { id: newIndex, leaderId: 0, officeId: 0 },
          ],
        }
      }
    })
  }

  // ADVOGADO
  const handleAdvocateChange = (id: number, advocateId: number) => {
    queryClient.setQueryData(['vigencies', vigencyId], (oldData: any) => {
      return {
        ...oldData,
        vigencyAdvocate: oldData.vigencyAdvocate.map((item: any) => {
          if (item.id === id) {
            return { ...item, advocateId }
          }
          return item
        }),
      }
    })
  }

  const handleAdvocateCreate = (id: number, advocateId: number) => {
    setVigencyAdd((prevSelected: any) => {
      if (!prevSelected) {
        return undefined
      }

      const newSelected = {
        ...prevSelected,
        vigencyAdvocate: prevSelected.vigencyAdvocate.map((item: any) => {
          if (item.id === id) {
            console.log(item)
            return { id, advocateId }
          }
          return item
        }),
      }
      return newSelected
    })
  }

  const handleAddAdvocate = (index: number) => {
    setVigencyAdd((prevSelected: any) => {
      const newIndex = index || 0

      if (!prevSelected) {
        return {
          vigencyAdvocate: [{ id: newIndex, advocateId: 0 }],
        }
      }

      if (!prevSelected.vigencyAdvocate) {
        return {
          ...prevSelected,
          vigencyAdvocate: [{ id: newIndex, advocateId: 0 }],
        }
      } else {
        return {
          ...prevSelected,
          vigencyAdvocate: [
            ...prevSelected.vigencyAdvocate,
            { id: newIndex, advocateId: 0 },
          ],
        }
      }
    })
  }

  const handleRemoveAdvocate = (advocateId: number) => {
    setVigencyAdd((prevSelected: CreateVigencyProps | undefined) => {
      if (!prevSelected) {
        return undefined
      }

      const newSelected = {
        ...prevSelected,
        vigencyAdvocate: prevSelected.vigencyAdvocate.filter(
          (item) => item.id !== advocateId,
        ),
      }
      console.log(newSelected)
      return newSelected
    })
  }

  // ESCRITORIO
  const handleLawFirmChange = (id: number, lawFirmId: number) => {
    queryClient.setQueryData(['vigencies', vigencyId], (oldData: any) => {
      return {
        ...oldData,
        vigencyLawFirm: oldData.vigencyLawFirm.map((item: any) => {
          if (item.id === id) {
            return { ...item, lawFirmId }
          }
          return item
        }),
      }
    })
  }

  const handleAddLawFirm = (index: number) => {
    setVigencyAdd((prevSelected: any) => {
      const newIndex = index || 0

      if (!prevSelected) {
        return {
          vigencyLawFirm: [{ id: newIndex, lawFirmId: 0 }],
        }
      }

      if (!prevSelected.vigencyLawFirm) {
        return {
          ...prevSelected,
          vigencyLawFirm: [{ id: newIndex, lawFirmId: 0 }],
        }
      } else {
        return {
          ...prevSelected,
          vigencyLawFirm: [
            ...prevSelected.vigencyLawFirm,
            { id: newIndex, lawFirmId: 0 },
          ],
        }
      }
    })
  }

  const handleRemoveLawFirm = (lawFirmId: number) => {
    setVigencyAdd((prevSelected: CreateVigencyProps | undefined) => {
      if (!prevSelected) {
        return undefined
      }

      const newSelected = {
        ...prevSelected,
        vigencyLawFirm: prevSelected.vigencyLawFirm.filter(
          (item) => item.id !== lawFirmId,
        ),
      }
      console.log(newSelected)
      return newSelected
    })
  }

  const handleLawFirmCreate = (id: number, lawFirmId: number) => {
    setVigencyAdd((prevSelected: any) => {
      if (!prevSelected) {
        return undefined
      }

      const newSelected = {
        ...prevSelected,
        vigencyLawFirm: prevSelected.vigencyLawFirm.map((item: any) => {
          if (item.id === id) {
            return { id, lawFirmId }
          }
          return item
        }),
      }
      return newSelected
    })
  }

  const notify = useNotify()

  const handleEditFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const dateFirst = dayjs(formData.get('dateFirst') as string).format()
    const dateLast = dayjs(formData.get('dateLast') as string).format()

    const data = {
      dateFirst,
      dateLast,
      vigencyLeader: vigencyData?.vigencyLeader,
      vigencyAdvocate: vigencyData?.vigencyAdvocate,
      vigencyLawFirm: vigencyData?.vigencyLawFirm,
    }

    try {
      await api.put(`/vigencies/${vigencyId}`, {
        dateFirst: dayjs(data.dateFirst).format(),
        dateLast: dayjs(data.dateLast).format(),
        vigencyLeader: data.vigencyLeader,
        vigencyAdvocate: data.vigencyAdvocate,
        vigencyLawFirm: data.vigencyLawFirm,
      })

      notify({ type: 'success', message: 'Vigência atualizada com sucesso' })
      queryClient.invalidateQueries('vigencies')
    } catch (error: any) {
      notify({
        type: 'error',
        message: 'Não foi possível atualizar vigência',
      })
    }

    if (
      vigencyAdd?.vigencyAdvocate ||
      vigencyAdd?.vigencyLeader ||
      vigencyAdd?.vigencyLawFirm
    ) {
      const transformVigencyAdd = {
        vigencyLeader: vigencyAdd?.vigencyLeader
          ? vigencyAdd?.vigencyLeader.map((item) => {
              return {
                leaderId: item.leaderId,
                officeId: item.officeId,
              }
            })
          : [],
        vigencyAdvocate: vigencyAdd?.vigencyAdvocate
          ? vigencyAdd?.vigencyAdvocate.map((item) => {
              return {
                advocateId: item.advocateId,
              }
            })
          : [],
        vigencyLawFirm: vigencyAdd?.vigencyLawFirm
          ? vigencyAdd?.vigencyLawFirm.map((item) => {
              return {
                lawFirmId: item.lawFirmId,
              }
            })
          : [],
      }
      try {
        const response = await api.post(
          `/vigencies/${vigencyId}`,
          transformVigencyAdd,
        )
        console.log(response.data)
        notify({ message: 'Vigência criada com sucesso', type: 'success' })
        queryClient.invalidateQueries('vigencies')
      } catch (error) {
        notify({ message: 'Não foi possível criar vigência', type: 'error' })
      }
    }

    closeViewModal()
  }

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
                <div className="flex items-center gap-2">
                  <label htmlFor="">Representantes</label>
                  <button
                    type="button"
                    onClick={() =>
                      handleAddLeader(
                        Number(
                          vigencyData?.vigencyLeader
                            ? vigencyData?.vigencyLeader.length
                            : 0,
                        ) +
                          Number(
                            vigencyAdd?.vigencyLeader
                              ? vigencyAdd?.vigencyLeader.length
                              : 0,
                          ),
                      )
                    }
                    className="button-min"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {vigencyData?.vigencyLeader.map((leader, index) => {
                  return (
                    <div className="flex items-center gap-2" key={leader.id}>
                      <select
                        defaultValue={leader.leaderId}
                        name={`vigencyLeader${index}`}
                        onChange={(e) =>
                          handleLeaderChange(leader.id, Number(e.target.value))
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
                          handleOfficeChange(leader.id, Number(e.target.value))
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

                      <button
                        onClick={() => handleDeleteVigency(leader.id, 'leader')}
                        type="button"
                        className="button-tool text-red-500"
                      >
                        <Trash2 className="w-4" />
                      </button>
                    </div>
                  )
                })}

                {vigencyAdd?.vigencyLeader?.map((leader, index) => {
                  return (
                    <div className="flex items-center gap-2" key={leader.id}>
                      <select
                        name={`vigencyLeader${index}`}
                        onChange={(e) =>
                          handleLeaderCreate(leader.id, Number(e.target.value))
                        }
                      >
                        <option value="">Selecione um representante</option>

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
                          handleOfficeCreate(leader.id, Number(e.target.value))
                        }
                      >
                        <option value="">Selecione um cargo</option>
                        {offices.map((o, i) => {
                          return (
                            <option key={i} value={o.id}>
                              {o.name}
                            </option>
                          )
                        })}
                      </select>

                      <button
                        onClick={() => handleRemoveLeader(leader.id)}
                        type="button"
                        className="button-tool text-slate-500"
                      >
                        <X className="w-4" />
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="">Advogados</label>
                  <button
                    type="button"
                    onClick={() =>
                      handleAddAdvocate(
                        Number(
                          vigencyData?.vigencyAdvocate
                            ? vigencyData.vigencyAdvocate.length
                            : 0,
                        ) +
                          Number(
                            vigencyAdd?.vigencyAdvocate
                              ? vigencyAdd.vigencyAdvocate.length
                              : 0,
                          ),
                      )
                    }
                    className="button-min"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {vigencyData?.vigencyAdvocate.map((advocate, index) => {
                  return (
                    <div className="flex items-center gap-2" key={advocate.id}>
                      <select
                        defaultValue={advocate.advocateId}
                        name={`vigencyAdvocate${index}`}
                        onChange={(e) =>
                          handleAdvocateChange(
                            advocate.id,
                            Number(e.target.value),
                          )
                        }
                      >
                        {advocates.map((a, i) => {
                          return (
                            <option
                              key={i}
                              value={a.id}
                              selected={advocate.advocateId === a.id}
                            >
                              {a.name}
                            </option>
                          )
                        })}
                      </select>
                      <button
                        onClick={() =>
                          handleDeleteVigency(advocate.id, 'advocate')
                        }
                        type="button"
                        className="button-tool text-red-500"
                      >
                        <Trash2 className="w-4" />
                      </button>
                    </div>
                  )
                })}

                {vigencyAdd?.vigencyAdvocate?.map((advocate, index) => {
                  return (
                    <div className="flex items-center gap-2" key={index}>
                      <select
                        name={`vigencyAdvocate${index}`}
                        onChange={(e) =>
                          handleAdvocateCreate(
                            advocate.id,
                            Number(e.target.value),
                          )
                        }
                      >
                        <option value="">Selecione um advogado</option>
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
                        className="button-tool text-slate-500"
                      >
                        <X className="w-4" />
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="">Escritorio</label>
                  <button
                    type="button"
                    onClick={() =>
                      handleAddLawFirm(
                        Number(
                          vigencyData?.vigencyLawFirm
                            ? vigencyData.vigencyLawFirm.length
                            : 0,
                        ) +
                          Number(
                            vigencyAdd?.vigencyLawFirm
                              ? vigencyAdd.vigencyLawFirm.length
                              : 0,
                          ),
                      )
                    }
                    className="button-min"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {vigencyData?.vigencyLawFirm.map((lawFirm, index) => {
                  return (
                    <div className="flex items-center gap-2" key={lawFirm.id}>
                      <select
                        onChange={(e) =>
                          handleLawFirmChange(
                            lawFirm.id,
                            Number(e.target.value),
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
                      <button
                        onClick={() =>
                          handleDeleteVigency(lawFirm.id, 'lawfirm')
                        }
                        type="button"
                        className="button-tool text-red-500"
                      >
                        <Trash2 className="w-4" />
                      </button>
                    </div>
                  )
                })}

                {vigencyAdd?.vigencyLawFirm?.map((lawFirm, index) => {
                  return (
                    <div className="flex items-center gap-2" key={lawFirm.id}>
                      <select
                        onChange={(e) =>
                          handleLawFirmCreate(
                            lawFirm.id,
                            Number(e.target.value),
                          )
                        }
                        defaultValue={lawFirm.lawFirmId}
                        name={`vigencyLawFirm${index}`}
                      >
                        <option value="">Selecione um advogado</option>
                        {lawFirms.map((l, i) => {
                          return (
                            <option key={i} value={l.id}>
                              {l.name}
                            </option>
                          )
                        })}
                      </select>
                      <button
                        onClick={() => handleRemoveLawFirm(lawFirm.id)}
                        type="button"
                        className="button-tool text-slate-500"
                      >
                        <X className="w-4" />
                      </button>
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
