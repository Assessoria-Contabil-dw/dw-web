'use client'

import { DirectoryProps } from '@/interfaces/types'
import { Circle, Lock } from 'lucide-react'
import { TableOptions } from '../../../Tools/TableOptions'
import { LoadingSecond } from '@/components/Loading/second'
import { queryClient } from '@/provider/query.provider'

import { useContext, useRef } from 'react'
import { AccessContext } from '@/provider/context.provider'
import DeleteModel, { DeleteRef } from '@/components/Model/Delete'
import { AccessModuleData } from '@/interfaces/access.interface'

interface TableDirectoryProps {
  role: string
  data?: DirectoryProps[] | null
  loading?: boolean
}

export default function TableDirectory({
  role,
  data,
  loading,
}: TableDirectoryProps) {
  const { setRouter } = useContext(AccessContext)
  const modulesData: AccessModuleData = queryClient.getQueryData(
    'accessModuleData',
  ) as AccessModuleData

  const handleButtonClick = (id: number) => {
    setRouter(`/painel/diretorio/vigencia/${id}`)
  }

  const modelDeleteRef = useRef<DeleteRef>(null)
  const handleDeleteDirectory = (id: number, surname: string) => {
    modelDeleteRef.current?.openModal(
      String(id),
      'directories',
      `Deseja excluir o diretório ${surname}?`,
      'directoryData',
    )
  }

  function handleViewDirectory() {}
  function handleEditDirectory() {}

  return (
    <>
      <DeleteModel ref={modelDeleteRef} />
      <fieldset className=" fieldset ">
        <table>
          <thead>
            <tr>
              <th>{loading && <LoadingSecond />}</th>
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
            {data ? (
              data.map((directory) => (
                <tr key={directory.id}>
                  <td
                    className="cursor-pointer"
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
                  <td>
                    <button
                      title="Visualizar Vigências"
                      disabled={
                        role === 'CLIENT'
                          ? !modulesData?.modules.find(
                              (item) => item.module === 'Visualizar Vigências',
                            )
                          : false
                      }
                      onClick={() => {
                        handleButtonClick(directory.id)
                      }}
                      className="group flex items-center gap-1 whitespace-nowrap text-start font-medium text-secondHover disabled:cursor-not-allowed disabled:text-slate-400"
                    >
                      {directory.surname}
                      <i className="hidden group-disabled:block">
                        <Lock size={12} />
                      </i>
                    </button>
                  </td>
                  <td className="uppercase">{directory.party}</td>
                  <td className="uppercase">
                    {directory.state == null ? '-' : directory.state}
                  </td>
                  <td className="capitalize">
                    {directory.address == null
                      ? '-'
                      : directory.address.toLocaleLowerCase()}
                  </td>
                  <td className="whitespace-nowrap">
                    {directory.cnpj == null ? '-' : directory.cnpj}
                  </td>
                  <td className="whitespace-nowrap">
                    {directory.email == null ? '-' : directory.email}
                  </td>
                  <td>
                    <TableOptions
                      role={role || ''}
                      isView
                      isEdit
                      isDelete
                      handleView={handleViewDirectory}
                      handleEdit={handleEditDirectory}
                      handleDelete={() =>
                        handleDeleteDirectory(directory.id, directory.surname)
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-6 text-center">
                  Nenhum diretório cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </fieldset>
    </>
  )
}
