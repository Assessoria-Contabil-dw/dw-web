'use client'

import { api } from '@/lib/api'
import { Edit3, Trash2, Eye, Plus, Search, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DirectoryForm } from './RegisterDirectory'
import Link from 'next/link'
import { Loading } from '../Form/Loading'
import Cookies from 'js-cookie'
import { DirectoryProps } from '@/lib/types'

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

  function handleCreateDirectory(directories: DirectoryProps) {
    setDirectories((prevState) => prevState.concat(directories))
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
          <button className="w-fit gap-2 bg-secundary text-white">
            <Search className="w-4" />
            Pesquisar
          </button>
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
            className="w-fit bg-primary text-white"
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
                  <td className="whitespace-nowrap text-primary">
                    <Link
                      href={{
                        pathname: `directory/vigency/${directory.id}`,
                        query: {
                          id: directory.id,
                          typeOrg: directory.typeOrg,
                          city: directory.city,
                          state: directory.state,
                          party: directory.party,
                        },
                      }}
                    >
                      {directory.typeOrg} {directory.city}
                    </Link>
                  </td>
                  <td>{directory.party}</td>
                  <td>{directory.vigencyStatus ? 'Ativo' : 'Inativo'}</td>
                  <td>{directory.address == null ? '-' : directory.address}</td>
                  <td>{directory.cnpj == null ? '-' : directory.cnpj}</td>
                  <td>{directory.email == null ? '-' : directory.email}</td>
                  <td>{directory.phone == null ? '-' : directory.phone}</td>
                  <td className="w-16 ">
                    <div className="flex items-center ">
                      <button className="h-full w-auto p-1 hover:text-secundary">
                        <Eye className="w-4" />
                      </button>
                      <button className="h-full w-auto rounded p-1 hover:text-primary">
                        <Edit3 className="w-4" />
                      </button>
                      <button className="h-full w-auto rounded p-1 hover:text-red-500">
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
