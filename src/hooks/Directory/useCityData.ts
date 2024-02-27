import { CityProps } from '@/interfaces/types'
import { CityService } from '@/services/Directory/city.service'
import { useQuery } from 'react-query'

export function useCityData(stateId?: string, stateName?: string) {
  const cityService = new CityService()

  const query = useQuery<CityProps[]>(
    ['cityData', stateId, stateName],
    () => cityService.getAll(stateId, stateName),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!stateId || !!stateName,
    },
  )

  return query
}
