'use client'

import { api } from '@/lib/api'
import {
  Edit3,
  Trash2,
  Eye,
  Plus,
  Search,
  Circle,
  RotateCcw,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { RegisterSPC } from './RegisterSPC'
import { Loading } from '../Form/Loading'
import { DirectorySPCProps } from '@/lib/types'

export function SPCTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [SPC, setSPC] = useState<DirectorySPCProps[]>([])

  async function loadSPC() {
    setLoading(true)
    try {
      const response = await api.get('/spcs')
      setSPC(response.data)
      console.log(response.data)
    } catch (error) {
      console.log("Erro ao carregar os dados da SPC's")
    }
    setLoading(false)
  }
  useEffect(() => {
    loadSPC()
  }, [])

  function handleCreateSPC(SPC: DirectorySPCProps) {
    setSPC((prevState) => prevState.concat(SPC))
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
      <RegisterSPC
        onCreate={handleCreateSPC}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="flex justify-between">
        <div className="flex w-fit gap-4">
          <input type="text" className="w-fit" placeholder="Buscar por nome" />
          <button className="w-fit gap-2 bg-secundary text-white">
            <Search className="w-4" />
            Pesquisar
          </button>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => loadSPC()}
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
              <th>SPCA</th>
              <th>Vigência</th>
              <th>SPCE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {SPC.length > 0 ? (
              SPC.map((spc, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap">
                    {spc.party} - {spc.typeOrg} {spc.city}
                  </td>
                  <td>
                    <ul>
                      {spc.SPCA.length > 0 ? (
                        spc.SPCA.map((spca, index) => (
                          <li key={index} className="relative">
                            <a
                              title={spca.status}
                              style={{
                                backgroundColor: `${spca.color}`,
                              }}
                              href={spca.link}
                            >
                              {spca.year}
                            </a>

                            {spca.observation && (
                              <Circle
                                className="absolute -right-1 -top-2 z-0 cursor-pointer fill-primary text-primary"
                                size={12}
                              />
                            )}
                          </li>
                        ))
                      ) : (
                        <li>-</li>
                      )}
                    </ul>
                  </td>
                  <td>{spc.vigency ? 'Ativa' : 'Inativa'}</td>
                  <td>
                    <ul>
                      {spc.SPCE.length > 0 ? (
                        spc.SPCE.map((spce, index) => (
                          <li key={index} className="relative">
                            <a
                              title={spce.status}
                              style={{
                                backgroundColor: `${spce.color}`,
                              }}
                              href={spce.link}
                            >
                              {spce.year}
                            </a>

                            {spce.observation && (
                              <Circle
                                className="absolute -right-1 -top-2 z-0 cursor-pointer fill-primary text-primary"
                                size={12}
                              />
                            )}
                          </li>
                        ))
                      ) : (
                        <li>-</li>
                      )}
                    </ul>
                  </td>

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
                <td colSpan={5} className="py-6 text-center">
                  Nenhum partido cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </fieldset>
    </div>
  )
}
