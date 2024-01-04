'use client'
import { X } from 'lucide-react'
import React, {
  ForwardRefRenderFunction,
  useCallback,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { LoadingSecond } from '@/components/Loading/second'
import { useVigencyOne } from '@/hooks/useVigencyData'

export interface ViewVigencyRef {
  openModal: (id: string) => void
  closeModal: () => void
}

const ViewVigencyModel: ForwardRefRenderFunction<ViewVigencyRef> = (
  props,
  ref,
) => {
  const [isModalView, setIsModalView] = useState(false)
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

  const { data: vigencyData, isLoading } = useVigencyOne(Number(vigencyId))

  if (!isModalView) {
    return null
  }

  return (
    <div className="model-bg">
      <div className="model-size model-size-full">
        <div className="model-card">
          <div className="model-header">
            <div>
              <h4 className="text-h4">Detalhes da vigência</h4>
              <span className="text-span">
                {vigencyData?.vigency.dateFirst} -{' '}
                {vigencyData?.vigency.dateLast}
              </span>
            </div>
            <button onClick={closeModal} className="model-close">
              <X size={20} />
            </button>
          </div>
          {isLoading ? (
            <div className="model-loading">
              <LoadingSecond />
            </div>
          ) : (
            <div className="model-body">
              <ul className="grid grid-cols-2 space-y-2 font-lexend text-sm text-slate-600 max-sm:grid-cols-1">
                <li>
                  <h5 className="text-h5">Partido</h5>
                  <h4>
                    {vigencyData?.vigency.party.abbreviation} -{' '}
                    {vigencyData?.vigency.directory.surname}
                  </h4>
                </li>
                <li>
                  <h5 className="text-h5">CNPJ</h5>
                  {vigencyData?.vigency.directory.cnpj != null ? (
                    <h4>{vigencyData?.vigency.directory.cnpj}</h4>
                  ) : (
                    <span className="text-span">Não cadastrado</span>
                  )}
                </li>
                <li>
                  <h5 className="text-h5">Endereço</h5>
                  {vigencyData?.vigency.directory.address != null ? (
                    <h4>{vigencyData?.vigency.directory.address}</h4>
                  ) : (
                    <span className="text-span">Não cadastrado</span>
                  )}
                </li>
                <li>
                  <h5 className="text-h5">E-mail</h5>
                  {vigencyData?.vigency.directory.email != null ? (
                    <h4>{vigencyData?.vigency.directory.email}</h4>
                  ) : (
                    <span className="text-span">Não cadastrado</span>
                  )}
                </li>
                <li>
                  <h5 className="text-h5">Telefone</h5>
                  {vigencyData?.vigency.directory.phone != null ? (
                    <h4>{vigencyData?.vigency.directory.phone}</h4>
                  ) : (
                    <span className="text-span">Não cadastrado</span>
                  )}
                </li>
              </ul>

              <ul className="grid grid-cols-3 space-y-2  font-lexend text-sm text-slate-600 max-sm:grid-cols-1">
                <li>
                  <h5 className="text-h5">Presidente</h5>
                  {vigencyData?.president != null ? (
                    <h4>{vigencyData.president.name}</h4>
                  ) : (
                    <span className="text-span">Não cadastrado</span>
                  )}
                </li>
                <li>
                  <h5 className="text-h5"> Vice-Presidente</h5>
                  {vigencyData?.vicePresident != null ? (
                    <h4>{vigencyData.vicePresident.name}</h4>
                  ) : (
                    <span className="text-span">Não cadastrado</span>
                  )}
                </li>
                <li>
                  <h5 className="text-h5">Tesoureiro</h5>
                  {vigencyData?.treasurer != null ? (
                    <h4>{vigencyData?.treasurer.name}</h4>
                  ) : (
                    <span className="text-span">Não cadastrado</span>
                  )}
                </li>
              </ul>

              <ul className="grid grid-cols-2 space-y-2  font-lexend text-sm text-slate-600 max-sm:grid-cols-1">
                <li>
                  <h5 className="text-h5">Advogados</h5>

                  {vigencyData?.advocates === null ? (
                    <span className="text-span">Não cadastrado</span>
                  ) : (
                    vigencyData?.advocates.map((advocate, index) => (
                      <h4 key={index}>
                        {advocate.name} - {advocate.oab}
                      </h4>
                    ))
                  )}
                </li>

                <li>
                  <h5 className="text-h5">Escritorio</h5>

                  {vigencyData?.lawFirm === null ? (
                    <span className="text-span">Não cadastrado</span>
                  ) : (
                    vigencyData?.lawFirm.map((lawfirm, index) => (
                      <h4 key={index}>{lawfirm.name}</h4>
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
