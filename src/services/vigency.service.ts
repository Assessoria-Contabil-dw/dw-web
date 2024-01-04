import { api } from '@/lib/api'

export class VigencyService {
  public async getAllById(
    id?: number,
    partyCode?: string,
    cityCode?: string,
    stateId?: string,
  ) {
    try {
      const response = await api.get(`/vigencies/directory/${id}`, {
        params: {
          partyCode,
          cityCode,
          stateId,
        },
      })
      return response.data
    } catch (error) {
      return error
    }
  }

  public async getVigencyById(id?: number) {
    try {
      const response = await api.get(`/vigencies/${id}`)
      return response.data
    } catch (error) {
      return error
    }
  }
}
