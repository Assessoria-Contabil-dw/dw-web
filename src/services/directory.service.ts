import { useNotify } from '@/components/Toast/toast'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export class DirectoryService {
  notify = useNotify()
  router = useRouter()

  public async getAll(
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
    try {
      const response = await api.get('/directories', {
        params: {
          skip,
          take,
          party,
          state,
          city,
          status,
          partyCode,
          stateId,
          cityCode,
        },
      })
      return response.data
    } catch (error: any) {
      if (error.response.status === 403) {
        this.notify({ type: 'warning', message: error.response.data.message })
        return this.router.push('/painel')
      }
      return this.notify({
        type: 'error',
        message: 'Não foi possível carregar as informações',
      })
    }
  }

  public async getByFilter(
    partyAbbreviation?: string,
    stateSigla?: string,
    cityName?: string,
  ) {
    try {
      const response = await api.get(`/directories/filter`, {
        params: {
          partyAbbreviation,
          stateSigla,
          cityName,
        },
      })
      return response.data
    } catch (error) {
      return error
    }
  }

  public async deleteById(id: string) {
    try {
      const response = await api.delete(`/directories/${id}`)
      return response.data
    } catch (error) {
      return error
    }
  }
}
