'use client'

import { Edit3, Trash2, Eye, Plus, Search, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { RegisterParty } from './RegisterParty'
import { Loading } from '../Form/Loading'
import { PartyProps } from '@/lib/types'
import Cookies from 'js-cookie'

export function PartyTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [parties, setParties] = useState<PartyProps[]>([])
  const [loading, setLoading] = useState(true)

  async function loadParty() {
    setLoading(true)
    const token = Cookies.get('token')
    try {
      const response = await api.get('/parties', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setParties(response.data)
    } catch (error) {
      return console.log('Não foi possível carregar os partidos')
    }
    setLoading(false)
  }

  async function handleDeleteParty(code: string) {
    const token = Cookies.get('token')
    try {
      await api.delete(`/parties/${code}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      loadParty()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadParty()
  }, [])

  function handleCreateParty(party: PartyProps) {
    setParties((prevState) => prevState.concat(party))
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
      <RegisterParty
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateParty}
      />

      <div className="flex justify-between">
        <div className="flex w-fit gap-4">
          <input type="text" placeholder="Buscar por Código" />
          <input type="text" placeholder="Buscar por Sigla" />
          <button className="w-fit gap-2 bg-secundary text-white">
            <Search className="w-4" />
            Pesquisar
          </button>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => loadParty()}
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
              <th>Código</th>
              <th>Sigla</th>
              <th>Partido</th>
              <th>Cor</th>
              <th>Logo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {parties.length > 0 ? (
              parties.map((party, index) => (
                <tr key={index}>
                  <td>{party.code}</td>
                  <td>{party.abbreviation}</td>
                  <td>{party.name}</td>
                  <td>
                    <div
                      className="h-4 w-4 rounded"
                      style={{ background: party.color }}
                    ></div>
                  </td>
                  <td>
                    {party.logoUrl ? (
                      <picture>
                        <img
                          className="bg-slate-200 object-cover"
                          src={party.logoUrl}
                          width={50}
                          height={50}
                          alt="Logo do partido"
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
                        onClick={() => handleDeleteParty(party.code.toString())}
                        type="button"
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
