import { RelatoryService } from "@/services/relatory.service";
import { useQuery } from "react-query";

interface DocumentData {
  content: string;
}

export function useRelatoryListDirectory(
  content: string,
  partyCode: string | undefined,
  stateId: string | undefined,
  cityCode: string | undefined,
  partyAbbreviation: string | undefined,
  stateName: string | undefined,
  cityName: string | undefined,
  typeOrgId: string | undefined,
  vigencyStatus: string | undefined,
  spcStatusId: string | undefined,
  spcYear: string | undefined,
  dateFirst: string | undefined,
  dateLast: string | undefined,
  isBefore: string | undefined,
  status: string | undefined
  
) {
  const relatoryService = new RelatoryService();
  const query = useQuery<DocumentData>(
    ["relatoryListDirectory"],
    () =>
      relatoryService.getListDirectory(
        content,
        partyCode,
        stateId,
        cityCode,
        partyAbbreviation,
        stateName,
        cityName,
        typeOrgId,
        vigencyStatus,
        spcStatusId,
        spcYear,
        dateFirst,
        dateLast,
        isBefore,
        status
        ),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 0,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  return query;
}
