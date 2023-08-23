'use client'

import { Edit3, Trash2, Plus, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { RegisterParty } from './RegisterParty'
import { Loading } from '../Form/Loading'
import { PartyProps } from '@/lib/types'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify'
import { ModelDelet } from '../Model/Delet'
import { UpdateParty } from './UpdateParty'

interface RegisterDeleteProps {
  id: string
  path: string
  msg: string
}

export function PartyTable() {
  const [isModalCreate, setIsModalCreate] = useState(false)
  const [isModalDelet, setIsModalDelet] = useState(false)
  const [isModalUpdate, setIsModalUpdate] = useState(false)

  const [register, setRegister] = useState<RegisterDeleteProps>({
    id: '',
    path: '',
    msg: '',
  })

  const [parties, setParties] = useState<PartyProps[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredParties, setFilteredParties] = useState<PartyProps[]>([])

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

  useEffect(() => {
    loadParty()
  }, [])

  if (loading) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2">
        <Loading />
        <i className="text-gray-500">Carregando...</i>
      </div>
    )
  }

  // Função de deletar
  function handleDeleteParty(id: string, path: string, msg: string) {
    setRegister({ id, path, msg })
    setIsModalDelet(true)
  }
  // função de atualizar
  function handleUpdateParty(id: string) {
    setRegister({ ...register, id })
    setIsModalUpdate(true)
  }

  // pesquisar

  function handleFilter(value: string, type: string) {
    console.log(value)
    if (value.trim() === '') {
      setFilteredParties([])
    } else if (type === 'code') {
      const filter = parties.filter((p) => p.code.toString().includes(value))
      setFilteredParties(filter)
      console.log(filter)
    } else if (type === 'name') {
      const filter = parties.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredParties(filter)
      console.log(filter)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <RegisterParty
        isCreate={isModalCreate}
        onClose={() => setIsModalCreate(false)}
        loading={() => loadParty()}
      />

      <UpdateParty
        id={register.id}
        isCreate={isModalUpdate}
        onClose={() => setIsModalUpdate(false)}
        loading={() => loadParty()}
      />

      <ModelDelet
        path={register.path}
        id={register.id}
        msg={register.msg}
        isOpen={isModalDelet}
        onClose={() => setIsModalDelet(false)}
        loading={() => loadParty()}
      />

      <div className="flex justify-between">
        <div className="flex w-fit gap-4">
          <input
            type="text"
            onChange={(e) => handleFilter(e.target.value.toString(), 'code')}
            placeholder="Buscar por Código"
          />
          <input
            type="text"
            onChange={(e) => handleFilter(e.target.value.toString(), 'name')}
            placeholder="Buscar pelo nome do partido"
          />
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
            onClick={() => setIsModalCreate(true)}
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
              filteredParties.length > 0 ? (
                filteredParties.map((party, index) => (
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
                        <Image
                          className="bg-slate-200 object-cover"
                          src={party.logoUrl}
                          width={50}
                          height={50}
                          alt="Logo do partido"
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="w-16 ">
                      <div className="flex items-center ">
                        <button
                          onClick={() =>
                            handleUpdateParty(party.code.toString())
                          }
                          className="h-full w-auto rounded p-1 hover:text-primary"
                        >
                          <Edit3 className="w-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteParty(
                              party.code.toString(),
                              'parties',
                              party.abbreviation,
                            )
                          }
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
                        <Image
                          className="bg-slate-200 object-cover"
                          src={party.logoUrl}
                          width={50}
                          height={50}
                          alt="Logo do partido"
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="w-16 ">
                      <div className="flex items-center ">
                        <button
                          onClick={() =>
                            handleUpdateParty(party.code.toString())
                          }
                          className="h-full w-auto rounded p-1 hover:text-primary"
                        >
                          <Edit3 className="w-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteParty(
                              party.code.toString(),
                              'parties',
                              party.abbreviation,
                            )
                          }
                          type="button"
                          className="h-full w-auto rounded p-1 hover:text-red-500"
                        >
                          <Trash2 className="w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )
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
      <ToastContainer />
    </div>
  )
}
