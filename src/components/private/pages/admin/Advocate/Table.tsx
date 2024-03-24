import { useAdvocateAll } from "@/hooks/Leader/useOffice copy";

export function TableAdvocates() {
  const {data, isLoading, isError, error} = useAdvocateAll(
    0,
    10,
    "",
    ""
  )
  return (
    <div>
      <fieldset className="fieldset h-auto w-full rounded-lg px-3 py-2">
        <table id="table-style">
          <thead>
            <tr>
              <th>Nome</th>
              <th>OAB</th>
              <th>CPF</th>
              <th>Qualificação</th>
              <th>Endereço</th>
              <th>Email</th>
              <th>Assinatura</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.results && data?.results.length > 0 ? (
              data.results.map((advocate, index) => (
                <tr key={index}>
                  <td>{advocate.name ? advocate.name : "-"}</td>
                  <td>{advocate.oab ? advocate.oab : "-"}</td>
                  <td>{advocate.cpf ? advocate.cpf : "-"}</td>
                  <td>
                    {advocate.nationality}, {advocate.status}
                  </td>
                  <td>{advocate.address ? advocate.address : "-"}</td>
                  <td>{advocate.email ? advocate.email : "-"}</td>
                  <td>{advocate.lawFirmName ? advocate.lawFirmName : "-"}</td>
                  <td>
                    {advocate.signatureUrl ? (
                      <picture>
                        <img
                          className="bg-slate-200 object-cover"
                          src={advocate.signatureUrl}
                          width={50}
                          height={50}
                          alt="Logo do advogado"
                        />
                      </picture>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="w-16 "></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="py-6 text-center">
                  Nenhum advogado cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </fieldset>
    </div>
  );
}
