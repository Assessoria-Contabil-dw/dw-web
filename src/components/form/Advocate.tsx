'use client'

import { X } from 'lucide-react'
import { TextInput } from '../inputs/Text'
import { ImgInput } from '../inputs/Img'
import { RadioInput } from '../inputs/Radio'
import { SelectInput } from '../inputs/Select'

interface RegisterLeaderModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AdvocateForm({ onClose, isOpen }: RegisterLeaderModalProps) {
  if (!isOpen) {
    return null
  }
  function handleCloseModal() {
    onClose()
  }

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <form className="flex h-full w-full flex-col items-end  p-1">
          <div className="flex h-full w-full flex-col justify-between gap-6 overflow-y-auto p-8">
            <div className="flex flex-col gap-6">
              <div className="flex w-full items-start justify-between border-b-[1px]">
                <div>
                  <h4>Cadastrar Advogado</h4>
                  <span>Insira as informações de um advogado</span>
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
                    placeholder="Digite o nome completo"
                  />
                  <TextInput
                    label="CPF"
                    type="text"
                    placeholder="Digite o CPF"
                  />
                  <TextInput
                    label="OAB"
                    type="text"
                    placeholder="Digite a OAB"
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
                  <SelectInput
                    label="Escritório"
                    placeholder="Selecione um escritório"
                    type="text"
                  />
                </div>

                <div className="flex justify-between gap-8">
                  <label className="flex flex-col gap-1 whitespace-nowrap text-sm font-semibold">
                    Situação Cívil
                    <div className="flex gap-3">
                      <RadioInput type="radio" label="Solteiro" name="status" />
                      <RadioInput type="radio" label="Casado" name="status" />
                      <RadioInput
                        type="radio"
                        label="Divorciado"
                        name="status"
                      />
                      <RadioInput type="radio" label="Viúvo" name="status" />
                    </div>
                  </label>
                  <label className="flex flex-col gap-1 text-sm font-semibold">
                    Nacionalidade
                    <div className="flex gap-4">
                      <RadioInput
                        type="radio"
                        label="Brasileiro"
                        name="nacionality"
                        checked
                      />
                      <RadioInput
                        type="radio"
                        label="Estrangeiro"
                        name="nacionality"
                      />
                    </div>
                  </label>
                </div>
                <ImgInput label="Assinatura" placeholder="Anexar assinatura" />
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
