import { X } from 'lucide-react'
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useState,
} from 'react'
import { LoadingSecond } from '@/components/Loading/second'
import TableMinSPC from './TableMinView'
import { useSPCDirectoryById } from '@/hooks/SPC/useSPC'
import { AccessContext } from '@/provider/context.provider'

export interface ViewSPCRef {
  openModal: (id: string) => void
  closeModal: () => void
}

const ViewSPCModel: ForwardRefRenderFunction<ViewSPCRef> = (props, ref) => {
  const [isModalView, setIsModalView] = useState(false)
  const [directoryId, setDirectoryId] = useState('')

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

  const { partyCode, cityCode, stateId } = useContext(AccessContext);
  const { data: spcData, isLoading } = useSPCDirectoryById(
    directoryId,
    partyCode,
    stateId,
    cityCode
  );

  if (!isModalView) {
    return null
  }

  return (
    <div className="model-bg">
      <div className="model-size model-size-full">
        <div className="model-card">
          <div className="model-header">
            <div>
              <h4 className="text-h4">Visualizar SPCS</h4>
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
                <TableMinSPC
                  spc={spcData?.SPCA ?? null}
                  title="Dados do SPCA"
                />
                <TableMinSPC
                  spc={spcData?.SPCE ?? null}
                  title="Dados do SPCE"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default forwardRef(ViewSPCModel)
