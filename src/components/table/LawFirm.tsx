'use client'

import { api } from '@/lib/api'
import { Edit3, Trash2, Eye, Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { LawFirmForm } from '../form/LawFirm'

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
export function LawFirmTable() {
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
      <LawFirmForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex w-96 gap-4">
        <input type="text" placeholder="Buscar por escritório" />
        <button className="w-fit gap-2 bg-secundary text-white">
          <Search size={18} />
          Pesquisar
        </button>
      </div>

      <fieldset className="h-auto w-full rounded-lg px-3 py-2">
        <table>
          <thead>
            <tr>
              <th>Escritório</th>
              <th>Endereço</th>
              <th>CNPJ</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Advogados</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nome</td>
              <td>Endereço</td>
              <td>00000000</td>
              <td>email</td>
              <td>telefone</td>
              <td>
                <div className="h-20 overflow-y-scroll">
                  <ul className="flex flex-col">
                    <li>Nome completo</li>
                    <li>Nome completo</li>
                    <li>Nome completo</li>
                    <li>Nome completo</li>
                  </ul>
                </div>
              </td>
              <td>
                <div className="flex w-fit items-center  justify-center gap-2">
                  <button className="rounded p-0 hover:text-secundary">
                    <Eye size={16} />
                  </button>
                  <button className="rounded p-0 hover:text-primary">
                    <Edit3 size={16} />
                  </button>
                  <button className="rounded p-0 hover:text-red-500">
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
          Cadastrar Escritório
        </button>
      </div>
    </div>
  )
}
