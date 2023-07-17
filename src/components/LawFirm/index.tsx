'use client'

import { api } from '@/lib/api'
import { Edit3, Trash2, Eye, Plus, Search, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { RegisterLawFirm } from './RegisterLawFirm'
import { Loading } from '../Form/Loading'
import { LawFirmProps } from '@/lib/types'

export function LawFirmTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [lawFirms, setLawFirm] = useState<LawFirmProps[]>([])
  const [loading, setLoading] = useState(true)

  async function loadLawFirm() {
    setLoading(true)
    try {
      const response = await api.get('/lawFirms', {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      })
      setLawFirm(response.data)
    } catch (error) {
      console.log(lawFirms)
    }
    setLoading(false)
  }
  useEffect(() => {
    loadLawFirm()
  }, [])

  function handleCreateLawFirm(lawFirms: LawFirmProps) {
    setLawFirm((prevState) => prevState.concat(lawFirms))
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
      <RegisterLawFirm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateLawFirm}
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
            onClick={() => loadLawFirm()}
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
            {lawFirms.length > 0 ? (
              lawFirms.map((lawFirm, index) => (
                <tr key={index}>
                  <td>{lawFirm.name ? lawFirm.name : '-'}</td>
                  <td>{lawFirm.address ? lawFirm.address : '-'}</td>
                  <td>{lawFirm.cnpj ? lawFirm.cnpj : '-'}</td>
                  <td>{lawFirm.email ? lawFirm.email : '-'}</td>
                  <td>{lawFirm.phone ? lawFirm.phone : '-'}</td>
                  <td>
                    <div className="h-20 overflow-y-scroll">
                      <ul className="flex flex-col">
                        {lawFirm.advocates.map((advocate, index) => (
                          <li key={index}>{advocate.name}</li>
                        ))}
                      </ul>
                    </div>
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
                <td colSpan={10} className="py-6 text-center">
                  Nenhum escritório cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </fieldset>
    </div>
  )
}
