import { api } from '@/lib/api'

export class CityService {
  public async getAll(stateId?: string, stateName?: string) {
    try {
      const response = await api.get('/cities', {
        params: {
          stateId,
          stateName,
        },
      })
      return response.data
    } catch (error) {
      return error
    }
  }
}
