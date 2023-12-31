import { useNotify } from '@/components/Toast/toast'
import { Page } from '@/interfaces/page'
import { DirectoryProps } from '@/interfaces/types'
import { DirectoryService } from '@/services/directory.service'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'

export function useDirectoryData(
  skip?: number,
  take?: number,
  party?: string,
  state?: string,
  city?: string,
  status?: string,
  partyCode?: string,
  stateId?: string,
  cityCode?: string,
) {
  const partyService = new DirectoryService()
  const notify = useNotify()
  const router = useRouter()

  const query = useQuery<Page<DirectoryProps>>(
    [
      'directoryData',
      skip,
      party,
      state,
      city,
      status,
      partyCode,
      stateId,
      cityCode,
    ],
    () =>
      partyService.getAll(
        skip,
        take,
        party,
        state,
        city,
        status,
        partyCode,
        stateId,
        cityCode,
      ),
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
        console.log(error)
      },
    },
  )

  return query
}
