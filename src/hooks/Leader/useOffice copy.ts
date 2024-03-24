import { AdvocateProps } from './../../interfaces/types';
import { useNotify } from '@/components/Toast/toast';
import { Page } from '@/interfaces/page';
import { AdvocatesService } from '@/services/Leader/advocates.service'
import { useQuery } from 'react-query'

export function useAdvocateAll(
  skip?: number,
  take?: number,
  name?: string,
  cpf?: string,
) {
  const service = new AdvocatesService()
  const notify = useNotify();

  const query = useQuery<Page<AdvocateProps>>(
    ['advocatesData', skip, take, name, cpf],
    () => service.getAll({
      skip,
      take,
      name,
      cpf,
    }),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      onError: (error: any) => {
        if (error.response.status === 500) {
          console.log(error)
          return notify({
            type: "error",
            message: "Erro interno no servidor",
          });
        }
        return notify({ type: "warning", message: error.response.data.message });
      },
    },
  )

  return query
}
