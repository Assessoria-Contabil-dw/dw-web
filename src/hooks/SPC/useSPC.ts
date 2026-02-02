import { Page } from "@/interfaces/page";
import { SPCService } from "@/services/spc.service";
import { useQuery } from "react-query";
import { SPCAllProps, SPCDirectoryProps, SPCCreateData } from "./@type";

export function useSPCData(
  skip?: number,
  take?: number,
  partyCode?: string,
  stateId?: string,
  cityCode?: string,

  partyAbbreviation?: string,
  stateName?: string,
  cityName?: string,
  year?: string,
  colorId?: string,
  vigencyStatus?: string,
  spca?: boolean,
  spce?: boolean
) {
  const spcService = new SPCService();

  const query = useQuery<Page<SPCAllProps>>(
    [
      "spcData",
      skip,
      take,
      partyCode,
      stateId,
      cityCode,
      partyAbbreviation,
      stateName,
      cityName,
      year,
      colorId,
      vigencyStatus,
      spca,
      spce,
    ],
    () =>
      spcService.getAll(
        skip,
        take,
        partyCode,
        stateId,
        cityCode,
        partyAbbreviation,
        stateName,
        cityName,
        year,
        colorId,
        vigencyStatus,
        spca,
        spce
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

export function useSPCDirectoryById(
  id: string,
  partyCode?: string,
  stateId?: string,
  cityCode?: string
) {
  const spcService = new SPCService();

  const query = useQuery<SPCDirectoryProps>(
    ["spcDirectoryById", id],
    () => spcService.getDirectoryById(id, partyCode, stateId, cityCode),
    {
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: id !== "",
    }
  );

  return query;
}

export function useSPCUpdateById(
  id: string,
  year: string,
  numPge?: string,
  colorId?: string,
  observation?: string
) {
  const spcService = new SPCService();

  const query = useQuery(
    ["spcUpdateById"],
    () => spcService.putOne(id, year, numPge, colorId, observation),
    {
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  return query;
}

export function useSPCCreate(directoryId: string, spcArray: SPCCreateData[]) {
  const spcService = new SPCService();

  const query = useQuery(
    ["spcCreate"],
    () => spcService.postAll(directoryId, spcArray),
    {
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  return query;
}
