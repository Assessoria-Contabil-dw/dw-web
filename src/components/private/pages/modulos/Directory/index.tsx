'use client'

import { AccessContext } from '@/provider/context.provider'
import TableDirectory from './Table'
import { ChangeEvent, useCallback, useContext, useRef, useState } from 'react'
import { useDirectoryData } from '@/hooks/useDirectoryData'
import PaddingTable from '../../../Tools/TablePadding'
import { LoadingPrimary } from '@/components/Loading/primary'
import { RefreshButton } from '@/components/Buttons/ButtonRefresh'
import { User } from '@/hooks/useAuth'
import { queryClient } from '@/provider/query.provider'
import ButtonIcon from '@/components/Buttons/ButtonIcon'
import { Plus } from 'lucide-react'
import RegisterDirectoryModal, { RegisterDirectoryModalProps } from './Create'
import TableFilterDirectory from './Filter'

interface Search {
  party?: string
  state?: string
  city?: string
  status?: string
}

export default function Directory() {
  const user: User = queryClient.getQueryData('authUser') as User
  const { partyCode, cityCode, stateId } = useContext(AccessContext)
  const [search, setSearch] = useState<Search>({} as Search)

  const [page, setPage] = useState(1)
  const [skip, setSkip] = useState(0)
  const take = 15
  const { data, isLoading, isFetching, isPreviousData } = useDirectoryData(
    skip,
    take,
    search.party,
    search.state,
    search.city,
    search.status,
    partyCode,
    stateId,
    cityCode,
  )

  const prevPage = useCallback(() => {
    setSkip((old) => Math.max(old - take, 0))
    setPage((old) => Math.max(old - 1, 0))
  }, [])

  const nextPage = useCallback(() => {
    setSkip((old) => old + take)
    setPage((old) => old + 1)
  }, [])

  function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.target
    if (name === 'state' && value === '') {
      setSearch((old) => ({ ...old, city: undefined }))
    }
    setPage(1)
    setSkip(0)
    setSearch((old) => ({ ...old, [name]: value || undefined }))
  }

  const registerDirectoryModalRef = useRef<RegisterDirectoryModalProps>(null)
  const handleRegisterDirectory = useCallback(() => {
    registerDirectoryModalRef.current?.openModal()
  }, [])

  if (isLoading && user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingPrimary />
      </div>
    )
  }

  return (
    <>
      <RegisterDirectoryModal ref={registerDirectoryModalRef} />
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between gap-4">
          <TableFilterDirectory
            partyCode={partyCode}
            cityCode={cityCode}
            stateId={stateId}
            stateSearch={stateId || search.state}
            onChange={handleSearchOnChange}
          />

          <div className="flex gap-2">
            <RefreshButton isLoading={isFetching} queryName="directoryData" />
            {user?.role === 'ADMIN' && (
              <ButtonIcon
                className="border-none bg-second text-white hover:bg-secondHover hover:text-white"
                title="Cadastrar"
                onClick={handleRegisterDirectory}
                icon={<Plus size={16} className="h-fit w-4" />}
              />
            )}
          </div>
        </div>

        <TableDirectory
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
