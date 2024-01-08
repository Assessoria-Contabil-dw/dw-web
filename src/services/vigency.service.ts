import { useNotify } from '@/components/Toast/toast'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export class VigencyService {
  notify = useNotify()
  router = useRouter()

  public async getAllById(
    id?: number,
    partyCode?: string,
    stateId?: string,
    cityCode?: string,
  ) {
    try {
      const response = await api.get(`/vigencies/directory/${id}`, {
        params: {
          partyCode,
          stateId,
          cityCode,
        },
      })
      return response.data
    } catch (error:any) {
      if (error.response.status === 403) {
        this.notify({ type: 'warning', message: error.response.data.message })
        this.router.push('/painel')
      }
      return error
    }
  }

  public async getVigencyById(id?: number) {
    try {
      const response = await api.get(`/vigencies/${id}`)
      return response.data
    } catch (error:any) {
      if (error.response.status === 403) {
        this.notify({ type: 'warning', message: error.response.data.message })
        this.router.push('/painel')
      }
      return error
    }
  }
}
