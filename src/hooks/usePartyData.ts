import { Page } from '@/interfaces/page'
import { PartyProps } from '@/interfaces/types'
import { PartyService } from '@/services/party.service'
import { useQuery } from 'react-query'

export function usePartyData(
  skip?: number,
  take?: number,
  name?: string,
  code?: string,
) {
  const partyService = new PartyService()

  const query = useQuery<Page<PartyProps>>(
    ['partyData', skip, name, code],
    () => partyService.getAll(skip, take, name, code),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
    },
  )

  return query
}
