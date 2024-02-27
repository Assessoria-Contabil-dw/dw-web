import { Page } from "@/interfaces/page";
import { DirectoryProps } from "@/interfaces/types";
import { DirectoryService } from "@/services/Directory/directory.service";
import { useQuery } from "react-query";
import { DirectoryByIdProps, DirectoryCreateProps } from "./@type/interfaces";

export function useDirectoryData(
  skip?: number,
  take?: number,
  partyAbbreviation?: string,
  stateName?: string,
  cityName?: string,
  typeOrgId?: number,
  vigencyStatus?: string,
  partyCode?: string,
  stateId?: string,
  cityCode?: string
) {
  const directoryService = new DirectoryService();

  const query = useQuery<Page<DirectoryProps>>(
    [
      "directoryData",
      skip,
      take,
      partyAbbreviation,
      stateName,
      cityName,
      typeOrgId,
      vigencyStatus,
      partyCode,
      stateId,
      cityCode,
    ],
    () =>
      directoryService.getAll({
        skip,
        take,
        partyAbbreviation,
        typeOrgId,
        vigencyStatus,
        partyCode,
        stateId,
        cityCode,
        stateName,
        cityName,
}),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  return query;
}

export function useDirectoryFilter(
  partyAbbreviation?: string,
  stateSigla?: string,
  cityName?: string,
  partyCode?: string,
  stateId?: string,
  cityCode?: string
) {
  const directoryService = new DirectoryService();

  const query = useQuery<DirectoryProps[]>(
    [
      "directoryFilter",
      partyAbbreviation,
      stateSigla,
      cityName,
      partyCode,
      stateId,
      cityCode,
    ],
    () =>
      directoryService.getByFilter(
        partyAbbreviation,
        stateSigla,
        cityName,
        partyCode,
        stateId,
        cityCode
      ),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  return query;
}

export function useDirectoryCreate(
  cnpj: string,
  partyCode: string,
  cityCode: string,
  typeOrgId: string,
  vigencyStatus: string,
  address?: string,
  siteUrl?: string,
  email?: string,
  phone?: string,
  mailingAddress?: string
) {
  const directoryService = new DirectoryService();

  const query = useQuery<DirectoryCreateProps>(["directoryCreate"], () => 
    directoryService.createDirectory(
      cnpj,
      partyCode,
      cityCode,
      typeOrgId,
      vigencyStatus,
      address,
      siteUrl,
      email,
      phone,
      mailingAddress,
    ),
    {
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: false,
    }

  )
  return query;

}

export function useDirectoryById(
  directoryId: string,
  partyCode?: string,
  stateId?: string,
  cityCode?: string
) {
  const directoryService = new DirectoryService();

  const query = useQuery<DirectoryByIdProps>(
    ["directoryById", directoryId, partyCode, stateId, cityCode],
    () => directoryService.getById(directoryId, partyCode, stateId, cityCode),
    {
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!directoryId,
    }
  );

  return query;
}
