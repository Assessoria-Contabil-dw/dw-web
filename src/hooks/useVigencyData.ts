import { VigencyDirectoryProps } from '@/interfaces/vigency'
import { VigencyService } from '@/services/vigency.service'
import { useQuery } from 'react-query'

export function useVigencyData(id?: number) {
  const vigencyService = new VigencyService()

  const query = useQuery<VigencyDirectoryProps>(
    ['vigencyData', id],
    () => vigencyService.getAllById(id),
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
