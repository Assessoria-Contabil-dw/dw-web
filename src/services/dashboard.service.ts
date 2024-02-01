import { api } from '@/lib/api'

export class DashboardService {
  public async getAccessCount() {
    try {
      const response = await api.get('/dashboard/count')
      return response.data
    } catch (error) {
      return error
    }
  }
}
