import { api } from '@/lib/api'

export class UserService {
  public async getAll(
    skip?: number,
    take?: number,
    name?: string,
    cpf?: string,
    role?: string,
  ) {
    try {
      const response = await api.get('/users', {
        params: {
          skip,
          take,
          name,
          cpf,
          role,
        },
      })
      return response.data
    } catch (error) {
      return error
    }
  }
}
