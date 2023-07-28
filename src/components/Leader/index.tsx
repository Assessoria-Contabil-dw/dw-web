'use client'

import { api } from '@/lib/api'
import { Edit3, Eye, Plus, RotateCcw, Search, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Loading } from '../Form/Loading'
import { RegisterLeader } from './RegisterLeader'

type LeaderProps = {
  id: number
  name: string
  birthday: string
  cpf: string
  rg: string
  email: string
  phone: string
  address: string
  signatureUrl: string
  title: string
  nationality: string
  status: string
  profession: string
}

export function LeaderTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [leaderies, setLeaderies] = useState<LeaderProps[]>([])
  const [loading, setLoading] = useState(true)

  async function loadLeader() {
    const token = Cookies.get('token')
    setLoading(true)
    try {
      const response = await api.get('/leaderies', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLeaderies(response.data)
      console.log(leaderies)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  useEffect(() => {
    loadLeader()
  }, [])

  function handleCreateLeader(leader: LeaderProps) {
    setLeaderies((prevState) => prevState.concat(leader))
  }

  async function handleDeleteLeader(id: number) {
    try {
      await api.delete(`/leaderies/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      loadLeader()
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
      <RegisterLeader
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateLeader}
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
              <th>CPF</th>
              <th>RG</th>
              <th>Título</th>
              <th>Qualificação</th>
              <th>Endereço</th>
              <th>email</th>
              <th>Assinatura</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {leaderies.length > 0 ? (
              leaderies.map((leader, index) => (
                <tr key={index}>
                  <td>{leader.name}</td>
                  <td>{leader.cpf ? leader.cpf : '-'}</td>
                  <td>{leader.rg ? leader.rg : '-'}</td>
                  <td>{leader.title ? leader.title : '-'}</td>
                  <td>
                    {leader.nationality ? leader.nationality : '-'},{' '}
                    {leader.status ? leader.status : '-'},{' '}
                    {leader.profession ? leader.profession : '-'}
                  </td>
                  <td>{leader.address ? leader.address : '-'}</td>
                  <td>{leader.email ? leader.email : '-'}</td>
                  <td>
                    {leader.signatureUrl ? (
                      <picture>
                        <img
                          src={leader.signatureUrl}
                          className="bg-slate-200 object-cover"
                          width={50}
                          height={50}
                          alt="Assinatura do representante"
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
                      <button
                        type="button"
                        onClick={() => handleDeleteLeader(leader.id)}
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
                <td colSpan={10} className="py-6 text-center">
                  Nenhum representante cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </fieldset>
    </div>
  )
}
