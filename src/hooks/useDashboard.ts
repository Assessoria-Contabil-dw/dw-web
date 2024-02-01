import { AccessCountProps } from '@/interfaces/dashboard.interface'
import { DashboardService } from '@/services/dashboard.service'
import { useQuery } from 'react-query'

export function useDashboardAccessCount() {
  const dashboardService = new DashboardService()

  const query = useQuery<AccessCountProps>(
    ['dashboardAccessCount'],
    () => dashboardService.getAccessCount(),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  )
  return query
}
