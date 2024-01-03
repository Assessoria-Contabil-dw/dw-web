import { ColorProps } from '@/interfaces/types'
import { ColorService } from '@/services/legend.service'
import { useQuery } from 'react-query'

export function useLegendData() {
  const colorService = new ColorService()

  const query = useQuery<ColorProps[]>(
    ['legendData'],
    () => colorService.getLegendAll(),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
    },
  )

  return query
}
