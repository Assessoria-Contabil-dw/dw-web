'use client'
'use client'
import { Plus, Trash2, X } from 'lucide-react'
import { TextInput } from '../inputs/Text'
import { SelectInput } from '../inputs/Select'
import { FormEvent, useState } from 'react'

interface RegisterVigencyModalProps {
  index: number
  onClick: (event: FormEvent<Element>) => void
}
interface LeaderProps {
  id: number
}

export function VigencyForm({ index, onClick }: RegisterVigencyModalProps) {
  const [leader, setLeader] = useState<LeaderProps[]>([])

  function addElement(event: FormEvent<Element>) {
    event.preventDefault()
    const newElement = { id: leader.length }
    setLeader([...leader, newElement])
  }

  async function deleteElement(id: number, event: FormEvent<Element>) {
    event.preventDefault()
    const newArray = leader.filter((item) => item.id !== id)

    const upgradeArray = await newArray.map((item, index) => {
      return { id: index }
    })
    setLeader(upgradeArray)
  }

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h4>Vigência {index + 1}</h4>
          <button
            onClick={onClick}
            className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-row gap-3">
          <TextInput type="date" placeholder="Data" label="Data inicial" />
          <TextInput type="date" placeholder="Data" label="Data final" />
        </div>

        {leader.map((item, key) => (
          <div key={key} className="flex flex-row items-end gap-3">
            <SelectInput
              label="Representante"
              placeholder="Selecione um representante"
              type="leader"
            />
            <SelectInput
              label="Cargo"
              placeholder="Selecione um cargo"
              type="office"
            />
            <button
              onClick={(event) => deleteElement(index, event)}
              className="w-fit whitespace-nowrap bg-red-400/20 text-red-400"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        <div className="flex justify-end gap-3">
          <button
            onClick={addElement}
            className="w-fit whitespace-nowrap bg-primary/20 text-primary"
          >
            <Plus size={20} />
            Representante
          </button>
        </div>
      </div>
    </form>
  )
}
