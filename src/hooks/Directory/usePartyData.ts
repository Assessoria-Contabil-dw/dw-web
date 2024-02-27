import { Page } from '@/interfaces/page'
import { PartyProps } from '@/interfaces/types'
import { PartyService } from '@/services/Directory/party.service'
import { useQuery } from 'react-query'

export function usePartyData(
  skip?: number,
  take?: number,
  abbreviation?: string,
  code?: string,
) {
  const partyService = new PartyService()

  const query = useQuery<Page<PartyProps>>(
    ['partyData', skip, abbreviation, code],
    () => partyService.getAll(skip, take, abbreviation, code),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
    },
  )

  return query
}
