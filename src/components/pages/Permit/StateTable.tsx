'use client'
import { Modules } from '@/provider/context.provider'
import { Edit3, Trash2 } from 'lucide-react'
import DeleteModel, { DeleteRef } from '@/components/Model/Delete'
import { useRef } from 'react'
export interface StateData {
  id: number
  stateId: string
  partyCode: number
  party: string
  state: string
  modules: Modules[]
}

interface ArrayState {
  data: StateData[] | null
}

export default function PermitState({ data }: ArrayState) {
  const deleteRef = useRef<DeleteRef>(null)
  function handleDeleteModal(
    id: string,
    path: string,
    msg: string,
    query: string,
  ) {
    deleteRef.current?.openModal(id, path, msg, query)
  }

  return (
    <div className="flex flex-col gap-2">
      <DeleteModel ref={deleteRef} />

      <fieldset className="h-auto w-full rounded-lg px-3 py-2">
        <table>
          <thead>
            <tr>
              <th>Estado</th>
              <th>Partido</th>
              <th>Minicipio</th>
              <th>Modulo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data != null ? (
              data.map((state) => (
                <tr key={state.id}>
                  <td>{state.state}</td>
                  <td>{state.party}</td>
                  <td>Todos</td>
                  <td>
                    <ul className="max-lg:flex-col">
                      <li className="rounded bg-second p-1 text-white">
                        Visualizar Diretórios
                      </li>
                      {state.modules.map((module) => (
                        <li
                          className="rounded bg-second p-1 text-white"
                          key={module.moduleId}
                        >
                          {module.module}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="w-8">
                    <div className="flex items-center">
                      <button
                        // onClick={() => handleUpdateModal(v.id.toString())}
                        className="h-full w-auto rounded p-1 hover:text-primary"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteModal(
                            state.id.toString(),
                            'access/state',
                            state.state,
                            'accessData',
                          )
                        }
                        className="h-full w-auto rounded p-1 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-6 text-center">
                  Nenhuma permissão encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </fieldset>
    </div>
  )
}
