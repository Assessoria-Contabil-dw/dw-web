'use client'

import { api } from '@/lib/api'
import { Edit3, Eye, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { RegisterAdvocate } from './RegisterAdvocate'
import { AdvocateProps } from '@/interfaces/types'
import { LoadingSecond } from '@/components/Loading/second'
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'

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
        <LoadingSecond />
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
          <input
            type="text"
            className="input-style w-fit"
            placeholder="Buscar por nome"
          />
        </div>
        <div className="flex gap-3">
          <ButtonPrimary
            title="Cadastrar"
            variant="fill"
            startIcon={<Plus className="w-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Cadastrar
          </ButtonPrimary>
        </div>
      </div>

      <fieldset className="fieldset h-auto w-full rounded-lg px-3 py-2">
        <table id='table-style'>
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
                      <button className="hover:text-secundary h-full w-auto p-1">
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
