import DeleteModel, { DeleteRef } from '@/components/Model/Delete'
import { CityData } from '@/interfaces/access.interface'
import { Edit3, Trash2 } from 'lucide-react'
import { useRef } from 'react'

interface ArrayCity {
  data: CityData[] | null
}

export default function PermitCity({ data }: ArrayCity) {
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
        <table>
          <thead>
            <tr>
              <th>Minicipio</th>
              <th>Estado</th>
              <th>Partido</th>
              <th>Modulo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data != null ? (
              data.map((city) => (
                <tr key={city.id}>
                  <td>{city.city}</td>
                  <td>{city.state}</td>
                  <td>{city.party}</td>
                  <td>
                    <ul className="max-lg:flex-col">
                      <li className="rounded bg-second p-1 text-white">
                        Visualizar Diretório
                      </li>
                      {city.modules.map((module) => (
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
                            city.id.toString(),
                            'access/city',
                            city.city,
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
