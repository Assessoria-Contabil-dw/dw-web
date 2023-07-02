'use client'

import { Edit3, Trash2, Eye, Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { PartyForm } from '../form/Party'

interface Party {
  id: string
  code: number
  name: string
  abbreviation: string
  color: string
  logoUrl: string
}

export function PartyTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [parties, setParties] = useState<Party[]>([])

  async function loadDirectories() {
    try {
      const response = await api.get('/parties', {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      })
      setParties(response.data)
    } catch (error) {
      console.log(parties)
    }
  }
  useEffect(() => {
    loadDirectories()
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <PartyForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex w-fit gap-4">
        <input type="text" placeholder="Buscar por Código" />
        <input type="text" placeholder="Buscar por Sigla" />
        <button className="w-fit gap-2 bg-secundary text-white">
          <Search size={18} />
          Pesquisar
        </button>
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
            {parties.map((party, index) => (
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
                  <picture>
                    <img
                      className="bg-slate-200 object-cover"
                      src={party.logoUrl}
                      width={50}
                      height={50}
                      alt="Logo do partido"
                    />
                  </picture>
                </td>
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
            ))}
          </tbody>
        </table>
      </fieldset>

      <div>
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="w-fit bg-secundary text-white"
        >
          <Plus size={20} />
          Cadastrar Diretório
        </button>
      </div>
    </div>
  )
}
