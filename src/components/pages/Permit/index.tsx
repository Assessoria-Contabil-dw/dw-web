import { ButtomBack } from '@/components/Buttons/back'
import { Edit3, Eye, Trash2 } from 'lucide-react'

export default function Permit() {
  // get de todas as permissões

  return (
    <div>
      <div className="flex items-center justify-start gap-4">
        <ButtomBack />
        <h2>Permissões</h2>
      </div>
      <div className="flex bg-slate-100 p-1 text-slate-300">
        <button className="h-fit bg-white px-2 py-1 text-xs text-slate-700 shadow-sm">
          Nacional
        </button>
        <button>Estadual</button>
        <button>Municipal</button>
      </div>
      <section>
        <fieldset>
          <legend>Nacional</legend>
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
              <tr>
                <td>PSTU</td>
                <td>Todos</td>
                <td>Todos</td>
                <td>
                  <ul>
                    <li>Eleitoral</li>
                    <li>Financeiro</li>
                    <li>Partidario</li>
                  </ul>
                </td>
                <td className="w-16 ">
                  <div className="flex items-center ">
                    <button className="button-tool">
                      <Eye className="w-4" />
                    </button>
                    <button className="button-tool">
                      <Edit3 className="w-4" />
                    </button>
                    <button type="button" className="button-tool">
                      <Trash2 className="w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </section>
      <section>
        <fieldset>
          <legend>Estadual</legend>
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
              <tr>
                <td>Maranhão</td>
                <td>PSTU</td>
                <td>Todos</td>
                <td>
                  <ul>
                    <li>Eleitoral</li>
                    <li>Financeiro</li>
                    <li>Partidario</li>
                  </ul>
                </td>
                <td className="w-16 ">
                  <div className="flex items-center ">
                    <button className="button-tool">
                      <Eye className="w-4" />
                    </button>
                    <button className="button-tool">
                      <Edit3 className="w-4" />
                    </button>
                    <button type="button" className="button-tool">
                      <Trash2 className="w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </section>

      <section>
        <fieldset>
          <legend>Municipal</legend>
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
              <tr>
                <td>Imperatriz</td>
                <td>Maranhão</td>
                <td>PSTU</td>
                <td>
                  <ul>
                    <li>Eleitoral</li>
                    <li>Financeiro</li>
                    <li>Partidario</li>
                  </ul>
                </td>
                <td className="w-16 ">
                  <div className="flex items-center ">
                    <button className="button-tool">
                      <Eye className="w-4" />
                    </button>
                    <button className="button-tool">
                      <Edit3 className="w-4" />
                    </button>
                    <button type="button" className="button-tool">
                      <Trash2 className="w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </section>
    </div>
  )
}
