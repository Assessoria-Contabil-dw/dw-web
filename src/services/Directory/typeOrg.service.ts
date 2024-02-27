import { api } from '@/lib/api'

export class TypeOrgService {
  public async getAll() {
    try {
      const response = await api.get('/typeOrg')
      return response.data
    } catch (error) {
      return error
    }
  }
}
