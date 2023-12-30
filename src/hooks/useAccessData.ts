import { AccessProps } from '@/interfaces/modules'
import { AccessService } from '@/services/access.service'
import { useQuery } from 'react-query'

export function useAccessData() {
  const accessService = new AccessService()

  const query = useQuery<AccessProps>(
    ['accessData'],
    () => accessService.getAccessAll(),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  )

  return query
}
