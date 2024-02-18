import { VigencyDirectoryProps, VigencyProps } from '@/interfaces/vigency'
import { VigencyService } from '@/services/vigency.service'
import { useQuery } from 'react-query'

export function useVigencyData(
  id?: number,
  partyCode?: string,
  stateId?: string,
  cityCode?: string,
) {
  const vigencyService = new VigencyService()

  const query = useQuery<VigencyDirectoryProps>(
    ['vigencyData', id, partyCode, stateId, cityCode],
    () => vigencyService.getAllById(id, partyCode, stateId, cityCode),
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
