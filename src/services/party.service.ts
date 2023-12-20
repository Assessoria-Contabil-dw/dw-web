import { api } from '@/lib/api'

export class PartyService {
  public async getAll() {
    try {
      const response = await api.get('/parties')
      return response.data
    } catch (error) {
      return error
    }
  }
}
