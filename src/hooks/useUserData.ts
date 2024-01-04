import { useNotify } from '@/components/Toast/toast'
import { Page } from '@/interfaces/page'
import { UserProps } from '@/interfaces/user.interface'
import { UserService } from '@/services/user.service'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'

export function useUserData(
  skip?: number,
  take?: number,
  name?: string,
  cpf?: string,
  role?: string,
) {
  const userService = new UserService()
  const notify = useNotify()
  const router = useRouter()

  const query = useQuery<Page<UserProps>>(
    ['userData', skip, take, name, cpf, role],
    () => userService.getAll(skip, take, name, cpf, role),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      onError: (error: any) => {
        if (error.response.status === 403) {
          notify({ type: 'warning', message: error.response.data.message })
          router.push('/painel')
        }
      },
    },
  )

  return query
}
