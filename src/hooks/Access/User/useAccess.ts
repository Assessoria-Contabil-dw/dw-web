import {
  AccessModuleData,
  AccessProps,
} from '@/interfaces/access.interface'
import { useQuery } from 'react-query'
import useAuth from './useAuth'
import { useNotify } from '@/components/Toast/toast'
import { UserAccessService } from '@/services/Access/User/access.service'

export function useAccessData() {
  const accessService = new UserAccessService()
  const user = useAuth()
  const notify = useNotify()

  const query = useQuery<AccessProps>(
    ['accessData'],
    () => accessService.getAll(),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 2,
      refetchOnWindowFocus: false,
      enabled: user?.role === 'CLIENT',
      onError: (error: any) => {
        if (error.response.data.status === 500) {
          console.error(error);
          return notify({
            type: "error",
            message: "Erro interno, tente novamente mais tarde",
          });
        }
    
        return notify({
          type: "error",
          message: error.response.data.message,
        });
      }
    },
  )

  return query
}

export function useAccessModuleData(
  partyCode?: string,
  stateId?: string,
  cityCode?: string,
) {
  const accessModuleService = new UserAccessService()
  const user = useAuth()
  const notify = useNotify()

  const query = useQuery<AccessModuleData>(
    ['accessModuleData', partyCode, stateId, cityCode],
    () => accessModuleService.getModulesById({partyCode, stateId, cityCode}),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 2,
      refetchOnWindowFocus: false,
      enabled: user?.role === 'CLIENT',
      onError: (error: any) => {
        if (error.response.data.status === 500) {
          console.error(error);
          return notify({
            type: "error",
            message: "Erro interno, tente novamente mais tarde",
          });
        }
    
        return notify({
          type: "error",
          message: error.response.data.message,
        });
      }
    },
  )

  return query
}