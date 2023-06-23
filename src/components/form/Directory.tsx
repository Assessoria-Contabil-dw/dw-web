'use client'
import { Plus, X } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { VigencyForm } from './Vigency'

interface RegisterDirectoryModalProps {
  isOpen: boolean
  onClose: () => void
}

// interface AddVigencyProps extends FormEvent<HTMLFormElement> {
//   id: number
//   value: number
//   e: MouseEvent<HTMLButtonElement>
// }

interface VigencyProps {
  id: number
  // value: string;
}

export function DirectoryForm({
  onClose,
  isOpen,
}: RegisterDirectoryModalProps) {
  if (!isOpen) {
    return null
  }

  function handleCloseModal() {
    onClose()
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [vigency, setVigency] = useState<VigencyProps[]>([])

  function addElement(event: FormEvent) {
    event.preventDefault()
    const newElement = { id: vigency.length }
    setVigency([...vigency, newElement])
  }

  function deleteElement(id: number, event: FormEvent) {
    event.preventDefault()
    const newArray = vigency.filter((item) => item.id !== id)
    upgradeElement(id, id)
    setVigency(newArray)
  }

  function upgradeElement(id: number, key: number) {
    const upgradeArray = vigency.map((item) => {
      if (item.id === key) {
        return { ...item, item }
      }
      const i = (item.id = key)
      return { ...item, i }
    })
    setVigency(upgradeArray)
  }

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 overflow-hidden">
        <form className="flex h-full flex-col items-end p-1">
          <div className="flex flex-col gap-4 overflow-y-auto p-6">
            <div className="flex w-full justify-between">
              <h4>Cadastrar Diretório</h4>
              <div>
                <button onClick={handleCloseModal} className="text-gray-600">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <select name="party" id="">
                  <option value="">Selecione o Partido</option>
                </select>

                <select name="state" id="">
                  <option value="">Selecione o Estado</option>
                </select>

                <select name="city" id="">
                  <option value="">Selecione a Cidade</option>
                </select>
              </div>
              <div className="flex gap-4">
                <input type="text" name="cnpj" id="cnpj" placeholder="CNPJ" />
                <input type="text" name="cpf" id="cpf" placeholder="CPF" />
                <input type="text" name="address" placeholder="Endereço" />
              </div>

              <div className="flex flex-row gap-4">
                <input type="text" name="phone" placeholder="Telefone" />
                <input type="text" name="site" placeholder="Email" />
                <input type="text" name="site" placeholder="Site" />
                <div>
                  <label className="flex flex-col gap-1 text-sm font-semibold">
                    Tipo
                  </label>
                  <ul className="flex gap-4">
                    <li className="flex gap-2 text-sm font-normal">
                      <input type="radio" name="type" id="type" />
                      Nacional
                    </li>
                    <li className="flex gap-2 text-sm font-normal">
                      <input type="radio" name="type" id="type" />
                      Estadual
                    </li>
                    <li className="flex gap-2 text-sm font-normal">
                      <input type="radio" name="type" id="type" />
                      Municipal
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {vigency.map((item, key) => (
              <div key={key}>
                <h1>{key}</h1>
                <VigencyForm
                  onChange={() => upgradeElement(item.id, key)}
                  index={item.id}
                />
                <button onClick={(e) => deleteElement(item.id, e)}>
                  deletar
                </button>
              </div>
            ))}

            <div className="w-full">
              <button
                onClick={(e) => addElement(e)}
                className="w-fit bg-secundary/20 text-secundary"
              >
                <Plus size={20} />
                Adicionar Virgência
              </button>
            </div>

            <div className="w-full">
              <button className="w-fit bg-primary text-white">
                <Plus size={20} />
                Cadastrar Diretório
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
