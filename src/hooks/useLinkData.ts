import { LinkSitesProps } from '@/interfaces/types'
import { LinksService } from '@/services/links.service'
import { useQuery } from 'react-query'

export function useLinkData() {
  const stateService = new LinksService()

  const query = useQuery<LinkSitesProps[]>(
    ['linksData'],
    () => stateService.getAll(),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 4,
      refetchOnWindowFocus: false,
    },
  )

  return query
}
