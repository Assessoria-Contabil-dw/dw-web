'use client'
import { Plus, X } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { RadioInput } from '../inputs/Radio'
import { TextInput } from '../inputs/Text'
import { SelectInput } from '../inputs/Select'
import { TextareaInput } from '../inputs/Textarea'
import dayjs from 'dayjs'

interface RegisterPCAModalProps {
  isOpen: boolean
  onClose: () => void
}

interface PcaProps {
  id: number
}

export function PCAForm({ onClose, isOpen }: RegisterPCAModalProps) {
  if (!isOpen) {
    return null
  }

  function handleCloseModal() {
    onClose()
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [pca, setPca] = useState<PcaProps[]>([{ id: 0 }])

  function addElement(event: FormEvent<Element>) {
    event.preventDefault()
    const newElement = { id: pca.length }
    setPca([...pca, newElement])
  }

  async function deleteElement(id: number, event: FormEvent<Element>) {
    event.preventDefault()
    const newArray = pca.filter((item) => item.id !== id)

    const upgradeArray = await newArray.map((item, index) => {
      return { id: index }
    })
    setPca(upgradeArray)
  }

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <form className="flex h-full w-full flex-col items-end  p-1">
          <div className="flex h-full w-full flex-col justify-between gap-6 overflow-y-auto p-8">
            <div className="flex flex-col gap-6">
              <div className="flex w-full items-start justify-between border-b-[1px]">
                <div>
                  <h4>Cadastrar PCA</h4>
                  <span>Cadastre um novo pca de um diretório</span>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-end gap-3">
                  <SelectInput
                    label="Direção"
                    placeholder="Selecione um a direção"
                    type="directory"
                  />
                  <button
                    onClick={(e) => addElement(e)}
                    className="w-fit whitespace-nowrap bg-secundary/20 text-secundary"
                  >
                    <Plus size={20} />
                    PCA
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {pca.map((item, key) => (
                  <fieldset key={key}>
                    <div className="flex w-full items-start justify-between">
                      <label className="flex flex-col gap-1 whitespace-nowrap text-sm font-semibold">
                        Tipo
                        <div className="flex gap-4">
                          <RadioInput type="radio" label="SPCA" name="type" />
                          <RadioInput type="radio" label="SPCE" name="type" />
                        </div>
                      </label>
                      <button
                        onClick={(event) => deleteElement(item.id, event)}
                        className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="flex gap-3">
                      <TextInput
                        label="Ano"
                        type="number"
                        min={1999}
                        max={dayjs().year()}
                        placeholder={String(dayjs().year())}
                      />
                      <TextInput
                        label="N° PJE"
                        type="text"
                        placeholder="Digite o numero do PJE"
                      />
                      <SelectInput
                        label="Situação"
                        placeholder="Selecione a situação"
                        type="status"
                      />
                    </div>
                  </fieldset>
                ))}
                <TextareaInput
                  label="Observações"
                  placeholder="Digite o comentario"
                />
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
