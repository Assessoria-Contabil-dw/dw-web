'use client'
import { useQuery } from 'react-query'
import { TableSPC } from './Table'
import { Page } from '@/lib/page'
import {
  CityProps,
  ColorProps,
  DirectorySPCProps,
  StateProps,
} from '@/lib/types'
import { api } from '@/lib/api'
import { ChangeEvent, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Loading } from '../Form/Loading'
import dayjs from 'dayjs'

interface SearchProps {
  legend?: number
  party?: string
  city?: string
  stateId?: string
  status?: string
  year?: string
}

export function SPC() {
  const [page, setPage] = useState(0)

  const [search, setSearch] = useState<SearchProps>({} as SearchProps)
  const [states, setStates] = useState<StateProps[]>([])
  const [colors, setColors] = useState<ColorProps[]>([])

  // const modalRegisterRef = useRef<RegisterSPCRef>(null)

  // const handleRegisterModal = useCallback(() => {
  //   modalRegisterRef.current?.openModal()
  // }, [])

  const spcResult = useQuery<Page<DirectorySPCProps>>(
    [
      'spcs',
      page,
      search.legend,
      search.party,
      search.city,
      search.stateId,
      search.status,
      search.year,
    ],
    async () => {
      const response = await api
        .get('/spcs', {
          params: {
            skip: page,
            take: 15,
            legend: search.legend,
            party: search.party,
            city: search.city,
            stateId: search.stateId,
            status: search.status,
            year: search.year,
          },
        })
        .then((response) => response.data)
      console.log(response)
      return response
    },
    {
      keepPreviousData: true,
      staleTime: 1000 * 60,
      onSuccess: () => {
        console.log('Dados atualizados com sucesso')
      },
    },
  )

  useEffect(() => {
    Promise.all([api.get('/states'), api.get('/colors/legend')])
      .then(([states, colorStatus]) => {
        setStates(states.data)
        setColors(colorStatus.data)
        console.log(states.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  async function fetchCity(): Promise<CityProps[]> {
    if (search.stateId === undefined) return []
    const response = await api
      .get('/cities', {
        params: {
          stateId: search.stateId,
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        throw err
      })

    console.log('cidades', response)
    return response
  }

  const cityResult = useQuery<CityProps[]>(
    ['city', search.stateId],
    fetchCity,
    {
      keepPreviousData: true,
    },
  )

  function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.target
    console.log(name, value)

    if (name === 'year' && value.length < 4) {
      setSearch((old) => ({ ...old, [name]: undefined }))
      return
    }
    setPage(0)
    setSearch((old) => ({ ...old, [name]: value || undefined }))
  }

  if (spcResult.isLoading) {
    console.log('dentro', spcResult.isLoading)
    return (
      <div className="mt-4 flex items-center justify-center gap-2">
        <Loading />
        <i className="text-gray-500">Carregando...</i>
      </div>
    )
  }

  if (spcResult.isError) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2">
        <i className="text-gray-500">Algo deu errado!</i>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {/* <RegisterSPC ref={modalRegisterRef} /> */}
      <div className="flex justify-between gap-4">
        <div className="flex w-fit items-center gap-2">
          <h4>Filtros: </h4>
          <input
            type="text"
            name="party"
            onChange={handleSearchOnChange}
            placeholder="Partido"
          />

          <select name="stateId" onChange={handleSearchOnChange}>
            <option value="">Todos</option>
            {states.map((state) => (
              <option key={state.code} value={state.uf}>
                {state.uf}
              </option>
            ))}
          </select>

          <select name="city" onChange={handleSearchOnChange}>
            <option value="">Todos</option>
            {cityResult.data !== undefined
              ? cityResult.data.map((city) => (
                  <option key={city.code} value={city.code}>
                    {city.name}
                  </option>
                ))
              : null}
          </select>

          <select name="status" onChange={handleSearchOnChange}>
            <option value="">Todos</option>
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
          <input
            type="number"
            min={2017}
            max={dayjs().year()}
            placeholder={String(dayjs().year())}
            name="year"
            onChange={handleSearchOnChange}
          />
          <select name="legend" onChange={handleSearchOnChange}>
            <option value="">Todos</option>
            {colors.map((legend) => (
              <option key={legend.id} value={legend.id}>
                {legend.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <TableSPC data={spcResult.data?.results ?? []} />

      {spcResult.data?.results != null ? (
        <div className="flex items-center gap-2">
          <button
            className="h-fit rounded-full bg-primary px-1 py-1  text-white disabled:cursor-not-allowed disabled:bg-gray-300"
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
          >
            <ChevronLeft size={18} />
          </button>
          <span>
            {spcResult.data?.info.pages === 1
              ? 1
              : page + 1 + '...' + Number(spcResult.data?.info?.pages + 1)}
          </span>
          <button
            className="h-fit rounded-full bg-primary px-1 py-1  text-white disabled:cursor-not-allowed disabled:bg-gray-300"
            onClick={() => {
              if (!spcResult.isPreviousData && spcResult.data?.info?.next) {
                setPage((old) => old + 1)
              }
            }}
            disabled={spcResult.isPreviousData || !spcResult.data?.info?.next}
          >
            <ChevronRight size={18} />
          </button>
          {spcResult.isFetching ? (
            <span>
              <Loading />
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
