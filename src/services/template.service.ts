import { useNotify } from '@/components/Toast/toast'
import { api } from '@/lib/api'
import { queryClient } from '@/provider/query.provider'

export class TemplateService {
  notify = useNotify()

  public async getAll() {
    try {
      const response = await api.get('/templates')
      return response.data
    } catch (error) {
      return error
    }
  }

  public async post(name?: string, content?: string) {
    if (!name || !content) {
      return this.notify({
        type: 'error',
        message: 'Algumas informações não foram fornecidas!',
      })
    }
    try {
      const response = await api.post('/templates', {
        name,
        content,
      })
      this.notify({ type: 'success', message: 'Template criado com sucesso!' })
      return response.data
    } catch (error: any) {
      return this.notify({
        type: 'error',
        message: error.response.data.message,
      })
    }
  }

  public async putById(
    content: string | undefined,
    id?: number,
    name?: string,
  ) {
    if (!id) {
      return this.notify({
        type: 'error',
        message: 'Template não encontrado!',
      })
    }
    try {
      const response = await api.put(`/templates/${id}`, {
        name,
        content,
      })

      this.notify({
        type: 'success',
        message: 'Template atualizado com sucesso!',
      })

      queryClient.invalidateQueries('templateData')
      return response.data
    } catch (error: any) {
      return this.notify({
        type: 'error',
        message: error.response.data.message,
      })
    }
  }

  public async deleteById(id: number) {
    try {
      const response = await api.delete(`/templates/${id}`)

      this.notify({
        type: 'success',
        message: 'Template deletado com sucesso!',
      })
      queryClient.invalidateQueries('templateData')
      return response.data
      
    } catch (error: any) {
      return this.notify({
        type: 'error',
        message: error.response.data.message,
      })
    }
  }
}
