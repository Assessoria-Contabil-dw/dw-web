'use client'
import { Plus } from 'lucide-react'

interface RegisterVigencyModalProps {
  index: number
  onChange: () => void
}

export function VigencyForm({ index, onChange }: RegisterVigencyModalProps) {
  return (
    <div>
      <form onChange={onChange} className="flex flex-col gap-4">
        <legend>Virgência {index}</legend>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <input
              type="date"
              name="dateFirst"
              id="dateFirst"
              placeholder="Data Inicial"
            />
            <input
              type="date"
              name="dateLast"
              id="dateLast"
              placeholder="Data Final"
            />
          </div>

          <div className="flex flex-row gap-4">
            <select name="" id="">
              <option value="">Representante</option>
            </select>
            <select name="" id="">
              <option value="">Cargo</option>
            </select>
            <button className="bg-secundary">
              <Plus size={20} />
              Adicionar Representante
            </button>
          </div>
          <div className="flex flex-row gap-4">
            <select name="" id="">
              <option value="">Advogado</option>
            </select>
            <select name="" id="">
              <option value="">Cargo</option>
            </select>
            <button className="bg-secundary">
              <Plus size={20} />
              Adicionar Representante
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
