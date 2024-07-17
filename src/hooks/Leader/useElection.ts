import { Page } from "@/interfaces/page";
import { ElectionService } from "@/services/Leader/election.service";
import { useMutation, useQuery } from "react-query";
import { ElectionAllProps, ElectionProps } from "../SPC/@type";
import { useNotify } from "@/components/Toast/toast";

export function useElectionData(
  skip: number,
  take?: number,

  leaderName?: string,
  year?: string,
  colorId?: string,
  stateName?: string,
  cityName?: string
) {
  const electionService = new ElectionService();

  const query = useQuery<Page<ElectionAllProps>>(
    [
      "electionData",
      skip,
      take,
      leaderName,
      year,
      colorId,
      stateName,
      cityName,
    ],
    () =>
      electionService.getAll(
        skip,
        take,
        leaderName,
        year,
        colorId,
        stateName,
        cityName
      ),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );
  return query;
}

export function useElectionById(id: string) {
  const spcService = new ElectionService();

  const query = useQuery<ElectionProps>(
    ["electionById", id],
    () => spcService.getById(id),
    {
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: id !== "",
    }
  );

  return query;
}

export function useElectionUpdate(
  id: string,
  year: string,
  numPge?: string,
  colorId?: string,
  cityCode?: string,
  observation?: string,
  cnpj?: string,
  accountOR?: string,
  accountFP?: string,
  accountFEFC?: string,
  bank?: string,
  agency?: string
) {
  const service = new ElectionService();
  const notify = useNotify();
  const query = useMutation({
    mutationKey: "electionUpdate",
    mutationFn: () =>
      service.update(id, {
        year,
        numPge,
        colorId,
        cityCode,
        observation,
        cnpj,
        accountOR,
        accountFP,
        accountFEFC,
        bank,
        agency,
      }),
    onSuccess: () => {
      notify({ type: "success", message: "Atualizado com sucesso!" });
    },
    onError: (error: any) => {
      if (error.response.data.status === 500) {
        console.error(error);
        return notify({
          type: "error",
          message: "Erro interno, tente novamente mais tarde",
        });
      }

      return notify({
        type: "error",
        message: error.response.data.message,
      });
    },
  });

  return query;
}

// export function useSPCCreate(directoryId: string, spcArray: SPCCreateData[]) {
//   const spcService = new SPCService();

//   const query = useQuery(
//     ["spcCreate"],
//     () => spcService.postAll(directoryId, spcArray),
//     {
//       staleTime: 1000 * 60 * 60 * 12,
//       retry: false,
//       refetchOnWindowFocus: false,
//       enabled: false,
//     }
//   );

//   return query;
// }
