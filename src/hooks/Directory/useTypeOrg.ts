import { TypeOrgProps } from '@/interfaces/types'
import { TypeOrgService } from '@/services/Directory/typeOrg.service'
import { useQuery } from 'react-query'

export function useTypeOrg() {
  const typeOrgSevice = new TypeOrgService()

  const query = useQuery<TypeOrgProps[]>(
    ['typeOrgData'],
    () => typeOrgSevice.getAll(),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
    },
  )

  return query
}
