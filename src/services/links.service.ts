import { api } from '@/lib/api'

export class LinksService {
  public async getAll() {
    try {
      const response = await api.get('/linkSites')
      return response.data
    } catch (error) {
      return error
    }
  }
}
