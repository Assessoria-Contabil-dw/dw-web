'use client'
import { useUserData } from '@/hooks/useUserData'
import { TableUser } from './Table'
import PaddingTable from '@/components/private/Tools/TablePadding'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { LoadingPrimary } from '@/components/Loading/primary'
import TableFilterUser from './Filter'
import { RefreshButton } from '@/components/Buttons/ButtonRefresh'
import ButtonIcon from '@/components/Buttons/ButtonIcon'
import { Plus } from 'lucide-react'
import Register, { RegisterUserRef } from './Register'

interface Search {
  cpf?: string
  name?: string
  role?: string
}

export function User() {
  const [search, setSearch] = useState<Search>({} as Search)

  const [page, setPage] = useState(1)
  const [skip, setSkip] = useState(0)
  const take = 15
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
    if (name === 'name' && value.length < 3) {
      setSearch((old) => ({ ...old, [name]: undefined }))
      return
    }
    setPage(1)
    setSkip(0)
    setSearch((old) => ({ ...old, [name]: value || undefined }))
  }

  const { data, isLoading, isFetching, isPreviousData } = useUserData(
    skip,
    take,
    search.name,
    search.cpf,
    search.role,
  )

  const modalRegisterRef = useRef<RegisterUserRef>(null)
  const handleRegisterUser = useCallback(() => {
    modalRegisterRef.current?.openModal()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingPrimary />
      </div>
    )
  }

  return (
    <>
      <Register ref={modalRegisterRef} />

      <div className="flex w-full flex-col gap-2">
        <div className="flex items-end justify-between gap-4">
          <TableFilterUser onChange={handleSearchOnChange} />

          <div className="flex gap-2">
            <RefreshButton isLoading={isFetching} queryName="userData" />
            <ButtonIcon
              className="border-none bg-second text-white hover:bg-secondHover hover:text-white"
              title="Cadastrar"
              onClick={handleRegisterUser}
              icon={<Plus size={16} className="h-fit w-4" />}
            />
          </div>
        </div>
        <TableUser data={data?.results ?? null} />
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
