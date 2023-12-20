import { api } from '@/lib/api'
import { DirectorySPCProps } from '@/@types/types'
import { X } from 'lucide-react'
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { LoadingSecond } from '@/components/Loading/second'

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
    <div className="model-bg">
      <div className="model-size">
        <div className="model-card">
          <div className="model-header">
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
            <div className="model-loading">
              <LoadingSecond />
            </div>
          ) : (
            <div className="model-body">
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
                    {spcs?.SPCA != null &&
                      spcs?.SPCA.map((spc) => (
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
                    {spcs?.SPCE != null &&
                      spcs?.SPCE.map((spc) => (
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
        </div>
      </div>
    </div>
  )
}

export default forwardRef(ViewSPCModel)
