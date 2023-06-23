'use client'

import { api } from '@/lib/api'
import { ChevronLeft, Edit3, Eye, FileText, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
export function VigencyTable() {
  const [directories, setDirectories] = useState<Directory[]>([])

  async function loadDirectories() {
    try {
      const response = await api.get('/vigencies/directory', {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      })
      setDirectories(response.data)
      console.log(directories)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    loadDirectories()
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            <button className="w-fit bg-gray-100/70 p-1 text-gray-600">
              <ChevronLeft size={24} />
            </button>
            <div className="flex flex-col">
              <h2>Vigência do DR ESTADO</h2>
              <span>Nome do partido</span>
            </div>
          </div>

          <div>
            <Link href="newDirectory">
              <button className="bg-secundary text-white">
                <Plus size={20} />
                Cadastrar Vigência
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4>Vigência Ativa</h4>
          <fieldset className="h-auto w-full rounded-lg px-3 py-2">
            <table>
              <thead>
                <th>Data Inicial</th>
                <th>Data Final</th>
                <th>Presidente</th>
                <th>Vice Presidente</th>
                <th>Tesoureiro</th>
                <th>Advogado</th>
                <th></th>
              </thead>
              <tbody>
                <tr>
                  <td>00/00/0000</td>
                  <td>00/00/0000</td>
                  <td>Nome Completo Sobrenome</td>
                  <td>Nome Completo Sobrenome</td>
                  <td>Nome Completo Sobrenome</td>
                  <td>Nome Completo Sobrenome</td>
                  <td>
                    <div className="flex items-center justify-center gap-1">
                      <button className="rounded p-0 hover:text-secundary">
                        <Eye size={16} />
                      </button>
                      <button className="rounded p-0 hover:text-primary">
                        <FileText size={16} />
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
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h4>Histórico</h4>
        <fieldset className="h-auto w-full rounded-lg px-3 py-2">
          <table>
            <thead>
              <tr>
                <th>Data Inicial</th>
                <th>Data Final</th>
                <th>Presidente</th>
                <th>Vice Presidente</th>
                <th>Tesoureiro</th>
                <th>Advogado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>00/00/0000</td>
                <td>00/00/0000</td>
                <td>Nome Completo Sobrenome</td>
                <td>-</td>
                <td>Nome Completo Sobrenome</td>
                <td>Nome Completo Sobrenome</td>
                <td>
                  <div className="flex items-center justify-center gap-1">
                    <button className="rounded p-0 hover:text-secundary">
                      <Eye size={16} />
                    </button>
                    <button className="rounded p-0 hover:text-primary">
                      <FileText size={16} />
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

              <tr>
                <td>00/00/0000</td>
                <td>00/00/0000</td>
                <td>Nome Completo Sobrenome</td>
                <td>Nome Completo Sobrenome</td>
                <td>Nome Completo Sobrenome</td>
                <td>-</td>
                <td>
                  <div className="flex items-center justify-center gap-1">
                    <button className="rounded p-0 hover:text-secundary">
                      <Eye size={16} />
                    </button>
                    <button className="rounded p-0 hover:text-primary">
                      <FileText size={16} />
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
      </div>
    </div>
  )
}
