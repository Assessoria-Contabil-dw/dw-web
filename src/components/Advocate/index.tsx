'use client'

import { api } from '@/lib/api'
import { Edit3, Eye, Plus, RotateCcw, Search, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { RegisterAdvocate } from './RegisterAdvocate'
import { Loading } from '../Form/Loading'
import { AdvocateProps } from '@/lib/types'

export function AdvocateTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [advocates, setAdvocates] = useState<AdvocateProps[]>([])
  const [loading, setLoading] = useState(true)

  async function loadLeader() {
    setLoading(true)

    try {
      const response = await api.get('/advocates', {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      })
      setAdvocates(response.data)
      console.log(advocates)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadLeader()
  }, [])

  function handleCreateAdvocate(advocates: AdvocateProps) {
    setAdvocates((prevState) => prevState.concat(advocates))
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
      <RegisterAdvocate
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateAdvocate}
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
            onClick={() => loadLeader()}
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
              <th>Nome</th>
              <th>OAB</th>
              <th>CPF</th>
              <th>Qualificação</th>
              <th>Endereço</th>
              <th>email</th>
              <th>Escritório</th>
              <th>Assinatura</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {advocates.length > 0 ? (
              advocates.map((advocate, index) => (
                <tr key={index}>
                  <td>{advocate.name ? advocate.name : '-'}</td>
                  <td>{advocate.oab ? advocate.oab : '-'}</td>
                  <td>{advocate.cpf ? advocate.cpf : '-'}</td>
                  <td>
                    {advocate.nationality}, {advocate.status}
                  </td>
                  <td>{advocate.address ? advocate.address : '-'}</td>
                  <td>{advocate.email ? advocate.email : '-'}</td>
                  <td>{advocate.lawFirmName ? advocate.lawFirmName : '-'}</td>
                  <td>
                    {advocate.signatureUrl ? (
                      <picture>
                        <img
                          className="bg-slate-200 object-cover"
                          src={advocate.signatureUrl}
                          width={50}
                          height={50}
                          alt="Logo do advogado"
                        />
                      </picture>
                    ) : (
                      '-'
                    )}
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
                  Nenhum advogado cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </fieldset>
    </div>
  )
}
