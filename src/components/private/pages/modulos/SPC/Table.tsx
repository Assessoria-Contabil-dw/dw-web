import { SPCProps } from '@/interfaces/types'
import { useCallback, useRef, useState } from 'react'
import UpdateSPC, { UpdateSPCRef } from './Update'
import ViewSPC, { ViewSPCRef } from './View'
import dayjs from 'dayjs'
import { LoadingSecond } from '@/components/Loading/second'
import { TableOptions } from '../../../Tools/TableOptions'

interface TableSPCProps {
  role: string
  data?: SPCProps[] | null
  loading?: boolean
}
export function TableSPC({ role, data, loading }: TableSPCProps) {
  const [selectedCheckbox, setSelectedCheckbox] = useState(0)

  const [isLinkTwo, setIsLinkTwo] = useState(false)
  const modalUpdateRef = useRef<UpdateSPCRef>(null)
  const modalViewRef = useRef<ViewSPCRef>(null)

  const handleEditDirectory = useCallback((id: string) => {
    modalUpdateRef.current?.openModal(id)
  }, [])

  const handleViewModal = useCallback((id: string) => {
    modalViewRef.current?.openModal(id)
  }, [])

  const handleCheckboxChange = (checkboxId: number) => {
    if (checkboxId === selectedCheckbox) {
      setSelectedCheckbox(0)
      return
    }
    setSelectedCheckbox(checkboxId)
  }

  const generateSPCAList = (spc: SPCProps) => {
    const spcaList = []

    for (let i = 2017; i <= dayjs().year(); i++) {
      const spca = spc.SPCA?.find((spca) => spca?.year === String(i) || null)

      spcaList.push(
        <li key={i} className="relative">
          {spca ? (
            <a
              target="blank"
              title={spca.status}
              style={{ backgroundColor: `${spca.color}` }}
              href={isLinkTwo ? spca.link2 : spca.link1}
            >
              {spca.year}
            </a>
          ) : (
            <div className="w-10" />
          )}
          {spca?.observation && (
            <>
              <input
                type="checkbox"
                name="observation"
                id={spca.id.toString()}
                checked={selectedCheckbox === spca.id}
                onChange={() => handleCheckboxChange(spca.id)}
                className="peer/popper absolute -right-1 -top-2 z-10 h-3 w-3 cursor-pointer opacity-0"
              />
              <span className="z-1 absolute -right-1 -top-2 flex h-3 w-3 ">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-second opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-second"></span>
              </span>
              <div className="absolute z-10 mt-[2px] hidden w-full transition duration-1000 peer-checked/popper:block">
                <div className="w-[18em] rounded-md border-[1px] border-zinc-200 bg-white p-2 shadow-sm">
                  <span className="whitespace-normal break-words font-montserrat text-xs text-slate-700 ">
                    {spca.observation}
                  </span>
                </div>
              </div>
            </>
          )}
        </li>,
      )
    }
    return spcaList
  }

  const generateSPCEList = (spc: SPCProps) => {
    const spceList = []

    for (let i = 2018; i <= dayjs().year(); i += 2) {
      const spce = spc.SPCE?.find((spce) => spce?.year === String(i) || null)

      spceList.push(
        <li key={i} className="relative">
          {spce ? (
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
          ) : (
            <div className="w-10" />
          )}
        </li>,
      )
    }
    return spceList
  }

  return (
    <div>
      <UpdateSPC ref={modalUpdateRef} />
      <ViewSPC ref={modalViewRef} />

      <fieldset className="fieldset">
        <table>
          <thead>
            <tr>
              <th>
                <div className="flex gap-2">
                  {loading && <LoadingSecond />} Direção
                </div>
              </th>
              <th className="flex items-center gap-2 ">
                SPCA
                <button
                  type="button"
                  onClick={() => setIsLinkTwo(!isLinkTwo)}
                  className={`h-full rounded-lg p-1  font-inter text-xs transition-shadow duration-200 ${
                    isLinkTwo
                      ? 'bg-primary text-blue-950'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  PJ
                  <span
                    className={isLinkTwo ? `text-orange-500` : `text-slate-500`}
                  >
                    e
                  </span>
                </button>
              </th>
              <th>Vigência</th>
              <th>SPCE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data?.map((spc, index) => (
                <tr key={index}>
                  <td>
                    {spc.state} - {spc.party} - {spc.surname}
                  </td>
                  <td className="whitespace-nowrap">
                    <ul>
                      {spc.SPCA !== null && spc.SPCA.length > 0 ? (
                        generateSPCAList(spc)
                      ) : (
                        <li></li>
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
                      {spc.SPCE !== null && spc.SPCE.length > 0 ? (
                        generateSPCEList(spc)
                      ) : (
                        <li></li>
                      )}
                    </ul>
                  </td>

                  <td>
                    <TableOptions
                      role={role || ''}
                      isView
                      isEdit
                      isDelete={false}
                      handleView={() => handleViewModal(spc.id.toString())}
                      handleEdit={() => handleEditDirectory(spc.id.toString())}
                    />
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
