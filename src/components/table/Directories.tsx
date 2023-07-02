'use client'

import { api } from '@/lib/api'
import { Edit3, Trash2, Eye, Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DirectoryForm } from '../form/Directory'
import Link from 'next/link'

type PCA = {
  id: string
  type: string
  year: string
  status: string
  numPje: string
}
type Directory = {
  id: string
  city: string
  state: string
  typeOrg: string
  SPCA: PCA[]
  SPCE: PCA[]
}
export function DirectoryTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [directories, setDirectories] = useState<Directory[]>([])

  async function loadDirectories() {
    try {
      const response = await api.get('/directories', {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      })
      setDirectories(response.data)
    } catch (error) {
      console.log(directories)
    }
  }
  useEffect(() => {
    loadDirectories()
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <DirectoryForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <input type="text" placeholder="Buscar por Partido" />
          <input type="text" placeholder="Buscar por Estado" />
          <input type="text" placeholder="Buscar por Municipio" />
          <button className="w-fit gap-2 bg-secundary text-white">
            <Search size={18} />
            Pesquisar
          </button>
        </div>
      </div>

      <fieldset className="h-auto w-full rounded-lg px-3 py-2">
        <table>
          <thead>
            <tr>
              <th>Direção</th>
              <th>Endereço</th>
              <th>CNPJ</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Cor</th>
              <th>Logo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link href="directory/vigency/id">Nome</Link>
              </td>
              <td>Endereço</td>
              <td>00000000</td>
              <td>email</td>
              <td>telefone</td>
              <td>cor</td>
              <td>logo</td>
              <td>
                <div className="flex items-center justify-center">
                  <button className=" h-full w-auto p-1 hover:text-secundary">
                    <Eye size={16} />
                  </button>
                  <button className="h-full w-auto rounded p-1 hover:text-primary">
                    <Edit3 size={16} />
                  </button>
                  <button className="h-full w-auto rounded p-0 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>

      <div>
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="w-fit bg-secundary text-white"
        >
          <Plus size={20} />
          Cadastrar Diretório
        </button>
      </div>
    </div>
  )
}
