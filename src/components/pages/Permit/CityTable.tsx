import {
  AccessContext,
  Modules,
  ModulesData,
} from '@/services/context.provider'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export interface CityData {
  id: number
  cityCode: string
  partyCode: number
  party: string
  city: string
  state: string
  modules: Modules[]
}

interface ArrayCity {
  data: CityData[] | null
}

export default function PermitCity({ data }: ArrayCity) {
  const router = useRouter()
  const { setPartyCode, setCityCode, setModulesArray } =
    useContext(AccessContext)

  function handlePainel(
    partyCode: number,
    cityCode: string,
    modules: ModulesData,
  ) {
    setPartyCode(partyCode)
    setCityCode(cityCode)
    setModulesArray(modules)
    router.push(`/acessos/painel?partido=${partyCode}&cidade=${cityCode}`)
  }

  return (
    <div className="flex flex-col gap-2">
      <fieldset className="h-auto w-full rounded-lg px-3 py-2">
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
                    <button
                      className="button-primary"
                      onClick={() =>
                        handlePainel(city.partyCode, city.cityCode, {
                          acessName:
                            city.partyCode +
                            ' - ' +
                            city.city +
                            '(' +
                            city.state +
                            ')',
                          modules: city.modules,
                        })
                      }
                    >
                      Gerenciar
                    </button>
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
