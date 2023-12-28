'use client'
import { api } from '@/lib/api'
import { X } from 'lucide-react'
import React, {
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { AdvocateProps, LawFirmProps } from '@/interfaces/types'
import { LoadingSecond } from '@/components/Loading/second'

export interface VigencyProps {
  vigency: {
    vigencyId: number
    dateFirst: string
    dateLast: string
    directory: {
      address: string
      cnpj: string
      email: string
      phone: string
      vigencyStatus: boolean
      city: string
      uf: string
      surname: string
    }
    party: {
      code: number
      name: string
      abbreviation: string
      logoUrl: string
      colorCode: string
    }
  }

  president: {
    id: number

    office: string
    name: string
    cpf: string
    birthday: string
    rg: string
    email: string
    phone: string
    address: string
    title: string
    nationality: string
    status: string
    profession: string
    signatureUrl: string
  }
  vicePresident: {
    id: number

    office: string
    name: string
    cpf: string
    birthday: string
    rg: string
    email: string
    phone: string
    address: string
    title: string
    nationality: string
    status: string
    profession: string
    signatureUrl: string
  }
  treasurer: {
    id: number

    office: string
    name: string
    cpf: string
    birthday: string
    rg: string
    email: string
    phone: string
    address: string
    title: string
    nationality: string
    status: string
    profession: string
    signatureUrl: string
  }

  advocates: AdvocateProps[]
  lawFirm: LawFirmProps[]
}

export interface ViewVigencyRef {
  openModal: (id: string) => void
  closeModal: () => void
}

const ViewVigencyModel: ForwardRefRenderFunction<ViewVigencyRef> = (
  props,
  ref,
) => {
  const [isModalView, setIsModalView] = useState(false)
  const [vigencyData, setVigency] = useState<VigencyProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [vigencyId, setVigencyId] = useState('')

  const openModal = useCallback((id: string) => {
    setVigencyId(id)
    setIsModalView(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalView(false)
  }, [])

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }))

  async function handleVigency(id: string) {
    if (!id) return

    try {
      const response = await api.get(`/vigencies/${id}`)
      setVigency(response.data)
      console.log(response.data)
      setLoading(false)
    } catch (error) {
      console.log('Não foi possível carregar as vigências')
    }
  }

  useEffect(() => {
    if (isModalView) {
      setLoading(true)
      handleVigency(vigencyId)
    }
  }, [vigencyId])

  if (!isModalView) {
    return null
  }

  return (
    <div className="model-bg">
      <div className="model-size">
        <div className="model-card">
          <div className="model-header">
            <div>
              <h4>{vigencyData?.vigency.party.abbreviation}</h4>
              <span>
                {vigencyData?.vigency.dateFirst} -{' '}
                {vigencyData?.vigency.dateLast}
              </span>
            </div>
            <button
              onClick={closeModal}
              className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          {loading ? (
            <div className="model-loading">
              <LoadingSecond />
            </div>
          ) : (
            <div className="model-body">
              <ul className="grid grid-cols-2 space-y-2 max-sm:grid-cols-1">
                <li>
                  <h5>Partido </h5>
                  {vigencyData?.vigency.directory.city} -{' '}
                  {vigencyData?.vigency.directory.uf}
                </li>
                <li>
                  <h5>CNPJ</h5>
                  {vigencyData?.vigency.directory.cnpj != null ? (
                    vigencyData?.vigency.directory.cnpj
                  ) : (
                    <span>Não cadastrado</span>
                  )}
                </li>
                <li>
                  <h5>Endereço</h5>
                  {vigencyData?.vigency.directory.address != null ? (
                    vigencyData?.vigency.directory.address
                  ) : (
                    <span>Não cadastrado</span>
                  )}
                </li>
                <li>
                  <h5>E-mail</h5>
                  {vigencyData?.vigency.directory.email != null ? (
                    vigencyData?.vigency.directory.email
                  ) : (
                    <span>Não cadastrado</span>
                  )}
                </li>
                <li>
                  <h5>Telefone</h5>
                  {vigencyData?.vigency.directory.phone != null ? (
                    vigencyData?.vigency.directory.phone
                  ) : (
                    <span>Não cadastrado</span>
                  )}
                </li>
              </ul>

              <ul className="grid grid-cols-3 space-y-2 max-sm:grid-cols-1">
                <li>
                  <h5>Presidente</h5>
                  {vigencyData?.president != null ? (
                    vigencyData.president.name
                  ) : (
                    <span>Não cadastrado</span>
                  )}
                </li>
                <li>
                  <h5> Vice-Presidente</h5>
                  {vigencyData?.vicePresident != null ? (
                    vigencyData.vicePresident.name
                  ) : (
                    <span>Não cadastrado</span>
                  )}
                </li>
                <li>
                  <h5> Tesoureiro</h5>
                  {vigencyData?.treasurer != null ? (
                    vigencyData?.treasurer.name
                  ) : (
                    <span>Não cadastrado</span>
                  )}
                </li>
              </ul>

              <ul className="grid grid-cols-2 space-y-2 max-sm:grid-cols-1">
                <li>
                  <h5>Advogados</h5>

                  {vigencyData?.advocates === null ? (
                    <span>Não cadastrado</span>
                  ) : (
                    vigencyData?.advocates.map((advocate, index) => (
                      <span key={index}>
                        {advocate.name} - {advocate.oab}
                      </span>
                    ))
                  )}
                </li>

                <li>
                  <h5>Escritorio</h5>

                  {vigencyData?.lawFirm === null ? (
                    <span>Não cadastrado</span>
                  ) : (
                    vigencyData?.lawFirm.map((lawfirm, index) => (
                      <span key={index}>{lawfirm.name}</span>
                    ))
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default forwardRef(ViewVigencyModel)
