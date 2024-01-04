import {
  AccessModuleData,
  AccessProps,
  AccessUserProps,
} from '@/interfaces/access.interface'
import { AccessService } from '@/services/access.service'
import { useQuery } from 'react-query'

export function useAccessData() {
  const accessService = new AccessService()

  const query = useQuery<AccessProps>(
    ['accessData'],
    () => accessService.getAll(),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  )

  return query
}

export function useAccessModuleData(
  partyCode?: string,
  stateId?: string,
  cityCode?: string,
) {
  const accessModuleService = new AccessService()

  const query = useQuery<AccessModuleData>(
    ['accessModuleData', partyCode, stateId, cityCode],
    () => accessModuleService.getModulesById(partyCode, stateId, cityCode),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  )

  return query
}

export function useAccessUserData(id: string) {
  const accessService = new AccessService()

  const query = useQuery<AccessUserProps>(
    ['accessUserData', id],
    () => accessService.getUserById(id),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 2,
      refetchOnWindowFocus: false,
      enabled: !!id,
    },
  )

  return query
}
