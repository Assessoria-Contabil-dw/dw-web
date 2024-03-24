'use client'
import { Plus } from 'lucide-react'
import { useCallback, useContext, useRef } from 'react'
import RegisterVigencyModel, { RegisterVigencyRef } from './Create'
import { LoadingPrimary } from '@/components/Loading/primary'
import { useParams } from 'next/navigation'
import { AccessContext } from '@/provider/context.provider'
import { RefreshButton } from '@/components/Buttons/ButtonRefresh'
import { queryClient } from '@/provider/query.provider'
import TableVigency from './Table'
import { ButtomBack } from '@/components/Buttons/ButtonBack'
import ButtonIcon from '@/components/Buttons/ButtonIcon'
import { useVigencyData } from '@/hooks/Directory/useVigency'
import { User } from '@/hooks/Access/User/useAuth'

export function VigencyTable() {
  const params = useParams()
  const { id } = params

  const { partyCode, stateId, cityCode } = useContext(AccessContext)
  const user: User = queryClient.getQueryData('authUser') as User

  const modalRegisterRef = useRef<RegisterVigencyRef>(null)
  const handleRegisterModal = useCallback((id: string) => {
    modalRegisterRef.current?.openViewModal(id)
  }, [])

  const { data, isLoading, isFetching, error } = useVigencyData(
    id,
    partyCode,
    stateId,
    cityCode,
  )

  if (isLoading) {
    return (
      <div className="mt-4 flex h-full w-full items-center justify-center gap-2">
        <LoadingPrimary />
      </div>
    )
  }

  if (error) {
    return null
  }

  return (
    <div className="flex flex-col gap-8">
      <RegisterVigencyModel ref={modalRegisterRef} />

      <div className="flex items-center justify-between">
        <div className="ng flex items-center justify-center gap-2">
          <ButtomBack />
          <div className="flex flex-col justify-between gap-1">
            <h2 className="text-h2">Vigência</h2>
            <span className="text-span">
              {data?.surname} ({data?.status ? 'Ativo' : 'Inativo'})
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <RefreshButton isLoading={isFetching} queryName="vigenciesData" />
          {user?.role === 'ADMIN' && (
            <ButtonIcon
              title="Adicionar Vigência"
              icon={<Plus size={20} />}
              onClick={() => handleRegisterModal(id)}
              className="border-none bg-second text-white hover:bg-secondHover hover:text-white"
            />
          )}
        </div>
      </div>
      <TableVigency
        role={user?.role ?? 'CLIENT'}
        title="Vigência Ativa"
        defaultText="Não há vigências cadastradas"
        data={data?.vigencyActive}
      />
      <TableVigency
        role={user?.role ?? 'CLIENT'}
        title="Histórico"
        defaultText="Histórico vazio"
        data={data?.vigencyInactive}
      />
    </div>
  )
}
