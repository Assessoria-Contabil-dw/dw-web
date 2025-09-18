"use client";
import { useNotify } from "@/components/Toast/toast";
import { VigencyService } from "@/services/Directory/vigency.service";
import { useQuery } from "react-query";

export default function TableExperidVigency() {
  const vigencyService = new VigencyService();
  const notify = useNotify();
  const { data, isLoading } = useQuery<
    {
      id: number;
      dateFirst: string;
      dateLast: string;
      daysSinceExpired: string,
      diretory: {
        party: string;
        vigencyStatus: boolean;
        city: string;
        uf: string;
        surname: string;
      };
    }[]
  >(["dashboardExperid"], () => vigencyService.getExpired(), {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 60 * 12,
    retry: 4,
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      if (error.response.data.status === 500) {
        console.error(error);
        return notify({
          type: "error",
          message: " Erro interno, tente novamente mais tarde",
        });
      }
  
      return notify({
        type: "error",
        message: error.response.data.message,
      });
    },
  });

  if (isLoading || !data) {
    return (
      <div className="w-full rounded-md border border-slate-200 p-4">
        <div className="flex animate-pulse space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="flex flex-row gap-8">
              <div className="h-2 w-full rounded bg-slate-300"></div>
              <div className="h-2 w-full rounded bg-slate-300"></div>
              <div className="h-2 w-full rounded bg-slate-300"></div>
              <div className="h-2 w-full rounded bg-slate-300"></div>
              <div className="h-2 w-full rounded bg-slate-300"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <fieldset className="fieldset w-full p-4">
      <div className="mb-4">
        <h4 className="text-h4">Diretorios vencidos</h4>
      </div>

      <table id="table-style">
        <thead>
          <tr>
            <th>Partido</th>
            <th>Diretório</th>
            <th>Data Inicial</th>
            <th>Data Final</th>
            <th>Vencimento</th>
          </tr>
        </thead>
        <tbody>
          {data != null ? (
            data.map((v, index) => (
              <tr key={index}>
                <td>{v.diretory.party}</td>
                <td>{v.diretory.surname}</td>
                <td>{v.dateFirst != null ? v.dateFirst : "-"}</td>
                <td>{v.dateLast != null ? v.dateLast : "-"}</td>
                <td>
                  {v.daysSinceExpired ? (
                    <div
                      className="w-20 rounded-full bg-red-500/30 p-1 text-center font-semibold uppercase text-red-500"
                      title="Data de vencimento próxima"
                    >
                      {v.daysSinceExpired + " Dias"}
                    </div>
                  ) : null}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="py-4 text-center">
                Sem vigencias com data de vencimento próxima
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </fieldset>
  );
}
