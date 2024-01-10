'use client'

// import { Plus } from 'lucide-react'
import { PartyTable } from './Table'
// import { useCallback, useEffect, useRef, useState } from 'react'
// import { api } from '@/lib/api'
// import { Loading } from '../Form/Loading'
// import { PartyProps } from '@/lib/types'
// import Cookies from 'js-cookie'
// import Image from 'next/image'
// import { UpdateParty } from './UpdateParty'
// import DeletModel, { DeletRef } from '../Model/Delet'
// import { useQuery } from 'react-query'

// interface RegisterDeleteProps {
//   id: string
//   path: string
//   msg: string
// }

export function Party() {
  // const [isModalCreate, setIsModalCreate] = useState(false)
  // const [isModalUpdate, setIsModalUpdate] = useState(false)

  // const [register, setRegister] = useState<RegisterDeleteProps>({
  //   id: '',
  //   path: '',
  //   msg: '',
  // })
  return (
    <div className="flex w-full flex-col gap-4">
      {/* <RegisterParty
        isCreate={isModalCreate}
        onClose={() => setIsModalCreate(false)}
      /> */}
      {/* 

      <UpdateParty
        id={register.id}
        isCreate={isModalUpdate}
        onClose={() => setIsModalUpdate(false)}
        loading={() => loadParty()}
      />
       */}

      {/* <div className="flex justify-between"> */}
      {/* <button
          // onClick={() => setIsModalCreate(true)}
          className="w-fit bg-primary text-white"
        >
          <Plus className="w-4" />
          Cadastrar
        </button> */}
      {/* </div> */}
      <PartyTable />
    </div>
  )
}
