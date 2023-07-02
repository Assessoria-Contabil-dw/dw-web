'use client'

import { api } from '@/lib/api'
import { Edit3, Trash2, Eye, Plus, Search, Circle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PCAForm } from '../form/PCA'

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
export function PCATable() {
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
      <PCAForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex w-fit gap-4">
        <input type="text" placeholder="Buscar por Direção" />
        <button className="w-fit gap-2 bg-secundary text-white">
          <Search size={18} />
          Pesquisar
        </button>
      </div>

      <fieldset className="h-auto w-full rounded-lg px-3 py-2">
        <table>
          <thead>
            <tr>
              <th>Direção</th>
              <th>SPCA</th>
              <th>Vigência</th>
              <th>SPCE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="whitespace-nowrap">DR Cidade</td>
              <td>
                <ul>
                  <li className="relative">
                    <a
                      className=" bg-red-400 bg-opacity-30 text-red-400"
                      href="/"
                    >
                      2020
                    </a>
                    <Circle
                      className="absolute -right-1 -top-2 cursor-pointer fill-primary text-primary"
                      size={12}
                    />
                  </li>
                  <li>
                    <a
                      className="bg-red-400 bg-opacity-30 text-red-400"
                      href="/"
                    >
                      2020
                    </a>
                  </li>
                  <li>
                    <a
                      className="bg-red-400 bg-opacity-30 text-red-400"
                      href="/"
                    >
                      2020
                    </a>
                  </li>
                  <li>
                    <a
                      className="bg-red-400 bg-opacity-30 text-red-400"
                      href="/"
                    >
                      2020
                    </a>
                  </li>
                </ul>
              </td>
              <td>Vigência</td>
              <td>
                <ul>
                  <li>
                    <a
                      className="bg-red-400 bg-opacity-30 text-red-400"
                      href="/"
                    >
                      2020
                    </a>
                  </li>
                  <li>
                    <a
                      className="bg-red-400 bg-opacity-30 text-red-400"
                      href="/"
                    >
                      2020
                    </a>
                  </li>
                </ul>
              </td>

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
          Cadastrar PCA
        </button>
      </div>
    </div>
  )
}
