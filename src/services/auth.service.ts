import { api } from '@/lib/api'

export class AuthService {
  public async postLogout() {
    try {
      const response = await api.post('/logout')
      return response.status
    } catch (error) {
      return error
    }
  }
}
