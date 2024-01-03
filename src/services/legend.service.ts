import { api } from '@/lib/api'

export class ColorService {
  public async getLegendAll() {
    try {
      const response = await api.get('/colors/legend')
      return response.data
    } catch (error) {
      return error
    }
  }
}
