import { useNotify } from '@/components/Toast/toast'
import { VigencyDirectoryProps, VigencyProps } from '@/interfaces/vigency'
import { VigencyService } from '@/services/vigency.service'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'

export function useVigencyData(
  id?: number,
  partyCode?: string,
  cityCode?: string,
  stateId?: string,
) {
  const vigencyService = new VigencyService()
  const notify = useNotify()
  const router = useRouter()

  const query = useQuery<VigencyDirectoryProps>(
    ['vigencyData', id, partyCode, stateId, cityCode],
    () => vigencyService.getAllById(id, partyCode, stateId, cityCode),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!id,
      onError: (error: any) => {
        if (error.response.status === 403) {
          notify({ type: 'warning', message: error.response.data.message })
          router.push('/painel')
        }
      },
    },
  )

  return query
}

export function useVigencyOne(id?: number) {
  const vigencyService = new VigencyService()
  const notify = useNotify()
  const router = useRouter()

  const query = useQuery<VigencyProps>(
    ['vigencyData', id],
    () => vigencyService.getVigencyById(id),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!id,
      onError: (error: any) => {
        if (error.response.status === 403) {
          notify({ type: 'warning', message: error.response.data.message })
          router.push('/painel')
        }
      },
    },
  )

  return query
}
