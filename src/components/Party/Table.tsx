import { api } from '@/lib/api'
import { Loading } from '../Form/Loading'
import { useQuery } from 'react-query'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { Page } from '@/lib/page'
import DeletModel, { DeletRef } from '../Model/Delet'
import { RefreshButton } from '../Buttons/refresh'

export interface PartyProps {
  code: string

  name: string
  abbreviation: string
  logoUrl: string

  hex: string
}

export function PartyTable() {
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState({
    code: undefined as string | undefined,
    name: undefined as string | undefined,
  })

  const { data, isLoading, isError, isFetching, isPreviousData } = useQuery<
    Page<PartyProps>
  >(
    ['parties', page, search.code, search.name],
    async () => {
      const response = await api
        .get('/parties', {
          params: {
            skip: page,
            take: search.name || search.code !== undefined ? 20 : 15,
            name: search.name,
            code: search.code,
          },
        })
        .then((response) => response.data)
      console.log(response)
      return response
    },
    {
      keepPreviousData: true,
      staleTime: 1000 * 60,
      onSuccess: () => {
        console.log('Dados atualizados com sucesso')
      },
    },
  )

  function handleSearchOnChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    if (name === 'name' && value.length < 3) {
      setSearch((old) => ({ ...old, [name]: undefined }))
      return
    }
    setPage(0)
    setSearch((old) => ({ ...old, [name]: value || undefined }))
  }

  const modalDeleteRef = useRef<DeletRef>(null)
  const handleDeletModal = useCallback(
    (id: string, path: string, msg: string) => {
      modalDeleteRef.current?.openModal(id, path, msg)
    },
    [],
  )

  if (isLoading) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2">
        <Loading />
        <i className="text-gray-500">Carregando...</i>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2">
        <i className="text-gray-500">Algo deu errado!</i>
      </div>
    )
  }

  console.log('ola')
  return (
    <div className="flex flex-col gap-2">
      <DeletModel ref={modalDeleteRef} />

      <div className="flex items-center justify-between">
        <div className="flex w-fit items-center gap-2">
          <h4>Filtros: </h4>
          <input
            type="number"
            name="code"
            onChange={handleSearchOnChange}
            placeholder="Código"
          />
          <input
            type="text"
            name="name"
            onChange={handleSearchOnChange}
            placeholder="Partido"
          />
        </div>

        <div className="flex w-fit items-center gap-2">
          {data?.results !== null ? (
            <div className="flex items-center gap-2">
              <button
                className="h-fit rounded-full bg-primary px-1 py-1  text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 0}
              >
                <ChevronLeft size={18} />
              </button>
              <span>
                {page + 1} ... {data?.info?.pages ? data?.info?.pages + 1 : 0}
              </span>
              <button
                className="h-fit rounded-full bg-primary px-1 py-1  text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                onClick={() => {
                  if (!isPreviousData && data?.info?.next) {
                    setPage((old) => old + 1)
                  }
                }}
                disabled={isPreviousData || !data?.info?.next}
              >
                <ChevronRight size={18} />
              </button>
              {isFetching ? (
                <span>
                  <Loading />
                </span>
              ) : null}
            </div>
          ) : null}
          <RefreshButton queryName="parties" />
        </div>
      </div>

      <fieldset className="h-auto w-full rounded-lg px-3 py-2">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Sigla</th>
              <th>Partido</th>
              <th>Cor</th>
              <th>Logo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.results !== null ? (
              data?.results.map((party, index) => (
                <tr key={index}>
                  <td>{party.code}</td>
                  <td>{party.abbreviation}</td>
                  <td>{party.name}</td>
                  <td>
                    <div
                      className="h-4 w-4 rounded"
                      style={{ background: party.hex }}
                    ></div>
                  </td>
                  <td>
                    {party.logoUrl ? (
                      <Image
                        className="bg-slate-200 object-cover"
                        src={party.logoUrl}
                        width={50}
                        height={50}
                        alt="Logo do partido"
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="w-16 ">
                    <div className="flex items-center ">
                      {/* <button
                        // onClick={() => handleUpdateParty(party.code.toString())}
                        className="h-full w-auto rounded p-1 hover:text-primary"
                      >
                        <Edit3 className="w-4" />
                      </button> */}
                      <button
                        onClick={() =>
                          handleDeletModal(
                            party.code.toString(),
                            'parties',
                            party.abbreviation,
                          )
                        }
                        type="button"
                        className="h-full w-auto rounded p-1 hover:text-red-500"
                      >
                        <Trash2 className="w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center">
                  Nenhum partido encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </fieldset>
    </div>
  )
}
