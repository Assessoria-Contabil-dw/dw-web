import { api } from '@/lib/api'

export class StateService {
  public async getAll() {
    try {
      const response = await api.get('/states')
      return response.data
    } catch (error) {
      return error
    }
  }
}
