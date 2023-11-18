import {
  AccessContext,
  Modules,
  ModulesData,
} from '@/services/context.provider'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export interface PartyData {
  id: number
  partyCode: number
  party: string
  modules: Modules[]
}

interface ArrayParty {
  data: PartyData[] | null
}

export default function PermitParty({ data }: ArrayParty) {
  const router = useRouter()

  const { setPartyCode, setModulesArray } = useContext(AccessContext)

  function handlePainel(partyCode: number, modules: ModulesData) {
    setPartyCode(partyCode)
    setModulesArray(modules)
    router.push(`/acessos/painel?partido=${partyCode}`)
  }

  return (
    <div className="flex flex-col gap-2">
      <fieldset className="h-auto w-full rounded-lg px-3 py-2">
        <table>
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
                    <button
                      className="button-primary"
                      onClick={() =>
                        handlePainel(party.partyCode, {
                          acessName: party.party,
                          modules: party.modules,
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
