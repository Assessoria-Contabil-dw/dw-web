import { VigencyDirectoryProps, VigencyProps } from '@/interfaces/vigency'
import { VigencyService } from '@/services/Directory/vigency.service'
import { useQuery } from 'react-query'
import { VigencyById } from './@type/interfaces'

export function useVigencyData(
  directoryId?: string,
  partyCode?: string,
  stateId?: string,
  cityCode?: string,
) {
  const vigencyService = new VigencyService()

  const query = useQuery<VigencyDirectoryProps>(
    ['vigenciesData', directoryId, partyCode, stateId, cityCode],
    () => vigencyService.getAllById(directoryId, partyCode, stateId, cityCode),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!directoryId,
    },
  )

  return query
}

export function useVigencyOne(id?: number, partyCode?: string, stateId?: string, cityCode?: string) {
  const vigencyService = new VigencyService()

  const query = useQuery<VigencyProps>(
    ['vigencyData', id],
    () => vigencyService.getVigencyById(id, partyCode, stateId, cityCode),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!id,
    },
  )

  return query
}

export function useVigencyUpdate(
    vigencyId: string,
    directoryId: string,
    dateFirst: string,
    dateLast: string,
    vigencyLeader?: {
      officeId: string;
      leaderId: string;
    }[],
    vigencyAdvocate?: {
      advocateId: string;
    }[],
    vigencyLawFirm?: {
      lawFirmId: string;
    }[]
){
  const vigencyService = new VigencyService()

  const query = useQuery<VigencyProps>(
    ['vigencyUpdate'],
    () => vigencyService.update(
      vigencyId,
      directoryId,
      dateFirst,
      dateLast,
      vigencyLeader,
      vigencyAdvocate,
      vigencyLawFirm,
    ),
    {
      keepPreviousData: true,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: false,
    },
  )

  return query
}
