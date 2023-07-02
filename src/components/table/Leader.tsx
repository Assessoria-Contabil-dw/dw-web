'use client'

import { api } from '@/lib/api'
import { Edit3, Eye, Plus, Search, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { LeaderForm } from '../form/Leader'

type LeaderProps = {
  id: string
  name: string
  birthday: string
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

  async function handleLeader() {
    try {
      const response = await api.get('/leaderies', {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      })
      setLeaderies(response.data)
      console.log(leaderies)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleLeader()
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <LeaderForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="flex w-96 gap-4">
        <input type="text" className="w-fit" placeholder="Buscar por nome" />
        <button className="w-fit gap-2 bg-secundary text-white">
          <Search size={18} />
          Pesquisar
        </button>
      </div>

      <fieldset className="h-auto w-full rounded-lg px-3 py-2">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>RG</th>
              <th>Endereço</th>
              <th>email</th>
              <th>Assinatura</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nome Completo Sobrenome</td>
              <td>000000000</td>
              <td>00000000</td>
              <td>Rua, n°, Bairro, Cidade - UF, CEP</td>
              <td>email@gmail.com</td>
              <td></td>
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
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-fit bg-secundary text-white"
      >
        <Plus size={20} />
        Cadastrar Representante
      </button>
    </div>
  )
}
