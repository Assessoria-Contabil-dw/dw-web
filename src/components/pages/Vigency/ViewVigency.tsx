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
import { Loading } from '../../Form/Loading'
import { AdvocateProps, LawFirmProps } from '@/@types/types'

interface VigencyProps {
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
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <fieldset className="flex w-full flex-col items-start justify-between border-b-[1px]">
          {loading ? (
            <div className="flex w-full items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="w-full">
              <div className="flex w-full justify-between ">
                <div>
                  <h4>
                    {vigencyData?.vigency.dateFirst} -{' '}
                    {vigencyData?.vigency.dateLast}
                  </h4>
                  <span>{vigencyData?.vigency.party.abbreviation}</span>
                </div>
                <button
                  onClick={closeModal}
                  className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <ul>
                <li>
                  {vigencyData?.vigency.directory.city} -{' '}
                  {vigencyData?.vigency.directory.uf}
                </li>
                <li>{vigencyData?.vigency.directory.cnpj}</li>
                <li>{vigencyData?.vigency.directory.address}</li>
                <li>{vigencyData?.vigency.directory.email}</li>
                <li>{vigencyData?.vigency.directory.phone}</li>
                <li>
                  Presidente:{' '}
                  {vigencyData?.president != null
                    ? vigencyData.president.name
                    : 'Não cadastrado'}
                </li>
                <li>
                  Vice-Presidente:{' '}
                  {vigencyData?.vicePresident != null
                    ? vigencyData.vicePresident.name
                    : 'Não cadastrado'}
                </li>
                <li>
                  Tesoureiro:{' '}
                  {vigencyData?.treasurer != null
                    ? vigencyData?.treasurer.name
                    : 'Não cadastrado'}
                </li>
              </ul>
              <ul>
                <h2>Advogados</h2>

                {vigencyData?.advocates === null ? (
                  <li>Nenhum advogado cadastrado</li>
                ) : (
                  vigencyData?.advocates.map((advocate, index) => (
                    <li key={index}>
                      {advocate.name} - {advocate.oab}
                    </li>
                  ))
                )}
              </ul>

              <ul>
                <h2>Escritorio</h2>

                {vigencyData?.lawFirm === null ? (
                  <li>Nenhum escritorio cadastrado</li>
                ) : (
                  vigencyData?.lawFirm.map((lawfirm, index) => (
                    <li key={index}>
                      {lawfirm.name} - {lawfirm.cnpj}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </fieldset>
      </div>
    </div>
  )
}

export default forwardRef(ViewVigencyModel)
