import { AccessModuleData } from '@/interfaces/modules'
import { AccessService } from '@/services/access.service'
import { useQuery } from 'react-query'

export function useAccessModuleData(
  partyCode?: string,
  stateId?: string,
  cityCode?: string,
) {
  const accessModuleService = new AccessService()

  const query = useQuery<AccessModuleData>(
    ['accessModuleData', partyCode, stateId, cityCode],
    () => accessModuleService.getAccessModules(partyCode, stateId, cityCode),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  )

  return query
}
