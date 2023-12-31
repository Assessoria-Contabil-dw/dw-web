'use client'
import { api } from '@/lib/api'
import { useQuery } from 'react-query'
import { Edit3, KeyIcon } from 'lucide-react'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { Page } from '@/interfaces/page'
// import DeletModel, { DeletRef } from '../Model/Delet'
import { RefreshButton } from '../../Buttons/ButtonRefresh'
// import Register from './Register'
import UpdateUser, { UpdateUserRef } from './Update'
import PasswordUser, { PasswordUserRef } from './Password'
import Register, { RegisterUserRef } from './Register'
import Link from 'next/link'
import { PaddingButtons } from '@/components/Buttons/next'
import { LoadingSecond } from '@/components/Loading/second'
export interface UserProps {
  id: number
  name: string
  email: string
  role: string
  cpf: string
}

export function UserTable() {
  const [page, setPage] = useState(0)
  const prevPage = useCallback(() => {
    setPage((old) => Math.max(old - 1, 0))
  }, [])

  const nextPage = useCallback(() => {
    setPage((old) => old + 1)
  }, [])

  const [search, setSearch] = useState({
    cpf: undefined as string | undefined,
    name: undefined as string | undefined,
    role: undefined as string | undefined,
  })

  // const modalRegisterRef = useRef<UpdateUserRef>(null)

  // const handleRegisterModal = useCallback((id: number) => {
  //   modalRegisterRef.current?.openModal(id)
  // }, [])

  const { data, isLoading, isError, isFetching, isPreviousData } = useQuery<
    Page<UserProps>
  >(
    ['users', page, search.cpf, search.name, search.role],
    async () => {
      const response = await api
        .get('/users', {
          params: {
            skip: page,
            take: 15,
            name: search.name,
            cpf: search.cpf,
            role: search.role,
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

  function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.target

    if (name === 'name' && value.length < 3) {
      setSearch((old) => ({ ...old, [name]: undefined }))
      return
    }
    setPage(0)
    setSearch((old) => ({ ...old, [name]: value || undefined }))
  }

  const modelUpdateRef = useRef<UpdateUserRef>(null)

  const handleUpdateModal = useCallback((id: number) => {
    modelUpdateRef.current?.openModal(id)
  }, [])

  const modelPassordRef = useRef<PasswordUserRef>(null)
  const handlePasswordModal = useCallback((id: number) => {
    modelPassordRef.current?.openModal(id)
  }, [])

  const modalRegisterRef = useRef<RegisterUserRef>(null)
  const handleRegisterModal = useCallback(() => {
    modalRegisterRef.current?.openModal()
  }, [])

  if (isLoading) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2">
        <LoadingSecond />
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

  return (
    <div className="flex flex-col gap-2">
      <UpdateUser ref={modelUpdateRef} />
      <PasswordUser ref={modelPassordRef} />
      <Register ref={modalRegisterRef} />

      <div className="flex items-center justify-between gap-2">
        <div className="flex w-fit items-center gap-2">
          <input
            type="text"
            name="name"
            onChange={handleSearchOnChange}
            placeholder="Nome"
          />
          <input
            type="text"
            name="cpf"
            onChange={handleSearchOnChange}
            placeholder="CPF"
          />
          <select name="role" onChange={handleSearchOnChange}>
            <option value="">Todos</option>
            <option value="ADMIN">Administrador</option>
            <option value="CLIENT">Cliente</option>
          </select>
        </div>

        <div className="flex w-fit items-center gap-2">
          <RefreshButton queryName="parties" />

          <button
            onClick={handleRegisterModal}
            className="w-fit rounded-md bg-green-500 px-4 py-2 text-white"
          >
            Registrar
          </button>
        </div>
      </div>

      <fieldset className="h-auto w-full rounded-lg px-3 py-2">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Nível</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.results !== null ? (
              data?.results.map((user, index) => (
                <tr key={index}>
                  <td className="text-secondHover">
                    <Link
                      href={{
                        pathname: `/painel/clientes/acessos/${user.cpf}`,
                      }}
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td>{user.cpf}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>

                  <td className="w-16">
                    <div className="flex items-center ">
                      <button
                        onClick={() => handleUpdateModal(user.id)}
                        className="h-full w-auto rounded p-1 hover:text-primary"
                      >
                        <Edit3 className="w-4" />
                      </button>
                      <button
                        onClick={() => handlePasswordModal(user.id)}
                        className="h-full w-auto rounded p-1 hover:text-primary"
                      >
                        <KeyIcon className="w-4" />
                      </button>

                      {/* <button
                        onClick={() =>
                          handleDeletModal(user.name, 'users', user.id)
                        }
                        type="button"
                        className="h-full w-auto rounded p-1 hover:text-red-500"
                      >
                        <Trash2 className="w-4" />
                      </button> */}
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
      <div className="flex w-fit items-center gap-2">
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
  )
}
