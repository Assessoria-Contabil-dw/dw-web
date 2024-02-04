import { useNotify } from '@/components/Toast/toast'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export class AuthService {
  notify = useNotify()
  router = useRouter()

  public async postLogout() {
    try {
      await api.post('/logout')
      this.notify({ type: 'success', message: 'Você saiu da conta' })
      return this.router.push('/login')
    } catch (error) {
      return this.notify({ type: 'error', message: 'Erro ao sair da conta' })
    }
  }
}
