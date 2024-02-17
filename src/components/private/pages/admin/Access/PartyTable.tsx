import DeleteModel, { DeleteRef } from '@/components/Model/Delete'
import { PartyData } from '@/interfaces/access.interface'
import { Edit3, Trash2 } from 'lucide-react'
import { useRef } from 'react'

interface ArrayParty {
  data: PartyData[] | null
}

export default function PermitParty({ data }: ArrayParty) {
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
    <>
      <DeleteModel ref={deleteRef} />

      <fieldset className="fieldset">
        <table id='table-style'>
          <thead>
            <tr>
              <th>Partido</th>
              <th>Estado</th>
              <th>Minicipio</th>
              <th>Modulo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data != null ? (
              data.map((party) => (
                <tr key={party.id}>
                  <td>{party.party}</td>
                  <td>Todos</td>
                  <td>Todos</td>
                  <td>
                    <ul className="max-lg:flex-col">
                      <li className="rounded bg-second p-1 text-white">
                        Visualizar Diretórios
                      </li>
                      {party.modules.map((module) => (
                        <li
                          key={module.moduleId}
                          className="rounded bg-second p-1 text-white"
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
                            party.id.toString(),
                            'access/party',
                            party.party,
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
    </>
  )
}
