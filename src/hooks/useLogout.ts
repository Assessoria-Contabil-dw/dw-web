import { useNotify } from '@/components/Toast/toast'
import { AuthService } from '@/services/auth.service'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'

export function useLogout() {
  const authService = new AuthService()
  const notify = useNotify()
  const router = useRouter()

  const query = useQuery('logout', () => authService.postLogout(), {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 60 * 12,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: () => {
      notify({ type: 'success', message: 'Você saiu da conta' })
      router.push('/')
    },
    onError: () => {
      notify({ type: 'error', message: 'Erro ao sair da conta' })
    },
  })

  return query
}
