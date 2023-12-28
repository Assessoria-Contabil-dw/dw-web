import { LoadingSecond } from '@/components/Loading/second'
import { useNotify } from '@/components/Toast/toast'
import { useCityData } from '@/hooks/useCityData'
import { usePartyData } from '@/hooks/usePartyData'
import { useStateData } from '@/hooks/useStateData'
import { api } from '@/lib/api'
import { queryClient } from '@/provider/query.provider'
import { X } from 'lucide-react'
import {
  ChangeEvent,
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import { useQuery } from 'react-query'

export interface RegisterUserRef {
  openModal: (id: number) => void
  closeModal: () => void
}
interface ModuleProps {
  id: number
  name: string
}

interface Module {
  moduleId: number
}
interface Search {
  acessType: string | undefined
  userId: number | undefined
  partyCode: number | undefined
  stateId: string | undefined
  cityCode: string | undefined
  modules: Module[]
}

const RegisterPermitModel: ForwardRefRenderFunction<RegisterUserRef> = (
  props,
  ref,
) => {
  const [isModalView, setIsModalView] = useState(false)
  const [search, setSearch] = useState<Search>({} as Search)
  const notify = useNotify()

  const openModal = useCallback((id: number) => {
    setSearch((old) => ({ ...old, userId: id }))
    setIsModalView(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalView(false)
  }, [])

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }))

  function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.target

    if (name === 'acessType') {
      if (value === 'N') {
        setSearch((old) => ({
          ...old,
          stateId: undefined,
          cityCode: undefined,
        }))
      }
      if (value === 'E') {
        setSearch((old) => ({ ...old, cityCode: undefined }))
      }
    }

    if (name === 'stateId' && value === '') {
      setSearch((old) => ({ ...old, cityCode: undefined }))
    }

    if (name === 'modules') {
      if ('checked' in e.target) {
        if (e.target.checked) {
          if (search.modules === undefined) {
            setSearch((old) => ({
              ...old,
              modules: [{ moduleId: Number(value) }],
            }))
            return
          }
          const modules = search.modules.filter(
            (module) => module.moduleId !== Number(value),
          )
          setSearch((old) => ({
            ...old,
            modules: [...modules, { moduleId: Number(value) }],
          }))
          return
        }
        const modules = search.modules.filter(
          (module) => module.moduleId !== Number(value),
        )
        setSearch((old) => ({ ...old, modules }))
      }
      return
    }

    setSearch((old) => ({ ...old, [name]: value || undefined }))
  }

  const { data: modulesData, isLoading: loadingModule } = useQuery<
    ModuleProps[]
  >(
    ['modulesData'],
    async () => {
      const response = await api.get('/modules')
      return response.data
    },
    {
      retry: 1,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 60 * 24, // 24 hours
    },
  )

  const { data: partyData, isLoading: loadingParty } = usePartyData()
  const { data: stateData, isLoading: loadingState } = useStateData()
  const { data: cityData } = useCityData(
    search.acessType === 'M' ? search.stateId : undefined,
  )

  async function handleSubmit() {
    try {
      const response = await api.post('/access', {
        userId: Number(search.userId),
        partyCode: Number(search.partyCode),
        stateId: search.acessType === 'E' ? search.stateId : undefined,
        cityCode: search.acessType === 'M' ? search.cityCode : undefined,
        modules: search.modules,
      })
      notify({ type: 'success', message: response.data.message })
      queryClient.invalidateQueries('userPermits')
    } catch (err: any) {
      notify({ type: 'error', message: err.response.data.message })
    }
  }

  if (!isModalView) {
    return null
  }

  return (
    <div className="model-bg">
      <div className="model-size">
        <div className="model-card">
          <div className="model-header">
            <div>
              <h4>Cadastrar acessos</h4>
            </div>
            <button
              onClick={closeModal}
              className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <form className="model-body">
            <div>
              <label htmlFor="acessType">Nível</label>
              <select name="acessType" onChange={handleSearchOnChange}>
                <option value="" disabled selected>
                  Selecione
                </option>
                <option value="N">Nacional</option>
                <option value="E">Estadual</option>
                <option value="M">Municipal</option>
              </select>
            </div>
            <hr />
            {!loadingModule && !loadingParty && !loadingState ? (
              <div className="flex h-full w-full flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  {(search.acessType === 'N' ||
                    search.acessType === 'M' ||
                    search.acessType === 'E') && (
                    <div>
                      <label>Partido</label>
                      <select name="partyCode" onChange={handleSearchOnChange}>
                        <option value="" disabled selected>
                          Selecione um partido
                        </option>
                        {partyData &&
                          partyData.results !== null &&
                          partyData.results.map((party) => {
                            return (
                              <option key={party.code} value={party.code}>
                                {party.abbreviation}
                              </option>
                            )
                          })}
                      </select>
                    </div>
                  )}
                  {(search.acessType === 'E' || search.acessType === 'M') && (
                    <div>
                      <label>Estado</label>
                      <select name="stateId" onChange={handleSearchOnChange}>
                        <option value="" disabled selected>
                          Selecione um estado
                        </option>
                        {stateData !== null &&
                          stateData?.map((state) => {
                            return (
                              <option key={state.code} value={state.uf}>
                                {state.name}
                              </option>
                            )
                          })}
                      </select>
                    </div>
                  )}
                  {search.acessType === 'M' && (
                    <div>
                      <label>Cidade</label>
                      <select name="cityCode" onChange={handleSearchOnChange}>
                        <option value="" selected>
                          Selecione uma cidade
                        </option>
                        {cityData !== null &&
                          cityData?.map((city) => {
                            return (
                              <option key={city.code} value={city.code}>
                                {city.name}
                              </option>
                            )
                          })}
                      </select>
                    </div>
                  )}

                  <div>
                    <label htmlFor="modules">Módulos</label>
                    {modulesData?.map((module) => {
                      return (
                        <div key={module.id} className="flex gap-2">
                          <input
                            type="checkbox"
                            name="modules"
                            value={module.id}
                            onChange={handleSearchOnChange}
                          />
                          <label className="text-sm font-normal">
                            {module.name}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <button
                  className="button-second"
                  type="button"
                  onClick={handleSubmit}
                  disabled={
                    !search.acessType ||
                    !search.partyCode ||
                    (search.acessType === 'E' && !search.stateId) ||
                    (search.acessType === 'M' && !search.cityCode)
                  }
                >
                  Cadastrar
                </button>
              </div>
            ) : (
              <div className="flex w-full justify-center">
                <LoadingSecond />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(RegisterPermitModel)
