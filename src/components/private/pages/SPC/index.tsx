'use client'
import { LoadingPrimary } from '@/components/Loading/primary'
import { useSPCData } from '@/hooks/useSPCData'
import { TableSPC } from './Table'
import { ChangeEvent, useCallback, useContext, useState } from 'react'
import { AccessContext } from '@/provider/context.provider'
import { User } from '@/hooks/useAuth'
import { queryClient } from '@/provider/query.provider'
import PaddingTable from '../../Tools/TablePadding'
import { RefreshButton } from '@/components/Buttons/ButtonRefresh'
import ButtonIcon from '@/components/Buttons/ButtonIcon'
import { Plus } from 'lucide-react'
import TableFilterSPC from './TableFilter'
// import CreateSPCModel, { CreateSPCRef } from './Create'

interface Search {
  party?: string
  state?: string
  city?: string
  status?: string
  year?: string
  legend?: string
}

export default function SPC() {
  const user: User = queryClient.getQueryData('authUser') as User
  const { partyCode, cityCode, stateId } = useContext(AccessContext)
  const [search, setSearch] = useState<Search>({} as Search)

  // const modalCreateRef = useRef<CreateSPCRef>(null)
  // const handleRegisterSPCModal = useCallback(() => {
  //   modalCreateRef.current?.openModal()
  // }, [])

  const [page, setPage] = useState(1)
  const [skip, setSkip] = useState(0)
  const take = 15
  const { data, isLoading, isFetching, isError, isPreviousData } = useSPCData(
    skip,
    take,
    search.party,
    search.state,
    search.city,
    search.status,
    search.year,
    search.legend,
    partyCode,
    cityCode,
    stateId,
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

    setPage(1)
    setSkip(0)
    setSearch((old) => ({ ...old, [name]: value || undefined }))
  }

  const prevPage = useCallback(() => {
    setSkip((old) => Math.max(old - take, 0))
    setPage((old) => Math.max(old - 1, 0))
  }, [])

  const nextPage = useCallback(() => {
    setSkip((old) => old + take)
    setPage((old) => old + 1)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingPrimary />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-slate-400">Desculpe, parece que algo deu errado!</p>
      </div>
    )
  }

  return (
    <>
      {/* <CreateSPCModel ref={modalCreateRef} /> */}
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between gap-4">
          <TableFilterSPC
            partyCode={partyCode}
            cityCode={cityCode}
            stateId={stateId}
            stateSearch={search.state}
            onChange={handleSearchOnChange}
          />

          <div className="flex gap-2">
            <RefreshButton isLoading={isFetching} queryName="spcData" />
            {user?.role === 'ADMIN' && (
              <ButtonIcon
                className="border-none bg-second text-white hover:bg-secondHover hover:text-white"
                title="Cadastrar"
                // onClick={handleRegisterSPCModal}
                icon={<Plus size={16} className="h-fit w-4" />}
              />
            )}
          </div>
        </div>

        <TableSPC
          role={user?.role ?? 'CLIENT'}
          loading={isFetching}
          data={data?.results}
        />

        <PaddingTable
          pages={data?.info?.pages ?? 0}
          page={page}
          isPreviousData={isPreviousData}
          nextPage={nextPage}
          prevPage={prevPage}
          next={data?.info?.next ?? null}
        />
      </div>
    </>
  )
}
