import { useNotify } from '@/components/Toast/toast'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export class SPCService {
  notify = useNotify()
  router = useRouter()

  public async getAll(
    skip?: number,
    take?: number,
    party?: string,
    state?: string,
    city?: string,
    status?: string,
    year?: string,
    legend?: string,
    partyCode?: string,
    stateId?: string,
    cityCode?: string,
  ) {
    try {
      const response = await api.get('/spcs', {
        params: {
          skip,
          take,
          party,
          state,
          city,
          status,
          year,
          legend,
          partyCode,
          stateId,
          cityCode,
        },
      })
      return response.data
    } catch (error: any) {
      if (error.response.status === 403) {
        this.notify({ type: 'warning', message: error.response.data.message })
        this.router.push('/painel')
      }
      console.log(error)
    }
  }

  public async getOne(id: string) {
    try {
      const response = await api.get(`/spcs/directory/${id}`)
      return response.data
    } catch (error) {
      return error
    }
  }

  public async putOne(
    id: string,
    year: string,
    numPge: string,
    status: number,
    observation: string,
  ) {
    try {
      const response = api.put(`/spc/${id}`, {
        params: {
          year,
          numPge,
          status,
          observation,
        },
      })
      this.notify({ type: 'success', message: 'Atualizado com sucesso' })
      return response
    } catch (error: any) {
      return this.notify({
        type: 'warning',
        message: error.response.data.message,
      })
    }
  }
}
