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
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { Loading } from '../Form/Loading'
import ViewVigencyModel, { ViewVigencyRef } from './ViewVigency'
import RegisterVigencyModel, { RegisterVigencyRef } from './RegisterVigency'

interface VigencyTableProps {
  directoryId: string
}

interface Leader {
  id: number
  name: string
  signatureUrl: string
}
interface Vigency {
  id: number
  dateFirst: string
  dateLast: string
  status: boolean
  president: Leader
  vicePresident: Leader
  treasurer: Leader
  advocate: Leader
}

interface VProps {
  directoryId: string
  status: boolean
  surname: string
  vigencyActive: Vigency[]
  vigencyInactive: Vigency[]
}

export function VigencyTable({ directoryId }: VigencyTableProps) {
  console.log('vigencia')
  const router = useRouter()

  function handleBack() {
    router.back()
  }

  const [vigencyData, setVigency] = useState<VProps | null>(null)
  const [loading, setLoading] = useState(true)
  const modalViewRef = useRef<ViewVigencyRef>(null)
  const modelRegisterRef = useRef<RegisterVigencyRef>(null)

  const handleViewModal = useCallback((id: string) => {
    modalViewRef.current?.openModal(id)
  }, [])

  const handleRegisterModal = useCallback((id: string) => {
    modelRegisterRef.current?.openViewModal(id)
  }, [])

  async function loadVigency() {
    const token = Cookies.get('token')
    try {
      const response = await api.get(`/vigencies/directory/${directoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setVigency(response.data)
      console.log(response.data)
    } catch (error) {
      console.log('Não foi possível carregar as vigências')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVigency()
  }, [])

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
      <RegisterVigencyModel ref={modelRegisterRef} />
      <ViewVigencyModel ref={modalViewRef} />

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
              <h2>Vigência</h2>
              <span>
                {vigencyData?.surname} (
                {vigencyData?.status ? 'Ativo' : 'Inativo'})
              </span>
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
              onClick={() => handleRegisterModal(directoryId)}
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
                <tr>
                  <th>Data Inicial</th>
                  <th>Data Final</th>
                  <th>Presidente</th>
                  <th>Vice Presidente</th>
                  <th>Tesoureiro</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {vigencyData?.vigencyActive != null ? (
                  vigencyData.vigencyActive.map((v, index) => (
                    <tr key={index}>
                      <td>{v.dateFirst != null ? v.dateFirst : '-'}</td>
                      <td>{v.dateLast != null ? v.dateLast : '-'}</td>
                      <td>
                        {v.president?.name != null ? v.president.name : '-'}
                      </td>
                      <td>
                        {v.vicePresident?.name != null
                          ? v.vicePresident.name
                          : '-'}
                      </td>
                      <td>
                        {v.treasurer?.name != null ? v.treasurer.name : '-'}
                      </td>

                      <td className="w-16 ">
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => handleViewModal(v.id.toString())}
                            className="h-full w-auto rounded p-1 hover:text-secundary"
                          >
                            <Eye size={16} />
                          </button>
                          <button className="h-full w-auto rounded p-1 hover:text-primary">
                            <FileText size={16} />
                          </button>
                          <button className="h-full w-auto rounded p-1 hover:text-primary">
                            <Edit3 size={16} />
                          </button>
                          <button className="h-full w-auto rounded p-1 hover:text-red-500">
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vigencyData?.vigencyInactive != null ? (
                vigencyData.vigencyInactive.map((v, index) => (
                  <tr key={index}>
                    <td>{v.dateFirst != null ? v.dateFirst : '-'}</td>
                    <td>{v.dateLast != null ? v.dateLast : '-'}</td>
                    <td>
                      {v.president?.name != null ? v.president.name : '-'}
                    </td>
                    <td>
                      {v.vicePresident?.name != null
                        ? v.vicePresident.name
                        : '-'}
                    </td>
                    <td>
                      {v.treasurer?.name != null ? v.treasurer.name : '-'}
                    </td>
                    <td className="w-16 ">
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => handleViewModal(v.id.toString())}
                          className="h-full w-auto rounded p-1 hover:text-secundary"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="h-full w-auto rounded p-1 hover:text-primary">
                          <FileText size={16} />
                        </button>
                        <button className="h-full w-auto rounded p-1 hover:text-primary">
                          <Edit3 size={16} />
                        </button>
                        <button className="h-full w-auto rounded p-1 hover:text-red-500">
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
