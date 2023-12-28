import { api } from '@/lib/api'

export class PartyService {
  public async getAll(
    skip?: number,
    take?: number,
    name?: string,
    code?: string,
  ) {
    try {
      const response = await api.get('/parties', {
        params: {
          skip,
          take,
          name,
          code,
        },
      })
      return response.data
    } catch (error) {
      return error
    }
  }
}
