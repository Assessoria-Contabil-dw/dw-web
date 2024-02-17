'use client'
import { Circle, KeyIcon } from 'lucide-react'
import { useCallback, useRef } from 'react'
import UpdateUser, { UpdateUserRef } from './Update'
import PasswordUser, { PasswordUserRef } from './Password'
import Link from 'next/link'
import { TableOptions } from '@/components/private/Tools/TableOptions'
import { UserProps } from '@/interfaces/user.interface'
import DeleteModel, { DeleteRef } from '@/components/Model/Delete'

interface TableUserProps {
  loading?: boolean
  data: UserProps[] | null
}
export function TableUser({ loading, data }: TableUserProps) {
  const modelUpdateRef = useRef<UpdateUserRef>(null)

  const handleUpdateModal = useCallback((id: number) => {
    modelUpdateRef.current?.openModal(id)
  }, [])

  const modelPassordRef = useRef<PasswordUserRef>(null)
  const handlePasswordModal = useCallback((id: number) => {
    modelPassordRef.current?.openModal(id)
  }, [])

  const modelDeleteRef = useRef<DeleteRef>(null)
  const handleDeleteUser = (id: number, name: string) => {
    modelDeleteRef.current?.openModal(
      String(id),
      'users',
      `Deseja excluir o usuário ${name}?`,
      'userData',
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <UpdateUser ref={modelUpdateRef} />
      <PasswordUser ref={modelPassordRef} />
      <DeleteModel ref={modelDeleteRef} />
      <fieldset className="fieldset">
        <table id='table-style'>
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Nível</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data !== null ? (
              data.map((user, index) => (
                <tr key={index}>
                  <td
                    className="cursor-pointer"
                    title={user.disabled ? 'Ativo' : 'Inativo'}
                  >
                    <Circle
                      className={
                        user.disabled
                          ? `fill-second text-second`
                          : ` fill-slate-300  text-slate-300`
                      }
                      size={12}
                    />
                  </td>
                  <td className="text-secondHover">
                    <Link
                      href={{
                        pathname: `/clientes/acessos/${user.cpf}`,
                      }}
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td>{user.cpf}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>

                  <td>
                    <TableOptions
                      role="ADMIN"
                      isView={false}
                      isEdit
                      isDelete
                      // handleView={handleViewDirectory}
                      handleEdit={() => handleUpdateModal(user.id)}
                      handleDelete={() => handleDeleteUser(user.id, user.name)}
                    >
                      <button
                        onClick={() => handlePasswordModal(user.id)}
                        className="h-full px-1 hover:text-second"
                      >
                        <KeyIcon size={16} />
                      </button>
                    </TableOptions>
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
