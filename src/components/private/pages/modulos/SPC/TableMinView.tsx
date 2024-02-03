import { SPCOneData } from "./@types/interface.type"

interface TableMinSPCData {
  title: string
  spc: SPCOneData[] | null
}

export default function TableMinSPC({ spc, title }: TableMinSPCData) {
  return (
    <div className="rounded-xl border-[1px]">
      <div className="rounded-t-xl bg-blue-100 p-1">
        <h5 className="text-h5 text-center text-slate-600">{title}</h5>
      </div>
      <table>
        <thead>
          <tr>
            <th className="text-[10px]">Ano</th>
            <th className="text-[10px]">Num</th>
            <th className="text-[10px]">Situação</th>
            <th className="text-[10px]">Observação</th>
          </tr>
        </thead>
        <tbody>
          {spc != null ? (
            spc.map((s) => (
              <tr key={s.id}>
                <td>{s.year}</td>
                <td>{s.numPge ?? '-'}</td>
                <td>
                  <div
                    style={{ backgroundColor: `${s.colorHex}` }}
                    className=" rounded-md p-1 text-center text-[10px] text-white"
                  >
                    {s.colorName ?? '-'}
                  </div>
                </td>
                <td>{s.observation ?? '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                Não há dados cadastrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
