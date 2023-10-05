'use client'

import { api } from '@/lib/api'
import { Edit3, Trash2, Eye, Plus, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DirectoryForm } from './RegisterDirectory'
import Link from 'next/link'
import { Loading } from '../../Form/Loading'
import Cookies from 'js-cookie'
// import { DirectoryProps } from '@/lib/types'
import { ToastContainer } from 'react-toastify'

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

export function DirectoryTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [directories, setDirectories] = useState<DirectoryProps[]>([])
  const [loading, setLoading] = useState(true)

  async function loadDirectories() {
    setLoading(true)
    const token = Cookies.get('token')
    try {
      const response = await api.get('/directories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setDirectories(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(directories)
    }
    setLoading(false)
  }
  useEffect(() => {
    loadDirectories()
  }, [])

  function handleCreateDirectory(directory: DirectoryProps) {
    setDirectories((prevState) => prevState.concat(directory))
  }

  async function handleDeleteDirectory(id: number) {
    const token = Cookies.get('token')
    try {
      await api.delete(`/directories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2">
        <Loading />
        <i className="text-gray-500">Carregando...</i>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <ToastContainer />
      <DirectoryForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateDirectory}
      />

      <div className="flex justify-between">
        <div className="flex w-fit gap-4">
          <input type="text" placeholder="Buscar por direção" />
          <input type="text" placeholder="Buscar por partido" />
          <input type="text" placeholder="Buscar por estado" />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => loadDirectories()}
            className="w-fit border-[1px]  border-gray-200 bg-white text-gray-700"
          >
            <RotateCcw className="w-4" />
            Atualizar
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="button-primary"
          >
            <Plus className="w-4" />
            Cadastrar
          </button>
        </div>
      </div>

      <fieldset className="h-auto w-full rounded-lg px-3 py-2">
        <table>
          <thead>
            <tr>
              <th>Direção</th>
              <th>Partido</th>
              <th>Vigência</th>
              <th>Endereço</th>
              <th>CNPJ</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Site</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {directories.length > 0 ? (
              directories.map((directory) => (
                <tr key={directory.id}>
                  <td className=" text-secondH">
                    <Link
                      href={{
                        pathname: `/painel/directory/vigency/${directory.id}`,
                      }}
                    >
                      {directory.surname}
                    </Link>
                  </td>
                  <td>{directory.party}</td>
                  <td>
                    <span
                      className={
                        directory.vigencyStatus
                          ? `rounded-xl bg-blue-100 px-2 py-1 text-blue-400`
                          : `rounded-xl bg-zinc-100 px-2 py-1 text-gray-400`
                      }
                    >
                      {directory.vigencyStatus ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>{directory.address == null ? '-' : directory.address}</td>
                  <td>{directory.cnpj == null ? '-' : directory.cnpj}</td>
                  <td>{directory.email == null ? '-' : directory.email}</td>
                  <td>{directory.phone == null ? '-' : directory.phone}</td>
                  <td className="w-16 ">
                    <div className="flex items-center ">
                      <button className="hover:text-secundary h-full w-auto p-1">
                        <Eye className="w-4" />
                      </button>
                      <button className="h-full w-auto rounded p-1 hover:text-primary">
                        <Edit3 className="w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDirectory(directory.id)}
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
                <td colSpan={8} className="py-6 text-center">
                  Nenhum diretório cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </fieldset>
    </div>
  )
}
