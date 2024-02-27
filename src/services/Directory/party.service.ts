import { api } from '@/lib/api'

export class PartyService {
  public async getAll(
    skip?: number,
    take?: number,
    abbreviation?: string,
    code?: string,
  ) {
    try {
      const response = await api.get('/parties', {
        params: {
          skip,
          take,
          abbreviation,
          code,
        },
      })
      return response.data
    } catch (error) {
      return error
    }
  }
}
