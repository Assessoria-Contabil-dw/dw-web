'use client'

import { api } from '@/lib/api'
import {
  ChevronLeft,
  Edit3,
  Eye,
  FileText,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { VigencyProps } from '@/lib/types'
import { Loading } from '../Form/Loading'
import { RegisterVigency } from './RegisterVigency'

interface VigencyTableProps {
  directoryId: string
}

export function VigencyTable({ directoryId }: VigencyTableProps) {
  const router = useRouter()

  console.log(directoryId)
  function handleBack() {
    router.back()
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [vigencyTrue, setVigencyTrue] = useState<VigencyProps[]>([])
  const [vigencyFalse, setVigencyFalse] = useState<VigencyProps[]>([])
  const [loading, setLoading] = useState(true)

  async function loadVigency() {
    setLoading(true)
    const token = Cookies.get('token')
    try {
      const response = await api.get(`/vigencies/directory/${directoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      response.data.forEach((v: VigencyProps) => {
        if (v.status === false) {
          setVigencyFalse([...vigencyFalse, v])
        } else {
          setVigencyTrue([...vigencyTrue, v])
        }
      })
    } catch (error) {
      console.log('Não foi possível carregar as vigências')
    }
    setLoading(false)
  }

  useEffect(() => {
    loadVigency()
  }, [])

  function handleCreateVigency(directories: VigencyProps) {
    if (directories.status === true) {
      setVigencyTrue((prevState) => prevState.concat(directories))
    } else {
      setVigencyFalse((prevState) => prevState.concat(directories))
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
      <RegisterVigency
        onCreate={handleCreateVigency}
        isOpen={isModalOpen}
        directoryId={directoryId}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="w-fit bg-gray-100/70 p-1 text-gray-600"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex flex-col">
              <h2>Vigência do</h2>
              <span>{directoryId}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => loadVigency()}
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
        <div className="flex flex-col gap-2">
          <h4>Vigência Ativa</h4>
          <fieldset className="h-auto w-full rounded-lg px-3 py-2">
            <table>
              <thead>
                <th>Data Inicial</th>
                <th>Data Final</th>
                <th>Presidente</th>
                <th>Vice Presidente</th>
                <th>Tesoureiro</th>
                <th>Advogado</th>
                <th></th>
              </thead>
              <tbody>
                {vigencyTrue.length > 0 ? (
                  vigencyTrue.map((v, index) => (
                    <tr key={index}>
                      <td>{v.dateFirst}</td>
                      <td>{v.dateLast}</td>
                      <td>{v.directoryId}</td>
                      <td>Nome Completo Sobrenome</td>
                      <td>Nome Completo Sobrenome</td>
                      <td>Nome Completo Sobrenome</td>
                      <td>
                        <div className="flex items-center justify-center gap-1">
                          <button className="rounded p-0 hover:text-secundary">
                            <Eye size={16} />
                          </button>
                          <button className="rounded p-0 hover:text-primary">
                            <FileText size={16} />
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="py-6 text-center">
                      Nenhuma vigência ativa
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </fieldset>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h4>Histórico</h4>
        <fieldset className="h-auto w-full rounded-lg px-3 py-2">
          <table>
            <thead>
              <tr>
                <th>Data Inicial</th>
                <th>Data Final</th>
                <th>Presidente</th>
                <th>Vice Presidente</th>
                <th>Tesoureiro</th>
                <th>Advogado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vigencyFalse.length > 0 ? (
                vigencyFalse.map((v, index) => (
                  <tr key={index}>
                    <td>00/00/0000</td>
                    <td>00/00/0000</td>
                    <td>Nome Completo Sobrenome</td>
                    <td>-</td>
                    <td>Nome Completo Sobrenome</td>
                    <td>Nome Completo Sobrenome</td>
                    <td>
                      <div className="flex items-center justify-center gap-1">
                        <button className="rounded p-0 hover:text-secundary">
                          <Eye size={16} />
                        </button>
                        <button className="rounded p-0 hover:text-primary">
                          <FileText size={16} />
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
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-6 text-center">
                    Histórico vazio
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </fieldset>
      </div>
    </div>
  )
}
