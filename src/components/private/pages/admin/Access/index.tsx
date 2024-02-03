'use client'
import AccessParty from './PartyTable'
import AccessState from './StateTable'
import AccessCity from './CityTable'

import { useParams } from 'next/navigation'
import { RefreshButton } from '@/components/Buttons/ButtonRefresh'
import { useRef, useState } from 'react'
import { LoadingSecond } from '@/components/Loading/second'
import { Plus } from 'lucide-react'
import RegisterAccessModel, { RegisterUserRef } from './Register'
import { ButtomBack } from '@/components/Buttons/ButtonBack'
import { useAccessUserData } from '@/hooks/useAccess'
import ActiveOptions from './ActiveOptions'
import ButtonIcon from '@/components/Buttons/ButtonIcon'


export default function Access() {
  const [option, setOption] = useState(1)
  const params = useParams<{id: string}>()
  const { id } = params

  const { data, isLoading, isFetching } = useAccessUserData(id)

  const registerAccessRef = useRef<RegisterUserRef>(null)
  function handleRegisterModal(id: number) {
    registerAccessRef.current?.openModal(id)
  }

  return (
    <>
      <RegisterAccessModel ref={registerAccessRef} />
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-start gap-4">
          <ButtomBack />
          <div className="flex flex-col">
            <h4 className="text-h4">
              Acessos <span className="text-span">/ {data?.name}</span>
            </h4>
            <span className="text-span">{data?.role.toUpperCase()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <ActiveOptions option={option} setOption={setOption} />
            <div className="flex gap-2">
              <RefreshButton
                isLoading={isFetching}
                queryName="accessUserData"
              />

              <ButtonIcon
                title="Adicionar acesso"
                className="border-none bg-second text-white hover:bg-secondHover hover:text-white"
                onClick={() => handleRegisterModal(data?.id as number)}
                icon={<Plus size={18} />}
              />
            </div>
          </div>

          <section>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LoadingSecond />
              </div>
            ) : option === 1 ? (
              <AccessParty data={data === undefined ? null : data.partyAccess} />
            ) : option === 2 ? (
              <AccessState data={data === undefined ? null : data.stateAccess} />
            ) : (
              <AccessCity data={data === undefined ? null : data.cityAccess} />
            )}
          </section>
        </div>
      </div>
    </>
  )
}
