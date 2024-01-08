import { Page } from '@/interfaces/page'
import { DirectoryProps } from '@/interfaces/types'
import { DirectoryService } from '@/services/directory.service'
import { useQuery } from 'react-query'

export function useDirectoryData(
  skip?: number,
  take?: number,
  party?: string,
  state?: string,
  city?: string,
  status?: string,
  partyCode?: string,
  stateId?: string,
  cityCode?: string,
) {
  const directoryService = new DirectoryService()

  const query = useQuery<Page<DirectoryProps>>(
    [
      'directoryData',
      skip,
      party,
      state,
      city,
      status,
      partyCode,
      stateId,
      cityCode,
    ],
    () =>
      directoryService.getAll(
        skip,
        take,
        party,
        state,
        city,
        status,
        partyCode,
        stateId,
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

) {
  const directoryService = new DirectoryService()

  const query = useQuery<DirectoryProps[]>(
    [
      'directoryFilter',
      partyAbbreviation,
      stateSigla,
      cityName,
 
    ],
    () =>
      directoryService.getByFilter(
        partyAbbreviation,
        stateSigla,
        cityName,
       
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
