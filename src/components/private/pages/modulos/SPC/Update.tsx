import { Check, Trash, X } from 'lucide-react'
import {
  FormEvent,
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import DeleteModel, { DeleteRef } from '../../../../Model/Delete'
import { LoadingSecond } from '@/components/Loading/second'
import { useSPCDataById, useSPCUpdateById } from '@/hooks/useSPCData'
import InputBase from '../../../Search/Input/InputBase'
import dayjs from 'dayjs'
import SelectLegend from '../../../Search/Select/SelectLegend'
import ButtonIcon from '@/components/Buttons/ButtonIcon'
import { SPCUpdateProps } from '@/interfaces/types'

export interface UpdateSPCRef {
  openModal: (id: string) => void
  closeModal: () => void
}

const UpdateSPC: ForwardRefRenderFunction<UpdateSPCRef> = (props, ref) => {
  const [isModalView, setIsModalView] = useState(false)
  const [directoryId, setDirectoryId] = useState('')
  const [id, setId] = useState(0)
  const [updateData, setUpdateData] = useState<SPCUpdateProps>(
    {} as SPCUpdateProps,
  )

  const openModal = useCallback((id: string) => {
    setDirectoryId(id)
    setIsModalView(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalView(false)
  }, [])

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }))

  const { data: spcData, isLoading } = useSPCDataById(directoryId)
  const { refetch } = useSPCUpdateById(
    String(id),
    updateData.year,
    updateData.numPge,
    updateData.status,
    updateData.observation,
  )

  function handleSelectRow(spcId: number) {
    setId(spcId)
  }

  function handleEditFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { year, numPge, legend, observation } =
      event.target as HTMLFormElement

    setUpdateData({
      year: year.value,
      numPge: numPge.value,
      status: Number(legend.value),
      observation: observation.value,
    })
    refetch()
  }

  const modalDeleteRef = useRef<DeleteRef>(null)
  const handleDeleteSPC = useCallback((id: number, year: string) => {
    modalDeleteRef.current?.openModal(
      String(id),
      'spcs',
      `Deseja excluir o SPC ${year}`,
      'spcData',
    )
  }, [])

  if (!isModalView) {
    return null
  }

  return (
    <div className="model-bg">
      <DeleteModel ref={modalDeleteRef} />

      <div className="model-size model-size-full">
        <fieldset className="model-card">
          <div className="model-header">
            <div>
              <h4 className="text-h4">Atualizar SPCS</h4>
              <span className="text-span">
                {spcData?.party} - {spcData?.surname}
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
              <div className="flex flex-col gap-2 p-1">
                <div className="rounded-xl border-[1px]">
                  <div className="rounded-t-xl bg-blue-100 p-1">
                    <h5 className="text-h5 text-center text-slate-600">
                      Dados SPCA
                    </h5>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th className="text-[10px]">Ano</th>
                        <th className="text-[10px]">Num</th>
                        <th className="text-[10px]">Situação</th>
                        <th className="text-[10px]">Observação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spcData?.SPCA != null ? (
                        spcData.SPCA.map((s) =>
                          id === s.id ? (
                            <tr key={s.id}>
                              <td colSpan={4}>
                                <form
                                  onSubmit={handleEditFormSubmit}
                                  className="grid w-full grid-flow-col gap-2 border-none p-0"
                                >
                                  <button
                                    onClick={() => setId(0)}
                                    className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                                  >
                                    <X size={18} />
                                  </button>

                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-end gap-2">
                                      <div className="w-44">
                                        <InputBase
                                          type="number"
                                          name="year"
                                          label="Ano"
                                          defaultValue={s.year}
                                          min={2017}
                                          max={dayjs().year()}
                                          required
                                        />
                                      </div>

                                      <InputBase
                                        name="numPge"
                                        label="Num"
                                        defaultValue={s.numPge}
                                        required
                                      />

                                      <SelectLegend valueSelect={s.status} />
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <textarea
                                        name="observation"
                                        className="input-style"
                                        placeholder="Observação"
                                      >
                                        {s.observation}
                                      </textarea>

                                      <ButtonIcon
                                        icon={<Check size={18} />}
                                        title="Atualizar"
                                        className="border-none bg-primary text-white hover:bg-primaryHover"
                                        type="submit"
                                      />
                                      <ButtonIcon
                                        title="Deletar"
                                        icon={<Trash size={18} />}
                                        className="border-none bg-red-400 text-white hover:bg-red-500"
                                        type="button"
                                        onClick={() =>
                                          handleDeleteSPC(s.id, s.year)
                                        }
                                      />
                                    </div>
                                  </div>
                                </form>
                              </td>
                            </tr>
                          ) : (
                            <tr
                              key={s.id}
                              onClick={() => handleSelectRow(s.id)}
                              className="cursor-pointer"
                            >
                              <td>{s.year}</td>
                              <td>{s.numPge ?? '-'}</td>
                              <td>
                                <div
                                  style={{ backgroundColor: `${s.color}` }}
                                  className=" rounded-md p-1 text-center text-[10px] text-white"
                                >
                                  {s.status ?? '-'}
                                </div>
                              </td>
                              <td>{s.observation ?? '-'}</td>
                            </tr>
                          ),
                        )
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center">
                            Não há dados cadastrados
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-xl border-[1px]">
                  <div className="rounded-t-xl bg-blue-100 p-1">
                    <h5 className="text-h5 text-center text-slate-600">
                      Dados SPCE
                    </h5>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th className="text-[10px]">Ano</th>
                        <th className="text-[10px]">Num</th>
                        <th className="text-[10px]">Situação</th>
                        <th className="text-[10px]">Observação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spcData?.SPCE != null ? (
                        spcData.SPCE.map((s) =>
                          id === s.id ? (
                            <tr key={s.id}>
                              <td colSpan={4}>
                                <form
                                  onSubmit={handleEditFormSubmit}
                                  className="grid w-full grid-flow-col gap-2 border-none p-0"
                                >
                                  <button
                                    onClick={() => setId(0)}
                                    className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                                  >
                                    <X size={18} />
                                  </button>

                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-end gap-2">
                                      <div className="w-44">
                                        <InputBase
                                          type="number"
                                          name="year"
                                          label="Ano"
                                          defaultValue={s.year}
                                          min={2017}
                                          max={dayjs().year()}
                                          required
                                        />
                                      </div>

                                      <InputBase
                                        name="numPge"
                                        label="Num"
                                        defaultValue={s.numPge}
                                        required
                                      />

                                      <SelectLegend valueSelect={s.status} />
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <textarea
                                        name="observation"
                                        className="input-style"
                                        placeholder="Observação"
                                      >
                                        {s.observation}
                                      </textarea>

                                      <ButtonIcon
                                        icon={<Check size={18} />}
                                        title="Atualizar"
                                        className="border-none bg-primary text-white hover:bg-primaryHover"
                                        type="submit"
                                      />
                                      <ButtonIcon
                                        title="Deletar"
                                        icon={<Trash size={18} />}
                                        className="border-none bg-red-400 text-white hover:bg-red-500"
                                        type="button"
                                        onClick={() =>
                                          handleDeleteSPC(s.id, s.year)
                                        }
                                      />
                                    </div>
                                  </div>
                                </form>
                              </td>
                            </tr>
                          ) : (
                            <tr
                              key={s.id}
                              onClick={() => handleSelectRow(s.id)}
                              className="cursor-pointer"
                            >
                              <td>{s.year}</td>
                              <td>{s.numPge ?? '-'}</td>
                              <td>
                                <div
                                  style={{ backgroundColor: `${s.color}` }}
                                  className=" rounded-md p-1 text-center text-[10px] text-white"
                                >
                                  {s.status ?? '-'}
                                </div>
                              </td>
                              <td>{s.observation ?? '-'}</td>
                            </tr>
                          ),
                        )
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center">
                            Não há dados cadastrados
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </fieldset>
      </div>
    </div>
  )
}

export default forwardRef(UpdateSPC)
