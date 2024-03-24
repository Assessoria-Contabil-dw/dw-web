'use client'

import { api } from '@/lib/api'
import { Edit3, Eye, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { RegisterAdvocate } from './RegisterAdvocate'
import { AdvocateProps } from '@/interfaces/types'
import { LoadingSecond } from '@/components/Loading/second'
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'
import { TableAdvocates } from './Table'

export function AdvocateTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [advocates, setAdvocates] = useState<AdvocateProps[]>([])
  const [loading, setLoading] = useState(true)

  async function loadLeader() {
    setLoading(true)
    try {
      const response = await api.get('/advocates', {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      })
      setAdvocates(response.data)
      console.log(advocates)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadLeader()
  }, [])

  function handleCreateAdvocate(advocates: AdvocateProps) {
    setAdvocates((prevState) => prevState.concat(advocates))
  }

  if (loading) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2">
        <LoadingSecond />
        <i className="text-gray-500">Carregando...</i>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <RegisterAdvocate
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateAdvocate}
      />

      <div className="flex justify-between">
        <div className="flex w-fit gap-4">
          <input
            type="text"
            className="input-style w-fit"
            placeholder="Buscar por nome"
          />
        </div>
        <div className="flex gap-3">
          <ButtonPrimary
            title="Cadastrar"
            variant="fill"
            startIcon={<Plus className="w-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Cadastrar
          </ButtonPrimary>
        </div>
      </div>
    <TableAdvocates/>
    </div>
  )
}
