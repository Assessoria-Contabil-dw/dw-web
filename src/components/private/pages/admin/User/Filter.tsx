import { ChangeEvent } from 'react'
import InputBase from '@/components/private/Search/Input/InputBase'
import SelectBase from '@/components/private/Search/Select/SelectBase'

interface FilterUserProps {
  onChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => void
}

export default function TableFilterUser({ onChange }: FilterUserProps) {
  return (
    <div className="flex gap-2">
      <InputBase
        type="text"
        name="name"
        label="Nome do cliente"
        placeholder="Buscar por nome"
        onChange={onChange}
      />

      <InputBase
        type="text"
        name="cpf"
        label="CPF do cliente"
        placeholder="Buscar por CPF"
        onChange={onChange}
      />

      <SelectBase name="role" onChange={onChange} label="Nível">
        <option value="" disabled selected>
          Selecione
        </option>
        <option value="ADMIN">Administrador</option>
        <option value="CLIENT">Cliente</option>
      </SelectBase>
    </div>
  )
}
