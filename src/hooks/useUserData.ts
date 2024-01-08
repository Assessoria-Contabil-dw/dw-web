import { Page } from '@/interfaces/page'
import { UserProps } from '@/interfaces/user.interface'
import { UserService } from '@/services/user.service'
import { useQuery } from 'react-query'

export function useUserData(
  skip?: number,
  take?: number,
  name?: string,
  cpf?: string,
  role?: string,
) {
  const userService = new UserService()

  const query = useQuery<Page<UserProps>>(
    ['userData', skip, take, name, cpf, role],
    () => userService.getAll(skip, take, name, cpf, role),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
    },
  )

  return query
}
