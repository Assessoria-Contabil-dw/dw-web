import { api } from '@/lib/api'

export class CityService {
  public async getAll(stateId?: string) {
    try {
      const response = await api.get('/cities', {
        params: {
          stateId,
        },
      })
      return response.data
    } catch (error) {
      return error
    }
  }
}
