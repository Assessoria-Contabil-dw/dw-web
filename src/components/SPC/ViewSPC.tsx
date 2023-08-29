import { api } from '@/lib/api'
import { DirectorySPCProps } from '@/lib/types'
import { X } from 'lucide-react'
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Loading } from '../Form/Loading'

export interface ViewSPCRef {
  openModal: (id: string) => void
  closeModal: () => void
}

const ViewSPCModel: ForwardRefRenderFunction<ViewSPCRef> = (props, ref) => {
  const [isModalView, setIsModalView] = useState(false)
  const [directoryId, setDirectoryId] = useState('')
  const [spcs, setSPC] = useState<DirectorySPCProps | null>(null)
  const [loading, setLoading] = useState(true)

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

  // Requisição
  async function loadSPC() {
    setLoading(true)
    try {
      const response = await api.get(`/spcs/directory/${directoryId}`)
      setSPC(response.data)
      console.log(spcs)
    } catch (error) {
      console.log("Erro ao carregar os dados da SPC's")
    }
    setLoading(false)
  }

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
      <div className="h-3/4 w-2/4 overflow-hidden">
        <fieldset className="flex h-full w-full flex-col items-start justify-start border-b-[1px]">
          <div className="flex w-full justify-between">
            <div>
              <h4>Visualizar SPCS</h4>
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
              <Loading />
            </div>
          ) : (
            <div className="flex w-full flex-col justify-start gap-8 overflow-y-scroll">
              <div>
                <h3>SPCA</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Ano</th>
                      <th>Num</th>
                      <th>Situação</th>
                      <th>Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spcs?.SPCA.map((spc) => (
                      <tr key={spc.id}>
                        <td>{spc.year}</td>
                        <td>{spc.numPge != null ? spc.numPge : '-'}</td>
                        <td>{spc.status}</td>
                        <td>{spc.observation}</td>
                      </tr>
                    ))}
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
                      <th>Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spcs?.SPCE.map((spc) => (
                      <tr key={spc.id}>
                        <td>{spc.year}</td>
                        <td>{spc.numPge != null ? spc.numPge : '-'}</td>
                        <td>{spc.status}</td>
                        <td>{spc.observation}</td>
                      </tr>
                    ))}
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

export default forwardRef(ViewSPCModel)
