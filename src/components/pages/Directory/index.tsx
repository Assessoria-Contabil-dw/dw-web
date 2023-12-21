'use client'

import { api } from '@/lib/api'
import { Circle, Trash2, Plus } from 'lucide-react'
import { ChangeEvent, useCallback, useContext, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { Page } from '@/@types/page'
import { PaddingButtons } from '@/components/Buttons/next'
import { RefreshButton } from '@/components/Buttons/refresh'
import { LoadingPrimary } from '@/components/Loading/primary'
import { useRouter } from 'next/navigation'
import { AccessContext } from '@/provider/context.provider'
import { useNotify } from '@/components/Toast/toast'
import SearchParty from '@/components/Search/party'
import SearchState from '@/components/Search/state'
import SearchCity from '@/components/Search/city'
import SearchVigency from '@/components/Search/status'
import { User } from '@/lib/auth'
import { queryClient } from '@/provider/query.provider'
import DirectoryForm, { RegisterDirectoryModalProps } from './RegisterDirectory'
import { DirectoryService } from '@/services/directory.service'

interface DirectoryProps {
  id: number

  cnpj: string
  address: string
  siteUrl: string
  email: string
  phone: string
  mailingAddress: string
  virgencyStatus: string
  surname: string
  mailingList: string
  vigencyStatus: string
  city: string
  state: string
  party: string

  typeOrg: string
  partyId: number
  cityCode: number
}

type Search = {
  city?: string
  state?: string
  party?: string
  vigencyStatus?: string
}

export function DirectoryTable() {
  const [page, setPage] = useState(0)
  const router = useRouter()
  const notify = useNotify()
  const directoryService = new DirectoryService()

  const modalRegisterRef = useRef<RegisterDirectoryModalProps>(null)
  const handleRegisterModal = useCallback(() => {
    modalRegisterRef.current?.openModal()
  }, [])

  const { modulesArray, partyCode, cityCode, stateId, handleSetRouter } =
    useContext(AccessContext)

  const user: User = queryClient.getQueryData('authUser') as User

  const [search, setSearch] = useState<Search>({} as Search)
  const prevPage = useCallback(() => {
    setPage((old) => Math.max(old - 1, 0))
  }, [])
  const nextPage = useCallback(() => {
    setPage((old) => old + 1)
  }, [])

  const { data, isLoading, isFetching, isPreviousData } = useQuery<
    Page<DirectoryProps>
  >(
    [
      'directories',
      page,
      search.city,
      search.state,
      search.party,
      search.vigencyStatus,
      partyCode,
      cityCode,
      stateId,
    ],
    () =>
      directoryService.getAll(
        page,
        15,
        search.party,
        search.city,
        search.state,
        search.vigencyStatus,
        partyCode,
        cityCode,
        stateId,
      ),
    {
      keepPreviousData: true,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60, // 10 minute
      onError: (error: any) => {
        if (error.response.status === 403) {
          notify({ type: 'warning', message: error.response.data.message })
          router.push('/painel')
        }
        console.log(error)
      },
    },
  )

  function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.target

    if (name === 'name' && value.length < 3) {
      setSearch((old) => ({ ...old, [name]: undefined }))
      return
    }

    if (name === 'state' && value === '') {
      setSearch((old) => ({ ...old, city: undefined }))
    }
    setPage(0)
    setSearch((old) => ({ ...old, [name]: value || undefined }))
  }

  async function handleDeleteDirectory(id: number) {
    try {
      await api.delete(`/directories/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingPrimary />
      </div>
    )
  }

  if (!modulesArray && user?.role === 'CLIENT') {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      <DirectoryForm ref={modalRegisterRef} />

      <div className="grid grid-flow-col items-end gap-2 max-sm:grid-flow-row max-sm:grid-cols-2">
        {!partyCode && (
          <SearchParty handleSearchOnChange={handleSearchOnChange} />
        )}

        {!stateId && (
          <SearchState handleSearchOnChange={handleSearchOnChange} />
        )}

        {!cityCode && (
          <SearchCity
            stateId={search.state}
            handleSearchOnChange={handleSearchOnChange}
          />
        )}

        <SearchVigency handleSearchOnChange={handleSearchOnChange} />

        <RefreshButton isLoading={isFetching} queryName="directories" />

        {user?.role === 'ADMIN' && (
          <button
            onClick={() => handleRegisterModal()}
            className="button-primary"
          >
            <Plus className="w-4" />
            Cadastrar
          </button>
        )}
      </div>

      <div className="space-y-2">
        <fieldset className="h-auto rounded-lg px-3 py-2">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Direção</th>
                <th>Partido</th>
                <th>Estado</th>
                <th>Endereço</th>
                <th>CNPJ</th>
                <th>E-mail</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.results != null ? (
                data?.results.map((directory) => (
                  <tr key={directory.id}>
                    <td
                      className="cursor-pointer "
                      title={directory.vigencyStatus ? 'Ativo' : 'Inativo'}
                    >
                      <Circle
                        className={
                          directory.vigencyStatus
                            ? `fill-second text-second`
                            : ` fill-slate-300  text-slate-300`
                        }
                        size={12}
                      />
                    </td>
                    <td className=" text-secondHover">
                      <button
                        disabled={
                          user?.role === 'CLIENT'
                            ? !modulesArray.modules.find(
                                (item) =>
                                  item.module === 'Visualizar Vigências',
                              )
                            : false
                        }
                        onClick={() =>
                          handleSetRouter(
                            `/painel/diretorio/vigencia/${directory.id}`,
                          )
                        }
                        className="disabled:text-slate-4 h-fit w-full items-start justify-start whitespace-break-spaces p-0 text-start text-xs font-medium disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {directory.surname}
                      </button>
                    </td>
                    <td>{directory.party}</td>
                    <td>{directory.state == null ? '-' : directory.state}</td>
                    <td>
                      {directory.address == null ? '-' : directory.address}
                    </td>
                    <td>{directory.cnpj == null ? '-' : directory.cnpj}</td>
                    <td>{directory.email == null ? '-' : directory.email}</td>
                    <td>
                      {user?.role === 'ADMIN' && (
                        <div className="flex items-center ">
                          {/* <button className="hover:text-secundary h-full w-auto p-1">
                          <Eye className="w-4" />
                        </button> */}
                          <button
                            onClick={() => handleDeleteDirectory(directory.id)}
                            type="button"
                            className="h-full w-auto rounded p-1 hover:text-red-500"
                          >
                            <Trash2 className="w-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-6  text-center">
                    Nenhum diretório cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </fieldset>

        <div className="z-0 flex w-full justify-end">
          {data?.results !== null ? (
            <PaddingButtons
              pages={data?.info?.pages ? data?.info?.pages : 0}
              page={page}
              isPreviousData={isPreviousData}
              nextPage={nextPage}
              prevPage={prevPage}
              next={data?.info?.next ? data?.info?.next : null}
              isFetching={isFetching}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
