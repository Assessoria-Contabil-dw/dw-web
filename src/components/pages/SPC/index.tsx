'use client'
import { useQuery } from 'react-query'
import { TableSPC } from './Table'
import { Page } from '@/@types/page'
import { DirectorySPCProps } from '@/@types/types'
import { api } from '@/lib/api'
import { ChangeEvent, useCallback, useContext, useState } from 'react'
import dayjs from 'dayjs'
import { PaddingButtons } from '../../Buttons/next'
import { LoadingPrimary } from '@/components/Loading/primary'
import { AccessContext } from '@/provider/context.provider'
import { useRouter } from 'next/navigation'
import { useNotify } from '@/components/Toast/toast'
import SearchParty from '@/components/Search/party'
import SearchState from '@/components/Search/state'
import SearchCity from '@/components/Search/city'
import SearchVigency from '@/components/Search/status'
import SearchLegend from '@/components/Search/legend'
import { RefreshButton } from '@/components/Buttons/refresh'

interface SearchProps {
  legend?: number
  party?: string
  city?: string
  state?: string
  status?: string
  year?: string
}

export function SPC() {
  const router = useRouter()
  const notify = useNotify()
  const { partyCode, cityCode, stateId } = useContext(AccessContext)

  const [page, setPage] = useState(0)
  const prevPage = useCallback(() => {
    setPage((old) => Math.max(old - 1, 0))
  }, [])

  const nextPage = useCallback(() => {
    setPage((old) => old + 1)
  }, [])

  const [search, setSearch] = useState<SearchProps>({} as SearchProps)

  // const modalRegisterRef = useRef<RegisterSPCRef>(null)

  // const handleRegisterModal = useCallback(() => {
  //   modalRegisterRef.current?.openModal()
  // }, [])

  const {
    data: spcResult,
    isFetching,
    isLoading,
    isError,
    isPreviousData,
  } = useQuery<Page<DirectorySPCProps>>(
    [
      'spcs',
      page,
      search.legend,
      search.party,
      search.city,
      search.state,
      search.status,
      search.year,
      partyCode,
      cityCode,
      stateId,
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
            state: search.state,
            status: search.status,
            year: search.year,
            partyCode,
            cityCode,
            stateId,
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
      onError: (error: any) => {
        if (error.response.status === 403) {
          notify({ type: 'warning', message: error.response.data.message })
          router.push('/painel')
        }
      },
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

    if (name === 'state' && value === '') {
      setSearch((old) => ({ ...old, city: undefined }))
    }

    setPage(0)
    setSearch((old) => ({ ...old, [name]: value || undefined }))
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingPrimary />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2">
        <i className="text-gray-500">Algo deu errado!</i>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* <RegisterSPC ref={modalRegisterRef} /> */}
      <div className="relative flex items-end justify-between space-x-2 max-md:flex-col  max-md:space-y-2">
        <div className="grid w-full grid-flow-col items-center gap-2 max-md:grid-rows-2">
          {!partyCode && (
            <SearchParty handleSearchOnChange={handleSearchOnChange} />
          )}

          {!stateId && (
            <SearchState handleSearchOnChange={handleSearchOnChange} />
          )}

          {!cityCode && (
            <SearchCity
              stateId={search.state}
              handleSearchOnChange={handleSearchOnChange}
            />
          )}

          <SearchVigency handleSearchOnChange={handleSearchOnChange} />

          <div className="min-w-[80px]">
            <label htmlFor="year" className="w-fit text-xs">
              Ano
            </label>
            <input
              type="number"
              min={2017}
              max={dayjs().year()}
              placeholder={String(dayjs().year())}
              name="year"
              onChange={handleSearchOnChange}
            />
          </div>

          <SearchLegend handleSearchOnChange={handleSearchOnChange} />
        </div>
        <RefreshButton isLoading={isFetching} queryName="spcs" />
      </div>

      <div className="space-y-2">
        <TableSPC data={spcResult?.results ?? []} />

        <div className="flex w-full justify-end">
          {spcResult?.results != null ? (
            <PaddingButtons
              pages={spcResult?.info.pages}
              isFetching={isFetching}
              next={spcResult?.info?.next}
              isPreviousData={isPreviousData}
              prevPage={prevPage}
              nextPage={nextPage}
              page={page}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
