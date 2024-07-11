import { Page } from "@/interfaces/page";
import { ElectionService } from "@/services/Leader/election.service";
import { useQuery } from "react-query";
import { ElectionAllProps } from "../SPC/@type";

export function useElectionData(
  skip: number,
  take?: number,

  leaderName?: string,
  year?: string,
  legendId?: string,
) {
  const electionService = new ElectionService();

  const query = useQuery<Page<ElectionAllProps>>(
    [
      "electionData",
      skip,
      take,
      leaderName,
      year,
      legendId,
    ],
    () =>
      electionService.getAll(
        skip,
        take,
        leaderName,
        year,
        legendId,
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

// export function useSPCDirectoryById(
//   id: string,
//   partyCode?: string,
//   stateId?: string,
//   cityCode?: string
// ) {
//   const spcService = new SPCService();

//   const query = useQuery<SPCDirectoryProps>(
//     ["spcDirectoryById", id],
//     () => spcService.getDirectoryById(id, partyCode, stateId, cityCode),
//     {
//       staleTime: 1000 * 60 * 60 * 12,
//       retry: false,
//       refetchOnWindowFocus: false,
//       enabled: id !== "",
//     }
//   );

//   return query;
// }

// export function useSPCUpdateById(
//   id: string,
//   year: string,
//   numPge?: string,
//   colorId?: string,
//   observation?: string
// ) {
//   const spcService = new SPCService();

//   const query = useQuery(
//     ["spcUpdateById"],
//     () => spcService.putOne(id, year, numPge, colorId, observation),
//     {
//       staleTime: 1000 * 60 * 60 * 12,
//       retry: false,
//       refetchOnWindowFocus: false,
//       enabled: false,
//     }
//   );

//   return query;
// }

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
