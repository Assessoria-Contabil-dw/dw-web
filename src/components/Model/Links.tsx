'use client'
import { LoadingSecond } from '@/components/Loading/second'
import { api } from '@/lib/api'
import { Globe, X } from 'lucide-react'
import {
  ForwardRefRenderFunction,
  HTMLAttributes,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import { useQuery } from 'react-query'

interface LinkProps {
  url: string
  logoUrl: string
}

export interface ModelRef {
  openModal: () => void
  closeModal: () => void
}

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

const ModelLinks: ForwardRefRenderFunction<ModelRef> = (
  props: FieldProps,
  ref,
) => {
  const { data, isLoading } = useQuery<LinkProps[]>(
    'links',
    async () => {
      const response = await api.get('/linkSites')
      return response.data
    },
    {
      staleTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      retry: false,
    },
  )

  const [isModalView, setIsModalView] = useState(false)

  const openModal = useCallback(() => {
    setIsModalView(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalView(false)
  }, [])

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }))

  if (!isModalView) {
    return null
  }

  if (isLoading) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2">
        <LoadingSecond />
      </div>
    )
  }
  return (
    <div className="fixed right-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="min-h-3/4 w-2/4 overflow-hidden max-md:w-11/12">
        <fieldset className=" flex h-full w-full flex-col items-start justify-start  border-b-[1px]">
          <div className="flex w-full justify-between">
            <div>
              <h4></h4>
            </div>
            <button
              onClick={closeModal}
              className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div>
            <div>
              <h2>Esta precisando consultar alguma informação?</h2>
              <span>
                Acesse os links abaixo e encontre o que precisa, caso não
                encontre, entre em contato com a equipe de suporte.
              </span>
            </div>

            <ul className=" mt-4 grid grid-cols-4 items-center justify-center">
              {data !== undefined || data != null ? (
                data.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-center border-[1px] border-dashed"
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.logoUrl ? (
                        <picture>
                          <img
                            className="h-12 w-24 object-contain"
                            src={item.logoUrl}
                            alt=""
                          />
                        </picture>
                      ) : (
                        <Globe className="" />
                      )}
                    </a>
                  </li>
                ))
              ) : (
                <li className="flex h-full w-full items-center justify-center">
                  Sem links cadastrados
                </li>
              )}
            </ul>
          </div>
        </fieldset>
      </div>
    </div>
  )
}

export default forwardRef(ModelLinks)
