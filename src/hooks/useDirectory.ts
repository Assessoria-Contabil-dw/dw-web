import { Page } from '@/interfaces/page'
import { DirectoryProps } from '@/interfaces/types'
import { DirectoryService } from '@/services/directory.service'
import { useQuery } from 'react-query'

export function useDirectoryData(
  skip?: number,
  take?: number,
  partyAbbreviation?: string,
  stateName?: string,
  cityName?: string,
  typeOrgId?: number,
  vigencyStatus?: string,
  partyCode?: string,
  stateUf?: string,
  cityCode?: string,
) {
  const directoryService = new DirectoryService()

  const query = useQuery<Page<DirectoryProps>>(
    [
      'directoryData',
      skip,
      take,
      partyAbbreviation,
      stateName,
      cityName,
      typeOrgId,
      vigencyStatus,
      partyCode,
      stateUf,
      cityCode,
    ],
    () =>
      directoryService.getAll(
        skip,
        take,
        partyAbbreviation,
        stateName,
        cityName,
        typeOrgId,
        vigencyStatus,
        partyCode,
        stateUf,
        cityCode,
      ),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
    },
  )

  return query
}

export function useDirectoryFilter(
  partyAbbreviation?: string,
  stateSigla?: string,
  cityName?: string,
  partyCode?: string,
  stateId?: string,
  cityCode?: string,
) {
  const directoryService = new DirectoryService()

  const query = useQuery<DirectoryProps[]>(
    ['directoryFilter', 
    partyAbbreviation, 
    stateSigla, 
    cityName, 
    partyCode, 
    stateId, 
    cityCode],
    () => directoryService.getByFilter(
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
    },
  )

  return query
}
