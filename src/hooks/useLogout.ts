import { AuthService } from '@/services/auth.service'
import { useQuery } from 'react-query'

export function useLogout() {
  const authService = new AuthService()

  const query = useQuery('logout', () => authService.postLogout(), {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 60 * 12,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
  })

  return query
}
