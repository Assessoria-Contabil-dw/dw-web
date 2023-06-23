'use client'

import { api } from '@/lib/api'
import { Edit3, Eye, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AdvocateForm } from '../form/Advocate'

type LeaderProps = {
  id: string
  name: string
  oab: string
  birthday: string
  cpf: string
  email: string
  phone: string
  address: string
  signatureUrl: string
  title: string
  nationality: string
  status: string
}

export function AdvocateTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [advocates, setAdvocates] = useState<LeaderProps[]>([])

  async function handleLeader() {
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
  }
  useEffect(() => {
    handleLeader()
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <AdvocateForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2>Lista de Advogados</h2>
          <span>10 cadastrados</span>
        </div>

        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-secundary text-white"
          >
            <Plus size={20} />
            Cadastrar Advogado
          </button>
        </div>
      </div>

      <fieldset className="h-auto w-full rounded-lg px-3 py-2">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>OAB</th>
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
                <div className="flex items-center justify-center gap-1">
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
    </div>
  )
}
