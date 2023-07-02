'use client'
import { X } from 'lucide-react'

import { TextInput } from '../inputs/Text'
import { SelectInput } from '../inputs/Select'
import { ImgInput } from '../inputs/Img'

interface RegisterDirectoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PartyForm({ onClose, isOpen }: RegisterDirectoryModalProps) {
  if (!isOpen) {
    return null
  }

  function handleCloseModal() {
    onClose()
  }

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <form className="flex h-full w-full flex-col items-end  p-1 py-3">
          <div className="flex h-full w-full flex-col justify-between gap-6 overflow-y-auto p-8">
            <div className="flex flex-col gap-6">
              <div className="flex w-full items-start justify-between border-b-[1px]">
                <div>
                  <h4>Cadastrar Partido</h4>
                  <span>Cadastre um Partido</span>
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
                    label="Código"
                    type="number"
                    min={0}
                    placeholder="Digite o número"
                  />
                  <TextInput
                    label="Sigla"
                    type="text"
                    placeholder="Digite a sigla"
                  />
                  <SelectInput
                    label="Cor"
                    placeholder="Selecione a cor"
                    type="text"
                  />
                </div>
                <TextInput
                  label="Nome"
                  type="text"
                  placeholder="Digite o nome do partido"
                />
                <ImgInput label="Logo" placeholder="Anexe o Logo" />
              </div>
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
