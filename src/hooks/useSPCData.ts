import { Page } from '@/interfaces/page'
import { SPCProps } from '@/interfaces/types'
import { SPCService } from '@/services/spc.service'
import { useQuery } from 'react-query'

export function useSPCData(
  skip?: number,
  take?: number,
  party?: string,
  state?: string,
  city?: string,
  status?: string,
  year?: string,
  legend?: string,
  partyCode?: string,
  stateId?: string,
  cityCode?: string,
) {
  const spcService = new SPCService()
  

  const query = useQuery<Page<SPCProps>>(
    [
      'spcData',
      skip,
      take,
      party,
      state,
      city,
      status,
      year,
      legend,
      partyCode,
      stateId,
      cityCode,
    ],
    () =>
      spcService.getAll(
        skip,
        take,
        party,
        state,
        city,
        status,
        year,
        legend,
        partyCode,
        stateId,
        cityCode,
      ),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  )

  return query
}

export function useSPCDataById(id: string) {
  const spcService = new SPCService()

  const query = useQuery<SPCProps>(
    ['spcDataById', id],
    () => spcService.getOne(id),
    {
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: id !== '',
    },
  )

  return query
}

export function useSPCUpdateById(
  id: string,
  year: string,
  numPge: string,
  status: number,
  observation: string,
) {
  const spcService = new SPCService()

  const query = useQuery(
    ['spcUpdateById', id, year, numPge, status, observation],
    () => spcService.putOne(id, year, numPge, Number(status), observation),
    {
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: false,
    },
  )

  return query
}
