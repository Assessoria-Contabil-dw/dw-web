import { OfficesProps } from '@/interfaces/types'
import { OfficeService } from '@/services/Leader/office.service'
import { useQuery } from 'react-query'

export function useOfficeData() {
  const officeService = new OfficeService()

  const query = useQuery<OfficesProps[]>(
    ['officeData'],
    () => officeService.getAll(),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
    },
  )

  return query
}
