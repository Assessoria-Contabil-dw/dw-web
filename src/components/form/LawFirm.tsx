'use client'
import { Plus, Trash2, X } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { TextInput } from '../inputs/Text'
import { SelectInput } from '../inputs/Select'

interface LawFirmModalProps {
  isOpen: boolean
  onClose: () => void
}

interface LawFirmProps {
  id: number
}

export function LawFirmForm({ onClose, isOpen }: LawFirmModalProps) {
  if (!isOpen) {
    return null
  }

  function handleCloseModal() {
    onClose()
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [lawfirm, setLawfirm] = useState<LawFirmProps[]>([])

  function addElement(event: FormEvent<Element>) {
    event.preventDefault()
    const newElement = { id: lawfirm.length }
    setLawfirm([...lawfirm, newElement])
  }

  async function deleteElement(id: number, event: FormEvent<Element>) {
    event.preventDefault()
    const newArray = lawfirm.filter((item) => item.id !== id)

    const upgradeArray = await newArray.map((item, index) => {
      return { id: index }
    })
    setLawfirm(upgradeArray)
  }

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <form className="flex h-full w-full flex-col items-end  p-1">
          <div className="flex h-full w-full flex-col justify-between gap-6 overflow-y-auto p-8">
            <div className="flex flex-col gap-6">
              <div className="flex w-full items-start justify-between border-b-[1px]">
                <div>
                  <h4>Cadastrar Escritório</h4>
                  <span>Cadastre um novo escritório e seus advogados</span>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <div className="flex gap-3">
                  <TextInput
                    label="Nome"
                    type="text"
                    placeholder="Nome do Escritório"
                  />
                  <TextInput
                    label="CNPJ"
                    type="text"
                    placeholder="Digite o CNPJ"
                  />
                </div>
                <TextInput
                  label="Endereço"
                  type="text"
                  placeholder="Rua, n°, Bairro, Cidade - UF, CEP"
                />

                <div className="flex gap-3">
                  <TextInput
                    label="Telefone"
                    type="text"
                    placeholder="Digite o telefone"
                  />
                  <TextInput
                    label="E-mail"
                    type="text"
                    placeholder="Digite o email"
                  />
                  <TextInput
                    label="Site"
                    type="text"
                    placeholder="Digite o site"
                  />
                </div>
                <div className="flex items-end gap-3">
                  <SelectInput
                    label="Vincular Advocado"
                    placeholder="Selecione um advogado"
                    type="directory"
                  />
                  <button
                    onClick={(e) => addElement(e)}
                    className="w-fit whitespace-nowrap bg-secundary/20 text-secundary"
                  >
                    <Plus size={20} />
                    Advogado
                  </button>
                </div>
              </div>
              <ul className="flex flex-col gap-4">
                {lawfirm.map((item, key) => (
                  <li key={key} className="flex items-center justify-between">
                    <label className="flex flex-col gap-1 whitespace-nowrap text-sm font-semibold">
                      Nome do advogado
                    </label>
                    <button
                      onClick={(event) => deleteElement(item.id, event)}
                      className="w-fit whitespace-nowrap bg-red-400/20 text-red-400"
                    >
                      <Trash2 size={20} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCloseModal}
                type="submit"
                className="bg-gray-200 text-gray-500 hover:bg-gray-300 "
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-primary text-white hover:bg-primary-hover "
              >
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
