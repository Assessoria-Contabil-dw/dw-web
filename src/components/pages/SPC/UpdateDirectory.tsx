import { api } from '@/lib/api'
import { ColorProps, DirectorySPCProps } from '@/interfaces/types'
import { Check, Trash, X } from 'lucide-react'
import {
  FormEvent,
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import DeleteModel, { DeleteRef } from '../../Model/Delete'
import { LoadingSecond } from '@/components/Loading/second'

export interface UpdateDirectoryRef {
  openModal: (id: string) => void
  closeModal: () => void
}

const UpdateDirectory: ForwardRefRenderFunction<UpdateDirectoryRef> = (
  props,
  ref,
) => {
  const [loading, setLoading] = useState(true)
  const [spcs, setSPC] = useState<DirectorySPCProps | null>(null)
  const [isModalView, setIsModalView] = useState(false)
  const [directoryId, setDirectoryId] = useState('')

  const [register, setRegister] = useState(0)
  const [color, setColor] = useState<ColorProps[]>([])

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

  async function loadSPC() {
    setLoading(true)

    try {
      const [directoryResponse, colorStatusResponse] = await Promise.all([
        api.get(`/spcs/directory/${directoryId}`),
        api.get('/colors/legend'),
      ])
      setSPC(directoryResponse.data)
      setColor(colorStatusResponse.data)
    } catch (error) {
      console.error('Erro ao carregar os dados:', error)
    }

    setLoading(false)
  }

  function handleRowClick(spcId: number) {
    setRegister(spcId)
  }

  function handleEditFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { year, numPge, status, observation } =
      event.target as HTMLFormElement

    const updateSPCA = {
      year: year.value,
      numPge: numPge.value,
      status: Number(status.value),
      observation: observation.value,
    }
    console.log(updateSPCA)

    try {
      api.put(`/spcs/${register}`, updateSPCA)
      setRegister(0)
      loadSPC()
    } catch (err) {
      console.log(err)
    }
  }
  const modalDeleteRef = useRef<DeleteRef>(null)
  const handleDeletModal = useCallback(
    (id: string, msg: string, path: string, query: string) => {
      modalDeleteRef.current?.openModal(id, msg, path, query)
    },
    [],
  )

  useEffect(() => {
    if (isModalView) {
      loadSPC()
    }
  }, [directoryId])

  if (!isModalView) {
    return null
  }

  return (
    <div className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
      <DeleteModel ref={modalDeleteRef} />

      <div className="h-3/4 w-2/4 overflow-hidden">
        <fieldset className="flex h-full w-full flex-col items-start justify-start  border-b-[1px]">
          <div className="flex w-full justify-between">
            <div>
              <h4>Atualizar SPCS</h4>
              <span>
                {spcs?.party} - {spcs?.surname}
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
            <div className="flex h-full w-full items-center justify-center">
              <LoadingSecond />
            </div>
          ) : (
            <div className="flex w-full flex-col items-start justify-start gap-8 overflow-y-scroll">
              <div>
                <h3>SPCA</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Ano</th>
                      <th>Num</th>
                      <th>Situação</th>
                      <th>Obs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spcs?.SPCA !== null &&
                      spcs?.SPCA.map((spc) =>
                        register === spc.id ? (
                          <tr key={spc.id}>
                            <td colSpan={4}>
                              <form
                                onSubmit={handleEditFormSubmit}
                                className="grid w-full grid-flow-col gap-2 border-none p-0"
                              >
                                <button
                                  onClick={() => setRegister(0)}
                                  className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                                >
                                  <X size={18} />
                                </button>
                                <input
                                  name="year"
                                  type="text"
                                  defaultValue={spc.year}
                                  required
                                />
                                <input
                                  name="numPge"
                                  type="text"
                                  defaultValue={spc.numPge}
                                  required
                                />
                                <select name="status">
                                  {color.map((c) => (
                                    <option
                                      key={c.id}
                                      value={c.id}
                                      selected={c.name === spc.status}
                                    >
                                      {c.name}
                                    </option>
                                  ))}
                                </select>
                                <textarea name="observation">
                                  {spc.observation}
                                </textarea>
                                <button
                                  className="bg-primary text-white"
                                  type="submit"
                                >
                                  <Check size={18} />
                                </button>
                                <button
                                  className="bg-red-400 text-white"
                                  type="button"
                                  onClick={() =>
                                    handleDeletModal(
                                      spc.id.toString(),
                                      'spcs',
                                      spc.year,
                                      'spcs',
                                    )
                                  }
                                >
                                  <Trash size={18} />
                                </button>
                              </form>
                            </td>
                          </tr>
                        ) : (
                          <tr
                            key={spc.id}
                            onClick={() => handleRowClick(spc.id)}
                            className="cursor-pointer"
                          >
                            <td>{spc.id}</td>
                            <td>{spc.numPge != null ? spc.numPge : '-'}</td>
                            <td>{spc.status}</td>
                            <td>{spc.observation}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              <hr />
              <div>
                <h3>SPCE</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Ano</th>
                      <th>Num</th>
                      <th>Situação</th>
                      <th>Obs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spcs?.SPCE !== null &&
                      spcs?.SPCE.map((spc) =>
                        register === spc.id ? (
                          <tr key={spc.id}>
                            <td colSpan={4}>
                              <form
                                onSubmit={handleEditFormSubmit}
                                className="grid w-full grid-flow-col gap-2 border-none p-0"
                              >
                                <button
                                  onClick={() => setRegister(0)}
                                  className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                                >
                                  <X size={18} />
                                </button>
                                <input
                                  name="year"
                                  type="text"
                                  defaultValue={spc.year}
                                  required
                                />
                                <input
                                  name="numPge"
                                  type="text"
                                  defaultValue={spc.numPge}
                                  required
                                />
                                <select name="status">
                                  {color.map((c) => (
                                    <option
                                      key={c.id}
                                      value={c.id}
                                      selected={c.name === spc.status}
                                    >
                                      {c.name}
                                    </option>
                                  ))}
                                </select>
                                <textarea name="observation">
                                  {spc.observation}
                                </textarea>
                                <button
                                  className="bg-primary text-white"
                                  type="submit"
                                >
                                  <Check size={18} />
                                </button>
                                <button
                                  className="bg-red-400 text-white"
                                  type="button"
                                  onClick={() =>
                                    handleDeletModal(
                                      spc.id.toString(),
                                      'spcs',
                                      spc.year,
                                      'spcs',
                                    )
                                  }
                                >
                                  <Trash size={18} />
                                </button>
                              </form>
                            </td>
                          </tr>
                        ) : (
                          <tr
                            key={spc.id}
                            onClick={() => handleRowClick(spc.id)}
                            className="cursor-pointer"
                          >
                            <td>{spc.year}</td>
                            <td>{spc.numPge != null ? spc.numPge : '-'}</td>
                            <td>{spc.status}</td>
                            <td>{spc.observation}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </fieldset>
      </div>
    </div>
  )
}

export default forwardRef(UpdateDirectory)
