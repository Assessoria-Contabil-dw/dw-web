import { api } from '@/lib/api'

export class OfficeService {
  public async getAll() {
    try {
      const response = await api.get('/offices')
      return response.data
    } catch (error) {
      return error
    }
  }
}
