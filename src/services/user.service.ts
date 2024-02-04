import { useNotify } from '@/components/Toast/toast'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export class UserService {
  notify = useNotify()
  router = useRouter()

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
    } catch (error: any) {
      if (error.response.status === 403) {
        this.notify({ type: 'warning', message: error.response.data.message })
        this.router.push('/')
      }
      return error
    }
  }
}
