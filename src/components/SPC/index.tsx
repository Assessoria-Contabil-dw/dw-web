'use client'

import { api } from '@/lib/api'
import { Edit3, Eye, Plus, Circle, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Loading } from '../Form/Loading'
import { DirectorySPCProps } from '@/lib/types'
import { Pop } from '../Pop'
import UpdateDirectory, { UpdateDirectoryRef } from './UpdateDirectory'
import ViewSPC, { ViewSPCRef } from './ViewSPC'
import RegisterSPC, { RegisterSPCRef } from './RegisterSPC'

export function SPCTable() {
  // Models

  const [isPopOpen, setIsPopOpen] = useState(false)
  const [observation, setObservation] = useState('')
  // const [filterSPC, setFilterSPC] = useState<DirectorySPCProps[]>([])

  const [isLinkTwo, setIsLinkTwo] = useState(false)

  const [loading, setLoading] = useState(true)
  const [SPC, setSPC] = useState<DirectorySPCProps[]>([])

  const modalViewRef = useRef<ViewSPCRef>(null)
  const modalRegisterRef = useRef<RegisterSPCRef>(null)
  const modalUpdateRef = useRef<UpdateDirectoryRef>(null)

  const handleViewModal = useCallback((id: string) => {
    modalViewRef.current?.openModal(id)
  }, [])

  const handleRegisterModal = useCallback(() => {
    modalRegisterRef.current?.openModal()
  }, [])

  const handleUpdateModal = useCallback((id: string) => {
    modalUpdateRef.current?.openModal(id)
  }, [])

  async function loadSPC() {
    setLoading(true)
    try {
      const response = await api.get('/spcs')
      setSPC(response.data)
      console.log(response.data)
    } catch (error) {
      console.log("Erro ao carregar os dados da SPC's")
    }
    setLoading(false)
  }

  useEffect(() => {
    loadSPC()
  }, [])

  function handleViewObservation(message: string) {
    setObservation(message)
    setIsPopOpen(true)
  }

  // // filtrar dados
  // function handleFilter(value: string) {
  //   if (value.trim() === '') {
  //     setFilterSPC([])
  //   }

  //   const data = SPC.filter((spc) => {
  //     return spc.surname.toLowerCase().includes(value.toLowerCase())
  //   })

  //   setFilterSPC(data)
  // }

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
      <RegisterSPC ref={modalRegisterRef} />
      <UpdateDirectory ref={modalUpdateRef} />
      <ViewSPC ref={modalViewRef} />

      <div className="flex justify-between gap-4">
        <div className="flex w-fit gap-4">
          <input
            type="text"
            className="w-fit"
            // onChange={(e) => handleFilter(e.target.value)}
            placeholder="Buscar direção"
          />
          <div className="flex flex-row items-center justify-center gap-4">
            <h3>Filtro</h3>
            <input type="text" placeholder="UP" />
            <input type="text" placeholder="Status" />
            <input type="text" placeholder="Ano" />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => loadSPC()}
            className="w-fit border-[1px]  border-gray-200 bg-white text-gray-700"
          >
            <RotateCcw className="w-4" />
            Atualizar
          </button>
          <button
            onClick={() => handleRegisterModal()}
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
              <th>Direção</th>
              <th className="flex items-center gap-2 ">
                SPCA
                <button
                  type="button"
                  onClick={() => setIsLinkTwo(!isLinkTwo)}
                  className={`h-auto p-1 text-xs transition-shadow duration-200 ${
                    isLinkTwo ? 'bg-primary text-white' : 'bg-gray-300'
                  }`}
                >
                  PJE
                </button>
              </th>
              <th>Vigência</th>
              <th>SPCE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {SPC.length > 0 ? (
              SPC.map((spc, index) => (
                <tr key={index}>
                  <td>
                    {spc.party} - {spc.surname}
                  </td>
                  <td className="whitespace-nowrap">
                    <ul>
                      {spc.SPCA.length > 0 ? (
                        spc.SPCA.map((spca, index) => (
                          <li key={index} className="relative">
                            <a
                              target="blank"
                              title={spca.status}
                              style={{
                                backgroundColor: `${spca.color}`,
                              }}
                              href={isLinkTwo ? spca.link2 : spca.link1}
                            >
                              {spca.year}
                            </a>

                            {spca.observation && (
                              <button
                                type="button"
                                className="h-fit w-fit p-0"
                                onClick={() =>
                                  handleViewObservation(spca.observation)
                                }
                              >
                                <Circle
                                  className="absolute -right-1 -top-2 z-0 cursor-pointer fill-primary text-primary"
                                  size={12}
                                />
                              </button>
                            )}
                          </li>
                        ))
                      ) : (
                        <li>-</li>
                      )}
                    </ul>
                  </td>
                  <td>
                    <span
                      className={
                        spc.vigency
                          ? `rounded-xl bg-blue-100 px-2 py-1 text-blue-400`
                          : `rounded-xl bg-zinc-100 px-2 py-1 text-gray-400`
                      }
                    >
                      {spc.vigency ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap">
                    <ul>
                      {spc.SPCE.length > 0 ? (
                        spc.SPCE.map((spce, index) => (
                          <li key={index} className="relative">
                            <a
                              target="blank"
                              title={spce.status}
                              style={{
                                backgroundColor: `${spce.color}`,
                              }}
                              href={spce.link}
                            >
                              {spce.year}
                            </a>

                            {spce.observation && (
                              <button
                                type="button"
                                className="h-fit w-fit p-0"
                                onClick={() =>
                                  handleViewObservation(spce.observation)
                                }
                              >
                                <Circle
                                  className="absolute -right-1 -top-2 z-0 cursor-pointer fill-primary text-primary"
                                  size={12}
                                />
                              </button>
                            )}
                          </li>
                        ))
                      ) : (
                        <li>-</li>
                      )}
                    </ul>
                  </td>

                  <td className="w-16 ">
                    <div className="flex items-center ">
                      <button className="h-full w-auto p-1 hover:text-secundary">
                        <Eye
                          onClick={() => handleViewModal(spc.id.toString())}
                          className="w-4"
                        />
                      </button>
                      <button
                        onClick={() => handleUpdateModal(spc.id.toString())}
                        className="h-full w-auto rounded p-1 hover:text-primary"
                      >
                        <Edit3 className="w-4" />
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

      <Pop
        onClose={() => setIsPopOpen(false)}
        isOpen={isPopOpen}
        text={observation}
      />
    </div>
  )
}
