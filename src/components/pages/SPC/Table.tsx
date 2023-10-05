import { DirectorySPCProps } from '@/@types/types'
import { Circle, Edit3, Eye } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import PopObservation, { ObservationRef } from './PopObservation'
import UpdateDirectory, { UpdateDirectoryRef } from './UpdateDirectory'
import ViewSPC, { ViewSPCRef } from './ViewSPC'

interface SPCProps {
  data: DirectorySPCProps[] | null
}
export function TableSPC({ data }: SPCProps) {
  const [isLinkTwo, setIsLinkTwo] = useState(false)

  const modalUpdateRef = useRef<UpdateDirectoryRef>(null)
  const modalViewRef = useRef<ViewSPCRef>(null)
  const popObservationRef = useRef<ObservationRef>(null)

  const handleUpdateModal = useCallback((id: string) => {
    modalUpdateRef.current?.openModal(id)
  }, [])

  const handleViewModal = useCallback((id: string) => {
    modalViewRef.current?.openModal(id)
  }, [])

  const handleViewObservation = useCallback((message: string) => {
    popObservationRef.current?.openModal(message)
  }, [])

  return (
    <div>
      <UpdateDirectory ref={modalUpdateRef} />
      <ViewSPC ref={modalViewRef} />
      <PopObservation ref={popObservationRef} />

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
            {data !== null && data?.length > 0 ? (
              data?.map((spc, index) => (
                <tr key={index}>
                  <td>
                    {spc.state} - {spc.party} - {spc.surname}
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
                                  className="absolute -right-1 -top-2 z-0 cursor-pointer fill-secondHover text-secondHover"
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
                                  className="absolute -right-1 -top-2 z-0 cursor-pointer fill-secondHover text-secondHover"
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
                      <button className="h-full w-auto p-1 hover:text-green-500">
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
    </div>
  )
}
