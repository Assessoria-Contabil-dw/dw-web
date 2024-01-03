import { useNotify } from '@/components/Toast/toast'
import { Page } from '@/interfaces/page'
import { SPCProps } from '@/interfaces/types'
import { SPCService } from '@/services/spc.service'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'

export function useSPCData(
  skip?: number,
  take?: number,
  party?: string,
  state?: string,
  city?: string,
  status?: string,
  year?: string,
  legend?: string,
  partyCode?: string,
  stateCode?: string,
  cityCode?: string,
) {
  const spcService = new SPCService()
  const notify = useNotify()
  const router = useRouter()

  const query = useQuery<Page<SPCProps>>(
    [
      'spcData',
      skip,
      take,
      party,
      state,
      city,
      status,
      year,
      legend,
      partyCode,
      stateCode,
      cityCode,
    ],
    () =>
      spcService.getAll(
        skip,
        take,
        party,
        state,
        city,
        status,
        year,
        legend,
        partyCode,
        stateCode,
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

export function useSPCDataById(id: string) {
  const spcService = new SPCService()

  const query = useQuery<SPCProps>(
    ['spcDataById', id],
    () => spcService.getOne(id),
    {
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: id !== '',
    },
  )

  return query
}

export function useSPCUpdateById(
  id: string,
  year: string,
  numPge: string,
  status: number,
  observation: string,
) {
  const spcService = new SPCService()
  const notify = useNotify()

  const query = useQuery(
    ['spcUpdateById', id, year, numPge, status, observation],
    () => spcService.putOne(id, year, numPge, Number(status), observation),
    {
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: () => {
        notify({ type: 'success', message: 'Atualizado com sucesso' })
      },
      onError: (error: any) => {
        notify({ type: 'warning', message: error.response.data.message })
      },
    },
  )

  return query
}
