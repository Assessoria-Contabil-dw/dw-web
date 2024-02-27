import { StateProps } from '@/interfaces/types'
import { StateService } from '@/services/Directory/state.service'
import { useQuery } from 'react-query'

export function useStateData() {
  const stateService = new StateService()

  const query = useQuery<StateProps[]>(
    ['stateData'],
    () => stateService.getAll(),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
    },
  )

  return query
}
