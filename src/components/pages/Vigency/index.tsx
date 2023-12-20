import { api } from '@/lib/api'
import { Edit3, Eye, Plus, Trash2 } from 'lucide-react'
import { useCallback, useContext, useRef } from 'react'
import ViewVigencyModel, { ViewVigencyRef } from './ViewVigency'
import RegisterVigencyModel, { RegisterVigencyRef } from './RegisterVigency'
import { ButtomBack } from '@/components/Buttons/back'
import { LoadingPrimary } from '@/components/Loading/primary'
import { useQuery } from 'react-query'
import { useNotify } from '@/components/Toast/toast'
import { useRouter } from 'next/navigation'
import { AccessContext } from '@/provider/context.provider'
import { RefreshButton } from '@/components/Buttons/refresh'
import { User } from '@/lib/auth'
import { queryClient } from '@/provider/query.provider'
import DeletModel, { DeletRef } from '@/components/Model/Delet'
import UpdateVigency, { UpdateVigencyRef } from './UpdateVigency'

interface VigencyTableProps {
  directoryId: string
}

interface Leader {
  id: number
  name: string
  signatureUrl: string
}
interface Vigency {
  id: number
  dateFirst: string
  dateLast: string
  status: boolean
  president: Leader
  vicePresident: Leader
  treasurer: Leader
  advocate: Leader
}

interface VProps {
  directoryId: string
  status: boolean
  surname: string
  vigencyActive: Vigency[]
  vigencyInactive: Vigency[]
}

export function VigencyTable({ directoryId }: VigencyTableProps) {
  const notify = useNotify()
  const router = useRouter()
  const { partyCode, cityCode, stateId } = useContext(AccessContext)
  const user: User = queryClient.getQueryData('authUser') as User

  const modalViewRef = useRef<ViewVigencyRef>(null)
  const modalRegisterRef = useRef<RegisterVigencyRef>(null)
  const modalDeleteRef = useRef<DeletRef>(null)
  const modalUpdateRef = useRef<UpdateVigencyRef>(null)

  const handleViewModal = useCallback((id: string) => {
    modalViewRef.current?.openModal(id)
  }, [])

  const handleRegisterModal = useCallback((id: string) => {
    modalRegisterRef.current?.openViewModal(id)
  }, [])

  const handleUpdateModal = useCallback((id: string) => {
    modalUpdateRef.current?.openViewModal(id)
  }, [])

  const handleDeletModal = useCallback(
    (id: string, path: string, msg: string) => {
      modalDeleteRef.current?.openModal(id, path, msg)
    },
    [],
  )

  const { data, isLoading, error } = useQuery<VProps>(
    ['vigencies', directoryId],
    async () => {
      const response = await api.get(`/vigencies/directory/${directoryId}`, {
        params: {
          partyCode: partyCode === 0 ? null : partyCode,
          cityCode,
          stateId,
        },
      })
      return response.data
    },
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      onError: (error: any) => {
        if (error.response.status === 403) {
          notify({ type: 'warning', message: error.response.data.message })
          router.push('/painel')
        }
        console.log(error)
      },
    },
  )

  if (isLoading) {
    return (
      <div className="mt-4 flex h-full w-full items-center justify-center gap-2">
        <LoadingPrimary />
      </div>
    )
  }

  if (error) {
    return null
  }

  return (
    <div className="flex flex-col gap-8">
      <RegisterVigencyModel ref={modalRegisterRef} />
      <DeletModel ref={modalDeleteRef} />
      <UpdateVigency ref={modalUpdateRef} />
      <ViewVigencyModel ref={modalViewRef} />

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            <ButtomBack />
            <div className="flex flex-col">
              <h2>Vigência</h2>
              <span>
                {data?.surname} ({data?.status ? 'Ativo' : 'Inativo'})
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <RefreshButton queryName="vigencies" />
            {user?.role === 'ADMIN' && (
              <button
                onClick={() => handleRegisterModal(directoryId)}
                className="button-primary"
              >
                <Plus className="w-4" />
                Cadastrar
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4>Vigência Ativa</h4>
          <fieldset className="h-auto w-full rounded-lg px-3 py-2">
            <table>
              <thead>
                <tr>
                  <th>Data Inicial</th>
                  <th>Data Final</th>
                  <th>Presidente</th>
                  <th>Vice Presidente</th>
                  <th>Tesoureiro</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.vigencyActive != null ? (
                  data.vigencyActive.map((v, index) => (
                    <tr key={index}>
                      <td>{v.dateFirst != null ? v.dateFirst : '-'}</td>
                      <td>{v.dateLast != null ? v.dateLast : '-'}</td>
                      <td>
                        {v.president?.name != null ? v.president.name : '-'}
                      </td>
                      <td>
                        {v.vicePresident?.name != null
                          ? v.vicePresident.name
                          : '-'}
                      </td>
                      <td>
                        {v.treasurer?.name != null ? v.treasurer.name : '-'}
                      </td>

                      <td className="w-16 ">
                        {user?.role === 'ADMIN' && (
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => handleViewModal(v.id.toString())}
                              className="h-full w-auto rounded p-1 hover:text-second"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleUpdateModal(v.id.toString())}
                              className="h-full w-auto rounded p-1 hover:text-primary"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() =>
                                handleDeletModal(
                                  v.id.toString(),
                                  'vigencies',
                                  v.dateFirst + ' - ' + v.dateLast,
                                )
                              }
                              className="h-full w-auto rounded p-1 hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="py-6 text-center">
                      Nenhuma vigência ativa
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </fieldset>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h4>Histórico</h4>
        <fieldset className="h-auto w-full rounded-lg px-3 py-2">
          <table>
            <thead>
              <tr>
                <th>Data Inicial</th>
                <th>Data Final</th>
                <th>Presidente</th>
                <th>Vice Presidente</th>
                <th>Tesoureiro</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.vigencyInactive != null ? (
                data.vigencyInactive.map((v, index) => (
                  <tr key={index}>
                    <td>{v.dateFirst != null ? v.dateFirst : '-'}</td>
                    <td>{v.dateLast != null ? v.dateLast : '-'}</td>
                    <td>
                      {v.president?.name != null ? v.president.name : '-'}
                    </td>
                    <td>
                      {v.vicePresident?.name != null
                        ? v.vicePresident.name
                        : '-'}
                    </td>
                    <td>
                      {v.treasurer?.name != null ? v.treasurer.name : '-'}
                    </td>
                    <td className="w-16 ">
                      {user?.role === 'ADMIN' && (
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => handleViewModal(v.id.toString())}
                            className="h-full w-auto rounded p-1 hover:text-second"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleUpdateModal(v.id.toString())}
                            className="h-full w-auto rounded p-1 hover:text-primary"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleDeletModal(
                                v.id.toString(),
                                'vigencies',
                                v.dateFirst + ' - ' + v.dateLast,
                              )
                            }
                            className="h-full w-auto rounded p-1 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-6 text-center">
                    Histórico vazio
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </fieldset>
      </div>
    </div>
  )
}
