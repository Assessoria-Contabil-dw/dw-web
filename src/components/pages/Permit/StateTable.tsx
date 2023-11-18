import {
  AccessContext,
  Modules,
  ModulesData,
} from '@/services/context.provider'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

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
  const router = useRouter()
  const { setPartyCode, setStateId, setModulesArray } =
    useContext(AccessContext)

  function handlePainel(
    partyCode: number,
    stateId: string,
    modules: ModulesData,
  ) {
    setPartyCode(partyCode)
    setStateId(stateId)
    setModulesArray(modules)
    router.push(`/acessos/painel?partido=${partyCode}&estado=${stateId}`)
  }

  return (
    <div className="flex flex-col gap-2">
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
                    <button
                      className="button-primary"
                      onClick={() =>
                        handlePainel(state.partyCode, state.stateId, {
                          acessName: state.partyCode + ' - ' + state.state,
                          modules: state.modules,
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
