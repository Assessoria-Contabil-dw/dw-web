import { api } from '@/lib/api'

export class VigencyService {
  public async getAllById(id?: number) {
    try {
      const response = await api.get(`/vigencies/directory/${id}`)
      return response.data
    } catch (error) {
      return error
    }
  }
}
